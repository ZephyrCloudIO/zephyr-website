import { changelogMetadataEntries } from '@/generated/changelog-metadata';
import { mdxToChangelogEntry, type MDXChangelogEntry } from '@/lib/changelog/loader';
import type { ChangelogEntry } from '@/lib/changelog/types';

export const allChangelogEntries: ChangelogEntry[] = changelogMetadataEntries
  .map((entry) => {
    const image =
      'image' in entry.metadata && typeof entry.metadata.image === 'string' ? entry.metadata.image : undefined;
    const readingTime =
      'readingTime' in entry.metadata && typeof entry.metadata.readingTime === 'number'
        ? entry.metadata.readingTime
        : undefined;

    const metadata: MDXChangelogEntry['metadata'] = {
      title: entry.metadata.title,
      slug: entry.slug,
      date: entry.metadata.date,
      summary: entry.metadata.summary,
      category: entry.metadata.category,
      image,
      readingTime,
    };

    const mdxEntry: MDXChangelogEntry = {
      metadata,
      default: () => null,
    };

    return mdxToChangelogEntry(mdxEntry, entry.slug);
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export function getChangelogEntry(slug: string) {
  return allChangelogEntries.find((entry) => entry.slug === slug) ?? null;
}
