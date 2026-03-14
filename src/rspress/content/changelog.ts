import { mdxToChangelogEntry, type MDXChangelogEntry } from '@/lib/changelog/loader';
import type { ChangelogEntry } from '@/lib/changelog/types';
import { changelogMetadataEntries } from '@/rspress/generated/changelog-metadata';

export const allChangelogEntries: ChangelogEntry[] = changelogMetadataEntries
  .map((entry) => {
    const mdxEntry: MDXChangelogEntry = {
      metadata: entry.metadata as MDXChangelogEntry['metadata'],
      default: () => null,
    };

    return mdxToChangelogEntry(mdxEntry, entry.slug);
  })
  .sort((a, b) => b.date.getTime() - a.date.getTime());

export function getChangelogEntry(slug: string) {
  return allChangelogEntries.find((entry) => entry.slug === slug) ?? null;
}
