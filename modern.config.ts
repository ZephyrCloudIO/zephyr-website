import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { bffPlugin } from '@modern-js/plugin-bff';
import { expressPlugin } from '@modern-js/plugin-express';
import { withZephyr } from 'zephyr-modernjs-plugin';
import { pluginMdx } from '@rsbuild/plugin-mdx';
import { pluginImageCompress } from '@rsbuild/plugin-image-compress';

const tailwindConfig = require('./tailwind.config');

// https://modernjs.dev/en/configure/app/usage
export default defineConfig({
  tools: {
    tailwindcss: tailwindConfig,
  },
  runtime: {
    router: true,
    state: true,
  },
  html: {
    outputStructure: 'flat',
    title: 'Zephyr Cloud | The only sane way to do micro-frontends',
    favicon: './config/public/favicon.svg',
    appIcon: './config/public/favicon.svg',
  },
  source: {
    mainEntryName: 'index',
  },
  server: {
    port: 3000,
  },
  output: {
    distPath: {
      html: './',
    },
  },
  builderPlugins: [pluginImageCompress(), pluginMdx()],
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    tailwindcssPlugin(),
    bffPlugin(),
    expressPlugin(),
     //withZephyr()
  ],
});
