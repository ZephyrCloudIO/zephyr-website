import ZephyrLogo from '@/images/zephyr-logo.svg';
import { cn } from '@/lib/utils';
import { Link, useLocation } from '@modern-js/runtime/router';
import { useState } from 'react';
import { MobileNav } from './mobile-nav';
import HeaderNav from './ui/buttons/button.header-nav';

const MenuIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Menu"
    role="img"
  >
    <title>Menu</title>
    <path
      d="M4 6H20M4 12H20M4 18H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

export const navigationItems = [
  {
    title: 'Pricing',
    link: '/pricing',
    description: 'View Zephyr Cloud pricing plans and packages',
  },
  {
    title: 'Documentation',
    link: 'https://docs.zephyr-cloud.io/',
    description: 'Comprehensive guides and API documentation for Zephyr Cloud',
  },
  {
    title: 'Blog',
    link: '/blog',
    description:
      'Latest updates, tutorials and insights from the Zephyr Cloud team',
  },
  {
    title: 'Enterprise',
    link: '/enterprise',
    description:
      'Enterprise-grade solutions and custom packages for large organizations',
  },
];

export default function Header() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActiveLink = (link: string) => {
    if (link.startsWith('http')) {
      return false;
    }
    return location.pathname === link;
  };

  return (
    <header
      suppressHydrationWarning
      className="fixed top-0 left-0 right-0 z-50 w-full bg-zinc-900/75 backdrop-blur-sm border-b border-zinc-800"
    >
      <div className="container mx-auto px-4 w-full">
        <div className="flex items-center justify-between h-16 max-w-[1400px] mx-auto w-full">
          <div className="flex flex-row align-middle items-center">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden rounded-lg p-2 mr-4 text-white hover:bg-zinc-800"
              aria-label="Open menu"
            >
              <MenuIcon />
            </button>
            <Link
              to="/"
              className="text-white font-bold text-xl"
              aria-label="Return to Zephyr Cloud homepage"
            >
              <img
                src={ZephyrLogo}
                alt="Zephyr Cloud - Modern Cloud Development Platform"
                className="w-full h-[32px] object-contain"
                width="140"
                height="32"
              />
            </Link>
          </div>

          <nav
            className="hidden md:flex items-center space-x-1 flex-1 justify-center"
            aria-label="Main navigation"
          >
            {navigationItems.map(item => (
              <div
                key={item.title}
                className={cn(
                  'relative px-1',
                  isActiveLink(item.link) &&
                    'after:absolute after:bottom-0 after:left-[24px] after:right-[36px] after:h-[2px] after:bg-white/50',
                )}
              >
                <HeaderNav
                  title={item.title}
                  link={item.link}
                  className={cn(isActiveLink(item.link) && 'text-white')}
                  aria-label={item.description}
                  aria-current={isActiveLink(item.link) ? 'page' : undefined}
                />
              </div>
            ))}
          </nav>

          <div className="flex items-center w-[120px] justify-end gap-4 md:visible invisible">
            <Link
              to="https://app.zephyr-cloud.io/"
              className="bg-white hover:bg-zinc-100 text-zinc-900 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
              aria-label="Get started with Zephyr Cloud platform"
              rel="noopener noreferrer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}
