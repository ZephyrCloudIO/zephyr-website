import React, { useState } from 'react';
import './code-editor.css';

interface CodeEditorProps {
  framework: string;
  highlightedLines?: number[]; // Array of line numbers to highlight
}

const configs = {
  'React + Rspack': `import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "@rspack/cli";
import { rspack } from "@rspack/core";
import RefreshPlugin from "@rspack/plugin-react-refresh";
import { withZephyr } from "zephyr-rspack-plugin";

const __dirname = dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV === "development";

export default withZephyr()({
  context: __dirname,
  entry: {
    main: "./src/main.jsx"
  },
});`,

  'React + Webpack + Module Federation': `const HtmlWebpackPlugin = require('html-webpack-plugin');
const { withZephyr } = require("zephyr-webpack-plugin");
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = withZephyr()({
entry: './src/index',
mode: 'development',
 devServer: {
  static: path.join(__dirname, 'dist'),
  port: 3002,
 },
 output: {
  publicPath: 'auto',
 },
 module: {
  rules: [
   {
    test: /\.jsx?$/,
    loader: 'babel-loader',
    exclude: /node_modules/,
    options: {
     presets: ['@babel/preset-react'],
    },
   },
  ],
 },`,

  'React + Vite': `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { withZephyr } from 'vite-plugin-zephyr';

export default defineConfig({
  plugins: [react(), withZephyr()],
  build: {
    target: 'chrome89',
  },
});`,

'Qwik + Vite': `import {defineConfig, type UserConfig} from "vite";
import {qwikVite} from "@builder.io/qwik/optimizer";
import {qwikCity} from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import {withZephyrPartial} from 'vite-plugin-zephyr';

import pkg from "./package.json";

const {dependencies = {}, devDependencies = {}} = pkg as any as {
  dependencies: Record<string, string>;
  devDependencies: Record<string, string>;
  [key: string]: unknown;
};

export default defineConfig(({command, mode}): UserConfig => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths(),
      withZephyrPartial(),
    ],
    optimizeDeps: {
      exclude: [],
    },
    ssr:
      command === "build" && mode === "production"
        ? {
          noExternal: Object.keys(devDependencies),
          external: Object.keys(dependencies),
        }
        : undefined,
    server: {
      headers: {
        "Cache-Control": "public, max-age=0",
      },
    },
    preview: {
      headers: {
        "Cache-Control": "public, max-age=600",
      },
    },
  };
});`
};

const CodeEditor: React.FC<CodeEditorProps> = ({ framework, highlightedLines = [] }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(configs[framework as keyof typeof configs]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderLine = (line: string, index: number) => {
    const leadingSpaces = line.match(/^\s*/)![0].length;
    const indentation = '\u00A0'.repeat(leadingSpaces);
    const isHighlighted = highlightedLines.includes(index + 1);

    return (
      <div
        key={index}
        className={`flex transition-colors duration-200 ${
          isHighlighted ? 'bg-gray-800/50' : ''
        }`}
      >
        <div className={`w-12 flex-shrink-0 text-right pr-4 select-none ${
          isHighlighted ? 'text-gray-300' : 'text-gray-600'
        }`}>
          {index + 1}
        </div>
        <div className={`flex-1 ${line.trim() === '' ? 'h-6' : ''} ${
          isHighlighted ? 'text-gray-100' : 'opacity-60'
        }`}>
          {indentation}
          {line.trimLeft().split(/(["'].*?["'])/).map((part, i) => {
            if (i % 2 === 1) {
              return <span key={i} className="text-[#7afcbd]">{part}</span>;
            }
            return <span key={i}>
              {part.split(/\b/).map((word, j) => {
                if (word === 'import' || word === 'export' || word === 'default' || word === 'const') {
                  return <span key={j} className="text-[#7afcbd]">{word}</span>;
                }
                if (word === 'require') {
                  return <span key={j} className="text-[#DCDCAA]">{word}</span>;
                }
                return <span key={j} className="text-[#9CDCFE]">{word}</span>;
              })}
            </span>;
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-800 bg-[#1E1E1E]">
      <div className="flex items-center px-4 py-2 bg-[#252526] border-b border-[#404040]">
        <div className="flex space-x-2">
          <div className="w-4 h-4 rounded-full border-2 border-solid border-gray-600/50 shadow-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-solid border-gray-600/50 shadow-sm" />
          <div className="w-4 h-4 rounded-full border-2 border-solid border-gray-600/50 shadow-sm" />
        </div>
        <div className="flex-1 text-center text-sm text-gray-400">
          .rspack.config.js
        </div>
        <button
          onClick={handleCopy}
          className="text-gray-400 hover:text-white transition-colors"
          aria-label='Copy example'
        >
          {copied ? (
           <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500 animate-fade-in"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>
      <div className="code-editor-container p-4 font-mono text-sm overflow-x-auto whitespace-pre">
        {configs[framework as keyof typeof configs]
          .split('\n')
          .map((line, index) => renderLine(line, index))}
      </div>
    </div>
  );
};

export default CodeEditor;
