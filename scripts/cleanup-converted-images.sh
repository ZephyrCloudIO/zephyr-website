#!/bin/bash

# Script to remove original images that have been converted to WebP
# Only removes files if the corresponding .webp file exists

echo "Cleaning up converted images..."

# Function to remove original if WebP exists
remove_if_webp_exists() {
    local original="$1"
    local webp="${original%.*}.webp"
    
    if [ -f "$webp" ]; then
        echo "Removing: $original (WebP exists: $webp)"
        rm -f "$original"
    else
        echo "Keeping: $original (No WebP found)"
    fi
}

# Authors
for file in src/images/authors/*.jpg; do
    [ -f "$file" ] && remove_if_webp_exists "$file"
done

# Blog images
find src/images/blog -name "*.png" -type f | while read file; do
    remove_if_webp_exists "$file"
done

# Community images
for ext in jpg jpeg png avif; do
    for file in src/images/community/*.$ext; do
        [ -f "$file" ] && remove_if_webp_exists "$file"
    done
done

# Company logos
for file in src/images/companies/*.png; do
    [ -f "$file" ] && remove_if_webp_exists "$file"
done

echo "Cleanup complete!"