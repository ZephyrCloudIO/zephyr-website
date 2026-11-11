import { MotionReveal } from '@/components/motion/MotionReveal';
import { NotFoundPage } from '@/components/pages/NotFoundPage';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import '@/index.css';
import { mdxComponents } from '@/mdx-components';
import '@fontsource-variable/chivo-mono';
import '@fontsource-variable/inter/opsz.css';
import { MDXProvider } from '@mdx-js/react';
import { PostHogProvider } from '@posthog/react';
import { Content, Head, useFrontmatter, usePageData } from '@rspress/core/runtime';
import posthog from 'posthog-js';
import { createElement, type ReactElement, useEffect } from 'react';
import campaigns from '../marketing/inbound-pages/pages.json';

const POSTHOG_KEY = import.meta.env.PUBLIC_POSTHOG_KEY;
const POSTHOG_API_HOST = import.meta.env.PUBLIC_POSTHOG_HOST;
const POSTHOG_UI_HOST = 'https://us.posthog.com';
let hasInitializedPostHog = false;
const campaignPaths = new Set(campaigns.map((page) => `/${page.slug}`));

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
  const isCampaign = frontmatter.campaign === true;

  useEffect(() => {
    if (isCampaign) {
      if (hasInitializedPostHog) {
        const wasRecording = posthog.sessionRecordingStarted();
        posthog.stopSessionRecording();
        return () => {
          if (wasRecording) posthog.startSessionRecording();
        };
      }
      return;
    }
    if (!POSTHOG_KEY || hasInitializedPostHog) {
      return;
    }

    hasInitializedPostHog = true;
    posthog.init(POSTHOG_KEY, {
      ...(POSTHOG_API_HOST ? { api_host: POSTHOG_API_HOST } : {}),
      ui_host: POSTHOG_UI_HOST,
      defaults: '2026-01-30',
      person_profiles: 'identified_only',
      before_send: (event) => (campaignPaths.has(window.location.pathname.replace(/\/$/, '')) ? null : event),
    } as const);
  }, [isCampaign]);

  const head = (
    <Head>
      <title>{pageTitle}</title>
      {pageDescription ? <meta name="description" content={pageDescription} /> : null}
      {isNotFound ? <meta name="robots" content="noindex" /> : null}
      {renderFrontmatterHead(frontmatter.head)}
    </Head>
  );
  if (isCampaign)
    return (
      <>
        {head}
        <Content />
      </>
    );

  return (
    <>
      {head}
      <PostHogProvider client={posthog}>
        <MDXProvider components={mdxComponents as any}>
          {/* overflow-x: clip, not hidden: it keeps the header and pinned stage sticky, and stops
              transformed demo layers from widening the page (iOS Safari keeps stale overflow). */}
          <div className="dark bg-night text-ink-muted min-h-screen overflow-x-clip font-sans">
            {hideChrome ? null : <Header />}
            <main id="main">{isNotFound ? <NotFoundPage /> : <Content />}</main>
            {hideChrome ? null : <Footer />}
            <MotionReveal />
          </div>
        </MDXProvider>
      </PostHogProvider>
    </>
  );
}

export * from '@rspress/core/theme-original';
