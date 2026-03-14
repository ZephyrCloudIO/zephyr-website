import { defineConfig } from '@rspress/core';
import { pluginSitemap } from '@rspress/plugin-sitemap';
import path from 'node:path';

const siteUrl = 'https://zephyr-cloud.io';

export default defineConfig({
  root: 'docs',
  title: 'Zephyr Cloud',
  description: 'The fastest way to go from Idea to Production',
  icon: '/favicon.ico',
  route: {
    cleanUrls: true,
  },
  head: [
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { property: 'og:site_name', content: 'Zephyr Cloud' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:image', content: `${siteUrl}/images/og/default-1200x630.png` }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:image', content: `${siteUrl}/images/og/default-1200x630.png` }],
  ],
  builderConfig: {
    resolve: {
      alias: {
        '@': path.join(__dirname, 'src'),
        '@tanstack/react-router': path.join(__dirname, 'src/router-shim.tsx'),
      },
    },
  },
  plugins: [
    pluginSitemap({
      siteUrl,
      defaultChangeFreq: 'weekly',
      defaultPriority: '0.6',
    }),
  ],
});
