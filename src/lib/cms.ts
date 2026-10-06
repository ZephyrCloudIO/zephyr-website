import { getEmDashCollection, getEmDashEntry, type PortableTextBlock } from 'emdash';
import type { MDXBlogPost } from './blog/loader';
import { mdxToBlogPost } from './blog/loader';
import { mdxToChangelogEntry } from './changelog/loader';
import type { ChangelogCategory } from './changelog/types';

export interface CmsArticle {
  id: string;
  title: string;
  description: string;
  published_on: string;
  hero_image?: string;
  listing_image?: string;
  content: PortableTextBlock[];
  reading_time?: number;
  authors?: MDXBlogPost['metadata']['authors'];
  tags?: string[];
  hide_hero?: boolean;
  category?: ChangelogCategory;
}

export function blogMetadata(data: CmsArticle): MDXBlogPost['metadata'] {
  return {
    title: data.title,
    description: data.description,
    date: data.published_on,
    heroImage: data.hero_image,
    listingImage: data.listing_image,
    authors: data.authors,
    tags: data.tags ?? [],
    readingTime: data.reading_time,
    hideHero: data.hide_hero,
  };
}

export function changelogMetadata(data: CmsArticle, slug: string) {
  return {
    title: data.title,
    slug,
    summary: data.description,
    date: data.published_on,
    image: data.hero_image,
    category: data.category ?? 'platform',
    readingTime: data.reading_time,
  };
}

export async function listArticles(collection: 'blog' | 'changelog') {
  const entries = [];
  let offset = 0;
  for (;;) {
    const result = await getEmDashCollection<typeof collection, CmsArticle>(collection, {
      orderBy: { published_on: 'desc' },
      limit: 100,
      offset,
    });
    if (result.error) throw result.error;
    entries.push(...result.entries);
    if (result.entries.length < 100) return entries;
    offset += result.entries.length;
  }
}

export async function listBlogPosts(limit?: number) {
  const result = limit
    ? await getEmDashCollection<'blog', CmsArticle>('blog', { orderBy: { published_on: 'desc' }, limit })
    : { entries: await listArticles('blog'), error: undefined };
  if (result.error) throw result.error;
  return result.entries.map((entry) =>
    mdxToBlogPost({ metadata: blogMetadata(entry.data), default: () => null }, entry.id),
  );
}

export async function listChangelogEntries() {
  return (await listArticles('changelog')).map((entry) =>
    mdxToChangelogEntry({ metadata: changelogMetadata(entry.data, entry.id), default: () => null }, entry.id),
  );
}

export async function findArticle(collection: 'blog' | 'changelog', slug: string) {
  const result = await getEmDashEntry<typeof collection, CmsArticle>(collection, slug);
  if (result.error?.name === 'LiveEntryNotFoundError') return null;
  if (result.error) throw result.error;
  return result.entry ?? null;
}
