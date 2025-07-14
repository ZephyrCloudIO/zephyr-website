use glob::glob;
use std::{fs, path::Path};

use crate::{options::ConversionOptions, Error};

/// Checks if the image format of the given path is supported, considering conversion options.
///
/// # Arguments
///
/// * `path` - The path to the image file.
/// * `options` - The conversion options including target format and allow_same_format flag.
///
/// # Returns
///
/// Returns `true` if the image format is supported and should be processed, `false` otherwise.
pub fn is_supported(path: &Path, options: &ConversionOptions) -> bool {
    // If we allow same format (e.g., for recompression or resizing), skip the format check
    if !options.allow_same_format {
        if let Some(extension) = path.extension() {
            if extension == options.format.extension() {
                return false;
            }
        }
    }

    match fs::read(path) {
        Ok(data) => image::guess_format(&data).is_ok(),
        Err(_) => false,
    }
}

/// Removes files that match the given pattern.
///
/// # Arguments
///
/// * `pattern` - The glob pattern to match files.
///
/// # Returns
///
/// Returns `Ok(())` if the files are successfully removed, or an `Error` if an error occurs.
pub fn remove_files(pattern: &str) -> Result<(), Error> {
    for entry in glob(pattern)? {
        let path = entry?;
        if path.is_file() {
            fs::remove_file(&path)?;
            println!("Deleted: {}", path.display());
        }
    }

    Ok(())
}
