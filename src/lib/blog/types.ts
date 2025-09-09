import type { BlogTag } from './tags';

export type Author = {
  displayName: string;
  zephyrMember: boolean;
  avatar: string;
  socialLinks?: Array<{
    link: string;
    platform: 'LinkedIn' | 'X' | 'YouTube' | 'Twitch' | 'Github';
  }>;
};

export interface BlogPost {
  title: string;
  slug: string;
  date: Date;
  heroImage: string;
  listingImage: string;
  description: string;
  authors: Author[];
  tags: BlogTag[];
  featured?: boolean;
  readingTime?: number;
}
