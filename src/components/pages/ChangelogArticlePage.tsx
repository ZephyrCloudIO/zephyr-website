import { formatDateLong } from '@/date';
import { mdxToChangelogEntry, type MDXChangelogEntry } from '@/lib/changelog/loader';
import { cn } from '@/lib/utils';
import { ArrowLeft } from 'lucide-react';
import { useRef, type ReactNode } from 'react';
import { ARTICLE_COLUMN, ArticleBody, ArticleHeader, ArticleHero, SECONDARY_BUTTON } from './ArticleLayout';
import { ChangelogCategoryLabel } from './ChangelogCategory';
import { ReadingProgress } from './ReadingProgress';

interface ChangelogArticlePageProps {
  slug: string;
  metadata: MDXChangelogEntry['metadata'];
  children: ReactNode;
}

export function ChangelogArticlePage({ slug, metadata, children }: ChangelogArticlePageProps) {
  const entry = mdxToChangelogEntry(
    {
      metadata,
      default: () => null,
    },
    slug,
  );
  const articleRef = useRef<HTMLElement>(null);

  return (
    <article ref={articleRef} className="pb-24 lg:pb-32">
      <ReadingProgress target={articleRef} />

      <ArticleHeader
        back={{ href: '/changelog', label: 'Changelog' }}
        eyebrow={
          <span className="inline-flex flex-wrap items-center gap-x-2 gap-y-1">
            <ChangelogCategoryLabel category={entry.category} />
            {entry.category ? <span aria-hidden>·</span> : null}
            <time dateTime={entry.date.toISOString()}>{formatDateLong(entry.date)}</time>
            {entry.readingTime ? (
              <>
                <span aria-hidden>·</span>
                <span>{entry.readingTime} min read</span>
              </>
            ) : null}
          </span>
        }
        title={entry.title}
        lead={entry.summary || undefined}
      />

      {entry.image ? <ArticleHero src={entry.image} alt={entry.title} /> : null}

      <ArticleBody title={entry.title}>{children}</ArticleBody>

      <footer className={cn(ARTICLE_COLUMN, 'mt-16')}>
        <div className="border-t border-line pt-10">
          <a href="/changelog" className={SECONDARY_BUTTON}>
            <ArrowLeft className="size-4" aria-hidden />
            All updates
          </a>
        </div>
      </footer>
    </article>
  );
}
