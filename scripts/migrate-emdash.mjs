import { htmlToPortableText } from '@emdash-cms/gutenberg-to-portable-text';
import { compile, run } from '@mdx-js/mdx';
import { copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseFragment, serializeOuter } from 'parse5';
import { format, resolveConfig } from 'prettier';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import * as jsxRuntime from 'react/jsx-runtime';
import remarkGfm from 'remark-gfm';
import YAML from 'yaml';
import { getLanderSlugs } from './landers.js';

const root = process.cwd();
const assets = new Set();
const components = new Set([
  'ReleasePathFilm',
  'SnapshotFigure',
  'LifecycleFigure',
  'ReleasePathCta',
  'Testimonial',
  'Tabs',
  'Tab',
  'TwitterEmbed',
]);
const prettierConfig = await resolveConfig(path.join(root, 'package.json'));

async function writeGenerated(relative, contents) {
  const filepath = path.join(root, relative);
  await mkdir(path.dirname(filepath), { recursive: true });
  await writeFile(filepath, await format(contents, { ...prettierConfig, filepath }));
}

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!match) throw new Error('Missing frontmatter');
  return { metadata: YAML.parse(match[1]), body: source.slice(match[0].length) };
}

async function copyAsset(filename) {
  const relative = path.relative(path.join(root, 'src'), filename).split(path.sep).join('/');
  if (!relative.startsWith('images/')) throw new Error(`Unexpected content asset: ${relative}`);
  const url = `/content/${relative}`;
  const destination = path.join(root, 'docs/public', url);
  await mkdir(path.dirname(destination), { recursive: true });
  await copyFile(filename, destination);
  assets.add(url);
  return url;
}

async function imageUrl(value, collection, slug) {
  if (!value) return '';
  if (/^https?:\/\//.test(value)) return value;
  const relative = value.startsWith('/')
    ? value.slice(1)
    : value.includes('.')
      ? `images/${collection}/${value}`
      : `images/${collection}/${slug}/${value}.webp`;
  try {
    return await copyAsset(path.join(root, 'src', relative));
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    await readFile(path.join(root, 'docs/public', relative));
    return `/${relative}`;
  }
}

function placeholder(name, props = {}) {
  return createElement('div', { 'data-zephyr-component': name, 'data-zephyr-props': JSON.stringify(props) });
}

const migrationComponents = {
  ...Object.fromEntries(
    ['ReleasePathFilm', 'SnapshotFigure', 'LifecycleFigure', 'ReleasePathCta'].map((name) => [
      name,
      (props) => placeholder(name, props),
    ]),
  ),
  Tabs: ({ defaultValue, children }) => createElement('div', { 'data-zephyr-tabs': defaultValue ?? '' }, children),
  Tab: ({ label, value, children }) =>
    createElement('section', { 'data-zephyr-tab': value, 'data-zephyr-label': label }, children),
  TwitterEmbed: ({ children, mediaMaxWidth = 560 }) =>
    createElement('blockquote', { className: 'twitter-tweet', 'data-media-max-width': mediaMaxWidth }, children),
  Testimonial: ({ author, role, avatar, linkedIn, children }) =>
    createElement(
      'blockquote',
      { className: 'rounded-2xl border border-line bg-surface/70 p-6' },
      createElement('div', null, children),
      createElement(
        'footer',
        { className: 'mt-5 flex items-center gap-3' },
        avatar
          ? createElement('img', { src: avatar, alt: '', width: 48, height: 48, className: 'size-12 rounded-full' })
          : null,
        createElement(
          'div',
          null,
          createElement('a', { href: linkedIn, target: '_blank', rel: 'noopener' }, author),
          createElement('p', null, role),
        ),
      ),
    ),
};

async function convertBody(body, filename, title) {
  let keyIndex = 0;
  const keyGenerator = () => `k${++keyIndex}`;
  const rewriteImports = () => async (tree) => {
    function normalizeAttributes(nodes) {
      const names = {
        frameborder: 'frameBorder',
        referrerpolicy: 'referrerPolicy',
        allowfullscreen: 'allowFullScreen',
      };
      for (const node of nodes) {
        for (const attribute of node.attributes ?? []) {
          if (names[attribute.name]) attribute.name = names[attribute.name];
        }
        if (node.children) normalizeAttributes(node.children);
      }
    }
    normalizeAttributes(tree.children);
    for (const node of tree.children) {
      if (node.type !== 'mdxjsEsm') continue;
      const declarations = [];
      for (const statement of node.data.estree.body) {
        if (statement.type !== 'ImportDeclaration') throw new Error(`Unsupported MDX declaration in ${filename}`);
        const source = statement.source.value;
        if (/\.(png|jpe?g|svg|webp|gif|webm)$/.test(source)) {
          if (statement.specifiers.length !== 1 || statement.specifiers[0].type !== 'ImportDefaultSpecifier')
            throw new Error(`Unsupported asset import in ${filename}`);
          const assetFile = source.startsWith('@/')
            ? path.join(root, 'src', source.slice(2))
            : path.resolve(path.dirname(filename), source);
          const url = await copyAsset(assetFile);
          declarations.push({
            type: 'ExportNamedDeclaration',
            declaration: {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: statement.specifiers[0].local,
                  init: { type: 'Literal', value: url },
                },
              ],
            },
            specifiers: [],
            source: null,
          });
        } else {
          for (const specifier of statement.specifiers) {
            if (!components.has(specifier.local.name))
              throw new Error(`Unsupported component ${specifier.local.name} in ${filename}`);
          }
        }
      }
      node.data.estree.body = declarations;
      node.value = '';
    }
  };
  const code = await compile(body, { outputFormat: 'function-body', remarkPlugins: [remarkGfm, rewriteImports] });
  const { default: Content } = await run(String(code), jsxRuntime);
  const html = renderToStaticMarkup(createElement(Content, { components: migrationComponents }));

  function convertList(node, level = 1) {
    const listItem = node.tagName === 'ol' ? 'number' : 'bullet';
    const listId = keyGenerator();
    const start = Number(node.attrs?.find((attribute) => attribute.name === 'start')?.value ?? 1);
    return node.childNodes
      .filter((child) => child.tagName === 'li')
      .flatMap((item) => {
        const nested = item.childNodes.filter((child) => ['ul', 'ol'].includes(child.tagName));
        const inline = item.childNodes.filter((child) => !nested.includes(child));
        const blocks = htmlToPortableText(`<div>${inline.map(serializeOuter).join('')}</div>`, { keyGenerator });
        if (blocks.length !== 1 || blocks[0]._type !== 'block') {
          throw new Error(`Unsupported list item in ${filename}`);
        }
        return [
          { ...blocks[0], listItem, level, ...(listItem === 'number' ? { listId, listStart: start } : {}) },
          ...nested.flatMap((child) => convertList(child, level + 1)),
        ];
      });
  }

  function convertNodes(nodes) {
    return nodes.flatMap((node) => {
      if (node.nodeName === '#text') return node.value.trim() ? htmlToPortableText(node.value, { keyGenerator }) : [];
      if (node.nodeName === '#comment' || node.tagName === 'link') return [];
      const attributes = Object.fromEntries((node.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
      if (attributes['data-zephyr-component'])
        return [
          {
            _type: 'zephyrComponent',
            _key: keyGenerator(),
            component: attributes['data-zephyr-component'],
            props: JSON.parse(attributes['data-zephyr-props']),
          },
        ];
      if ('data-zephyr-tabs' in attributes) {
        return [
          {
            _type: 'zephyrTabs',
            _key: keyGenerator(),
            defaultValue: attributes['data-zephyr-tabs'],
            tabs: node.childNodes
              .filter((child) => child.tagName === 'section')
              .map((tab) => {
                const attrs = Object.fromEntries(tab.attrs.map((attribute) => [attribute.name, attribute.value]));
                return {
                  value: attrs['data-zephyr-tab'],
                  label: attrs['data-zephyr-label'],
                  content: convertNodes(tab.childNodes),
                };
              }),
          },
        ];
      }
      const outerHtml = serializeOuter(node);
      if (node.tagName === 'ul' || node.tagName === 'ol') return convertList(node);
      if (node.tagName === 'table') {
        const tableRows = node.childNodes.flatMap((child) =>
          child.tagName === 'tr'
            ? [child]
            : ['thead', 'tbody', 'tfoot'].includes(child.tagName)
              ? child.childNodes.filter((row) => row.tagName === 'tr')
              : [],
        );
        const rows = tableRows.map((row) => ({
          _type: 'tableRow',
          _key: keyGenerator(),
          cells: row.childNodes
            .filter((cell) => ['th', 'td'].includes(cell.tagName))
            .map((cell) => {
              const cellAttrs = Object.fromEntries(cell.attrs.map((attribute) => [attribute.name, attribute.value]));
              const blocks = htmlToPortableText(`<p>${cell.childNodes.map(serializeOuter).join('')}</p>`, {
                keyGenerator,
              });
              return {
                _type: 'tableCell',
                _key: keyGenerator(),
                isHeader: cell.tagName === 'th',
                content: blocks.flatMap((block) => block.children ?? []),
                markDefs: blocks.flatMap((block) => block.markDefs ?? []),
                ...(['left', 'center', 'right'].includes(cellAttrs.align) ? { textAlign: cellAttrs.align } : {}),
              };
            }),
        }));
        return [
          {
            _type: 'table',
            _key: keyGenerator(),
            hasHeaderRow: rows[0]?.cells.every((cell) => cell.isHeader) ?? false,
            rows,
          },
        ];
      }
      if (node.tagName === 'pre') {
        const code = node.childNodes.find((child) => child.tagName === 'code') ?? node;
        const codeAttrs = Object.fromEntries((code.attrs ?? []).map((attribute) => [attribute.name, attribute.value]));
        const text = (child) =>
          child.nodeName === '#text' ? child.value : (child.childNodes ?? []).map(text).join('');
        return [
          {
            _type: 'code',
            _key: keyGenerator(),
            code: text(code).replace(/\n$/, ''),
            language: codeAttrs.class?.match(/\blanguage-([\w-]+)/)?.[1] ?? 'text',
          },
        ];
      }
      if (node.tagName === 'blockquote' && attributes.class?.split(/\s+/).includes('twitter-tweet'))
        return [{ _type: 'zephyrTweet', _key: keyGenerator(), html: outerHtml }];
      if (node.tagName === 'blockquote' && !attributes.class) {
        return convertNodes(node.childNodes).map((block) =>
          block._type === 'block' ? { ...block, style: 'blockquote' } : block,
        );
      }
      if (outerHtml.includes('data-zephyr-component') || outerHtml.includes('data-zephyr-tabs'))
        return convertNodes(node.childNodes);
      if (node.tagName === 'iframe')
        return [
          {
            _type: 'iframe',
            _key: keyGenerator(),
            src: attributes.src,
            title: attributes.title || title,
            ...(attributes.width && /^\d+$/.test(attributes.width) ? { width: Number(attributes.width) } : {}),
            ...(attributes.height && /^\d+$/.test(attributes.height) ? { height: Number(attributes.height) } : {}),
            ...(attributes.allow ? { allow: attributes.allow } : {}),
            allowFullscreen: 'allowfullscreen' in attributes,
          },
        ];
      if (['div', 'video', 'blockquote'].includes(node.tagName))
        return [{ _type: 'htmlBlock', _key: keyGenerator(), html: outerHtml }];
      return htmlToPortableText(outerHtml, { keyGenerator });
    });
  }

  return convertNodes(parseFragment(html).childNodes)
    .filter((block) => {
      const text = block.children?.map((span) => span.text).join('') ?? '';
      return !(
        block.style === 'h1' && text.toLowerCase().replace(/\W/g, '') === title.toLowerCase().replace(/\W/g, '')
      );
    })
    .map((block) => (block.style === 'h1' ? { ...block, style: 'h2' } : block));
}

const fields = [
  { slug: 'title', label: 'Title', type: 'string', required: true, searchable: true },
  { slug: 'description', label: 'Summary', type: 'text', searchable: true },
  { slug: 'published_on', label: 'Publication date', type: 'datetime', required: true },
  { slug: 'hero_image', label: 'Hero image URL', type: 'url' },
  { slug: 'listing_image', label: 'Listing image URL', type: 'url' },
  { slug: 'content', label: 'Content', type: 'portableText', searchable: true },
  { slug: 'reading_time', label: 'Reading time in minutes', type: 'integer' },
];
const seed = {
  $schema: 'https://emdashcms.com/seed.schema.json',
  version: '1',
  meta: { name: 'Zephyr Cloud', description: 'Migrated blog and changelog content' },
  settings: { title: 'Zephyr Cloud', tagline: "Always deployed. Released when you're ready." },
  collections: [],
  content: {},
};

for (const collection of ['blog', 'changelog']) {
  const directory = path.join(root, 'src/content', collection);
  const entries = [];
  for (const filename of (await readdir(directory)).filter((file) => file.endsWith('.mdx')).sort()) {
    const fullPath = path.join(directory, filename);
    const { metadata, body } = frontmatter(await readFile(fullPath, 'utf8'));
    const slug = filename.replace(/\.mdx$/, '');
    const date = metadata.publishedAt || metadata.publishDate || metadata.date;
    const heroImage = await imageUrl(metadata.heroImage || metadata.image, collection, slug);
    const listingImage = await imageUrl(
      metadata.listingImage || metadata.heroImage || metadata.image,
      collection,
      slug,
    );
    entries.push({
      id: `${collection}-${slug}`,
      slug,
      status: 'published',
      data: {
        title: metadata.title,
        description: metadata.description || metadata.excerpt || metadata.summary || '',
        published_on: new Date(date).toISOString(),
        hero_image: heroImage,
        listing_image: listingImage,
        content: await convertBody(body, fullPath, metadata.title),
        reading_time: metadata.readingTime || 0,
        ...(collection === 'blog'
          ? {
              authors: metadata.authors ?? (metadata.author ? [metadata.author] : []),
              tags: metadata.tags ?? [],
              hide_hero: metadata.hideHero ?? false,
            }
          : { category: metadata.category }),
      },
    });
  }
  seed.content[collection] = entries;
  seed.collections.push({
    slug: collection,
    label: collection === 'blog' ? 'Blog' : 'Changelog',
    labelSingular: collection === 'blog' ? 'Post' : 'Update',
    urlPattern: `/${collection}/{slug}`,
    supports: ['drafts', 'revisions', 'preview', 'scheduling', 'search', 'seo'],
    dateField: 'published_on',
    fields: [
      ...fields,
      ...(collection === 'blog'
        ? [
            { slug: 'authors', label: 'Authors', type: 'json' },
            { slug: 'tags', label: 'Topics', type: 'json' },
            { slug: 'hide_hero', label: 'Hide hero image', type: 'boolean' },
          ]
        : [{ slug: 'category', label: 'Category', type: 'string' }]),
    ],
  });
}

const pages = JSON.parse(await readFile(path.join(root, 'src/data/site-pages.json'), 'utf8'));
const enabled = new Set(
  (process.env.ZE_PUBLIC_ENABLED_LANDERS ?? '')
    .split(',')
    .map((slug) => slug.trim().toLowerCase())
    .filter(Boolean),
);
const landers = await getLanderSlugs(root);
const activeLanders = landers.filter((slug) => enabled.has(slug) || enabled.has('*') || enabled.has('all'));
const imports = activeLanders
  .map(
    (slug, index) =>
      `import { ${slug
        .split('-')
        .map((part) => part[0].toUpperCase() + part.slice(1))
        .join('')}LanderPage as Lander${index} } from '@/landers/${slug}/LanderPage';`,
  )
  .join('\n');
await writeGenerated(
  'src/generated/landers.ts',
  `${imports}\nexport const landerComponents = {${activeLanders.map((slug, index) => `${JSON.stringify(slug)}: Lander${index}`).join(',')}};\n`,
);
for (const slug of landers) {
  if (!activeLanders.includes(slug)) delete pages[slug];
}

await writeGenerated('.emdash/seed.json', `${JSON.stringify(seed, null, 2)}\n`);
await writeGenerated('src/generated/site-pages.json', `${JSON.stringify(pages, null, 2)}\n`);
await writeGenerated(
  '.emdash/migration-manifest.json',
  `${JSON.stringify({ collections: Object.fromEntries(Object.entries(seed.content).map(([name, entries]) => [name, entries.map((entry) => entry.slug)])), assets: [...assets].sort() }, null, 2)}\n`,
);
console.log(
  `Prepared ${seed.content.blog.length} blog posts, ${seed.content.changelog.length} changelog entries, ${Object.keys(pages).length} pages, and ${assets.size} content assets.`,
);
