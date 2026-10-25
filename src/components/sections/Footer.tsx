import SOC2Logo from '@/images/soc2-logo.webp';
import WordmarkLight from '@/images/wordmark-light.svg';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight } from 'lucide-react';
import React from 'react';

interface FooterLink {
  label: string;
  href: string;
  external?: boolean;
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Product',
    links: [
      { label: 'Pricing', href: '/pricing' },
      { label: 'Changelog', href: '/changelog' },
      { label: 'Service status', href: 'https://status.zephyr-cloud.io/', external: true },
      { label: 'The AI Platform', href: 'https://theaiplatform.app', external: true },
    ],
  },
  {
    title: 'Developers',
    links: [
      { label: 'Docs', href: 'https://docs.zephyr-cloud.io/', external: true },
      { label: 'Support', href: '/support' },
      { label: 'npm packages', href: 'https://www.npmjs.com/org/zephyrcloud', external: true },
      { label: 'llms.txt', href: '/llms.txt' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Events', href: '/events' },
      { label: 'Partners', href: '/partners' },
      { label: 'Press', href: '/press' },
      { label: 'Brand', href: '/brand' },
      { label: 'All links', href: '/all-links' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'GitHub', href: 'https://github.com/ZephyrCloudIO', external: true },
      { label: 'Discord', href: 'https://discord.gg/zephyrcloud', external: true },
      { label: 'X', href: 'https://x.com/ZephyrCloudIO', external: true },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/company/96615966', external: true },
      { label: 'YouTube', href: 'https://www.youtube.com/@ZephyrCloud', external: true },
      { label: 'Instagram', href: 'https://www.instagram.com/zephyrcloudio', external: true },
    ],
  },
];

const linkClass = 'inline-flex items-center gap-1 text-sm text-ink-muted transition-colors hover:text-ink';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-line bg-night">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-10 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <Link to="/" className="inline-flex rounded-md">
              <img src={WordmarkLight} alt="Zephyr Cloud" width={124} height={24} />
            </Link>
            <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-ink-faint">
              Always deployed. Released when you’re ready.
            </p>
            <img src={SOC2Logo} alt="SOC 2 compliant" height={48} className="mt-6 h-12 w-auto" loading="lazy" />
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <h2 className="m-0 mb-4 text-sm font-medium text-ink">{column.title}</h2>
              <ul className="m-0 list-none space-y-2.5 p-0">
                {column.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a href={link.href} target="_blank" rel="noopener" className={linkClass}>
                        {link.label}
                        <ArrowUpRight aria-hidden className="size-3 text-ink-faint" />
                      </a>
                    ) : (
                      <Link to={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p className="m-0">&copy; {new Date().getFullYear()} Zephyr Cloud, Inc.</p>
          <nav aria-label="Legal" className="flex gap-5">
            <Link to="/privacy" className="transition-colors hover:text-ink-muted">
              Privacy policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-ink-muted">
              Terms of service
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
