import { CopyToast } from '@/components/CopyToast';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PRODUCTS, RESOURCES } from '@/constants/navItems';
import LogoLight from '@/images/logo-light.svg';
import WordmarkLight from '@/images/wordmark-light.svg';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from '@tanstack/react-router';
import {
  BookOpen,
  Calendar,
  Check,
  Cloud,
  Download,
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
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuContentItem,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = React.useRef(0);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [copyActive, setCopyActive] = useState<string | null>(null);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastVisible(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const navHeight = 64;

      setScrolled(currentY > navHeight);

      if (currentY <= navHeight) {
        // Always show at top
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        // Scrolling down
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLogo = async () => {
    try {
      const response = await fetch(LogoLight);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setCopyActive('logo');
      copyTimeoutRef.current = setTimeout(() => setCopyActive(null), 1500);
      showToast('Logo SVG copied to clipboard');
    } catch (err) {
      console.error('Failed to copy logo:', err);
    }
  };

  const handleCopyWordmark = async () => {
    try {
      const response = await fetch(WordmarkLight);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setCopyActive('wordmark');
      copyTimeoutRef.current = setTimeout(() => setCopyActive(null), 1500);
      showToast('Wordmark SVG copied to clipboard');
    } catch (err) {
      console.error('Failed to copy wordmark:', err);
    }
  };

  const handleDownloadAssets = () => {
    const a = document.createElement('a');
    a.href = 'https://assets.zephyr-cloud.io/ZephyrCloud-Brand-Assets.zip';
    a.download = 'ZephyrCloud-Brand-Assets.zip';
    a.click();
    a.remove();
  };

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled ? 'bg-black/90 backdrop-blur-md' : 'bg-transparent',
          visible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-400 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <div className="relative">
              <Link
                to="/"
                className="flex items-center gap-2"
                aria-label="Zephyr Cloud (right-click for logo menu)"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setDropdownOpen(true);
                }}
              >
                <img src={WordmarkLight} alt="Zephyr Logo" width={128} />
              </Link>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <span className="sr-only">Logo menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-main-muted border-border"
                  align="start"
                  alignOffset={-5}
                  sideOffset={5}
                >
                  <DropdownMenuItem onClick={handleCopyLogo} className="flex items-center gap-2">
                    {copyActive === 'logo' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <img src={LogoLight} alt="Logo" className="h-4 w-4" />
                    )}
                    <span className="flex-1">{copyActive === 'logo' ? 'Copied!' : 'Copy Logo Icon SVG'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleCopyWordmark} className="flex items-center gap-2">
                    {copyActive === 'wordmark' ? <Check className="h-4 w-4" /> : <Type className="h-4 w-4" />}
                    <span className="flex-1">{copyActive === 'wordmark' ? 'Copied!' : 'Copy Wordmark SVG'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadAssets} className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    <span className="flex-1">Download brand assets</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate({ to: '/brand' });
                    }}
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-4 w-4" />
                    <span className="flex-1">Visit brand guidelines</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-100">
                    {PRODUCTS.map((component) => (
                      <NavigationMenuContentItem key={component.title} href={component.href}>
                        <div className="flex items-center gap-2">
                          {component.icon()}
                          <h3 className="text-sm text-foreground">{component.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </NavigationMenuContentItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-100 md:w-125 md:grid-cols-2 lg:w-137.5">
                    {RESOURCES.map((component) => (
                      <NavigationMenuContentItem key={component.title} href={component.href}>
                        <div className="flex items-center gap-2">
                          {component.icon()}
                          <h3 className="text-sm text-foreground">{component.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </NavigationMenuContentItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="https://docs.zephyr-cloud.io/" target="_blank">
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-4">
            <a
              href="https://github.com/ZephyrCloudIO"
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm bg-neutral-900/80 border border-neutral-700 px-3 py-1.5 rounded-md hover:border-neutral-500 hover:bg-neutral-800/90 transition-colors"
            >
              <Github size={16} className="text-white" />
              <span className="text-white">GitHub</span>
            </a>
            <a
              href="https://www.npmjs.com/org/zephyrcloud"
              target="_blank"
              className="hidden sm:flex items-center gap-2 text-sm bg-neutral-900/80 border border-neutral-700 px-3 py-1.5 rounded-md hover:border-neutral-500 hover:bg-neutral-800/90 transition-colors"
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
          className={`lg:hidden fixed inset-0 z-40 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div
          className={`lg:hidden fixed left-0 top-16 bottom-0 w-72 bg-black opacity-95 backdrop-blur-md border-r border-neutral-800 transform transition-transform duration-300 z-50 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
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

      {createPortal(<CopyToast message={toastMsg} visible={toastVisible} />, document.body)}
    </>
  );
};
