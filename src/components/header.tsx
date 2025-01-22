import { Link } from '@modern-js/runtime/router';
import HeaderNav from './ui/buttons/button.header-nav';
import ZephyrLogo from '@/images/zephyr-logo.svg';

const navigationItems = [
  { title: 'Features', link: '/features' },
  { title: 'Pricing', link: '/pricing' },
  { title: 'About', link: '/about' },
  { title: 'Contact', link: '/contact' },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-900/75 backdrop-blur-sm border-b border-zinc-800">
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16">

          <div className="flex-shrink-0">
            <Link to="/" className="text-white font-bold text-xl">
              <img src={ZephyrLogo} />
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <HeaderNav key={item.title} props={item} />
            ))}
          </nav>

          <div className="flex items-center">
            <Link
              to="/get-started"
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
