import { changelogMetadataEntries } from '@/generated/changelog-metadata';
import { pluginChangelogMetadataEntries } from '@/generated/changelog-plugins-metadata';
import { workerChangelogMetadataEntries } from '@/generated/changelog-workers-metadata';
import { mdxToChangelogEntry, type MDXChangelogEntry } from '@/lib/changelog/loader';
import type { ChangelogEntry } from '@/lib/changelog/types';

type ChangelogMetadataEntries = ReadonlyArray<{
  slug: string;
  metadata: Pick<MDXChangelogEntry['metadata'], 'title' | 'date' | 'summary' | 'category'> & object;
}>;

function toEntries(metadataEntries: ChangelogMetadataEntries): ChangelogEntry[] {
  return metadataEntries
    .map((entry) => {
      const image =
        'image' in entry.metadata && typeof entry.metadata.image === 'string' ? entry.metadata.image : undefined;
      const readingTime =
        'readingTime' in entry.metadata && typeof entry.metadata.readingTime === 'number'
          ? entry.metadata.readingTime
          : undefined;
      const version =
        'version' in entry.metadata && typeof entry.metadata.version === 'string' ? entry.metadata.version : undefined;

      const metadata: MDXChangelogEntry['metadata'] = {
        title: entry.metadata.title,
        slug: entry.slug,
        date: entry.metadata.date,
        summary: entry.metadata.summary,
        category: entry.metadata.category,
        version,
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
}

export const allChangelogEntries: ChangelogEntry[] = toEntries(changelogMetadataEntries);
export const pluginChangelogEntries: ChangelogEntry[] = toEntries(pluginChangelogMetadataEntries);
export const workerChangelogEntries: ChangelogEntry[] = toEntries(workerChangelogMetadataEntries);

export function getChangelogEntry(slug: string) {
  return allChangelogEntries.find((entry) => entry.slug === slug) ?? null;
}
