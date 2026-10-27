export type ChangelogCategory = 'feature' | 'performance' | 'integration' | 'security' | 'platform' | 'dx';

export interface ChangelogEntry {
  title: string;
  slug: string;
  date: Date;
  summary: string;
  category: ChangelogCategory;
  // Release version for product changelogs (plugins, Workers), such as `v1.7.0`.
  version?: string;
  image?: string;
  readingTime?: number;
}
