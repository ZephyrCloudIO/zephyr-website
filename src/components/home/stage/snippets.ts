// Real integration shapes, taken from zephyr-packages examples/ and plugin READMEs.
// `add` marks the lines Zephyr contributes.

export interface ConfigSnippet {
  tool: string;
  /** Tab label when the full name is too long for the switcher. */
  short?: string;
  file: string;
  lines: { code: string; add?: boolean }[];
}

export const CONFIG_SNIPPETS: ConfigSnippet[] = [
  {
    tool: 'Vite',
    file: 'vite.config.ts',
    lines: [
      { code: "import react from '@vitejs/plugin-react';" },
      { code: "import { defineConfig } from 'vite';" },
      { code: "import { withZephyr } from 'vite-plugin-zephyr';", add: true },
      { code: '' },
      { code: 'export default defineConfig({' },
      { code: '  plugins: [react(), withZephyr()],', add: true },
      { code: '});' },
    ],
  },
  {
    tool: 'Rsbuild',
    file: 'rsbuild.config.ts',
    lines: [
      { code: "import { defineConfig } from '@rsbuild/core';" },
      { code: "import { pluginReact } from '@rsbuild/plugin-react';" },
      { code: "import { withZephyr } from 'zephyr-rsbuild-plugin';", add: true },
      { code: '' },
      { code: 'export default defineConfig({' },
      { code: '  plugins: [pluginReact(), withZephyr()],', add: true },
      { code: '});' },
    ],
  },
  {
    tool: 'Rspack',
    file: 'rspack.config.js',
    lines: [
      { code: "const { withZephyr } = require('zephyr-rspack-plugin');", add: true },
      { code: '' },
      { code: 'const config = {' },
      { code: "  entry: './src/index.js'," },
      { code: '};' },
      { code: '' },
      { code: 'module.exports = withZephyr()(config);', add: true },
    ],
  },
  {
    tool: 'webpack',
    file: 'webpack.config.js',
    lines: [
      { code: "const { withZephyr } = require('zephyr-webpack-plugin');", add: true },
      { code: '' },
      { code: 'module.exports = (env, argv) => {' },
      { code: '  return withZephyr()({', add: true },
      { code: "    entry: './src/index.js'," },
      { code: '  });' },
      { code: '};' },
    ],
  },
  {
    tool: 'Rollup',
    file: 'rollup.config.cjs',
    lines: [
      { code: "const { withZephyr } = require('rollup-plugin-zephyr');", add: true },
      { code: '' },
      { code: 'module.exports = {' },
      { code: "  input: 'src/index.js'," },
      { code: "  output: { file: 'dist/index.js', format: 'esm' }," },
      { code: '  plugins: [withZephyr()],', add: true },
      { code: '};' },
    ],
  },
  {
    tool: 'Parcel',
    file: '.parcelrc',
    lines: [
      { code: '{' },
      { code: '  "extends": "@parcel/config-default",' },
      { code: '  "reporters": [' },
      { code: '    "parcel-reporter-zephyr"', add: true },
      { code: '  ]' },
      { code: '}' },
    ],
  },
  {
    tool: 'Astro',
    file: 'astro.config.mjs',
    lines: [
      { code: "import { defineConfig } from 'astro/config';" },
      { code: "import { withZephyr } from 'zephyr-astro-integration';", add: true },
      { code: '' },
      { code: 'export default defineConfig({' },
      { code: '  integrations: [withZephyr()],', add: true },
      { code: '});' },
    ],
  },
  {
    tool: 'Nuxt',
    file: 'nuxt.config.ts',
    lines: [
      { code: 'export default defineNuxtConfig({' },
      { code: "  modules: ['zephyr-nuxt-module'],", add: true },
      { code: '});' },
    ],
  },
  {
    tool: 'TanStack Start',
    short: 'TanStack',
    file: 'vite.config.ts',
    lines: [
      { code: "import { tanstackStart } from '@tanstack/react-start/plugin/vite';" },
      { code: "import { defineConfig } from 'vite';" },
      { code: "import { withZephyr } from 'vite-plugin-tanstack-start-zephyr';", add: true },
      { code: '' },
      { code: 'export default defineConfig({' },
      { code: '  plugins: [tanstackStart(), withZephyr()],', add: true },
      { code: '});' },
    ],
  },
];
