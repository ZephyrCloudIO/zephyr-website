# Zephyr Cloud Website
This is a rewrite of the Zephyr Cloud website to be based on Tailwind 4, Shadcn, React19, and Zephyr Cloud

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

Build the app for Zephyr preview urls:

```bash
pnpm build
```

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
