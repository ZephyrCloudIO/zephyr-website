import { IntercomButton } from '@/components/IntercomButton';
import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { MDXProvider } from '@mdx-js/react';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { type ReactNode, useEffect } from 'react';
import { IntercomProvider } from 'react-use-intercom';

// Google Analytics
const GoogleAnalytics = () => (
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
        })
      `,
      }}
    />
  </>
);

type TwitterWindow = Window & {
  twttr?: {
    widgets?: {
      load: () => void;
    };
  };
};

const TWITTER_WIDGET_SCRIPT_ID = 'twitter-wjs';

function TwitterEmbed({ children, mediaMaxWidth = 560 }: { children: ReactNode; mediaMaxWidth?: number }) {
  useEffect(() => {
    const twitterWindow = window as TwitterWindow;
    const loadWidgets = () => twitterWindow.twttr?.widgets?.load();
    const existingScript = document.getElementById(TWITTER_WIDGET_SCRIPT_ID) as HTMLScriptElement | null;

    if (existingScript) {
      if (twitterWindow.twttr?.widgets) {
        loadWidgets();
        return;
      }

      existingScript.addEventListener('load', loadWidgets, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.id = TWITTER_WIDGET_SCRIPT_ID;
    script.async = true;
    script.src = 'https://platform.twitter.com/widgets.js';
    script.charset = 'utf-8';
    script.addEventListener('load', loadWidgets);
    document.body.appendChild(script);

    return () => {
      script.removeEventListener('load', loadWidgets);
    };
  }, []);

  return (
    <div className="my-6 overflow-x-auto">
      <blockquote className="twitter-tweet" data-media-max-width={mediaMaxWidth}>
        {children}
      </blockquote>
    </div>
  );
}

// MDX components configuration
const mdxComponents = {
  h1: (props: any) => <h1 className="text-4xl font-bold mb-6 text-white" {...props} />,
  h2: (props: any) => <h2 className="text-3xl font-semibold mb-4 mt-8 text-white" {...props} />,
  h3: (props: any) => <h3 className="text-2xl font-semibold mb-3 mt-6 text-white" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-semibold mb-2 mt-4 text-white" {...props} />,
  p: (props: any) => <p className="mb-4 text-neutral-300 leading-relaxed" {...props} />,
  ul: (props: any) => <ul className="list-disc list-inside mb-4 text-neutral-300" {...props} />,
  ol: (props: any) => <ol className="list-decimal list-inside mb-4 text-neutral-300" {...props} />,
  li: (props: any) => <li className="mb-2" {...props} />,
  code: ({ className, ...props }: any) => {
    // Check if this is inside a pre (for code blocks)
    const isInlineCode = !className?.includes('hljs');
    return isInlineCode ? (
      <code className="bg-neutral-800 text-emerald-400 px-1 py-0.5 rounded" {...props} />
    ) : (
      <code className={className} {...props} />
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre className="bg-neutral-900 border border-neutral-800 rounded-lg p-4 mb-4 overflow-x-auto" {...props}>
      {children}
    </pre>
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-emerald-600 pl-4 italic mb-4 text-neutral-400" {...props} />
  ),
  table: ({ children, ...props }: any) => (
    <div className="my-6 overflow-x-auto rounded-lg border border-neutral-800">
      <table className="min-w-full border-collapse text-left text-sm text-neutral-200" {...props}>
        {children}
      </table>
    </div>
  ),
  thead: (props: any) => <thead className="bg-neutral-900/80" {...props} />,
  tbody: (props: any) => <tbody className="divide-y divide-neutral-800" {...props} />,
  tr: (props: any) => <tr className="align-top" {...props} />,
  th: (props: any) => (
    <th className="border-b border-neutral-700 px-4 py-3 font-semibold text-white whitespace-nowrap" {...props} />
  ),
  td: (props: any) => <td className="px-4 py-3 align-top leading-relaxed" {...props} />,
  TwitterEmbed,
  a: (props: any) => <a className="text-emerald-400 hover:text-emerald-300 underline" {...props} />,
  img: (props: any) => <img className="rounded-lg my-6 max-w-full" {...props} />,
  strong: (props: any) => <strong className="font-semibold text-white" {...props} />,
  em: (props: any) => <em className="italic" {...props} />,
};

// ScrollToTop component
function ScrollToTop() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
}

// Root component
function RootComponent() {
  return (
    <IntercomProvider appId="xyxkmxlj">
      <GoogleAnalytics />
      <ScrollToTop />
      <MDXProvider components={mdxComponents}>
        <div className="bg-black text-neutral-300 min-h-screen font-sans">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
          <IntercomButton />
        </div>
      </MDXProvider>
    </IntercomProvider>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
