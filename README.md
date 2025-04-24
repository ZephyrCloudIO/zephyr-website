# Modern.js App

## Setup

Install the dependencies:

```bash
pnpm install
```

## Get Started

Start the dev server:

```bash
pnpm dev
```

Enable optional features or add a new entry:

```bash
pnpm new
```

Build the app for production:

```bash
pnpm build
```

Preview the production build locally:

```bash
pnpm serve
```

For more information, see the [Modern.js documentation](https://modernjs.dev/en).

# zephyr-website

https://zephyr-cloud.io

## Helper command

Convert a png file to webp [Source](https://stackoverflow.com/questions/68987106/how-to-make-ffmpeg-convert-a-png-sequence-into-a-webp-sequence-instead-of-makin):
```
ffmpeg -i in/%8d.png -c:v libwebp in/%8d.webp
# example
ffmpeg -i runtime-ota.png -c:v libwebp runtime-ota.webp
```
