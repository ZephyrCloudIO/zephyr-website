# Zephyr Cloud Website

This is the Zephyr Cloud website built with React 19, Rspress SSG, Tailwind CSS 4, Shadcn UI, and Zephyr Cloud deployment.

## Setup

Install the dependencies:

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

Build the static site for production:

```bash
pnpm build
```

Run the type checker:

```bash
pnpm run typecheck
```

## Rspress SSG

Rspress uses `docs/` as the static route root. The site does not use SSR and should not restore the old Rsbuild app shell.

- `docs/*.mdx`: static pages and route wrappers.
- `docs/public/`: public files deployed at the site root, such as `robots.txt`, `llms.txt`, and `.well-known/*`.
- `theme/index.tsx`: global layout, header/footer, providers, and page head rendering.
- `src/routes/`: reusable page components rendered by thin `docs/*.mdx` wrappers.
- `src/content/blog/`: canonical blog MDX source.
- `src/content/changelog/`: canonical changelog MDX source.
- `scripts/generate-rspress-content.mjs`: generates `docs/blog/*.mdx`, `docs/changelog/*.mdx`, and `src/generated/*-metadata.ts`.

After adding or editing blog/changelog content, regenerate static routes:

```bash
pnpm run generate:rspress-content
```

Commit both source content and generated route wrappers.

For detailed maintenance steps, see [`rspress-maintenance-guide.md`](rspress-maintenance-guide.md).

## Standalone Landers

Special campaign landers live in `src/landers/<slug>` and are exposed through Rspress wrappers in `docs/<slug>.mdx`. Use `hideChrome: true` for landers that should not render the global header/footer.

Create one from the template:

```bash
pnpm create-lander founder-briefing
```

Enable one or more landers:

```bash
ZE_PUBLIC_ENABLED_LANDERS=founder-briefing,partner-launch
```

If a lander should respect `ZE_PUBLIC_ENABLED_LANDERS`, render it with `LanderRoute` from the Rspress wrapper.

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
