import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withZephyr } from 'zephyr-rsbuild-plugin';
import pages from './pages.json';

const root = path.dirname(fileURLToPath(import.meta.url));
const pageEntries = Object.fromEntries(pages.map((page) => [`${page.path}/index`, page]));
const leadForm = readFileSync(path.join(root, 'partials/lead-form.html'), 'utf8');
const federation = {
  name: 'campaigns',
  filename: 'remoteEntry.js',
  exposes: {
    './pages': './federated-pages.mjs',
    './capture': './capture.mjs',
  },
  dts: false,
};

export default defineConfig({
  root,
  source: {
    assetsInclude: /\?raw$/,
  },
  tools: {
    rspack: { module: { rules: [{ resourceQuery: /raw/, type: 'asset/source' }] } },
  },
  environments: {
    web: {
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
    },
    server: {
      source: { entry: { remote: { import: './federated-pages.mjs', html: false } } },
      output: { target: 'node', distPath: { root: 'dist/server' } },
      html: { inject: false },
      server: { publicDir: false },
    },
  },
  output: {
    assetPrefix: process.env.ZE_DEPLOY === 'true' ? 'auto' : 'http://localhost:4262/',
    sourceMap: { js: false, css: false },
  },
  server: { port: 4262, htmlFallback: false, headers: { 'Access-Control-Allow-Origin': '*' } },
  plugins: [
    pluginModuleFederation(
      {
        ...federation,
        manifest: {
          additionalData({ stats }) {
            stats.metaData.ssrRemoteEntry = { path: 'server/', name: 'remoteEntry.js', type: 'commonjs-module' };
            return stats;
          },
        },
      },
      { target: 'web', environment: 'web' },
    ),
    pluginModuleFederation({ ...federation, manifest: false }, { target: 'node', environment: 'server' }),
    ...(process.env.ZE_DEPLOY === 'true' ? [withZephyr({ snapshotType: 'csr' })] : []),
  ],
});
