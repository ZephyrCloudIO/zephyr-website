import { IntercomButton } from '@/components/IntercomButton';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import '@/index.css';
import { mdxComponents } from '@/rspress/mdx-components';
import { MDXProvider } from '@mdx-js/react';
import { PostHogProvider } from '@posthog/react';
import { Content, Head, useFrontmatter } from '@rspress/core/runtime';
import posthog from 'posthog-js';
import { createElement, type ReactElement, useEffect } from 'react';
import { IntercomProvider } from 'react-use-intercom';

const POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const POSTHOG_API_HOST = import.meta.env.PUBLIC_POSTHOG_HOST;
const POSTHOG_UI_HOST = 'https://us.posthog.com';
let hasInitializedPostHog = false;

function GoogleAnalytics() {
  return (
    <>
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-B7G266JZDH" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B7G266JZDH', {
              page_path: window.location.pathname,
              linker: {
                domains: ['app.zephyr-cloud.io', 'zephyr-cloud.io', 'docs.zephyr-cloud.io']
              }
            });
            gtag('set', 'linker', {
              accept_incoming: true,
            });
          `,
        }}
      />
    </>
  );
}

function renderFrontmatterHead(frontmatterHead: unknown): ReactElement[] {
  if (!Array.isArray(frontmatterHead)) {
    return [];
  }

  return frontmatterHead
    .map((entry, index) => {
      if (!Array.isArray(entry) || entry.length < 2) {
        return null;
      }

      const [tagName, attributes] = entry;

      if (typeof tagName !== 'string' || typeof attributes !== 'object' || attributes == null) {
        return null;
      }

      return createElement(tagName, {
        key: `frontmatter-head-${tagName}-${index}`,
        ...(attributes as Record<string, string>),
      });
    })
    .filter((entry): entry is ReactElement => entry != null);
}

export function Layout() {
  const frontmatterData = useFrontmatter() as { frontmatter?: { head?: unknown } };
  const frontmatter = (frontmatterData.frontmatter ?? {}) as Record<string, unknown>;
  const pageTitle = typeof frontmatter.title === 'string' ? frontmatter.title : 'Zephyr Cloud';
  const pageDescription = typeof frontmatter.description === 'string' ? frontmatter.description : undefined;

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
        {renderFrontmatterHead(frontmatter.head)}
      </Head>
      <IntercomProvider appId="xyxkmxlj">
        <GoogleAnalytics />
        <PostHogProvider client={posthog}>
          <MDXProvider components={mdxComponents as any}>
            <div className="dark bg-black text-neutral-300 min-h-screen font-sans">
              <Header />
              <main>
                <Content />
              </main>
              <Footer />
              <IntercomButton />
            </div>
          </MDXProvider>
        </PostHogProvider>
      </IntercomProvider>
    </>
  );
}

export * from '@rspress/core/theme-original';
