import { appTools, defineConfig } from '@modern-js/app-tools';
import { tailwindcssPlugin } from '@modern-js/plugin-tailwindcss';
import { bffPlugin } from '@modern-js/plugin-bff';
import { expressPlugin } from '@modern-js/plugin-express';
import { withZephyr } from 'zephyr-modernjs-plugin';

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
    appIcon: './config/public/favicon.svg'
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
  plugins: [
    appTools({
      bundler: 'rspack',
    }),
    tailwindcssPlugin(),
    bffPlugin(),
    expressPlugin(),
    //withZephyr(),
  ],
});
