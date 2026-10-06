import { SiteShell } from '@/components/SiteShell';
import type { MDXBlogPost } from '@/lib/blog/loader';
import type { MDXChangelogEntry } from '@/lib/changelog/loader';
import type { ReactNode } from 'react';
import { BlogArticlePage } from './BlogArticlePage';
import { ChangelogArticlePage } from './ChangelogArticlePage';

type ArticlePageProps = {
  slug: string;
  children: ReactNode;
} & (
  | { collection: 'blog'; metadata: MDXBlogPost['metadata'] }
  | { collection: 'changelog'; metadata: MDXChangelogEntry['metadata'] }
);

export function ArticlePage(props: ArticlePageProps) {
  return (
    <SiteShell>
      {props.collection === 'blog' ? (
        <BlogArticlePage slug={props.slug} metadata={props.metadata}>
          {props.children}
        </BlogArticlePage>
      ) : (
        <ChangelogArticlePage slug={props.slug} metadata={props.metadata}>
          {props.children}
        </ChangelogArticlePage>
      )}
    </SiteShell>
  );
}
