# Image Conversion Guide

This project includes a powerful Rust-based image converter integrated with pnpm scripts for easy use.

## Available Commands

### Single File Conversion

Convert individual files or use glob patterns:

```bash
# Convert to WebP with quality setting
pnpm run convert-webp -- "path/to/image.jpg" -q 90

# Convert to WebP losslessly
pnpm run convert-webp -- "path/to/image.png" --lossless

# Convert to PNG
pnpm run convert-png -- "path/to/image.jpg"

# Convert to JPEG with quality
pnpm run convert-jpeg -- "path/to/image.png" -q 85
```

### Resize Images

```bash
# Resize to specific width (maintains aspect ratio)
pnpm run resize -- "path/to/image.jpg" -w 800

# Resize to specific height
pnpm run resize -- "path/to/image.jpg" -h 600

# Resize to exact dimensions
pnpm run resize -- "path/to/image.jpg" -w 800 -h 600 --preserve-aspect-ratio false
```

### Batch Conversion

Use glob patterns for batch operations:

```bash
# Convert all JPEGs to WebP
pnpm run batch-convert -- webp '"src/images/**/*.jpg"' -q 85

# Create thumbnails from all images
pnpm run batch-convert -- resize '"src/images/**/*.{jpg,png}"' -w 300 -o thumbnails/

# Convert all PNGs to WebP losslessly
pnpm run batch-convert -- webp '"src/images/**/*.png"' --lossless
```

**Note:** When using glob patterns, wrap them in quotes to prevent shell expansion.

### Output Directories

All commands support the `-o` flag for specifying output directories:

```bash
# Output to specific directory
pnpm run convert-webp -- "src/images/*.jpg" -o dist/images/

# The directory will be created if it doesn't exist
```

## Options

### WebP Options

- `-q, --quality <0-100>`: Set quality (default: 80)
- `-l, --lossless`: Use lossless compression
- `--no-progress`: Disable progress bar

### JPEG Options

- `-q, --quality <0-100>`: Set quality (default: 80)
- `--no-progress`: Disable progress bar

### PNG Options

- `--no-progress`: Disable progress bar

### Resize Options

- `-w, --width <pixels>`: Target width
- `-h, --height <pixels>`: Target height
- `--preserve-aspect-ratio <true/false>`: Maintain aspect ratio (default: true)
- `--no-progress`: Disable progress bar

## Building the Image Converter

If you need to rebuild the Rust image converter:

```bash
pnpm run imgc-build
```

## Examples

### Optimize All Blog Images

```bash
# Convert all blog images to WebP with 85% quality
pnpm run batch-convert -- webp '"src/images/blog/**/*.{jpg,png}"' -q 85 -o src/images/blog/

# Create thumbnails for blog posts
pnpm run batch-convert -- resize '"src/images/blog/**/*.{jpg,png,webp}"' -w 400 -o src/images/blog/thumbnails/
```

### Prepare Images for Production

```bash
# Convert all images to WebP for smaller file sizes
pnpm run batch-convert -- webp '"src/images/**/*.{jpg,png}"' -q 90

# Create responsive image sizes
pnpm run batch-convert -- resize '"src/images/**/*.jpg"' -w 1920 -o src/images/1920w/
pnpm run batch-convert -- resize '"src/images/**/*.jpg"' -w 1280 -o src/images/1280w/
pnpm run batch-convert -- resize '"src/images/**/*.jpg"' -w 640 -o src/images/640w/
```

## Tips

1. Always wrap glob patterns in quotes to prevent shell expansion
2. Use `--no-progress` in CI/CD environments
3. WebP typically provides 25-35% smaller file sizes than JPEG at equivalent quality
4. Use lossless WebP for images with transparency or when quality is critical
5. The converter processes files in parallel for maximum performance
