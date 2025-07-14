use crate::Error;
use image::{DynamicImage, ImageFormat};
use std::io::Cursor;

/// Encodes a `DynamicImage` to bytes of PNG format
pub fn encode_png(image: &DynamicImage) -> Result<Vec<u8>, Error> {
    let mut buffer = Vec::new();
    let mut cursor = Cursor::new(&mut buffer);
    
    image
        .write_to(&mut cursor, ImageFormat::Png)
        .map_err(|e| Error::from_string(e.to_string()))?;
    
    Ok(buffer)
}