import { mdxToBlogPost, type MDXBlogPost } from '@/lib/blog/loader';
import type { BlogPost } from '@/lib/blog/types';
import { blogMetadataEntries } from '@/rspress/generated/blog-metadata';

export const allBlogPosts: BlogPost[] = blogMetadataEntries
  .map((entry) => {
    const hasAuthors = 'authors' in entry.metadata && Array.isArray(entry.metadata.authors);

    const metadata: MDXBlogPost['metadata'] = {
      ...entry.metadata,
      tags: [...entry.metadata.tags],
      authors: hasAuthors ? [...entry.metadata.authors] : undefined,
    };

    const mdxPost: MDXBlogPost = {
      metadata,
      default: () => null,
    };

    return mdxToBlogPost(mdxPost, entry.slug);
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export function getBlogPost(slug: string) {
  return allBlogPosts.find((post) => post.slug === slug) ?? null;
}
