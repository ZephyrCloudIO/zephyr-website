import { cn } from '@/lib/utils';
import {
  Children,
  createContext,
  isValidElement,
  useContext,
  useEffect,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from 'react';

type TwitterWindow = Window & {
  twttr?: {
    widgets?: {
      load: () => void;
    };
  };
};

const TWITTER_WIDGET_SCRIPT_ID = 'twitter-wjs';

/**
 * Title of the article being rendered. A body `# Heading` that repeats it is dropped, because the article
 * header already renders the page's one H1.
 */
export const ArticleTitleContext = createContext<string | null>(null);

type AnchorProps = {
  href?: string;
  className?: string;
  children?: ReactNode;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/** Rspress's rehype plugin prepends `<a class="rp-header-anchor" aria-hidden href="#id">#</a>` to every heading. */
function isHeaderAnchor(node: ReactNode): node is ReactElement<AnchorProps> {
  if (!isValidElement<AnchorProps>(node)) return false;

  const { href, className, children } = node.props;
  const ariaHidden = node.props['aria-hidden'];
  const label = typeof children === 'string' ? children.trim() : '';

  return (
    typeof href === 'string' &&
    href.startsWith('#') &&
    (ariaHidden === true || ariaHidden === 'true' || label === '#' || Boolean(className?.includes('rp-header-anchor')))
  );
}

function splitHeadingAnchor(children: ReactNode): { href: string | null; content: ReactNode } {
  const nodes = Children.toArray(children);
  const first = nodes[0];

  if (!isHeaderAnchor(first)) {
    return { href: null, content: children };
  }

  return { href: first.props.href ?? null, content: nodes.slice(1) };
}

function textOf(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
}

const normalizeText = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '');

/** Heading text followed by a hover anchor that keeps Rspress's `#id` deep links working. */
function HeadingContent({ children }: { children: ReactNode }) {
  const { href, content } = splitHeadingAnchor(children);

  return (
    <>
      {content}
      {href ? (
        <a
          href={href}
          aria-hidden="true"
          tabIndex={-1}
          className="ml-[0.3em] font-normal text-ink-faint no-underline opacity-0 transition-opacity group-hover:opacity-100 hover:text-released-ink"
        >
          #
        </a>
      ) : null}
    </>
  );
}

type HeadingTag = 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type HeadingProps = ComponentPropsWithoutRef<'h2'>;

const HEADING_BASE = 'group font-semibold text-balance text-ink';

const HEADING_CLASS: Record<HeadingTag, string> = {
  h2: 'mt-14 mb-4 text-[1.625rem] leading-[1.2] tracking-[-0.022em] sm:text-[1.875rem]',
  h3: 'mt-10 mb-3 text-[1.25rem] leading-[1.3] tracking-[-0.016em] sm:text-[1.375rem]',
  h4: 'mt-8 mb-2 text-[1.0625rem] leading-[1.45] tracking-[-0.01em]',
  h5: 'mt-6 mb-2 text-base leading-normal',
  h6: 'mt-6 mb-2 text-[0.9375rem] leading-normal',
};

function createHeading(Tag: HeadingTag) {
  function MdxHeading({ className, children, ...props }: HeadingProps) {
    return (
      <Tag className={cn(HEADING_BASE, HEADING_CLASS[Tag], className)} {...props}>
        <HeadingContent>{children}</HeadingContent>
      </Tag>
    );
  }

  MdxHeading.displayName = `Mdx${Tag.toUpperCase()}`;
  return MdxHeading;
}

/** Body H1s render as section headings (one H1 per page); one that repeats the article title is dropped. */
function MdxH1({ className, children, ...props }: HeadingProps) {
  const articleTitle = useContext(ArticleTitleContext);
  const { content } = splitHeadingAnchor(children);
  const title = articleTitle ? normalizeText(articleTitle) : '';

  if (title && normalizeText(textOf(content)) === title) {
    return null;
  }

  return (
    <h2 className={cn(HEADING_BASE, HEADING_CLASS.h2, className)} {...props}>
      <HeadingContent>{children}</HeadingContent>
    </h2>
  );
}

const EXTERNAL_HREF = /^https?:\/\//i;
const SITE_HREF = /^https?:\/\/(www\.)?zephyr-cloud\.io(\/|$)/i;

function MdxLink({ className, href, ...props }: ComponentPropsWithoutRef<'a'>) {
  const external = typeof href === 'string' && EXTERNAL_HREF.test(href) && !SITE_HREF.test(href);

  return (
    <a
      href={href}
      className={cn(
        'text-released-ink underline decoration-released-ink/35 decoration-1 underline-offset-4 transition-colors hover:decoration-released-ink',
        className,
      )}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      {...props}
    />
  );
}

function MdxCode({ className, children, ...props }: ComponentPropsWithoutRef<'code'>) {
  const hasStructuredChildren =
    Array.isArray(children) || (children != null && typeof children !== 'string' && typeof children !== 'number');
  const isInlineCode = !className && !hasStructuredChildren;

  if (isInlineCode) {
    return (
      <code
        className="rounded-md border border-line bg-surface-2 px-[0.35em] py-[0.1em] font-mono text-[0.84em] text-ink [font-variant-ligatures:none] box-decoration-clone [a_&]:text-inherit"
        {...props}
      >
        {children}
      </code>
    );
  }

  // `w-max min-w-full` keeps the right padding visible at the end of a horizontal scroll.
  return (
    <code className={cn('block w-max min-w-full', className)} {...props}>
      {children}
    </code>
  );
}

function MdxPre({ className, style, children, ...props }: ComponentPropsWithoutRef<'pre'>) {
  // Rspress pads each Shiki `.line` 1.25rem on both sides (unlayered CSS), so only plain blocks need side padding.
  const isShiki = Boolean(className?.split(/\s+/).includes('shiki'));

  return (
    <pre
      className={cn(
        'my-7 max-w-full overflow-x-auto rounded-xl border border-line bg-[#0a0c11] py-4 font-mono text-[0.8125rem] leading-[1.75] text-[#d4d7e1] [font-variant-ligatures:none] [tab-size:2]',
        !isShiki && 'px-5',
        className,
      )}
      style={style}
      {...props}
    >
      {children}
    </pre>
  );
}

function TwitterEmbed({ children, mediaMaxWidth = 560 }: { children: ReactNode; mediaMaxWidth?: number }) {
  useEffect(() => {
    const twitterWindow = window as TwitterWindow;
    const loadWidgets = () => twitterWindow.twttr?.widgets?.load();
    const existingScript = document.getElementById(TWITTER_WIDGET_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (twitterWindow.twttr?.widgets) {
        loadWidgets();
        return;
      }

      existingScript.addEventListener('load', loadWidgets, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TWITTER_WIDGET_SCRIPT_ID;
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    script.addEventListener('load', loadWidgets);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', loadWidgets);
    };
  }, []);

  // The fallback quote is styled through the wrapper so the widget's rendered <div class="twitter-tweet"> isn't.
  return (
    <div
      className="my-8 overflow-x-auto [&>blockquote]:m-0 [&>blockquote]:rounded-xl [&>blockquote]:border [&>blockquote]:border-line [&>blockquote]:bg-surface/70 [&>blockquote]:p-5 [&>blockquote]:text-[0.9375rem] [&>blockquote]:leading-relaxed [&>blockquote]:text-ink-muted"
      suppressHydrationWarning
    >
      <blockquote className="twitter-tweet" data-media-max-width={mediaMaxWidth} suppressHydrationWarning>
        {children}
      </blockquote>
    </div>
  );
}

const bodyText = 'text-[1.0625rem] leading-[1.75] text-ink-muted';

export const mdxComponents = {
  h1: MdxH1,
  h2: createHeading('h2'),
  h3: createHeading('h3'),
  h4: createHeading('h4'),
  h5: createHeading('h5'),
  h6: createHeading('h6'),
  p: ({ className, ...props }: ComponentPropsWithoutRef<'p'>) => (
    <p className={cn('mb-5 text-pretty', bodyText, className)} {...props} />
  ),
  ul: ({ className, ...props }: ComponentPropsWithoutRef<'ul'>) => (
    <ul className={cn('mb-5 list-disc space-y-2 pl-6 marker:text-ink-faint', bodyText, className)} {...props} />
  ),
  ol: ({ className, ...props }: ComponentPropsWithoutRef<'ol'>) => (
    <ol className={cn('mb-5 list-decimal space-y-2 pl-6 marker:text-ink-faint', bodyText, className)} {...props} />
  ),
  li: ({ className, ...props }: ComponentPropsWithoutRef<'li'>) => (
    <li
      className={cn('pl-1.5 text-pretty [&>ol]:mt-2 [&>ol]:mb-0 [&>p]:mb-0 [&>ul]:mt-2 [&>ul]:mb-0', className)}
      {...props}
    />
  ),
  code: MdxCode,
  pre: MdxPre,
  blockquote: ({ className, ...props }: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className={cn('my-8 border-l-2 border-line-strong pl-5 [&>p]:text-ink [&>p:last-child]:mb-0', className)}
      {...props}
    />
  ),
  table: ({ className, children, ...props }: ComponentPropsWithoutRef<'table'>) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-line">
      <table className={cn('w-full border-collapse text-left text-sm', className)} {...props}>
        {children}
      </table>
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<'thead'>) => (
    <thead className={cn('bg-surface-2/60', className)} {...props} />
  ),
  tbody: ({ className, ...props }: ComponentPropsWithoutRef<'tbody'>) => (
    <tbody className={cn('divide-y divide-line', className)} {...props} />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<'tr'>) => (
    <tr className={cn('align-top', className)} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<'th'>) => (
    <th className={cn('border-b border-line px-4 py-3 align-bottom font-medium text-ink', className)} {...props} />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<'td'>) => (
    <td className={cn('px-4 py-3 align-top leading-relaxed text-ink-muted', className)} {...props} />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<'hr'>) => (
    <hr className={cn('my-12 h-px border-0 bg-line', className)} {...props} />
  ),
  TwitterEmbed,
  a: MdxLink,
  img: ({ className, alt = '', ...props }: ComponentPropsWithoutRef<'img'>) => (
    <img
      alt={alt}
      loading="lazy"
      decoding="async"
      className={cn('my-8 inline-block h-auto max-w-full rounded-xl border border-line', className)}
      {...props}
    />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className={cn('font-semibold text-ink', className)} {...props} />
  ),
  em: ({ className, ...props }: ComponentPropsWithoutRef<'em'>) => (
    <em className={cn('italic', className)} {...props} />
  ),
  del: ({ className, ...props }: ComponentPropsWithoutRef<'del'>) => (
    <del className={cn('text-ink-faint', className)} {...props} />
  ),
};
