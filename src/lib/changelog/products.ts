// The changelogs on the site. `platform` is the original /changelog; the others are
// versioned products with their own release notes under it.
export type ChangelogProduct = 'platform' | 'plugins' | 'workers';

export interface ChangelogProductInfo {
  basePath: string;
  // Name in the changelog switcher.
  navLabel: string;
  // Article back-link label.
  label: string;
  eyebrow: string;
  title: string;
  lead: string;
}

export const CHANGELOG_PRODUCTS: Record<ChangelogProduct, ChangelogProductInfo> = {
  platform: {
    basePath: '/changelog',
    navLabel: 'Platform',
    label: 'Changelog',
    eyebrow: 'Changelog',
    title: 'What’s new in Zephyr.',
    lead: 'Product updates, improvements, and fixes to Zephyr Cloud, newest first.',
  },
  plugins: {
    basePath: '/changelog/plugins',
    navLabel: 'Plugins',
    label: 'Plugins changelog',
    eyebrow: 'Changelog · Plugins',
    title: 'What’s new in Zephyr plugins.',
    lead: 'Releases of the Zephyr build plugins, ze-cli, and the with-zephyr codemod, newest first.',
  },
  workers: {
    basePath: '/changelog/workers',
    navLabel: 'Workers',
    label: 'Workers changelog',
    eyebrow: 'Changelog · Workers',
    title: 'What’s new in Zephyr Workers.',
    lead: 'Releases of the edge workers Zephyr deploys to your cloud, such as Cloudflare, Akamai, Fastly, AWS, and Netlify, newest first.',
  },
};

export function getChangelogProductByBasePath(basePath: string): ChangelogProductInfo {
  return (
    Object.values(CHANGELOG_PRODUCTS).find((product) => product.basePath === basePath) ?? CHANGELOG_PRODUCTS.platform
  );
}
