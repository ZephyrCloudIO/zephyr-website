#!/usr/bin/env node

import path from 'node:path';
import { createLanderFromTemplate } from './landers.js';

const slug = process.argv[2];

if (!slug) {
  console.error('Usage: pnpm create-lander <slug>');
  process.exit(1);
}

try {
  const createdPath = await createLanderFromTemplate(slug);
  console.log(`Created lander at ${path.relative(process.cwd(), createdPath)}`);
  console.log(`Enable with ZE_PUBLIC_ENABLED_LANDERS=${slug}`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(message);
  process.exit(1);
}
