import { CopyToast } from '@/components/CopyToast';
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
import { ArrowRight, BookOpen, Check, ChevronDown, Download, Github, Menu, Package, Type, X } from 'lucide-react';
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

const NAV_HEIGHT = 64;

function MobileGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-ink-muted hover:bg-surface-2 hover:text-ink"
      >
        {label}
        <ChevronDown className={cn('size-4 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      {open ? <div className="mt-1 space-y-0.5 pl-3">{children}</div> : null}
    </div>
  );
}

const mobileLinkClass =
  'flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-ink-muted hover:bg-surface-2 hover:text-ink';

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
  const [mounted, setMounted] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);

    return () => {
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  const showToast = (message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastVisible(false), 2000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      setScrolled(currentY > 8);

      if (currentY <= NAV_HEIGHT) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current) {
        setVisible(false);
      }

      lastScrollY.current = currentY;
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const copySvg = async (src: string, key: 'logo' | 'wordmark', message: string) => {
    try {
      const response = await fetch(src);
      const svgText = await response.text();
      await navigator.clipboard.writeText(svgText);
      if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
      setCopyActive(key);
      copyTimeoutRef.current = setTimeout(() => setCopyActive(null), 1500);
      showToast(message);
    } catch (err) {
      console.error(`Failed to copy ${key}:`, err);
    }
  };

  const handleDownloadAssets = () => {
    const a = document.createElement('a');
    a.href = 'https://assets.zephyr-cloud.io/ZephyrCloud-Brand-Assets.zip';
    a.download = 'ZephyrCloud-Brand-Assets.zip';
    a.click();
    a.remove();
  };

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b transition-[background-color,border-color,transform] duration-300',
          scrolled || mobileMenuOpen ? 'border-line bg-night/80 backdrop-blur-xl' : 'border-transparent bg-transparent',
          visible || mobileMenuOpen ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:rounded-lg focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="-ml-2 rounded-lg p-2 text-ink-muted hover:text-ink lg:hidden"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
            <div className="relative">
              <Link
                to="/"
                className="flex items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-released-ink"
                aria-label="Zephyr Cloud home (right-click for brand assets)"
                onContextMenu={(e) => {
                  e.preventDefault();
                  setDropdownOpen(true);
                }}
              >
                <img src={WordmarkLight} alt="Zephyr Cloud" width={124} height={24} />
              </Link>
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <span className="sr-only">Brand assets menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 border-line bg-surface-2"
                  align="start"
                  alignOffset={-5}
                  sideOffset={8}
                >
                  <DropdownMenuItem
                    onClick={() => copySvg(LogoLight, 'logo', 'Logo SVG copied to clipboard')}
                    className="flex items-center gap-2"
                  >
                    {copyActive === 'logo' ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <img src={LogoLight} alt="" className="h-4 w-4" />
                    )}
                    <span className="flex-1">{copyActive === 'logo' ? 'Copied!' : 'Copy logo icon SVG'}</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => copySvg(WordmarkLight, 'wordmark', 'Wordmark SVG copied to clipboard')}
                    className="flex items-center gap-2"
                  >
                    {copyActive === 'wordmark' ? <Check className="h-4 w-4" /> : <Type className="h-4 w-4" />}
                    <span className="flex-1">{copyActive === 'wordmark' ? 'Copied!' : 'Copy wordmark SVG'}</span>
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
                  <ul className="flex w-100 flex-col">
                    {PRODUCTS.map((component) => (
                      <NavigationMenuContentItem key={component.title} href={component.href}>
                        <div className="flex items-center gap-2 text-ink">
                          {component.icon()}
                          <span className="text-sm">{component.title}</span>
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
                        <div className="flex items-center gap-2 text-ink">
                          {component.icon()}
                          <span className="text-sm">{component.title}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{component.description}</p>
                      </NavigationMenuContentItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="https://docs.zephyr-cloud.io/" target="_blank" rel="noopener">
                  Docs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="/pricing">Pricing</NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="flex items-center gap-1.5">
            <a
              href="https://github.com/ZephyrCloudIO"
              target="_blank"
              rel="noopener"
              className="hidden h-9 items-center gap-2 rounded-lg px-3 text-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink sm:inline-flex"
            >
              <Github size={16} aria-hidden />
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/org/zephyrcloud"
              target="_blank"
              rel="noopener"
              className="hidden h-9 items-center gap-2 rounded-lg px-3 text-sm text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink md:inline-flex"
            >
              <Package size={16} aria-hidden />
              npm
            </a>
            <a
              href="https://app.zephyr-cloud.io/"
              target="_blank"
              rel="noopener"
              className="ml-1.5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-released px-3.5 text-sm font-medium text-white transition-colors hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              Get started
              <ArrowRight className="size-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </header>

      {/* Outside <header>: its transform and backdrop blur would become the drawer's containing block. */}
      <div
        className={cn(
          'fixed inset-0 top-16 z-40 bg-night/60 transition-opacity duration-300 lg:hidden',
          mobileMenuOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
        )}
        onClick={closeMobile}
        aria-hidden
      />
      <nav
        id="mobile-nav"
        aria-label="Mobile"
        className={cn(
          'fixed top-16 bottom-0 left-0 z-50 w-76 max-w-[85vw] overflow-y-auto border-r border-line bg-night p-4 transition-transform duration-300 lg:hidden',
          mobileMenuOpen ? 'translate-x-0' : 'pointer-events-none -translate-x-full',
        )}
        inert={!mobileMenuOpen}
      >
        <div className="space-y-1">
          <MobileGroup
            label="Products"
            open={mobileProductsOpen}
            onToggle={() => setMobileProductsOpen(!mobileProductsOpen)}
          >
            {PRODUCTS.map((item) => (
              <a key={item.title} href={item.href} onClick={closeMobile} className={mobileLinkClass}>
                {item.icon()}
                {item.title}
              </a>
            ))}
          </MobileGroup>
          <MobileGroup
            label="Resources"
            open={mobileResourcesOpen}
            onToggle={() => setMobileResourcesOpen(!mobileResourcesOpen)}
          >
            {RESOURCES.map((item) => (
              <a key={item.title} href={item.href} onClick={closeMobile} className={mobileLinkClass}>
                {item.icon()}
                {item.title}
              </a>
            ))}
          </MobileGroup>
          <a
            href="https://docs.zephyr-cloud.io/"
            target="_blank"
            rel="noopener"
            onClick={closeMobile}
            className="block rounded-lg px-3 py-2.5 text-ink-muted hover:bg-surface-2 hover:text-ink"
          >
            Docs
          </a>
          <Link
            to="/pricing"
            onClick={closeMobile}
            className="block rounded-lg px-3 py-2.5 text-ink-muted hover:bg-surface-2 hover:text-ink"
          >
            Pricing
          </Link>
        </div>

        <div className="mt-4 space-y-1 border-t border-line pt-4">
          <a
            href="https://github.com/ZephyrCloudIO"
            target="_blank"
            rel="noopener"
            onClick={closeMobile}
            className={mobileLinkClass}
          >
            <Github size={16} aria-hidden />
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/org/zephyrcloud"
            target="_blank"
            rel="noopener"
            onClick={closeMobile}
            className={mobileLinkClass}
          >
            <Package size={16} aria-hidden />
            npm
          </a>
        </div>
      </nav>

      {mounted && typeof document !== 'undefined'
        ? createPortal(<CopyToast message={toastMsg} visible={toastVisible} />, document.body)
        : null}
    </>
  );
};
