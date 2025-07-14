use crate::Error;
use image::{DynamicImage, codecs::jpeg::JpegEncoder};
use std::io::Cursor;

/// Encodes a `DynamicImage` to bytes of JPEG format
pub fn encode_jpeg(image: &DynamicImage, quality: u8) -> Result<Vec<u8>, Error> {
    let mut buffer = Vec::new();
    let mut cursor = Cursor::new(&mut buffer);
    
    let encoder = JpegEncoder::new_with_quality(&mut cursor, quality);
    
    image
        .write_with_encoder(encoder)
        .map_err(|e| Error::from_string(e.to_string()))?;
    
    Ok(buffer)
}