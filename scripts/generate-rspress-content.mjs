import { access, copyFile, mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { inspect } from 'node:util';
import YAML from 'yaml';

const ROOT = process.cwd();
const BLOG_SOURCE_DIR = path.join(ROOT, 'src/content/blog');
const CHANGELOG_SOURCE_DIR = path.join(ROOT, 'src/content/changelog');
const BLOG_DOCS_DIR = path.join(ROOT, 'docs/blog');
const CHANGELOG_DOCS_DIR = path.join(ROOT, 'docs/changelog');
const GENERATED_DIR = path.join(ROOT, 'src/generated');
const DOCS_PUBLIC_DIR = path.join(ROOT, 'docs/public');
const DEFAULT_SITE_URL = 'https://zephyr-cloud.io';
const SITE_URL_SOCIALS = (process.env.SITE_URL_SOCIALS || DEFAULT_SITE_URL).replace(/\/+$/, '');

function rewriteSocialImageUrl(url) {
  try {
    const inputUrl = new URL(url);
    const defaultSiteUrl = new URL(DEFAULT_SITE_URL);

    if (inputUrl.origin !== defaultSiteUrl.origin) {
      return url;
    }

    return `${SITE_URL_SOCIALS}${inputUrl.pathname}${inputUrl.search}${inputUrl.hash}`;
  } catch {
    return url;
  }
}

function extractFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) {
    throw new Error('Missing frontmatter block');
  }

  return YAML.parse(match[1]) || {};
}

async function copyPublicImageIfExists(relativeImagePath) {
  const sourcePath = path.join(ROOT, 'src', relativeImagePath);
  const targetPath = path.join(DOCS_PUBLIC_DIR, relativeImagePath);

  try {
    await access(sourcePath);
  } catch {
    return false;
  }

  await mkdir(path.dirname(targetPath), { recursive: true });
  await copyFile(sourcePath, targetPath);
  return true;
}

async function normalizeBlogOgImage(slug, metadata) {
  const candidate = metadata.heroImage || metadata.listingImage || metadata.image;

  if (!candidate) {
    return `${SITE_URL_SOCIALS}/images/og/default-1200x630.png`;
  }

  if (typeof candidate !== 'string') {
    return `${SITE_URL_SOCIALS}/images/og/default-1200x630.png`;
  }

  if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
    return rewriteSocialImageUrl(candidate);
  }

  let relativeImagePath;

  if (candidate.startsWith('/')) {
    relativeImagePath = candidate.slice(1);
  } else if (candidate.includes('.')) {
    relativeImagePath = `images/blog/${candidate}`;
  } else {
    relativeImagePath = `images/blog/${slug}/${candidate}.webp`;
  }

  const copied = await copyPublicImageIfExists(relativeImagePath);

  if (!copied) {
    return `${SITE_URL_SOCIALS}/images/og/default-1200x630.png`;
  }

  return `${SITE_URL_SOCIALS}/${relativeImagePath}`;
}

async function normalizeChangelogOgImage(slug, metadata) {
  const candidate = metadata.image;

  if (!candidate || typeof candidate !== 'string') {
    return `${SITE_URL_SOCIALS}/images/og/default-1200x630.png`;
  }

  if (candidate.startsWith('http://') || candidate.startsWith('https://')) {
    return rewriteSocialImageUrl(candidate);
  }

  let relativeImagePath;

  if (candidate.startsWith('/')) {
    relativeImagePath = candidate.slice(1);
  } else if (candidate.includes('.')) {
    relativeImagePath = `images/changelog/${candidate}`;
  } else {
    relativeImagePath = `images/changelog/${slug}/${candidate}.webp`;
  }

  const copied = await copyPublicImageIfExists(relativeImagePath);

  if (!copied) {
    return `${SITE_URL_SOCIALS}/images/og/default-1200x630.png`;
  }

  return `${SITE_URL_SOCIALS}/${relativeImagePath}`;
}

function asJsObject(value) {
  return inspect(value, {
    depth: null,
    compact: false,
    breakLength: 100,
    colors: false,
    sorted: false,
  });
}

function yamlSingleQuoted(value) {
  const normalized = String(value ?? '').replace(/'/g, "''");
  return `'${normalized}'`;
}

function jsSingleQuoted(value) {
  const normalized = String(value ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'");
  return `'${normalized}'`;
}

function getImageMeta(imageUrl) {
  try {
    const pathname = new URL(imageUrl).pathname.toLowerCase();
    const ext = pathname.split('.').pop();
    const typeByExt = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      webp: 'image/webp',
      gif: 'image/gif',
      avif: 'image/avif',
    };

    const type = typeByExt[ext] || undefined;
    const isDefaultOg = pathname.endsWith('/images/og/default-1200x630.png');

    return {
      type,
      width: isDefaultOg ? 1200 : undefined,
      height: isDefaultOg ? 630 : undefined,
    };
  } catch {
    return {
      type: undefined,
      width: undefined,
      height: undefined,
    };
  }
}

async function cleanGeneratedMdx(dirPath) {
  await mkdir(dirPath, { recursive: true });
  const files = await readdir(dirPath);
  await Promise.all(
    files
      .filter((file) => file.endsWith('.mdx') && file !== 'index.mdx')
      .map((file) => unlink(path.join(dirPath, file))),
  );
}

async function generateBlogPages() {
  const files = (await readdir(BLOG_SOURCE_DIR)).filter((file) => file.endsWith('.mdx'));
  await cleanGeneratedMdx(BLOG_DOCS_DIR);
  const blogMetadataEntries = [];

  for (const fileName of files) {
    const slug = fileName.replace(/\.mdx$/, '');
    const sourcePath = path.join(BLOG_SOURCE_DIR, fileName);
    const raw = await readFile(sourcePath, 'utf8');
    const metadata = extractFrontmatter(raw);
    const title = metadata.title || slug;
    const description = metadata.description || metadata.excerpt || 'Zephyr Cloud blog post';
    const ogImage = await normalizeBlogOgImage(slug, metadata);

    const imageMeta = getImageMeta(ogImage);

    const generated = `---
title: ${yamlSingleQuoted(`${title} | Zephyr Cloud`)}
description: ${yamlSingleQuoted(description)}
head:
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: ${yamlSingleQuoted(title)}
  - - meta
    - property: og:description
      content: ${yamlSingleQuoted(description)}
  - - meta
    - property: og:url
      content: ${yamlSingleQuoted(`https://zephyr-cloud.io/blog/${slug}`)}
  - - meta
    - property: og:image
      content: ${yamlSingleQuoted(ogImage)}
${
  imageMeta.type
    ? `  - - meta
    - property: og:image:type
      content: ${yamlSingleQuoted(imageMeta.type)}
`
    : ''
}${
      imageMeta.width && imageMeta.height
        ? `  - - meta
    - property: og:image:width
      content: '${imageMeta.width}'
  - - meta
    - property: og:image:height
      content: '${imageMeta.height}'
`
        : ''
    }  - - meta
    - property: og:image:secure_url
      content: ${yamlSingleQuoted(ogImage)}
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: ${yamlSingleQuoted(title)}
  - - meta
    - name: twitter:description
      content: ${yamlSingleQuoted(description)}
  - - meta
    - name: twitter:image
      content: ${yamlSingleQuoted(ogImage)}
${
  imageMeta.type
    ? `  - - meta
    - name: twitter:image:type
      content: ${yamlSingleQuoted(imageMeta.type)}
`
    : ''
}  - - meta
    - name: twitter:image:src
      content: ${yamlSingleQuoted(ogImage)}
  - - link
    - rel: canonical
      href: ${yamlSingleQuoted(`https://zephyr-cloud.io/blog/${slug}`)}
---

import PostBody from '@/content/blog/${slug}.mdx'
import { BlogArticlePage } from '../../src/components/pages/BlogArticlePage'

export const pageMetadata = ${asJsObject(metadata)}

<BlogArticlePage slug={${jsSingleQuoted(slug)}} metadata={pageMetadata}>
  <PostBody />
</BlogArticlePage>
`;

    await writeFile(path.join(BLOG_DOCS_DIR, `${slug}.mdx`), generated, 'utf8');
    blogMetadataEntries.push({ slug, metadata });
  }

  await mkdir(GENERATED_DIR, { recursive: true });
  await writeFile(
    path.join(GENERATED_DIR, 'blog-metadata.ts'),
    `export const blogMetadataEntries = ${asJsObject(blogMetadataEntries)} as const;\n`,
    'utf8',
  );
}

async function generateChangelogPages() {
  const files = (await readdir(CHANGELOG_SOURCE_DIR)).filter((file) => file.endsWith('.mdx'));
  await cleanGeneratedMdx(CHANGELOG_DOCS_DIR);
  const changelogMetadataEntries = [];

  for (const fileName of files) {
    const slug = fileName.replace(/\.mdx$/, '');
    const sourcePath = path.join(CHANGELOG_SOURCE_DIR, fileName);
    const raw = await readFile(sourcePath, 'utf8');
    const metadata = extractFrontmatter(raw);
    const title = metadata.title || slug;
    const description = metadata.summary || 'Zephyr Cloud changelog update';
    const ogImage = await normalizeChangelogOgImage(slug, metadata);

    const imageMeta = getImageMeta(ogImage);

    const generated = `---
title: ${yamlSingleQuoted(`${title} | Zephyr Cloud`)}
description: ${yamlSingleQuoted(description)}
head:
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:title
      content: ${yamlSingleQuoted(title)}
  - - meta
    - property: og:description
      content: ${yamlSingleQuoted(description)}
  - - meta
    - property: og:url
      content: ${yamlSingleQuoted(`https://zephyr-cloud.io/changelog/${slug}`)}
  - - meta
    - property: og:image
      content: ${yamlSingleQuoted(ogImage)}
${
  imageMeta.type
    ? `  - - meta
    - property: og:image:type
      content: ${yamlSingleQuoted(imageMeta.type)}
`
    : ''
}${
      imageMeta.width && imageMeta.height
        ? `  - - meta
    - property: og:image:width
      content: '${imageMeta.width}'
  - - meta
    - property: og:image:height
      content: '${imageMeta.height}'
`
        : ''
    }  - - meta
    - property: og:image:secure_url
      content: ${yamlSingleQuoted(ogImage)}
  - - meta
    - name: twitter:card
      content: summary_large_image
  - - meta
    - name: twitter:title
      content: ${yamlSingleQuoted(title)}
  - - meta
    - name: twitter:description
      content: ${yamlSingleQuoted(description)}
  - - meta
    - name: twitter:image
      content: ${yamlSingleQuoted(ogImage)}
${
  imageMeta.type
    ? `  - - meta
    - name: twitter:image:type
      content: ${yamlSingleQuoted(imageMeta.type)}
`
    : ''
}  - - meta
    - name: twitter:image:src
      content: ${yamlSingleQuoted(ogImage)}
  - - link
    - rel: canonical
      href: ${yamlSingleQuoted(`https://zephyr-cloud.io/changelog/${slug}`)}
---

import EntryBody from '@/content/changelog/${slug}.mdx'
import { ChangelogArticlePage } from '../../src/components/pages/ChangelogArticlePage'

export const pageMetadata = ${asJsObject(metadata)}

<ChangelogArticlePage slug={${jsSingleQuoted(slug)}} metadata={pageMetadata}>
  <EntryBody />
</ChangelogArticlePage>
`;

    await writeFile(path.join(CHANGELOG_DOCS_DIR, `${slug}.mdx`), generated, 'utf8');
    changelogMetadataEntries.push({ slug, metadata });
  }

  await mkdir(GENERATED_DIR, { recursive: true });
  await writeFile(
    path.join(GENERATED_DIR, 'changelog-metadata.ts'),
    `export const changelogMetadataEntries = ${asJsObject(changelogMetadataEntries)} as const;\n`,
    'utf8',
  );
}

await generateBlogPages();
await generateChangelogPages();
