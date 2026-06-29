import { IntercomButton } from '@/components/IntercomButton';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import '@/index.css';
import { mdxComponents } from '@/mdx-components';
import { MDXProvider } from '@mdx-js/react';
import { PostHogProvider } from '@posthog/react';
import { Content, Head, useFrontmatter, usePageData } from '@rspress/core/runtime';
import posthog from 'posthog-js';
import { createElement, type ReactElement, useEffect } from 'react';
import { IntercomProvider } from 'react-use-intercom';

const POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const POSTHOG_API_HOST = import.meta.env.PUBLIC_POSTHOG_HOST;
const POSTHOG_UI_HOST = 'https://us.posthog.com';
let hasInitializedPostHog = false;

function renderFrontmatterHead(frontmatterHead: unknown): ReactElement[] {
  if (!Array.isArray(frontmatterHead)) {
    return [];
  }

  return frontmatterHead.flatMap((entry, index) => {
    if (!Array.isArray(entry) || entry.length < 2) {
      return [];
    }

    const [tagName, attributes] = entry;

    if (typeof tagName !== 'string' || typeof attributes !== 'object' || attributes == null) {
      return [];
    }

    return [
      createElement(tagName, {
        key: `frontmatter-head-${tagName}-${index}`,
        ...(attributes as Record<string, string>),
      }),
    ];
  });
}

export function Layout() {
  const frontmatterData = useFrontmatter() as { frontmatter?: { head?: unknown } };
  const frontmatter = (frontmatterData.frontmatter ?? {}) as Record<string, unknown>;
  const { page } = usePageData() as { page?: { pageType?: string } };
  const isNotFound = page?.pageType === '404';
  const pageTitle =
    typeof frontmatter.title === 'string'
      ? frontmatter.title
      : isNotFound
        ? 'Page not found | Zephyr Cloud'
        : 'Zephyr Cloud';
  const pageDescription = typeof frontmatter.description === 'string' ? frontmatter.description : undefined;
  const hideChrome = frontmatter.hideChrome === true;

  useEffect(() => {
    if (!POSTHOG_KEY || hasInitializedPostHog) {
      return;
    }

    hasInitializedPostHog = true;
    posthog.init(POSTHOG_KEY, {
      ...(POSTHOG_API_HOST ? { api_host: POSTHOG_API_HOST } : {}),
      ui_host: POSTHOG_UI_HOST,
      defaults: '2026-01-30',
      person_profiles: 'identified_only',
    } as const);
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        {pageDescription ? <meta name="description" content={pageDescription} /> : null}
        {isNotFound ? <meta name="robots" content="noindex" /> : null}
        {renderFrontmatterHead(frontmatter.head)}
      </Head>
      <IntercomProvider appId="xyxkmxlj">
        <PostHogProvider client={posthog}>
          <MDXProvider components={mdxComponents as any}>
            <div className="dark bg-black text-neutral-300 min-h-screen font-sans">
              {hideChrome ? null : <Header />}
              <main>{isNotFound ? <NotFoundPage /> : <Content />}</main>
              {hideChrome ? null : <Footer />}
              {hideChrome ? null : <IntercomButton />}
            </div>
          </MDXProvider>
        </PostHogProvider>
      </IntercomProvider>
    </>
  );
}

export * from '@rspress/core/theme-original';
