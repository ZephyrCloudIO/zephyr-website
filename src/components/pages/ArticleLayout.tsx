import { cn } from '@/lib/utils';
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
        className="group text-ink-muted hover:text-ink inline-flex items-center gap-1.5 text-sm transition-colors"
      >
        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden />
        {back.label}
      </a>
      <div className="mt-10 lg:mt-14">
        {eyebrow ? <p className="text-ink-faint m-0 mb-4 text-sm">{eyebrow}</p> : null}
        <h1 className="text-headline text-ink m-0">{title}</h1>
        {lead ? <p className="text-lead text-ink-muted m-0 mt-5">{lead}</p> : null}
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
        className="border-line bg-surface-2 block h-auto w-full rounded-2xl border"
        fetchPriority="high"
      />
    </figure>
  );
}

const PROSE = cn(
  ARTICLE_COLUMN,
  'text-[1.0625rem] leading-[1.75] break-words text-ink-muted',
  '[&>*:first-child]:mt-0 [&>hr:last-child]:hidden',
  '[&>img]:mx-auto [&>img]:my-8 [&>img]:block [&>img]:h-auto [&>img]:max-w-full [&>img]:rounded-xl [&>img]:border [&>img]:border-line',
  '[&_video]:mx-auto [&_video]:my-8 [&_video]:h-auto [&_video]:max-w-full [&_video]:rounded-xl',
  '[&_iframe]:my-8 [&_iframe]:max-w-full [&_iframe]:rounded-xl',
  '[&_strong]:font-semibold [&_strong]:text-ink',
);

export function ArticleBody({ children }: { title: string; children: ReactNode }) {
  return <div className={cn(PROSE, 'mt-12 lg:mt-16')}>{children}</div>;
}

/** Secondary button, per the design system. */
export const SECONDARY_BUTTON =
  'inline-flex h-10 items-center gap-2 rounded-xl border border-line-strong px-4 text-sm text-ink-muted transition-colors hover:border-deployed/60 hover:text-ink';
