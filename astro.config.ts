import cloudflare from '@astrojs/cloudflare';
import react from '@astrojs/react';
import { d1, r2 } from '@emdash-cms/cloudflare';
import { defineConfig } from 'astro/config';
import emdash from 'emdash/astro';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const sourceRoot = fileURLToPath(new URL('./src/', import.meta.url));

export default defineConfig({
  site: 'https://zephyr-cloud.io',
  output: 'server',
  publicDir: './docs/public',
  adapter: cloudflare({ imageService: 'passthrough' }),
  integrations: [
    react(),
    emdash({
      database: d1({ binding: 'DB', session: 'auto' }),
      storage: r2({ binding: 'MEDIA' }),
    }),
  ],
  devToolbar: { enabled: false },
  vite: {
    resolve: {
      alias: {
        '@': sourceRoot,
      },
    },
    plugins: [
      {
        name: 'zephyr-react-compatibility',
        enforce: 'pre',
        async resolveId(source, importer) {
          if (source === '@tanstack/react-router' && importer?.startsWith(sourceRoot)) {
            return path.join(sourceRoot, 'router-shim.tsx');
          }
          if (
            importer?.startsWith(sourceRoot) &&
            /\.[jt]sx?$/.test(importer) &&
            /\.(png|jpe?g|webp|gif|svg)$/.test(source)
          ) {
            return this.resolve(`${source}?url`, importer, { skipSelf: true });
          }
        },
      },
    ],
    envPrefix: ['PUBLIC_', 'ZE_PUBLIC_'],
  },
});
