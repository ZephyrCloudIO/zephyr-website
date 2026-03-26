import { cp, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const LANDERS_DIR = 'src/landers';
const LANDER_ENTRY_FILE = 'entry.tsx';
const TEMPLATE_DIR_NAME = '_template';
const LANDER_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const LANDER_PLACEHOLDER_REPLACEMENTS = {
  __LANDER_COMPONENT_NAME__: (slug) => toPascalCase(slug),
  __LANDER_SLUG__: (slug) => slug,
  __LANDER_TITLE__: (slug) => slugToTitle(slug),
};

function getLandersRoot(rootDir) {
  return path.join(rootDir, LANDERS_DIR);
}

function toPosixPath(value) {
  return value.split(path.sep).join(path.posix.sep);
}

function toPascalCase(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');
}

function slugToTitle(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

async function getSubdirectories(dir) {
  try {
    const entries = await readdir(dir, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== TEMPLATE_DIR_NAME)
      .map((entry) => entry.name)
      .sort();
  } catch {
    return [];
  }
}

export async function getLanderSlugs(rootDir = process.cwd()) {
  return getSubdirectories(getLandersRoot(rootDir));
}

export async function getLanderEntries(rootDir = process.cwd()) {
  const slugs = await getLanderSlugs(rootDir);

  return Object.fromEntries(
    slugs.map((slug) => [slug, `./${toPosixPath(path.join(LANDERS_DIR, slug, LANDER_ENTRY_FILE))}`]),
  );
}

export function assertValidLanderSlug(slug) {
  if (!LANDER_SLUG_PATTERN.test(slug)) {
    throw new Error('Invalid lander slug. Use lowercase letters, numbers, and hyphens only.');
  }
}

async function replaceTemplateTokens(dirPath, slug) {
  const entries = await readdir(dirPath, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        await replaceTemplateTokens(fullPath, slug);
        return;
      }

      const original = await readFile(fullPath, 'utf8');
      const updated = Object.entries(LANDER_PLACEHOLDER_REPLACEMENTS).reduce(
        (content, [token, replacer]) => content.replaceAll(token, replacer(slug)),
        original,
      );

      if (updated !== original) {
        await writeFile(fullPath, updated);
      }
    }),
  );
}

export async function createLanderFromTemplate(slug, rootDir = process.cwd()) {
  assertValidLanderSlug(slug);

  const landersRoot = getLandersRoot(rootDir);
  const templateDir = path.join(landersRoot, TEMPLATE_DIR_NAME);
  const targetDir = path.join(landersRoot, slug);

  await mkdir(landersRoot, { recursive: true });
  await cp(templateDir, targetDir, {
    recursive: true,
    errorOnExist: true,
    force: false,
  });

  await replaceTemplateTokens(targetDir, slug);

  return targetDir;
}
