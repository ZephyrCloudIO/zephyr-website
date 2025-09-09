# Blog Migration Requirements

## Overview

This document outlines the requirements for migrating the blog from the old ModernJS-based website to the new TanStack Router-based Zephyr website, along with proposed enhancements.

## Current Blog Architecture Analysis

### Blog Structure

- **MDX Files**: 13 blog posts stored as MDX files in `/src/routes/blog/[id$]/`
- **Configuration**: Blog metadata centralized in `_blog-config.tsx`
- **Routing**: ModernJS uses `[id$]` pattern for dynamic routes (the `$` denotes an exact match)
- **Images**: Blog images stored in `/src/images/blog/` with post-specific subdirectories
- **Authors**: Author data stored in `/src/lib/blog/authors/` with TypeScript files

### Current Features

- Featured posts (first 2 posts shown larger)
- Author profiles with avatars and social links
- Hero images and listing images (different images for different contexts)
- Date-based sorting
- Responsive grid layout
- Code syntax highlighting with highlight.js
- Custom BlogMetadata component for MDX files

## Migration Plan

### 1. Blog Infrastructure Setup

#### Directory Structure

```
src/
├── routes/
│   ├── blog/
│   │   ├── index.tsx          # Blog landing page
│   │   └── $slug.tsx          # Dynamic blog post route
├── content/
│   └── blog/                  # MDX blog posts
│       ├── three-sdlcs-one-zephyr.mdx
│       ├── ai-e2e-testing.mdx
│       └── ... (other posts)
├── lib/
│   └── blog/
│       ├── types.ts           # Blog types
│       ├── tags.ts            # Tag definitions
│       └── utils.ts           # Blog utilities
├── data/
│   └── blog/
│       ├── authors.ts         # Author data
│       └── posts.ts           # Blog post metadata
└── images/
    └── blog/                  # Blog images (migrate from old site)
```

#### Tag System

```typescript
// src/lib/blog/tags.ts
export const BlogTags = {
  AI: 'ai',
  WEB: 'web',
  MOBILE: 'mobile',
  CLOUD: 'cloud',
  DEVOPS: 'devops',
  ARCHITECTURE: 'architecture',
  CASE_STUDY: 'case-study',
  ANNOUNCEMENT: 'announcement',
} as const;

export type BlogTag = (typeof BlogTags)[keyof typeof BlogTags];

export const tagLabels: Record<BlogTag, string> = {
  [BlogTags.AI]: 'AI',
  [BlogTags.WEB]: 'Web',
  [BlogTags.MOBILE]: 'Mobile',
  [BlogTags.CLOUD]: 'Cloud',
  [BlogTags.DEVOPS]: 'DevOps',
  [BlogTags.ARCHITECTURE]: 'Architecture',
  [BlogTags.CASE_STUDY]: 'Case Study',
  [BlogTags.ANNOUNCEMENT]: 'Announcement',
};
```

### 2. Data Migration

#### Blog Post Metadata Enhancement

```typescript
export interface BlogPost {
  title: string;
  slug: string; // Without ./ prefix
  date: Date;
  heroImage: string;
  listingImage: string;
  description: string;
  authors: Author[];
  tags: BlogTag[]; // New field
  readingTime?: number; // New field
  featured?: boolean; // New field
}
```

#### Tag Assignments for Existing Posts

- `ai-e2e-testing`: ['ai', 'web']
- `three-sdlcs-one-zephyr`: ['cloud', 'devops', 'architecture']
- `soc2`: ['announcement', 'cloud']
- `sgws-case-study`: ['case-study', 'mobile']
- `ota-with-zephyr`: ['mobile', 'cloud']
- `vibe-coding`: ['ai', 'web', 'architecture']
- etc.

### 3. Features to Implement

#### Blog Landing Page (`/blog`)

1. **Header Section**
   - Title: "Blog"
   - Subtitle with brief description

2. **Filter Combobox**
   - Multi-select with checkboxes
   - Options: All, AI, Web, Mobile, Cloud, + dynamic tags from posts
   - Persists selection in URL params for sharing

3. **Blog Grid**
   - Responsive grid (1 col mobile, 2 col tablet, 3 col desktop)
   - No featured posts section (all posts equal weight)
   - Sort by date (newest first)
   - Show filtered results instantly

4. **Blog Card Enhancements**
   - Add tag badges
   - Add reading time
   - Maintain existing hover effects

#### Individual Blog Post Page (`/blog/$slug`)

1. **MDX Support**
   - Install @mdx-js/react and necessary plugins with pnpm add commands
   - Configure Rsbuild for MDX
   - Support code highlighting
   - Support custom components

2. **Layout**
   - Centered content with max-width
   - Hero image at top
   - Author info with social links
   - Tags and reading time
   - Table of contents (optional)
   - Social sharing buttons

### 4. SEO & Meta Enhancements

#### Meta Tags Implementation

```typescript
// For each blog post
export const generateMetaTags = (post: BlogPost) => ({
  title: `${post.title} | Zephyr Cloud Blog`,
  description: post.description,
  openGraph: {
    title: post.title,
    description: post.description,
    image: post.heroImage,
    type: 'article',
    publishedTime: post.date.toISOString(),
    authors: post.authors.map((a) => a.displayName),
    tags: post.tags,
  },
  twitter: {
    card: 'summary_large_image',
    title: post.title,
    description: post.description,
    image: post.heroImage,
  },
});
```

#### Structured Data

```typescript
// JSON-LD for blog posts
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.description,
  "image": post.heroImage,
  "datePublished": post.date,
  "author": {
    "@type": "Person",
    "name": author.displayName
  },
  "publisher": {
    "@type": "Organization",
    "name": "Zephyr Cloud",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zephyr-cloud.io/logo.svg"
    }
  }
}
```

#### Sitemap Generation

- Dynamic sitemap.xml generation
- Include all blog posts with lastmod dates
- Priority based on recency and featured status

### 5. Additional Enhancements

#### Google Analytics

```typescript
// Add to root layout
<Script
  async
  src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
/>
<Script>
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-XXXXXXXXXX');
  `}
</Script>
```

#### llms.txt Implementation

Create `/public/llms.txt`:

```
# Zephyr Cloud LLM Instructions

## About
Zephyr Cloud is a modern edge computing platform...

## Blog Content
Our blog covers topics including:
- Edge computing and infrastructure
- Mobile app deployment
- AI/ML at the edge
- DevOps best practices

## Technical Stack
- Built with React and TypeScript
- Uses TanStack Router for navigation
- MDX for blog content
- Deployed on Zephyr Cloud

## Contact
For questions: support@zephyr-cloud.io
```

#### Automatic Image Optimization

1. **Build-time optimization**
   - Convert images to WebP format
   - Generate multiple sizes for responsive images
   - Lazy loading with blur placeholders

2. **Implementation**
   ```typescript
   // Image component wrapper
   <ResponsiveImage
     src="/blog/image.png"
     alt="Description"
     sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   />
   ```

### 6. Migration Steps

1. **Phase 1: Infrastructure**
   - Set up MDX support in Rsbuild
   - Create blog routes and layouts
   - Implement tag system

2. **Phase 2: Content Migration**
   - Copy MDX files to new structure
   - Update image imports and paths
   - Migrate author data
   - Add tags to all posts

3. **Phase 3: Features**
   - Implement filtering UI
   - Add meta tags and structured data
   - Set up Google Analytics
   - Create llms.txt

4. **Phase 4: Optimization**
   - Image optimization pipeline
   - Performance testing
   - SEO validation

### 7. Technical Considerations

#### MDX Configuration

```javascript
// rsbuild.config.ts additions
{
  module: {
    rules: [
      {
        test: /\.mdx?$/,
        use: [
          {
            loader: '@mdx-js/loader',
            options: {
              providerImportSource: '@mdx-js/react',
              remarkPlugins: [remarkGfm, remarkReadingTime],
              rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
            },
          },
        ],
      },
    ];
  }
}
```

#### URL Preservation

- Maintain exact URL structure: `/blog/three-sdlcs-one-zephyr`
- Set up redirects if any URLs change
- Implement 301 redirects for any moved content

### 8. Testing Requirements

1. **Functional Testing**
   - All blog posts load correctly
   - Filtering works as expected
   - Images load and display properly
   - Navigation between posts works

2. **SEO Testing**
   - Meta tags render correctly
   - Structured data validates
   - Sitemap generates properly
   - URLs match old structure exactly

3. **Performance Testing**
   - Page load times
   - Image optimization working
   - Lazy loading functioning

## Timeline Estimate

- Infrastructure Setup: 2-3 hours
- Content Migration: 2-3 hours
- Feature Implementation: 4-5 hours
- Testing & Optimization: 2-3 hours

**Total: 10-14 hours**

## Questions for Clarification

1. Should we implement pagination or infinite scroll for the blog landing page?
   We won't have enough blogs to justify either of these right now
2. Do you want a search feature in addition to tag filtering?
   Sure, based on text in the blog, title, and tags
3. Should we add a newsletter signup specific to the blog?
   Sure
4. Do you want comment functionality (e.g., Disqus, Giscus)?
   No
5. Should we track reading progress or add "time to read" estimates?
   Not needed now
