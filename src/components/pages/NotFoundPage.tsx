import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const popularLinks = [
  { label: 'Blog', href: '/blog' },
  { label: 'Changelog', href: '/changelog' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Partners', href: '/partners' },
];

export function NotFoundPage() {
  return (
    <section className="relative bg-gradient-to-b from-violet-900/20 to-black">
      <div className="container mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-24 text-center">
        <p className="bg-gradient-to-b from-white to-neutral-600 bg-clip-text text-7xl font-bold tracking-tight text-transparent md:text-9xl">
          404
        </p>

        <h1 className="mt-6 text-3xl font-bold text-balance text-white md:text-4xl">Page not found</h1>

        <p className="mt-4 max-w-xl text-neutral-400">
          The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you back on track.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a href="/">
            <Button size="lg">
              <Home className="h-4 w-4" />
              Back to home
            </Button>
          </a>
          <a href="/blog">
            <Button size="lg" variant="outline">
              <ArrowLeft className="h-4 w-4" />
              Explore the blog
            </Button>
          </a>
        </div>

        <div className="mt-12 w-full border-t border-neutral-800 pt-8">
          <p className="text-sm text-neutral-500">Popular destinations</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {popularLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-neutral-300 transition-colors hover:text-violet-400"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
