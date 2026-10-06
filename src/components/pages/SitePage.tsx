import { SiteShell } from '@/components/SiteShell';
import { landerComponents } from '@/generated/landers';
import type { BlogPost } from '@/lib/blog/types';
import type { ChangelogEntry } from '@/lib/changelog/types';
import { Route as AllLinks } from '@/routes/all-links';
import { Route as Brand } from '@/routes/brand';
import { Route as Events } from '@/routes/events';
import { HomePage } from '@/routes/index';
import { Route as Partners } from '@/routes/partners';
import { Route as Press } from '@/routes/press';
import { Route as Pricing } from '@/routes/pricing';
import { Route as Privacy } from '@/routes/privacy';
import { Route as AI } from '@/routes/products/ai';
import { Route as Performance } from '@/routes/products/code-elimination-performance';
import { Route as Support } from '@/routes/support';
import { Route as Terms } from '@/routes/terms';
import { Route as Wifi } from '@/routes/wifi';
import { BlogIndexPage } from './BlogIndexPage';
import { ChangelogIndexPage } from './ChangelogIndexPage';
import { NotFoundPage } from './NotFoundPage';

const routeComponents = {
  'all-links': AllLinks.component,
  brand: Brand.component,
  events: Events.component,
  partners: Partners.component,
  press: Press.component,
  pricing: Pricing.component,
  privacy: Privacy.component,
  'products/ai': AI.component,
  'products/code-elimination-performance': Performance.component,
  support: Support.component,
  terms: Terms.component,
  wifi: Wifi.component,
  ...landerComponents,
};

export function SitePage({
  page,
  hideChrome,
  posts = [],
  entries = [],
}: {
  page: string;
  hideChrome?: boolean;
  posts?: BlogPost[];
  entries?: ChangelogEntry[];
}) {
  const Component = Object.prototype.hasOwnProperty.call(routeComponents, page)
    ? routeComponents[page as keyof typeof routeComponents]
    : undefined;
  return (
    <SiteShell hideChrome={hideChrome}>
      {page === '' ? (
        <HomePage posts={posts} />
      ) : page === 'blog' ? (
        <BlogIndexPage posts={posts} />
      ) : page === 'changelog' ? (
        <ChangelogIndexPage entries={entries} />
      ) : Component ? (
        <Component />
      ) : (
        <NotFoundPage />
      )}
    </SiteShell>
  );
}
