use crate::format::ImageFormat;

/// Options for image conversion
#[derive(Debug, Clone)]
pub struct ConversionOptions {
    /// The target image format
    pub format: ImageFormat,
    /// Quality setting (0-100) for lossy formats
    pub quality: Option<u8>,
    /// Whether to use lossless compression
    pub lossless: bool,
    /// Optional resize parameters
    pub resize: Option<ResizeOptions>,
    /// Whether to show progress bars during conversion
    pub show_progress: bool,
    /// Whether to allow reprocessing files that already have the target format
    pub allow_same_format: bool,
}

/// Options for image resizing
#[derive(Debug, Clone)]
pub struct ResizeOptions {
    /// Target width in pixels
    pub width: Option<u32>,
    /// Target height in pixels
    pub height: Option<u32>,
    /// Whether to maintain the original aspect ratio
    pub preserve_aspect_ratio: bool,
}

impl Default for ConversionOptions {
    fn default() -> Self {
        Self {
            format: ImageFormat::Webp,
            quality: Some(80),
            lossless: false,
            resize: None,
            show_progress: true,
            allow_same_format: false,
        }
    }
}

impl ConversionOptions {
    /// Create new conversion options with default settings
    pub fn new(format: ImageFormat) -> Self {
        Self {
            format,
            ..Default::default()
        }
    }

    /// Set the quality for lossy compression
    pub fn with_quality(mut self, quality: u8) -> Self {
        self.quality = Some(quality);
        self
    }

    /// Set whether to use lossless compression
    pub fn with_lossless(mut self, lossless: bool) -> Self {
        self.lossless = lossless;
        self
    }

    /// Set resize options
    pub fn with_resize(mut self, resize: ResizeOptions) -> Self {
        self.resize = Some(resize);
        self
    }

    /// Set whether to show progress bars
    pub fn with_progress(mut self, show_progress: bool) -> Self {
        self.show_progress = show_progress;
        self
    }

    /// Set whether to allow reprocessing files with the same format
    pub fn with_allow_same_format(mut self, allow_same_format: bool) -> Self {
        self.allow_same_format = allow_same_format;
        self
    }
}