import { parseLocalDate } from '@/lib/utils';
import { changelogImages } from './images';
import type { ChangelogCategory, ChangelogEntry } from './types';

export interface MDXChangelogEntry {
  metadata: {
    title: string;
    slug: string;
    date: string;
    summary: string;
    category: ChangelogCategory;
    version?: string;
    image?: string;
    readingTime?: number;
  };
  default: React.ComponentType;
}

// Platform entries use labels like "Platform Update" as their version; only show real release versions.
const RELEASE_VERSION = /^v?\d+\.\d+\.\d+/;

// Convert MDX metadata to ChangelogEntry format
export function mdxToChangelogEntry(mdx: MDXChangelogEntry, moduleKey?: string): ChangelogEntry {
  const { metadata } = mdx;

  // Derive slug from module key if not provided in metadata
  const slug = metadata.slug || moduleKey || '';

  // Get images from the imported images if they exist
  const images = changelogImages[slug as keyof typeof changelogImages];

  return {
    title: metadata.title,
    slug,
    date: parseLocalDate(metadata.date),
    summary: metadata.summary,
    category: metadata.category,
    version: metadata.version && RELEASE_VERSION.test(metadata.version) ? metadata.version : undefined,
    image: images?.image || metadata.image,
    readingTime: metadata.readingTime,
  };
}
