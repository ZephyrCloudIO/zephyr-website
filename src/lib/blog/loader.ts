import * as authors from '@/data/blog/authors';
import type { BlogTag } from '@/lib/blog/tags.ts';
import { parseLocalDate } from '@/lib/utils';
import { blogImages } from './images';
import type { Author, BlogPost } from './types';

// This will be populated with actual MDX imports
// For now, we'll create a structure that can be easily extended
export interface MDXBlogPost {
  metadata: {
    title: string;
    slug?: string;
    date?: string;
    publishDate?: string;
    publishedAt?: string; // Alternative to publishDate
    heroImage?: string | any; // Can be a string path or imported image
    listingImage?: string | any; // Can be a string path or imported image
    image?: string | any; // Some posts use 'image' instead of heroImage/listingImage
    description?: string;
    excerpt?: string; // Alternative to description
    author?: string; // Single author format (used in new posts)
    authors?: (string | { id: string })[]; // Can be author names or objects with id
    tags: string[];
    readingTime?: number;
  };
  default: React.ComponentType;
}

// Map author names to author objects
const authorMap: Record<string, Author> = {
  'Zack Jackson': authors.ZackJ,
  'Zack Chapple': authors.ZackC,
  'Shane Walker': authors.Shane,
  'Lois Z.': authors.Lois,
  'Lois Zhao': authors.Lois,
  'Néstor López': authors.Nestor,
  'Rodrigo Yokota': authors.Rodrigo,
  'Arthur Fiorette': authors.Arthur,
  'Luca Mezzalira': authors.Luca,
};

// Convert MDX metadata to BlogPost format
export function mdxToBlogPost(mdx: MDXBlogPost, moduleKey?: string): BlogPost {
  const { metadata } = mdx;

  // Derive slug from module key if not provided in metadata
  const slug = metadata.slug || moduleKey || '';

  // Get images from the imported images if they exist
  const images = blogImages[slug as keyof typeof blogImages];

  // Handle authors - they might be an array of strings or array of objects with id
  let authorsList: Author[] = [];

  // Handle single author format (used in newer posts)
  if (metadata.author && typeof metadata.author === 'string') {
    const author = authorMap[metadata.author];
    if (author) {
      authorsList = [author];
    }
  } else if (metadata.authors && Array.isArray(metadata.authors)) {
    authorsList = metadata.authors
      .map((author) => {
        if (typeof author === 'string') {
          return authorMap[author];
        } else if (author && typeof author === 'object' && 'id' in author) {
          // Handle the case where authors is an array of objects with id
          const authorId = author.id;
          // Map common author IDs to full names
          const idToName: Record<string, string> = {
            zack: 'Zack Chapple',
            zackj: 'Zack Jackson',
            shane: 'Shane Walker',
            lois: 'Lois Zhao',
            nestor: 'Néstor',
            rodrigo: 'Rodrigo',
            arthur: 'Arthur Fiorette',
            luca: 'Luca Mezzalira',
          };
          const authorName = idToName[authorId] || authorId;
          return authorMap[authorName];
        }
        return null;
      })
      .filter(Boolean) as Author[];
  }

  // Parse date string as local date (not UTC) to avoid timezone offset issues
  const dateString = metadata.publishedAt || metadata.publishDate || metadata.date;
  const date = parseLocalDate(dateString);

  return {
    title: metadata.title,
    slug: slug,
    date: date,
    heroImage: images?.heroImage || metadata.heroImage || metadata.image,
    listingImage: images?.listingImage || metadata.listingImage || metadata.image,
    description: metadata.description || metadata.excerpt || '',
    authors: authorsList,
    tags: metadata.tags as BlogTag[],
    readingTime: metadata.readingTime,
  };
}
