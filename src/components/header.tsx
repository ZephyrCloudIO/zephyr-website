import { Link, useLocation } from '@modern-js/runtime/router';
import { cn } from '@/lib/utils';
import HeaderNav from './ui/buttons/button.header-nav';
import ZephyrLogo from '@/images/zephyr-logo.svg';

const navigationItems = [
  { title: 'Pricing', link: '/pricing' },
  { title: 'Documentation', link: 'https://docs.zephyr-cloud.io/' },
  { title: 'Blog', link: '/blog' },
  { title: 'Enterprise', link: '/enterprise' },
];

export default function Header() {
  const location = useLocation();

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
          <div className="flex-shrink-0 w-[140px]"> {/* Increased container width */}
            <Link to="/" className="text-white font-bold text-xl">
              <img
                src={ZephyrLogo}
                alt="Zephyr Logo"
                className="w-full h-[32px] object-contain"
              />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1 flex-1 justify-center">
            {navigationItems.map(item => (
              <div
                key={item.title}
                className={cn(
                  'relative px-1',
                  isActiveLink(item.link) && 'after:absolute after:bottom-0 after:left-[24px] after:right-[36px] after:h-[2px] after:bg-white/50'
                )}
              >
                <HeaderNav
                  props={{
                    ...item,
                    className: cn(
                      isActiveLink(item.link) && 'text-white'
                    )
                  }}
                />
              </div>
            ))}
          </nav>

          <div className="flex items-center w-[120px] justify-end">
            <Link
              to="https://app.zephyr-cloud.io/"
              className="bg-white hover:bg-zinc-100 text-zinc-900 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
