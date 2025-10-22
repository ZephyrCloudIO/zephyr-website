import * as authors from '@/data/blog/authors';
import { BlogTag } from '@/lib/blog/tags.ts';
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
    featured?: boolean;
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
  let date: Date;
  if (dateString) {
    // If date is in YYYY-MM-DD format, treat it as local date at noon to avoid timezone issues
    const dateMatch = String(dateString).match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (dateMatch) {
      const [, year, month, day] = dateMatch;
      date = new Date(Number(year), Number(month) - 1, Number(day), 12, 0, 0);
    } else {
      date = new Date(dateString);
    }
  } else {
    date = new Date();
  }

  return {
    title: metadata.title,
    slug: slug,
    date: date,
    heroImage: images?.heroImage || metadata.heroImage || metadata.image,
    listingImage: images?.listingImage || metadata.listingImage || metadata.image,
    description: metadata.description || metadata.excerpt || '',
    authors: authorsList,
    tags: metadata.tags as BlogTag[],
    featured: metadata.featured || false,
    readingTime: metadata.readingTime,
  };
}

// Import all blog posts
// We'll use a static import map for now, but this could be made dynamic with glob imports
const blogPostModules: Record<string, () => Promise<MDXBlogPost>> = {
  soc2: () => import('@/content/blog/soc2.mdx') as Promise<MDXBlogPost>,
  'ai-e2e-testing': () => import('@/content/blog/ai-e2e-testing.mdx') as Promise<MDXBlogPost>,
  'all-the-pipelines': () => import('@/content/blog/all-the-pipelines.mdx') as Promise<MDXBlogPost>,
  'create-zephyr-apps': () => import('@/content/blog/create-zephyr-apps.mdx') as Promise<MDXBlogPost>,
  infrastructureless: () => import('@/content/blog/infrastructureless.mdx') as Promise<MDXBlogPost>,
  mobilefirst: () => import('@/content/blog/mobilefirst.mdx') as Promise<MDXBlogPost>,
  'ota-with-zephyr': () => import('@/content/blog/ota-with-zephyr.mdx') as Promise<MDXBlogPost>,
  'serve-time': () => import('@/content/blog/serve-time.mdx') as Promise<MDXBlogPost>,
  'sgws-case-study': () => import('@/content/blog/sgws-case-study.mdx') as Promise<MDXBlogPost>,
  'the-team-first-architecture': () => import('@/content/blog/the-team-first-architecture.mdx') as Promise<MDXBlogPost>,
  'three-sdlcs-one-zephyr': () => import('@/content/blog/three-sdlcs-one-zephyr.mdx') as Promise<MDXBlogPost>,
  'vibe-coding': () => import('@/content/blog/vibe-coding.mdx') as Promise<MDXBlogPost>,
  'week-3-runtime-ota': () => import('@/content/blog/week-3-runtime-ota.mdx') as Promise<MDXBlogPost>,
  'whos-your-cloud-daddy': () => import('@/content/blog/whos-your-cloud-daddy.mdx') as Promise<MDXBlogPost>,
  'aws-byoc': () => import('@/content/blog/aws-byoc.mdx') as Promise<MDXBlogPost>,
  'generative-engine-optimization': () =>
    import('@/content/blog/generative-engine-optimization.mdx') as Promise<MDXBlogPost>,
  'dora-metrics': () => import('@/content/blog/dora-metrics.mdx') as Promise<MDXBlogPost>,
  'true-ventures-ai-audit': () => import('@/content/blog/true-ventures-ai-audit.mdx') as Promise<MDXBlogPost>,
  'cloudflare-workers-aws-outage': () =>
    import('@/content/blog/cloudflare-workers-aws-outage.mdx') as Promise<MDXBlogPost>,
};

// Get all blog posts
export async function getAllBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await Promise.all(
      Object.entries(blogPostModules).map(async ([key, modulePromise]) => {
        const module = await modulePromise();
        return mdxToBlogPost(module as MDXBlogPost, key);
      }),
    );

    // Sort by date, newest first
    return posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const modulePromise = blogPostModules[slug];
    if (!modulePromise) return null;

    const module = await modulePromise();
    return mdxToBlogPost(module as MDXBlogPost, slug);
  } catch (error) {
    console.error(`Error loading blog post ${slug}:`, error);
    return null;
  }
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: BlogTag): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.tags.includes(tag));
}

// Get featured blog posts
export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.filter((post) => post.featured);
}

// Get latest blog posts (for home page)
export async function getLatestBlogPosts(count: number = 4): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  return allPosts.slice(0, count);
}

// Search blog posts
export async function searchBlogPosts(query: string): Promise<BlogPost[]> {
  const allPosts = await getAllBlogPosts();
  const lowercaseQuery = query.toLowerCase();

  return allPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      post.description.toLowerCase().includes(lowercaseQuery) ||
      post.tags.some((tag) => tag.includes(lowercaseQuery)),
  );
}
