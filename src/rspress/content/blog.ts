import { mdxToBlogPost, type MDXBlogPost } from '@/lib/blog/loader';
import type { BlogPost } from '@/lib/blog/types';
import { blogMetadataEntries } from '@/rspress/generated/blog-metadata';

export const allBlogPosts: BlogPost[] = blogMetadataEntries
  .map((entry) => {
    const mdxPost: MDXBlogPost = {
      metadata: entry.metadata as MDXBlogPost['metadata'],
      default: () => null,
    };

    return mdxToBlogPost(mdxPost, entry.slug);
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export function getBlogPost(slug: string) {
  return allBlogPosts.find((post) => post.slug === slug) ?? null;
}
