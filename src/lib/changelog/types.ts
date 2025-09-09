export type ChangelogCategory = 'feature' | 'performance' | 'integration' | 'security' | 'platform' | 'dx';

export interface ChangelogEntry {
  title: string;
  slug: string;
  date: Date;
  summary: string;
  category: ChangelogCategory;
  image?: string;
  readingTime?: number;
}
