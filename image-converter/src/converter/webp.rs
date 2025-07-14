use crate::Error;
use image::DynamicImage;
use webp::{Encoder, WebPMemory};

/// Encodes a `DynamicImage` to bytes of webp format
pub fn encode_webp(image: &DynamicImage, quality: Option<u8>, lossless: bool) -> Result<Vec<u8>, Error> {
    // For very large images, consider resizing first
    let (width, height) = (image.width(), image.height());
    if width * height > 50_000_000 { // ~50 megapixels
        eprintln!("Warning: Very large image ({}x{} = {} megapixels)", 
                  width, height, (width * height) / 1_000_000);
    }
    
    // Convert to RGBA8 to handle grayscale and other formats
    let rgba_image = image.to_rgba8();
    let converted = DynamicImage::ImageRgba8(rgba_image);
    
    let encoder = Encoder::from_image(&converted)
        .map_err(|e| Error::from_string(format!("WebP encoder error: {}", e)))?;
    
    let webp_data: WebPMemory = if lossless {
        encoder.encode_lossless()
    } else {
        let quality = quality.unwrap_or(80) as f32;
        encoder.encode(quality)
    };
    
    Ok(webp_data.to_vec())
}
