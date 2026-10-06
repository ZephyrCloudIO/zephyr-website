# Zephyr Cloud Website

The Zephyr Cloud website runs on Astro and EmDash 1.1, with Cloudflare Workers, D1 for CMS content, and R2 for uploaded media. The existing React 19 pages, Tailwind CSS 4 design, forms, analytics, and article URLs are retained.

## Setup

Use Node.js 22.16 or newer and the pinned pnpm version. Install the dependencies:

```bash
pnpm install
```

Build the image converter (one-time setup):

```bash
pnpm run imgc-build
```

## Get started

Start the development server:

```bash
pnpm dev
```

On a fresh local database, open `http://localhost:4321/_emdash/api/setup/dev-bypass` once to initialize the CMS and import the existing articles. This endpoint is development-only. The admin is at `http://localhost:4321/_emdash/admin`.

Build the Worker and browser assets without deploying:

```bash
pnpm build
```

Run the type checker:

```bash
pnpm run typecheck
```

## Content and routes

Astro owns routing and server rendering. EmDash owns the blog and changelog database, rich-text editor, drafts, revisions, scheduled publication, and uploaded media. Publishing in EmDash updates the site without a rebuild.

- `src/pages/`: public routes and the live sitemap.
- `src/layouts/Base.astro`: SEO and EmDash page contributions.
- `src/components/SiteShell.tsx`: header, footer, analytics, and Intercom providers.
- `src/routes/`: existing React page components.
- `src/data/site-pages.json`: metadata for repository-owned marketing and legal pages.
- `docs/public/`: static assets, discovery files, and static response headers.
- `src/content/blog/` and `src/content/changelog/`: original MDX migration sources, retained as an archive.
- `.emdash/seed.json`: initial collection schema and converted content.

The migration converts prose, code, tables, and images to Portable Text. Interactive release-path figures and installation tabs use explicit custom blocks. Imported content assets are copied to `docs/public/content/` during preparation. Rebuild the deterministic migration snapshot with:

```bash
pnpm emdash:prepare
pnpm emdash:validate
pnpm emdash:verify
```

This prepares the initial import. It does not overwrite articles in an existing CMS database. After the initial migration, publish blog and changelog changes through EmDash rather than editing the archived MDX.

See [`docs-internal/emdash-maintenance-guide.md`](docs-internal/emdash-maintenance-guide.md) for content ownership, validation, and deployment steps.

## Cloudflare deployment

`pnpm build` never uploads or reads a Zephyr deployment token. `pnpm deploy:dry` validates the Worker bundle locally. `pnpm run deploy` explicitly builds and deploys with Wrangler. The `run` is required because `pnpm deploy` is pnpm's separate workspace packaging command.

Authenticate with `pnpm exec wrangler login`, select the intended Cloudflare account, and run `pnpm run deploy`. Wrangler can provision the declared D1 database and R2 bucket, plus the Astro session KV namespace. Do not attach the production domain yet.

Open `/_emdash/admin` on the new Worker URL, complete setup with a real administrator account, and choose the seed content import to load all 59 existing articles. Verify the public routes, media, forms, and authentication there before attaching `zephyr-cloud.io`. No account IDs, resource IDs, credentials, or production domain routes are committed to this repository. Sandboxed plugins are not enabled by default.

CI validates content, types, the production build, and the deployment bundle without requiring deployment credentials or changing the live site.

## Standalone Landers

Campaign landers live in `src/landers/<slug>`. The scaffolder registers their metadata in `src/data/site-pages.json`. They only enter the generated route registry and browser bundle when enabled at dev/build time.

Create one from the template:

```bash
pnpm create-lander founder-briefing
```

Enable one or more landers:

```bash
ZE_PUBLIC_ENABLED_LANDERS=founder-briefing,partner-launch
```

Set `ZE_PUBLIC_ENABLED_LANDERS` for both development and builds. Disabled landers return 404 and are omitted from the sitemap and route bundle. The values `all` and `*` enable every lander.

## Image Conversion

The project includes a powerful Rust-based image converter (`imgc`) for all image processing needs.

### Basic Usage

```bash
# Convert images to WebP (default quality: 100%)
pnpm run imgc webp "src/images/**/*.{jpg,png}" -q 100

# Convert to WebP with custom quality
pnpm run imgc webp "src/images/blog/*.jpg" -q 85

# Recompress existing WebP files
pnpm run imgc webp "src/images/**/*.webp" -q 90 --recompress

# Convert to PNG
pnpm run imgc png "src/images/**/*.jpg"

# Convert to JPEG
pnpm run imgc jpeg "src/images/**/*.png" -q 85
```

### Resizing Images

```bash
# Resize to specific dimensions
pnpm run imgc resize "src/images/community/*.webp" -w 100 -h 100

# Resize maintaining aspect ratio
pnpm run imgc resize "src/images/blog/*.webp" -w 1200 --preserve-aspect-ratio

# Resize and output to different directory
pnpm run imgc resize "src/images/**/*.webp" -w 800 -o dist/images/
```

### Common Use Cases

```bash
# Community avatars (100x100, 90% quality)
pnpm run imgc resize "src/images/community/*.webp" -w 100 -h 100
pnpm run imgc webp "src/images/community/*.webp" -q 90 --recompress

# Convert cloud provider logos to WebP
pnpm run imgc webp "src/images/clouds/*.png" -q 100

# Batch convert all images in a directory
pnpm run imgc webp "src/images/new-content/**/*.{jpg,png}" -q 100
```

### Options

- **All commands**: `--no-progress` (disable progress bar)
- **WebP**: `-q/--quality` (0-100, default: 80), `--lossless`, `--recompress`
- **JPEG**: `-q/--quality` (0-100, default: 80)
- **Resize**: `-w/--width`, `-h/--height`, `--preserve-aspect-ratio` (default: true)
- **Output**: `-o/--output` (output directory, defaults to same location)

### Help

```bash
# Show all available commands
pnpm run imgc --help

# Show help for specific command
pnpm run imgc webp --help
```
