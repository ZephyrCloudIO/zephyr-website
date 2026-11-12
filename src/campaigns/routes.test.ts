import { describe, expect, it } from '@rstest/core';
import { existsSync, readFileSync } from 'node:fs';
import { campaignRoutes } from './routes';

describe('campaign routes', () => {
  it('gives every route a page and an indexable wrapper that renders it', () => {
    expect(campaignRoutes).toHaveLength(11);
    for (const page of campaignRoutes) {
      expect(existsSync(new URL(`./pages/${page.id}.tsx`, import.meta.url))).toBe(true);
      const wrapper = readFileSync(new URL(`../../docs/${page.slug}.mdx`, import.meta.url), 'utf8');
      expect(wrapper).toContain(`import CampaignPage from '../src/campaigns/pages/${page.id}';`);
      expect(wrapper).toContain(`href: 'https://zephyr-cloud.io/${page.slug}'`);
      expect(wrapper).toContain('campaign: true');
      expect(wrapper).not.toContain('noindex');
    }
  });
});
