# Image Converter (imgc)

Welcome to imgc!

This tool is a powerful command-line utility built with Rust for converting, optimizing, and resizing images. Supporting multiple output formats including WebP, PNG, and JPEG, imgc simplifies batch image processing with high performance and flexibility.

## Key Features

- **Multiple Format Support**: Convert images to WebP, PNG, or JPEG formats
- **Quality Control**: Fine-tune compression quality for optimal file size vs. quality balance
- **Lossless Compression**: Support for lossless WebP encoding
- **Image Resizing**: Resize images with automatic aspect ratio preservation
- **Progress Indicators**: Visual progress bars for batch operations
- **Parallel Processing**: Lightning-fast conversions using `rayon` for parallel processing
- **Custom Output**: Specify output directories for organized file management
- **Glob Pattern Support**: Process multiple files with flexible pattern matching

## Getting Started

### Prerequisites

- Ensure you have the latest stable version of `Rust` and `Cargo` installed on your system.

### Installation Guide

Since imgc is not yet available on crates.io, you'll need to clone the repository to get started:

1.  Clone the repository:

    ```bash
    git clone https://github.com/tduyng/imgc-rs.git
    cd imgc-rs
    ```

2.  Build the project:

    ```bash
    cargo build --release
    ```

3.  Install locally

    ```bash
    cargo install --path .
    ```

4.  Install from Github

        If you want to test this tool without cloning the repository, you can install it directly from git:

        ```bash
        cargo install --git https://github.com/tduyng/imgc-rs.git
        ```

    Once installed, you can start using imgc with the command `imgc`.

5.  Uninstall

    ```bash
    cargo uninstall imgc
    ```

## How to Use imgc

### Basic Usage

Imgc uses glob patterns for flexible file matching:

#### Convert to WebP

```bash
# Basic conversion
imgc webp "images/**/*.png"

# With quality control (0-100, default: 80)
imgc webp "images/**/*.jpg" -q 90

# Lossless compression
imgc webp "images/**/*.png" --lossless

# Output to specific directory
imgc webp "images/**/*" -o converted/

# Disable progress bar
imgc webp "images/**/*" --no-progress
```

#### Convert to PNG

```bash
# Convert any format to PNG
imgc png "images/**/*.jpg"
imgc png "images/**/*.webp" -o png_output/
```

#### Convert to JPEG

```bash
# Convert with default quality (80)
imgc jpeg "images/**/*.png"

# High quality JPEG
imgc jpeg "images/**/*.png" -q 95

# Low quality for thumbnails
imgc jpeg "images/**/*.png" -q 60 -o thumbnails/
```

#### Resize Images

```bash
# Resize to specific width (maintains aspect ratio)
imgc resize "images/**/*.jpg" -w 800

# Resize to specific height
imgc resize "images/**/*.jpg" -h 600

# Resize to exact dimensions (may distort)
imgc resize "images/**/*.jpg" -w 800 -h 600 --preserve-aspect-ratio false

# Resize and output to directory
imgc resize "images/**/*" -w 1920 -o resized/
```

### Cleaning up files

**Warning**: Use this command with caution.

```bash
imgc clean "examples/**/*.webp"
```

### Command Help

For detailed command usage, `--help` or `-h` will guide you through:

```bash
❯ imgc -h
A CLI for converting images to the WebP format written in Rust

Usage: imgc <COMMAND>

Commands:
  webp    Convert images to webp format
  png     Convert images to PNG format
  jpeg    Convert images to JPEG format
  resize  Resize images
  clean   Remove files matching a glob pattern
  help    Print this message or the help of the given subcommand(s)

Options:
  -h, --help     Print help
  -V, --version  Print version
```

For detailed help on any command:

```bash
imgc webp --help
imgc png --help
imgc jpeg --help
imgc resize --help
imgc clean --help
```

## Example Directory Structure

Given the following directory structure:

```bash
examples
├── 1.png
├── 1.webp
├── img1
│   ├── 2.png
│   ├── 2.webp
│   └── img11
│       ├── 3.jpg
│       └── 3.webp
├── img2
│   ├── 4.jpeg
│   └── 4.webp
```

Using imgc, you can convert all supported images to WebP, saving them either in a specified directory or alongside the original files.

Example of webp command:

![Webp command example](/docs/img/webp_cmd.webp)

Example of clean command:

![Clean command example](/docs/img/clean_cmd.webp)

## What's Next

- [ ] Testing
- [ ] Introduce advanced options for compression, quality, and resizing
- [ ] Expand support for additional conversion formats

## License

Choose between [MIT License](LICENCE_MIT) or [Apache License](LICENSE_APACHE) as per your preference.
