import separateTop from '@/images/separator-pointing-down.svg';
import ZephyrLogo from '@/images/zephyr-logo.svg';
import { Link } from '@modern-js/runtime/router';
import { useEffect, useState } from 'react';
import { navigationItems } from './header';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      <div
        onClick={onClose}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClose();
          }
        }}
        role="button"
        tabIndex={0}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-all duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      <div
        className={`fixed top-0 left-0 z-50 h-full w-[280px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-screen align-middle items-center flex-col bg-black/95">
          <div className="flex justify-between p-4 bg-black w-full">
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
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100"
              aria-label="Close menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex h-full flex-col">
            <img
              src={separateTop}
              className="w-full object-cover"
              alt="Top separator"
            />
            <nav className="flex-1 px-4 pt-4 h-full">
              <ul className="space-y-4">
                {navigationItems.map(link => (
                  <li key={link.title}>
                    <a
                      href={link.link}
                      className="block rounded-lg px-4 py-2.5 text-lg font-medium text-gray-200 hover:bg-gray-100"
                      onClick={onClose}
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="flex flex-col items-center w-full gap-4 mb-4 pb-4">
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
      </div>
    </>
  );
};
