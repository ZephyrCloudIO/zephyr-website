import { CopyToast } from '@/components/CopyToast';
import LogoDark from '@/images/logo-dark.svg';
import LogoLight from '@/images/logo-light.svg';
import WordmarkDark from '@/images/wordmark-dark.svg';
import WordmarkLight from '@/images/wordmark-light.svg';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Check, Copy, Download } from 'lucide-react';
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

export const Route = createFileRoute('/brand')({
  component: BrandPage,
});

type BrandColor = {
  name: string;
  hex: string;
  rgb: [number, number, number];
  light: boolean;
};

// The official brand palette. Don't swap these for site tokens.
const BRAND_COLORS: BrandColor[] = [
  { name: 'Black', hex: '#0A0A0A', rgb: [10, 10, 10], light: false },
  { name: 'White', hex: '#FFFFFF', rgb: [255, 255, 255], light: true },
  { name: 'Violet', hex: '#7C3AED', rgb: [124, 58, 237], light: false },
];

const container = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';
const inlineLink =
  'text-ink underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-ink-muted';

// Always visible on touch screens; revealed on hover or keyboard focus from `sm` up.
const REVEAL_ON_HOVER =
  'opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 sm:group-focus-visible:opacity-100';
const TILE_CHIP =
  'inline-flex h-8 items-center gap-1.5 rounded-lg border border-line-strong bg-surface-2 px-3 text-xs font-medium text-ink-muted transition-colors hover:text-ink';

function AssetTile({
  src,
  alt,
  width,
  download,
  light = false,
}: {
  src: string;
  alt: string;
  width: number;
  download: string;
  light?: boolean;
}) {
  return (
    <div
      className={cn(
        'group relative flex min-h-52 items-center justify-center rounded-2xl border',
        light ? 'border-line-strong bg-white' : 'border-line bg-surface/70',
      )}
    >
      <img src={src} alt={alt} width={width} />
      <a href={src} download={download} className={cn(TILE_CHIP, REVEAL_ON_HOVER, 'absolute right-4 bottom-4')}>
        <Download className="size-3.5" aria-hidden />
        Download SVG
      </a>
    </div>
  );
}

function ColorSwatch({ name, hex, rgb, light, onCopy }: BrandColor & { onCopy: (hex: string) => void }) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hex);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the hex stays selectable.
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(true);
    timeoutRef.current = setTimeout(() => setActive(false), 1500);
    onCopy(hex);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={`Copy ${name} hex value ${hex}`}
      className="group relative flex min-h-52 w-full flex-col justify-end rounded-2xl border border-line-strong p-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night"
      style={{ backgroundColor: hex }}
    >
      <span className={cn('text-sm font-medium', light ? 'text-night/80' : 'text-ink/85')}>{name}</span>
      <span className={cn('text-ident mt-1', light ? 'text-night/60' : 'text-ink/65')}>{hex}</span>
      <span className={cn('text-ident', light ? 'text-night/45' : 'text-ink/45')}>
        {rgb[0]}, {rgb[1]}, {rgb[2]}
      </span>
      <span className={cn(TILE_CHIP, 'absolute top-4 right-4', active ? 'text-ink' : REVEAL_ON_HOVER)}>
        {active ? <Check className="size-3.5 text-live" aria-hidden /> : <Copy className="size-3.5" aria-hidden />}
        {active ? 'Copied!' : 'Copy hex'}
      </span>
    </button>
  );
}

function BrandSection({
  id,
  title,
  intro,
  children,
}: {
  id: string;
  title: string;
  intro?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="border-t border-line py-16 lg:py-24">
      <div className={cn(container, 'grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16')}>
        <div className="reveal">
          <h2 id={id} className="text-headline m-0 text-ink">
            {title}
          </h2>
          {intro ? <div className="mt-5 max-w-md leading-relaxed text-ink-muted">{intro}</div> : null}
        </div>
        <div className="reveal" style={{ '--reveal-delay': '80ms' } as CSSProperties}>
          {children}
        </div>
      </div>
    </section>
  );
}

function BrandPage() {
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    };
  }, []);

  const showToast = (message: string) => {
    setToastMsg(message);
    setToastVisible(true);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    toastTimeoutRef.current = setTimeout(() => setToastVisible(false), 2000);
  };

  return (
    <>
      <section className="pt-20 pb-16 lg:pt-28 lg:pb-20">
        <div className={container}>
          <div className="max-w-3xl">
            <p className="mb-6 text-sm text-ink-faint">Brand</p>
            <h1 className="text-display m-0 text-ink">Zephyr Cloud brand guidelines</h1>
            <p className="text-lead mt-7 mb-0 max-w-[36rem] text-ink-muted">
              Resources and guidelines for using our brand assets. Please read these guidelines before using our logo,
              wordmark, or colors.
            </p>
            <a
              href="https://assets.zephyr-cloud.io/ZephyrCloud-Brand-Assets.zip"
              download="ZephyrCloud-Brand-Assets.zip"
              className="mt-9 inline-flex h-11 items-center gap-2 rounded-xl bg-released px-5 text-[0.9375rem] font-medium text-white transition-colors hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night"
            >
              <Download className="size-4" aria-hidden />
              Download brand assets
            </a>
          </div>
        </div>
      </section>

      <BrandSection id="naming-title" title="Naming">
        <p className="text-lead m-0 max-w-2xl text-ink-muted">
          When referring to us in writing, use Zephyr Cloud — two words, both capitalized. Zephyr is also acceptable as
          a shorthand in informal or repeated references. Do not use "ZephyrCloud" as one word, all-lowercase variants,
          or abbreviations we haven't used ourselves.
        </p>
      </BrandSection>

      <BrandSection id="usage-title" title="Usage">
        <div className="flex max-w-2xl flex-col gap-5">
          <p className="text-lead m-0 text-ink-muted">
            You're welcome to use our assets to reference Zephyr Cloud — in articles, talks, integrations, or anywhere
            you're talking about us. Please don't modify the logo or wordmark, and avoid using them in ways that suggest
            an official partnership or endorsement.
          </p>
          <p className="text-lead m-0 text-ink-muted">
            Questions?{' '}
            <a href="mailto:press@zephyr-cloud.io" className={inlineLink}>
              press@zephyr-cloud.io
            </a>
          </p>
        </div>
      </BrandSection>

      <BrandSection
        id="wordmark-title"
        title="Wordmark"
        intro={
          <p className="m-0">
            The wordmark is our primary brand identifier, combining the logo mark and the Zephyr Cloud logotype. It's
            the preferred asset for most contexts — headers, presentations, co-marketing materials, and anywhere the
            brand needs to be clearly identified. Use the light version on dark backgrounds and the dark version on
            light backgrounds. Always use the SVG; never stretch, recolor, or rasterize it.
          </p>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AssetTile
            src={WordmarkLight}
            alt="Zephyr Cloud wordmark — light"
            width={160}
            download="zephyr-wordmark-light.svg"
          />
          <AssetTile
            src={WordmarkDark}
            alt="Zephyr Cloud wordmark — dark"
            width={160}
            download="zephyr-wordmark-dark.svg"
            light
          />
        </div>
      </BrandSection>

      <BrandSection
        id="logo-mark-title"
        title="Logo mark"
        intro={
          <p className="m-0">
            The logo mark is the standalone symbol — the interconnected arcs that form the Zephyr Cloud icon. Use it in
            compact spaces where the full wordmark wouldn't be legible: app icons, favicons, social media avatars, and
            small UI contexts. It should never appear at a size where the detail is lost.
          </p>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <AssetTile src={LogoLight} alt="Zephyr Cloud logo — light" width={64} download="zephyr-logo-light.svg" />
          <AssetTile src={LogoDark} alt="Zephyr Cloud logo — dark" width={64} download="zephyr-logo-dark.svg" light />
        </div>
      </BrandSection>

      <BrandSection
        id="colors-title"
        title="Colors"
        intro={
          <p className="m-0">
            Our core brand palette. <span className="sm:hidden">Tap any swatch to copy the hex value.</span>
            <span className="hidden sm:inline">Hover any swatch to copy the hex value.</span>
          </p>
        }
      >
        <div className="grid gap-4 sm:grid-cols-3">
          {BRAND_COLORS.map((color) => (
            <ColorSwatch key={color.hex} {...color} onCopy={(hex) => showToast(`${hex} copied to clipboard`)} />
          ))}
        </div>
      </BrandSection>

      <CopyToast message={toastMsg} visible={toastVisible} />
    </>
  );
}
