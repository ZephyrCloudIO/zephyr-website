#!/usr/bin/env node

import { execSync } from 'child_process';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Examples to show usage
function showUsage() {
  console.log(`
Batch Image Converter - Examples

Convert all JPEGs to WebP:
  pnpm run batch-convert -- webp "src/images/**/*.jpg" -q 85

Convert all PNGs to WebP losslessly:
  pnpm run batch-convert -- webp "src/images/**/*.png" --lossless

Convert to JPEG with quality:
  pnpm run batch-convert -- jpeg "src/images/**/*.png" -q 90 -o output/

Resize all images:
  pnpm run batch-convert -- resize "src/images/**/*.jpg" -w 1920 -o resized/

Create thumbnails:
  pnpm run batch-convert -- resize "src/images/**/*.{jpg,png}" -w 300 -h 300 -o thumbnails/
`);
}

// Get command and arguments
const args = process.argv.slice(2);

// Remove the -- separator if present
const dashIndex = args.indexOf('--');
let cleanArgs = args;
if (dashIndex !== -1) {
  cleanArgs = args.slice(dashIndex + 1);
}

// Check if we have at least a command
if (cleanArgs.length < 2) {
  showUsage();
  process.exit(1);
}

const command = cleanArgs[0];
const commandArgs = cleanArgs.slice(1);

// Build the full command
const imgcPath = join(__dirname, '..', 'image-converter', 'target', 'release', 'imgc');
const fullCommand = `${imgcPath} ${command} ${commandArgs.join(' ')}`;

try {
  execSync(fullCommand, { stdio: 'inherit' });
} catch (error) {
  if (error.signal !== 'SIGINT') {
    console.error('\nConversion failed. Run with --help for usage examples.');
  }
  process.exit(error.status || 1);
}
