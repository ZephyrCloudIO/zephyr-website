import { Footer } from '@/components/sections/Footer';
import { Header } from '@/components/sections/Header';
import { MDXProvider } from '@mdx-js/react';
import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router';
import { useEffect } from 'react';

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
    <>
      <GoogleAnalytics />
      <ScrollToTop />
      <MDXProvider components={mdxComponents}>
        <div className="bg-black text-neutral-300 min-h-screen font-sans">
          <Header />
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </MDXProvider>
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
