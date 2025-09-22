import { changelogImages } from './images';
import type { ChangelogCategory, ChangelogEntry } from './types';

export interface MDXChangelogEntry {
  metadata: {
    title: string;
    slug: string;
    date: string;
    summary: string;
    category: ChangelogCategory;
    image?: string;
    readingTime?: number;
  };
  default: React.ComponentType;
}

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
    date: new Date(metadata.date),
    summary: metadata.summary,
    category: metadata.category,
    image: images?.image || metadata.image,
    readingTime: metadata.readingTime,
  };
}

// Import all changelog entries
const changelogModules: Record<string, () => Promise<MDXChangelogEntry>> = {
  '2025-09-ui-ux-authentication-updates': () =>
    import('@/content/changelog/2025-09-ui-ux-authentication-updates.mdx') as Promise<MDXChangelogEntry>,
  '2025-09-performance-fixes': () =>
    import('@/content/changelog/2025-09-performance-fixes.mdx') as Promise<MDXChangelogEntry>,
  '2025-08-yearly-subscriptions': () =>
    import('@/content/changelog/2025-08-yearly-subscriptions.mdx') as Promise<MDXChangelogEntry>,
  '2025-07-akamai-integration-audit-logs': () =>
    import('@/content/changelog/2025-07-akamai-integration-audit-logs.mdx') as Promise<MDXChangelogEntry>,
  '2025-06-dependency-management': () =>
    import('@/content/changelog/2025-06-dependency-management.mdx') as Promise<MDXChangelogEntry>,
  '2025-05-deployment-navigation': () =>
    import('@/content/changelog/2025-05-deployment-navigation.mdx') as Promise<MDXChangelogEntry>,
  '2025-04-version-statuses-devops': () =>
    import('@/content/changelog/2025-04-version-statuses-devops.mdx') as Promise<MDXChangelogEntry>,
  '2025-02-updated-navigation': () =>
    import('@/content/changelog/2025-02-updated-navigation.mdx') as Promise<MDXChangelogEntry>,
  '2025-01-timestamps-filters': () =>
    import('@/content/changelog/2025-01-timestamps-filters.mdx') as Promise<MDXChangelogEntry>,
  // Add more changelog entries here as they are created
};

// Get all changelog entries
export async function getAllChangelogEntries(): Promise<ChangelogEntry[]> {
  try {
    const entries = await Promise.all(
      Object.entries(changelogModules).map(async ([key, modulePromise]) => {
        const module = await modulePromise();
        return mdxToChangelogEntry(module as MDXChangelogEntry, key);
      }),
    );

    // Sort by date, newest first
    return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error loading changelog entries:', error);
    return [];
  }
}

// Get a single changelog entry by slug
export async function getChangelogEntryBySlug(slug: string): Promise<ChangelogEntry | null> {
  try {
    const modulePromise = changelogModules[slug];
    if (!modulePromise) return null;

    const module = await modulePromise();
    return mdxToChangelogEntry(module as MDXChangelogEntry, slug);
  } catch (error) {
    console.error(`Error loading changelog entry ${slug}:`, error);
    return null;
  }
}
