import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import ZephyrLogo from '@/images/zephyr-logo.svg';
import ZephyrWordmark from '@/images/zephyr-wordmark.svg';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import {
  Calendar,
  Cloud,
  FileText,
  Github,
  History,
  Menu,
  Newspaper,
  Package,
  Sparkles,
  Type,
  Users,
  X,
} from 'lucide-react';
import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);

  const handleCopyLogo = async () => {
    try {
      const response = await fetch(ZephyrLogo);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
    } catch (err) {
      console.error('Failed to copy logo:', err);
    }
  };

  const handleCopyWordmark = async () => {
    try {
      const response = await fetch(ZephyrWordmark);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
    } catch (err) {
      console.error('Failed to copy wordmark:', err);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <div className="relative">
            <Link
              to="/"
              className="flex items-center gap-2"
              onContextMenu={(e) => {
                e.preventDefault();
                setDropdownOpen(true);
              }}
            >
              <img src={ZephyrWordmark} alt="Zephyr Logo" width={128} />
            </Link>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <span className="sr-only">Logo menu</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 border-neutral-700" align="start" alignOffset={-5} sideOffset={5}>
                <DropdownMenuLabel>Platform</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleCopyLogo} className="flex items-center gap-2 hover:bg-neutral-700">
                  <img src={ZephyrLogo} alt="Logo" className="h-4 w-4" />
                  <span className="flex-1">Copy Logo Icon SVG</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleCopyWordmark} className="flex items-center gap-2 hover:bg-neutral-700">
                  <Type className="h-4 w-4" />
                  <span className="flex-1">Copy Wordmark SVG</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <NavigationMenu className="hidden md:block bg-black">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-neutral-400 hover:text-white hover:bg-transparent data-[state=open]:bg-transparent">
                Products
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[400px] gap-3 p-4 bg-black border-neutral-700">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Cloud className="h-4 w-4" />
                          Zephyr Cloud
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                          The modern development platform for web applications
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/products/ai"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Sparkles className="h-4 w-4" />
                          Zephyr AI
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                          Where humans and AI agents do real work
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent text-neutral-400 hover:text-white hover:bg-transparent data-[state=open]:bg-transparent">
                Resources
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 bg-black border-neutral-700">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/blog"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <FileText className="h-4 w-4" />
                          Blog
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">Latest news and insights</p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/changelog"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <History className="h-4 w-4" />
                          Changelog
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                          Product updates and releases
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/press"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Newspaper className="h-4 w-4" />
                          Press
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                          Media kit and press releases
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/events"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Calendar className="h-4 w-4" />
                          Events
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                          Upcoming conferences and meetups
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        to="/partners"
                        className={cn(
                          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-neutral-800 hover:text-white focus:bg-neutral-800 focus:text-white',
                        )}
                      >
                        <div className="flex items-center gap-2 text-sm font-medium leading-none">
                          <Users className="h-4 w-4" />
                          Partners
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-neutral-400">
                          Partner programs and integrations
                        </p>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <a
                href="https://docs.zephyr-cloud.io/"
                target="_blank"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent text-neutral-400 hover:text-white hover:bg-transparent',
                )}
              >
                Docs
              </a>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                to="/pricing"
                className={cn(
                  navigationMenuTriggerStyle(),
                  'bg-transparent text-neutral-400 hover:text-white hover:bg-transparent',
                )}
              >
                Pricing
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <div className="flex items-center gap-4">
          <a
            href="https://github.com/ZephyrCloudIO"
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-sm border border-neutral-700 px-3 py-1.5 rounded-md hover:border-neutral-500"
          >
            <Github size={16} className="text-white" />
            <span className="text-white">GitHub</span>
          </a>
          <a
            href="https://www.npmjs.com/org/zephyrcloud"
            target="_blank"
            className="hidden sm:flex items-center gap-2 text-sm border border-neutral-700 px-3 py-1.5 rounded-md hover:border-neutral-500"
          >
            <Package size={16} className="text-white" />
            <span className="text-white">npm</span>
          </a>
          <Button variant="outline" className="text-sm h-9">
            <a href="https://app.zephyr-cloud.io/" target="_blank">
              Get Started
            </a>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={() => setMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div
        className={`md:hidden fixed left-0 top-16 bottom-0 w-72 bg-black opacity-95 backdrop-blur-md border-r border-neutral-800 transform transition-transform duration-300 z-50 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <nav className="p-4 space-y-4 bg-black opacity-95">
          <div className="space-y-2">
            <button
              onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
              className="w-full text-left text-neutral-400 hover:text-white flex items-center justify-between py-2"
            >
              Products
              <Cloud
                className={`h-4 w-4 transition-transform duration-200 ${mobileProductsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileProductsOpen && (
              <div className="pl-4 space-y-2">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <Cloud className="h-4 w-4" />
                  Zephyr Cloud
                </Link>
                <Link
                  to="/products/ai"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <Sparkles className="h-4 w-4" />
                  Zephyr AI
                </Link>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button
              onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
              className="w-full text-left text-neutral-400 hover:text-white flex items-center justify-between py-2"
            >
              Resources
              <FileText
                className={`h-4 w-4 transition-transform duration-200 ${mobileResourcesOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {mobileResourcesOpen && (
              <div className="pl-4 space-y-2">
                <Link
                  to="/blog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <FileText className="h-4 w-4" />
                  Blog
                </Link>
                <Link
                  to="/changelog"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <History className="h-4 w-4" />
                  Changelog
                </Link>
                <Link
                  to="/press"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <Newspaper className="h-4 w-4" />
                  Press
                </Link>
                <Link
                  to="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <Calendar className="h-4 w-4" />
                  Events
                </Link>
                <Link
                  to="/partners"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-neutral-400 hover:text-white py-2"
                >
                  <Users className="h-4 w-4" />
                  Partners
                </Link>
              </div>
            )}
          </div>

          <a
            href="https://docs.zephyr-cloud.io/"
            target="_blank"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-400 hover:text-white py-2"
          >
            Docs
          </a>

          <Link
            to="/pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-neutral-400 hover:text-white py-2"
          >
            Pricing
          </Link>

          <div className="pt-4 space-y-3 border-t border-neutral-800">
            <a
              href="https://github.com/ZephyrCloudIO"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm border border-neutral-700 px-3 py-2 rounded-md hover:border-neutral-500"
            >
              <Github size={16} className="text-white" />
              <span className="text-white">GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/org/zephyrcloud"
              target="_blank"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-sm border border-neutral-700 px-3 py-2 rounded-md hover:border-neutral-500"
            >
              <Package size={16} className="text-white" />
              <span className="text-white">npm</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};
