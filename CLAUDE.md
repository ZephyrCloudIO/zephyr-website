# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Zephyr Cloud website built with:
- React 19.1.0
- Rsbuild (Rspack-based build tool)
- TypeScript 5.8.3
- Tailwind CSS 4.1.10
- Shadcn UI components
- TanStack Router for file-based routing
- MDX for blog content with frontmatter support
- Zephyr Cloud integration via zephyr-rspack-plugin

## Essential Commands

```bash
# Development
pnpm dev        # Start dev server with hot reload (auto-opens browser)

# Build
pnpm build      # Build for production (creates Zephyr preview URLs)

# Preview
pnpm preview    # Preview production build locally
```

## Code Architecture

### Build System
- Uses **Rsbuild** (not webpack/vite) configured in `rsbuild.config.ts`
- Integrates with Zephyr Cloud for deployment via custom plugin
- PostCSS setup with Tailwind CSS v4 plugin architecture
- TanStack Router plugin for automatic route generation

### Directory Structure
```
src/
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── sections/         # Page sections (Header, Footer, etc.)
│   ├── CodeBlock.tsx     # Code display component
│   └── FeatureListItem.tsx
├── constants/            # Data constants
│   ├── features.ts       # Feature sections data
│   ├── blogPosts.ts      # Blog posts data
│   └── companyLogos.ts   # Company logos imports
├── routes/               # File-based routes
│   ├── __root.tsx       # Root layout
│   ├── index.tsx        # Home page
│   ├── privacy.tsx      # Privacy policy page
│   └── blog/
│       ├── index.tsx    # Blog landing page
│       └── $slug.tsx    # Dynamic blog post pages
├── content/
│   └── blog/            # MDX blog posts
│       └── *.mdx        # Individual blog posts
├── lib/
│   ├── blog/            # Blog utilities
│   │   ├── loader.ts    # Blog post loader
│   │   ├── tags.ts      # Blog tag definitions
│   │   ├── types.ts     # Blog TypeScript types
│   │   └── images.ts    # Blog image imports
│   └── utils.ts         # Utility functions
├── data/
│   └── blog/
│       └── authors.ts   # Blog author definitions
├── images/               # Static assets
│   ├── community/       # Testimonial avatars
│   ├── companies/       # Company logos
│   ├── blog/            # Blog post images
│   ├── zephyr-logo.svg
│   └── zephyr-wordmark.svg
├── lib/utils.ts         # Utility functions (cn for className merging)
├── router.tsx           # Router configuration
├── routeTree.gen.ts     # Auto-generated route tree (DO NOT EDIT)
├── testimonials.ts      # Testimonials data
├── App.css              # Global styles with Tailwind imports
├── index.css            # Base styles import
└── index.tsx            # Entry point with RouterProvider
```

### Routing System
- Uses **TanStack Router** with file-based routing
- Routes are defined in `src/routes/` directory
- `__root.tsx` provides the layout wrapper with Header and Footer
- Auto-generates type-safe route tree
- Internal navigation uses `Link` component from `@tanstack/react-router`
- External links use standard `<a>` tags with `target="_blank"`

### Path Aliases
- `@/*` maps to `./src/*` (configured in both tsconfig.json and rsbuild.config.ts)

### Styling System
- Tailwind CSS with Zephyr brand colors:
  - `emerald-700`: Primary green for Zephyr branding
  - `blue-800`: Workflow section accent
  - `red-500`: RAG section accent
  - `violet-500`: Ops section accent
  - `neutral-*` variants for UI elements
- CSS animations for testimonial scrolling
- Dark theme by default with `bg-black` base
- Responsive design with Tailwind breakpoints (sm, md, lg)

### Component Library
- Shadcn UI components installed via CLI
- Components use Radix UI primitives
- Styled with Tailwind classes and cn() utility
- Custom components:
  - `Header`: Navigation with logo dropdown menu for SVG copying
  - `HeroSection`: Main landing area with copy-to-clipboard CTA
  - `TestimonialsSection`: Auto-scrolling testimonials with company logos
  - `FeatureSection`: Reusable feature showcase (used for agents/workflows/rag/ops)
  - `BlogSection`: Blog posts grid with newsletter signup (automatically shows latest 4 posts)
  - `BlogCard`: Blog post card component used in listings
  - `Footer`: Multi-column footer with social links

### Features

#### Logo Right-Click Menu
- Right-click on header logo opens dropdown with options to copy SVG
- Copies either logo icon or wordmark SVG to clipboard

#### Resources Dropdown
- Navigation includes dropdown menu for Blog, Changelog, Press, Events

#### Scrolling Testimonials
- Two-row auto-scrolling testimonial cards
- Pauses on hover
- Includes social media links for testimonial authors

#### Component Reusability
- `FeatureSection` component accepts props for different sections
- Configurable title prefix, color, code examples, and layout

## Development Notes

### Link Preferences
- When creating external links, use `target="_blank"` but DO NOT include `rel="noreferrer"`
- It's acceptable to show referrer information when users click external links
- Use `rel="noopener"` alone for security without blocking referrer information

### Package Manager
This project uses **pnpm**. Always use pnpm commands, not npm or yarn.

### TypeScript Configuration
- Strict mode enabled
- Target: ES2020
- Module resolution: bundler
- JSX: react-jsx
- Includes generated route types from TanStack Router

### Component Organization
- Page sections are extracted into `components/sections/`
- Reusable UI components in `components/ui/`
- Data constants separated from components
- Each component is self-contained with its own imports

### Current State
- Production-ready component architecture
- TanStack Router implemented for navigation
- Blog system with MDX support and dynamic routing
- Responsive design with mobile-first approach
- No state management library (using React hooks)
- No testing framework configured
- No linting tools (ESLint/Prettier) set up

### Blog System
- MDX files in `src/content/blog/` with frontmatter metadata
- Blog images stored in `src/images/blog/` and imported in loader
- Dynamic blog post routes using `$slug` parameter
- Tag-based filtering system with 8 categories
- Author system with avatars and social links
- Blog landing page with search and filtering
- Automatic home page integration showing latest 4 posts

### Zephyr Cloud Integration
The project uses zephyr-rspack-plugin for building and deploying to Zephyr Cloud. Production builds automatically generate preview URLs.

### Important Files
- `rsbuild.config.ts` - Build configuration with router plugin
- `src/routes/__root.tsx` - Main layout wrapper
- `src/components/sections/Header.tsx` - Navigation with dropdown menus
- `.vscode/settings.json` - Excludes generated files from editing

### Adding New Routes
To add a new route, create a file in `src/routes/`:
- `src/routes/about.tsx` → `/about`
- `src/routes/blog/index.tsx` → `/blog`
- `src/routes/blog/$slug.tsx` → `/blog/:slug` (dynamic route)

The route tree will be automatically regenerated when the dev server is running.

### Embedding Media in MDX Blog Posts

#### Images
To embed images in blog posts:
1. Import the image file at the top of the MDX file
2. Use JSX img tag with the imported variable

Example:
```mdx
import deploymentDiagram from '@/images/blog/post-name/diagram.webp'

<img src={deploymentDiagram} alt="Deployment workflow" />
```

Note: Markdown image syntax (![alt](src)) does NOT work with imported images in MDX. You must use JSX syntax.

#### Videos
To embed videos in blog posts:
1. Import the video file at the top of the MDX file
2. Use HTML5 video element with proper attributes

Example:
```mdx
import demoVideo from '@/images/blog/post-name/demo.webm'

<div align="center">
<video autoPlay loop muted>
  <source src={demoVideo} type="video/webm"/>
</video>
</div>
```

Note: All media files (images, videos) should be placed in the blog post's image directory and imported as modules, not referenced as static paths. This ensures proper bundling and optimization by Rsbuild.

## Image Processing Guidelines

The project includes a Rust-based image converter (`imgc`) for consistent image optimization. When adding or converting images, follow these guidelines:

### Image Quality Standards
- **Default quality**: 100% for all new images
- **Community avatars**: 90% quality after resizing
- **All images should be in WebP format** for optimal performance

### Image Sizing Requirements

#### Community Images (Testimonial Avatars)
- **Dimensions**: 100x100 pixels (square)
- **Quality**: 90%
- **Format**: WebP
- **Example processing**:
  ```bash
  pnpm run imgc resize "src/images/community/*.webp" -w 100 -h 100
  pnpm run imgc webp "src/images/community/*.webp" -q 90 --recompress
  ```

#### Company Logos
- **Format**: WebP
- **Quality**: 100% (to preserve logo clarity)
- **Dimensions**: To be determined based on design requirements
- **Example conversion**:
  ```bash
  pnpm run imgc webp "src/images/companies/*.{png,jpg}" -q 100
  ```

#### Blog Images
- **Format**: WebP
- **Quality**: 100% for hero images, can be adjusted based on file size
- **Dimensions**: To be determined based on design requirements
- **Example conversion**:
  ```bash
  pnpm run imgc webp "src/images/blog/**/*.{jpg,png}" -q 100
  ```

#### Cloud Provider Logos
- **Format**: WebP (convert from PNG)
- **Quality**: 100%
- **Example conversion**:
  ```bash
  pnpm run imgc webp "src/images/clouds/*.png" -q 100
  ```

### Processing New Images

1. **Convert to WebP first** (if not already):
   ```bash
   pnpm run imgc webp "path/to/new-images/*.{jpg,png}" -q 100
   ```

2. **Resize if needed** (especially for avatars):
   ```bash
   pnpm run imgc resize "path/to/images/*.webp" -w 100 -h 100
   ```

3. **Optimize quality** if file size is a concern:
   ```bash
   pnpm run imgc webp "path/to/images/*.webp" -q 85 --recompress
   ```

### Important Notes
- **No backup images are kept** - ensure you're happy with the conversion before processing
- Use `--recompress` flag when modifying existing WebP files
- The `imgc` tool supports batch operations with glob patterns
- Always test image quality visually after processing
- For help with any command: `pnpm run imgc [command] --help`