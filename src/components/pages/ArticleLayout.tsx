import { cn } from '@/lib/utils';
import { ArticleTitleContext } from '@/mdx-components';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

/** Reading column shared by the article header, body and footer so their left edges line up. */
export const ARTICLE_COLUMN = 'mx-auto w-full max-w-3xl px-5 sm:px-8';

interface ArticleHeaderProps {
  back: { href: string; label: string };
  eyebrow?: ReactNode;
  title: string;
  lead?: string;
  children?: ReactNode;
}

export function ArticleHeader({ back, eyebrow, title, lead, children }: ArticleHeaderProps) {
  return (
    <header className={cn(ARTICLE_COLUMN, 'pt-10 lg:pt-16')}>
      <a
        href={back.href}
        className="group inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-ink"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        {back.label}
      </a>
      <div className="mt-10 lg:mt-14">
        {eyebrow ? <p className="m-0 mb-4 text-sm text-ink-faint">{eyebrow}</p> : null}
        <h1 className="text-headline m-0 text-ink">{title}</h1>
        {lead ? <p className="text-lead m-0 mt-5 text-ink-muted">{lead}</p> : null}
      </div>
      {children ? <div className="mt-8">{children}</div> : null}
    </header>
  );
}

export function ArticleHero({ src, alt }: { src: string; alt: string }) {
  return (
    <figure className="mx-auto mt-10 w-full max-w-5xl px-5 sm:px-8 lg:mt-14">
      <img
        src={src}
        alt={alt}
        width={1200}
        height={630}
        className="block h-auto w-full rounded-2xl border border-line bg-surface-2"
        fetchPriority="high"
      />
    </figure>
  );
}

/**
 * Article prose. Typography for Markdown elements lives in `src/mdx-components.tsx`; literal JSX in MDX
 * (`<img>`, `<video>`, `<iframe>`, `<strong>`) bypasses that map, so it's styled here.
 */
const PROSE = cn(
  ARTICLE_COLUMN,
  'text-[1.0625rem] leading-[1.75] break-words text-ink-muted',
  '[&>*:first-child]:mt-0 [&>hr:last-child]:hidden',
  '[&>img]:mx-auto [&>img]:my-8 [&>img]:block [&>img]:h-auto [&>img]:max-w-full [&>img]:rounded-xl [&>img]:border [&>img]:border-line',
  '[&_video]:mx-auto [&_video]:my-8 [&_video]:h-auto [&_video]:max-w-full [&_video]:rounded-xl',
  '[&_iframe]:my-8 [&_iframe]:max-w-full [&_iframe]:rounded-xl',
  '[&_strong]:font-semibold [&_strong]:text-ink',
  // Rspress's tab CSS is unlayered (it beats utilities), so spacing goes on each tab panel's children. The panels
  // are matched structurally because `_` in an arbitrary variant means a space (`.rp-tabs__content__item` breaks).
  '[&_.rp-tabs>:last-child>*>:first-child]:mt-4 [&_.rp-tabs>:last-child>*>:last-child]:mb-4 [&_.rp-tabs_pre]:my-4',
);

export function ArticleBody({ title, children }: { title: string; children: ReactNode }) {
  return (
    <ArticleTitleContext.Provider value={title}>
      <div className={cn(PROSE, 'mt-12 lg:mt-16')}>{children}</div>
    </ArticleTitleContext.Provider>
  );
}

/** Secondary button, per the design system. */
export const SECONDARY_BUTTON =
  'inline-flex h-10 items-center gap-2 rounded-xl border border-line-strong px-4 text-sm text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink';
