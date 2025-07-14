/// This module provides functionality for converting images to different formats.
pub mod webp;
/// PNG image encoding functionality.
pub mod png;
/// JPEG image encoding functionality.
pub mod jpeg;

use crate::{
    converter::{webp::encode_webp, png::encode_png, jpeg::encode_jpeg},
    format::ImageFormat,
    options::ConversionOptions,
    utils::is_supported,
    Error,
};
use image::{DynamicImage, io::Reader, imageops::FilterType};
use indicatif::{ProgressBar, ProgressStyle, ParallelProgressIterator};
use rayon::prelude::*;
use std::{
    fs,
    path::{Path, PathBuf},
};

/// Processes and encodes images in a given directory to the specified image format.
pub fn convert_images(
    pattern: &str,
    output: &Option<String>,
    options: &ConversionOptions,
) -> Result<(), Error> {
    let paths: Vec<PathBuf> = glob::glob(pattern)?
        .filter_map(|entry| entry.ok())
        .collect();

    if options.show_progress {
        let pb = ProgressBar::new(paths.len() as u64);
        pb.set_style(
            ProgressStyle::default_bar()
                .template("{spinner:.green} [{elapsed_precise}] [{wide_bar:.cyan/blue}] {pos}/{len} ({eta})")
                .unwrap()
                .progress_chars("#>-"),
        );

        paths
            .par_iter()
            .progress_with(pb)
            .filter(|path| is_supported(path, options))
            .try_for_each(|path| convert_image(path, output, options))?;
    } else {
        paths
            .par_iter()
            .filter(|path| is_supported(path, options))
            .try_for_each(|path| convert_image(path, output, options))?;
    }

    Ok(())
}

/// Encodes an image to the specified image format and saves it to the specified output directory.
fn convert_image(
    input_path: &Path,
    output_dir: &Option<String>,
    options: &ConversionOptions,
) -> Result<(), Error> {
    // Read the file to check its size
    let file_size = fs::metadata(input_path)?.len();
    if file_size > 50_000_000 { // 50MB
        eprintln!("Warning: Large file detected ({:.2} MB): {}", 
                  file_size as f64 / 1_048_576.0, 
                  input_path.display());
    }
    
    let image_reader = Reader::open(input_path)
        .map_err(|e| Error::from_string(format!("Failed to open {}: {}", input_path.display(), e)))?;
    
    // Set memory limits for decoding
    let mut image_reader = image_reader;
    image_reader.limits(image::io::Limits::default());
    
    let mut image = image_reader.decode()
        .map_err(|e| Error::from_string(format!("Failed to decode {}: {}", input_path.display(), e)))?;

    // Apply resizing if requested
    if let Some(resize_opts) = &options.resize {
        image = resize_image(image, resize_opts)?;
    }

    let image_data = match &options.format {
        ImageFormat::Webp => encode_webp(&image, options.quality, options.lossless)?,
        ImageFormat::Png => encode_png(&image)?,
        ImageFormat::Jpeg => encode_jpeg(&image, options.quality.unwrap_or(85))?,
        _ => return Err(Error::from_string(format!("Unsupported output format: {:?}", options.format))),
    };

    let ext = options.format.extension();
    let output_path = if let Some(output_dir) = output_dir {
        let output_dir_path = Path::new(&output_dir);
        if !output_dir_path.exists() {
            fs::create_dir_all(output_dir_path)?;
        }
        output_dir_path
            .join(input_path.file_stem().unwrap())
            .with_extension(ext)
    } else {
        input_path.with_extension(ext)
    };

    fs::write(output_path.clone(), image_data)?;
    if !options.show_progress {
        println!("Generated: {}", output_path.display());
    }

    Ok(())
}

/// Resize an image according to the given options
fn resize_image(
    image: DynamicImage,
    options: &crate::options::ResizeOptions,
) -> Result<DynamicImage, Error> {
    let (orig_width, orig_height) = (image.width(), image.height());
    
    let (new_width, new_height) = match (options.width, options.height, options.preserve_aspect_ratio) {
        (Some(w), Some(h), false) => (w, h),
        (Some(w), Some(h), true) => {
            let ratio = (w as f32 / orig_width as f32).min(h as f32 / orig_height as f32);
            ((orig_width as f32 * ratio) as u32, (orig_height as f32 * ratio) as u32)
        }
        (Some(w), None, _) => {
            let ratio = w as f32 / orig_width as f32;
            (w, (orig_height as f32 * ratio) as u32)
        }
        (None, Some(h), _) => {
            let ratio = h as f32 / orig_height as f32;
            ((orig_width as f32 * ratio) as u32, h)
        }
        (None, None, _) => return Ok(image),
    };

    Ok(image.resize_exact(new_width, new_height, FilterType::Lanczos3))
}
