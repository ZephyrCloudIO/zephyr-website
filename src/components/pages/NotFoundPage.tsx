import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const popularLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Partners', href: '/partners' },
];

export function NotFoundPage() {
  // The 404 page is prerendered once, so the requested path is only known in the browser.
  const [path, setPath] = useState<string | null>(null);

  useEffect(() => {
    setPath(window.location.pathname);
  }, []);

  return (
    <section className="flex min-h-[calc(100svh-4rem)] items-center py-24">
      <div className="mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <div className="max-w-2xl">
          <p className="mb-6 text-sm text-ink-faint">404 · Page not found</p>
          <h1 className="text-display m-0 text-ink">This page isn’t deployed.</h1>
          <p className="text-lead mt-7 mb-0 max-w-[34rem] text-ink-muted">
            Nothing is live at{' '}
            {path ? (
              <span className="text-ident text-[0.9em] text-ink [overflow-wrap:anywhere]">{path}</span>
            ) : (
              'this address'
            )}
            . It may have moved, or it was never released.
          </p>

          <a
            href="/"
            className="mt-9 inline-flex h-11 items-center gap-2 rounded-xl bg-released px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night"
          >
            Back to home
            <ArrowRight className="size-4" aria-hidden />
          </a>

          <nav aria-label="Popular destinations" className="mt-16 border-t border-line pt-6">
            <p className="m-0 text-sm text-ink-faint">Popular destinations</p>
            <ul className="m-0 mt-3 flex list-none flex-wrap gap-x-6 gap-y-2 p-0">
              {popularLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-ink-muted transition-colors hover:text-ink">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
