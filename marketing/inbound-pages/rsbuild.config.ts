import { defineConfig } from '@rsbuild/core';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withZephyr } from 'zephyr-rsbuild-plugin';
import pages from './pages.json';

const root = path.dirname(fileURLToPath(import.meta.url));
const pageEntries = Object.fromEntries(pages.map((page) => [`${page.path}/index`, page]));
const leadForm = readFileSync(path.join(root, 'partials/lead-form.html'), 'utf8');

export default defineConfig({
  root,
  source: {
    entry: Object.fromEntries(Object.entries(pageEntries).map(([entry, page]) => [entry, page.entry])),
  },
  html: {
    template: ({ entryName }) => path.join(root, pageEntries[entryName].html),
    templateParameters: (defaults, { entryName }) => ({
      ...defaults,
      pageId: pageEntries[entryName].id,
      leadForm,
    }),
  },
  output: {
    sourceMap: { js: false, css: false },
  },
  server: { port: 4262, htmlFallback: false },
  plugins: process.env.ZE_DEPLOY === 'true' ? [withZephyr()] : [],
});
