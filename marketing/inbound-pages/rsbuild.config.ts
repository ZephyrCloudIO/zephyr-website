import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { withZephyr } from 'zephyr-rsbuild-plugin';
import { campaignRoutes } from '../../campaigns';

const root = path.dirname(fileURLToPath(import.meta.url));
const pageEntries = Object.fromEntries(
  campaignRoutes.map((page, index) => [`${String(index + 1).padStart(2, '0')}-${page.slug}/index`, page]),
);
const federation = {
  name: 'campaigns',
  filename: 'remoteEntry.js',
  exposes: Object.fromEntries(campaignRoutes.map(({ id }) => [`./${id}`, `./pages/${id}.tsx`])),
  shared: {
    react: { singleton: true, requiredVersion: false as const },
    'react/': { singleton: true, requiredVersion: false as const },
    'react-dom': { singleton: true, requiredVersion: false as const },
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
        entry: Object.fromEntries(Object.keys(pageEntries).map((entry) => [entry, './standalone.tsx'])),
      },
      html: {
        template: path.join(root, 'standalone.html'),
        templateParameters: (defaults, { entryName }) => ({
          ...defaults,
          pageId: pageEntries[entryName].id,
          pageTitle: pageEntries[entryName].title,
          pageDescription: pageEntries[entryName].description,
        }),
      },
    },
    server: {
      source: { entry: { remote: { import: './components/CampaignFrame.tsx', html: false } } },
      output: { target: 'node', assetPrefix: 'auto', distPath: { root: 'dist/server' } },
      html: { inject: false },
      server: { publicDir: false },
    },
  },
  output: {
    assetPrefix: process.env.CAMPAIGN_ASSET_ORIGIN || 'auto',
    sourceMap: { js: false, css: false },
  },
  server: { port: 4262, htmlFallback: false, headers: { 'Access-Control-Allow-Origin': '*' } },
  plugins: [
    pluginReact(),
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
