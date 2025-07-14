use clap::{Parser, Subcommand};

/// Image converter CLI
#[derive(Parser, Debug)]
#[command(version, about, long_about = None)]
pub struct CliArgs {
    /// The command to execute.
    #[command(subcommand)]
    /// The available commands are `Webp` and `Clean`.
    pub command: Command,
}

/// Image converter actions
#[derive(Subcommand, Debug)]
pub enum Command {
    /// Convert images to webp format
    Webp {
        /// Glob pattern to match images to convert.
        /// Example: `images/**/*.png`
        pattern: String,

        /// (Optional) Output of processed images. Defaults to the same location as the original images.
        #[clap(short, long)]
        output: Option<String>,

        /// Quality of the WebP image (0-100). Default is 80.
        #[clap(short, long, default_value = "80", value_parser = clap::value_parser!(u8).range(0..=100))]
        quality: u8,

        /// Use lossless compression
        #[clap(short, long, default_value = "false")]
        lossless: bool,

        /// Disable progress bar
        #[clap(long, default_value = "false")]
        no_progress: bool,

        /// Allow recompressing existing WebP files
        #[clap(long, default_value = "false")]
        recompress: bool,
    },

    /// Convert images to PNG format
    Png {
        /// Glob pattern to match images to convert.
        pattern: String,

        /// (Optional) Output of processed images.
        #[clap(short, long)]
        output: Option<String>,

        /// Disable progress bar
        #[clap(long, default_value = "false")]
        no_progress: bool,
    },

    /// Convert images to JPEG format
    Jpeg {
        /// Glob pattern to match images to convert.
        pattern: String,

        /// (Optional) Output of processed images.
        #[clap(short, long)]
        output: Option<String>,

        /// Quality of the JPEG image (0-100). Default is 80.
        #[clap(short, long, default_value = "80", value_parser = clap::value_parser!(u8).range(0..=100))]
        quality: u8,

        /// Disable progress bar
        #[clap(long, default_value = "false")]
        no_progress: bool,
    },

    /// Resize images
    Resize {
        /// Glob pattern to match images to resize.
        pattern: String,

        /// Target width
        #[clap(short = 'w', long)]
        width: Option<u32>,

        /// Target height
        #[clap(short = 'h', long)]
        height: Option<u32>,

        /// (Optional) Output of processed images.
        #[clap(short, long)]
        output: Option<String>,

        /// Preserve aspect ratio (default: true)
        #[clap(long, default_value = "true")]
        preserve_aspect_ratio: bool,

        /// Disable progress bar
        #[clap(long, default_value = "false")]
        no_progress: bool,
    },

    /// Remove files matching a glob pattern
    Clean {
        /// Glob pattern to match files to remove.
        pattern: String,
    },
}
