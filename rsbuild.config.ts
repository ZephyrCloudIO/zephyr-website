import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { tanstackRouter } from '@tanstack/router-plugin/rspack';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import remarkFrontmatter from 'remark-frontmatter';
import remarkGfm from 'remark-gfm';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import { withZephyr } from 'zephyr-rspack-plugin';
import { sitemapGeneratorPlugin } from './src/plugins/sitemap-generator';

const zephyrRsbuildPlugin = () => ({
  name: 'zephyr-rsbuild-plugin',
  setup(api: { modifyRspackConfig: (config: any) => Promise<void> }) {
    api.modifyRspackConfig(async (config: any) => {
      // this is important to avoid multiple zephyr build triggers
      config.name === 'web' && (await withZephyr()(config));
    });
  },
});

export default defineConfig({
  output: {
    copy: [
      { from: 'public/favicon.ico', to: './favicon.ico' },
      { from: 'public/llms.txt', to: './llms.txt' },
      { from: 'public/opengraph/zephyr-ai.jpg', to: './opengraph/zephyr-ai.jpg' },
      { from: 'public/robots.txt', to: './robots.txt' },
    ],
  },
  html: {
    title: 'Zephyr Cloud',
    template: './index.html',
    meta: {
      description: {
        name: 'description',
        content: 'Zephyr is the AI Super App where humans and AI do real work.',
      },
      'og:type': {
        property: 'og:type',
        content: 'website',
      },
      'og:site_name': {
        property: 'og:site_name',
        content: 'Zephyr Cloud',
      },
      'og:title': {
        property: 'og:title',
        content: 'Zephyr AI Super App',
      },
      'og:description': {
        property: 'og:description',
        content: 'Zephyr is the AI Super App where humans and AI do real work.',
      },
      'og:image': {
        property: 'og:image',
        content: '/opengraph/zephyr-ai.jpg?v=2',
      },
      'og:image:alt': {
        property: 'og:image:alt',
        content: 'Zephyr AI product preview',
      },
      'og:image:type': {
        property: 'og:image:type',
        content: 'image/jpeg',
      },
      'og:image:width': {
        property: 'og:image:width',
        content: '1200',
      },
      'og:image:height': {
        property: 'og:image:height',
        content: '630',
      },
      'twitter:card': {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      'twitter:title': {
        name: 'twitter:title',
        content: 'Zephyr AI Super App',
      },
      'twitter:description': {
        name: 'twitter:description',
        content: 'Zephyr is the AI Super App where humans and AI do real work.',
      },
      'twitter:image': {
        name: 'twitter:image',
        content: '/opengraph/zephyr-ai.jpg?v=2',
      },
    },
  },
  resolve: {
    alias: {
      '@/*': './src/*',
    },
  },
  plugins: [pluginReact(), sitemapGeneratorPlugin(), zephyrRsbuildPlugin()],
  tools: {
    rspack: {
      plugins: [
        tanstackRouter({
          target: 'react',
          autoCodeSplitting: false,
        }),
      ],
      module: {
        rules: [
          {
            test: /\.mdx?$/,
            use: [
              {
                loader: '@mdx-js/loader',
                options: {
                  providerImportSource: '@mdx-js/react',
                  remarkPlugins: [remarkGfm, remarkFrontmatter, [remarkMdxFrontmatter, { name: 'metadata' }]],
                  rehypePlugins: [rehypeHighlight, rehypeSlug, rehypeAutolinkHeadings],
                },
              },
            ],
          },
        ],
      },
    },
    postcss: {
      postcssOptions: (context) => {
        return context.resourcePath.endsWith('.css') ? { plugins: [require('@tailwindcss/postcss')] } : {};
      },
    },
  },
});
