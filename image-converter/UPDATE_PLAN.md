# Image Converter Update Plan

## Current State Analysis

The image-converter (imgc) project is a well-structured Rust CLI tool for converting images to WebP format. It uses:

- Rust edition 2021
- image crate v0.25
- webp crate v0.3
- rayon for parallel processing
- clap v4.5 for CLI

## Recommended Updates

### 1. Dependency Updates

The project dependencies are already at recent stable versions:

- **clap 4.5**: Current and stable
- **image 0.25**: Latest stable version (0.25.6)
- **rayon 1.10**: Current version
- **webp 0.3**: Current version
- **glob 0.3**: Stable and sufficient

### 2. Rust Version

- Current: Edition 2021 (good)
- Recommendation: Add `rust-version = "1.70.0"` to Cargo.toml for MSRV (Minimum Supported Rust Version)

### 3. Feature Improvements

#### a. Additional Format Support

```rust
// Add more output formats beyond WebP
enum OutputFormat {
    WebP,
    Avif,    // Modern, better compression
    JpegXl,  // Future-proof
    Png,     // Optimization mode
}
```

#### b. Compression Options

```rust
// Add quality and compression settings
struct CompressionOptions {
    quality: u8,        // 0-100
    lossless: bool,
    effort: u8,         // Encoding effort 0-6
}
```

#### c. Image Processing Features

- Resize operations
- Auto-rotation based on EXIF
- Batch optimization (not just conversion)
- Format detection improvements

#### d. Performance Enhancements

- Progress bars for batch operations
- Memory usage optimization for large images
- Streaming support for very large files

### 4. Code Quality Improvements

#### a. Testing

```rust
// Add comprehensive tests
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_webp_conversion() {
        // Test conversion logic
    }

    #[test]
    fn test_format_detection() {
        // Test format detection
    }
}
```

#### b. Error Handling

- More specific error types
- Better error messages for users
- Retry logic for transient failures

#### c. Documentation

- Add examples directory with sample images
- Improve inline documentation
- Add benchmarks

### 5. New Features to Consider

#### a. Watch Mode

```bash
imgc watch "input/*.jpg" --format webp --output output/
```

#### b. Configuration File

```toml
# .imgc.toml
[defaults]
format = "webp"
quality = 85
output_dir = "./converted"

[profiles.thumbnail]
resize = "300x300"
quality = 70
```

#### c. Plugin System

- Allow custom filters/processors
- Support for custom formats via plugins

### 6. Modern Rust Patterns

#### a. Use newer async features for I/O

```rust
use tokio::fs;
use futures::stream::{self, StreamExt};

async fn convert_async(paths: Vec<PathBuf>) {
    stream::iter(paths)
        .for_each_concurrent(4, |path| async move {
            // Async conversion
        })
        .await;
}
```

#### b. Builder pattern for complex operations

```rust
let conversion = ImageConversion::builder()
    .input("*.jpg")
    .format(Format::WebP)
    .quality(85)
    .parallel(true)
    .build()?;

conversion.execute().await?;
```

### 7. CI/CD and Distribution

#### a. GitHub Actions

```yaml
name: Release
on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v4
      - uses: dtolnay/rust-toolchain@stable
      - run: cargo build --release
      - uses: softprops/action-gh-release@v1
        with:
          files: target/release/imgc*
```

#### b. Distribution

- Publish to crates.io
- Homebrew formula
- AUR package
- Docker image

## Implementation Priority

1. **High Priority** ✅ COMPLETED
   - Add MSRV to Cargo.toml ✅
   - Add quality options for WebP ✅
   - Add progress indicators using indicatif ✅

2. **Medium Priority** ✅ COMPLETED
   - Add compression options (quality, lossless) ✅
   - Support PNG format ✅
   - Support JPEG format ✅
   - Basic resize functionality ✅
   - Progress indicators with indicatif ✅

3. **Low Priority**
   - Watch mode
   - Configuration file support
   - Plugin system
   - Async I/O (unless performance issues)
   - Support AVIF format (requires additional dependencies)

## Completed Updates

### New Commands Added:

1. **webp** - Enhanced with quality (-q) and lossless (-l) options
2. **png** - Convert images to PNG format
3. **jpeg** - Convert images to JPEG format with quality control
4. **resize** - Resize images with aspect ratio preservation

### Features Implemented:

- Quality control for lossy formats (WebP, JPEG)
- Lossless compression option for WebP
- Progress bars for batch operations (can be disabled with --no-progress)
- Image resizing with configurable width/height
- Aspect ratio preservation during resize
- Automatic output directory creation

## Migration Path

1. Keep current API stable
2. Add new features behind feature flags
3. Deprecate old functionality gracefully
4. Provide migration guide for breaking changes

## Conclusion

The project is already well-structured and uses modern Rust practices. The main areas for improvement are:

- Adding more image format support (especially AVIF)
- Providing more control over compression settings
- Adding tests and documentation
- Improving user experience with progress indicators and better errors

The current dependency versions are appropriate and don't need immediate updates.
