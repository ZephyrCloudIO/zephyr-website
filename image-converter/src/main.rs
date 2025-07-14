use clap::Parser;
use imgc::{
    cli::{CliArgs, Command},
    converter::convert_images,
    format::ImageFormat,
    options::{ConversionOptions, ResizeOptions},
    utils::remove_files,
    Error,
};

fn main() -> Result<(), Error> {
    let args = CliArgs::parse();
    match args.command {
        Command::Webp { pattern, output, quality, lossless, no_progress, recompress } => {
            let options = ConversionOptions::new(ImageFormat::Webp)
                .with_quality(quality)
                .with_lossless(lossless)
                .with_progress(!no_progress)
                .with_allow_same_format(recompress);
            convert_images(&pattern, &output, &options)?
        },
        Command::Png { pattern, output, no_progress } => {
            let options = ConversionOptions::new(ImageFormat::Png)
                .with_progress(!no_progress);
            convert_images(&pattern, &output, &options)?
        },
        Command::Jpeg { pattern, output, quality, no_progress } => {
            let options = ConversionOptions::new(ImageFormat::Jpeg)
                .with_quality(quality)
                .with_progress(!no_progress);
            convert_images(&pattern, &output, &options)?
        },
        Command::Resize { pattern, output, width, height, preserve_aspect_ratio, no_progress } => {
            let resize_opts = ResizeOptions {
                width,
                height,
                preserve_aspect_ratio,
            };
            // Use WebP format for resized images to preserve transparency
            let options = ConversionOptions::new(ImageFormat::Webp)
                .with_resize(resize_opts)
                .with_quality(90)
                .with_progress(!no_progress)
                .with_allow_same_format(true); // Allow resizing WebP files
            convert_images(&pattern, &output, &options)?
        },
        Command::Clean { pattern } => remove_files(&pattern)?,
    }
    Ok(())
}
