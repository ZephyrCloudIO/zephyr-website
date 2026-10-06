import { IntercomButton } from '@/components/IntercomButton';
import { MotionReveal } from '@/components/motion/MotionReveal';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { PostHogProvider } from '@posthog/react';
import posthog from 'posthog-js';
import { useEffect, type ReactNode } from 'react';
import { IntercomProvider } from 'react-use-intercom';

let hasInitializedPostHog = false;

export function SiteShell({ children, hideChrome = false }: { children: ReactNode; hideChrome?: boolean }) {
  useEffect(() => {
    const key = import.meta.env.PUBLIC_POSTHOG_KEY;
    if (!key || hasInitializedPostHog) return;
    hasInitializedPostHog = true;
    posthog.init(key, {
      ...(import.meta.env.PUBLIC_POSTHOG_HOST ? { api_host: import.meta.env.PUBLIC_POSTHOG_HOST } : {}),
      ui_host: 'https://us.posthog.com',
      defaults: '2026-01-30',
      person_profiles: 'identified_only',
    });
  }, []);

  return (
    <IntercomProvider appId="xyxkmxlj">
      <PostHogProvider client={posthog}>
        <div className="dark bg-night text-ink-muted min-h-screen overflow-x-clip font-sans">
          {hideChrome ? null : <Header />}
          <main id="main">{children}</main>
          {hideChrome ? null : <Footer />}
          {hideChrome ? null : <IntercomButton />}
          <MotionReveal />
        </div>
      </PostHogProvider>
    </IntercomProvider>
  );
}
