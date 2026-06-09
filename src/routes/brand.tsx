import { CopyToast } from '@/components/CopyToast';
import { Button } from '@/components/ui/button';
import LogoDark from '@/images/logo-dark.svg';
import LogoLight from '@/images/logo-light.svg';
import WordmarkDark from '@/images/wordmark-dark.svg';
import WordmarkLight from '@/images/wordmark-light.svg';
import { createFileRoute } from '@tanstack/react-router';
import { Check, Copy, Download } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/brand')({
  component: BrandPage,
});

type BrandColor = {
  name: string;
  hex: string;
  rgb: [number, number, number];
  light: boolean;
};

const BRAND_COLORS: BrandColor[] = [
  { name: 'Black', hex: '#0A0A0A', rgb: [10, 10, 10], light: false },
  { name: 'White', hex: '#FFFFFF', rgb: [255, 255, 255], light: true },
  { name: 'Violet', hex: '#7C3AED', rgb: [124, 58, 237], light: false },
];

const CARD_BTN =
  'opacity-100 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100 transition-opacity text-xs';

function ColorSwatch({ name, hex, rgb, light, onCopy }: BrandColor & { onCopy: (hex: string) => void }) {
  const [active, setActive] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActive(true);
    timeoutRef.current = setTimeout(() => setActive(false), 1500);
    onCopy(hex);
  };

  const textClass = light ? 'text-black/80' : 'text-white/80';
  const metaClass = light ? 'text-black/40' : 'text-white/40';

  return (
    <div
      className="group relative rounded-xl min-h-52 flex flex-col justify-center p-5 overflow-hidden border border-border"
      style={{ backgroundColor: hex }}
    >
      <p className={`text-sm font-medium ${textClass}`}>{name}</p>
      <p className={`text-xs mt-0.5 font-mono ${metaClass}`}>
        {hex} · {rgb[0]}, {rgb[1]}, {rgb[2]}
      </p>
      <Button variant="secondary" size="sm" onClick={handleCopy} className={`absolute bottom-4 right-4 ${CARD_BTN}`}>
        {active ? <Check className="size-3" /> : <Copy className="size-3" />}
        {active ? 'Copied!' : 'Copy hex'}
      </Button>
    </div>
  );
}

function SectionDivider() {
  return <div className="border-t border-border my-16" />;
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-medium leading-tight mb-4">Zephyr Cloud Brand Guidelines</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Resources and guidelines for using our brand assets. Please read these guidelines before using our logo,
            wordmark, or colors.
          </p>
          <a
            href="https://assets.zephyr-cloud.io/ZephyrCloud-Brand-Assets.zip"
            download="ZephyrCloud-Brand-Assets.zip"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Brand Assets
          </a>
        </div>

        <SectionDivider />

        {/* Naming */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Naming</h2>
          <p className="text-muted-foreground">
            When referring to us in writing, use Zephyr Cloud — two words, both capitalized. Zephyr is also acceptable
            as a shorthand in informal or repeated references. Do not use "ZephyrCloud" as one word, all-lowercase
            variants, or abbreviations we haven't used ourselves.
          </p>
        </section>

        <SectionDivider />

        {/* Usage */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Usage</h2>
          <p className="text-muted-foreground mb-4">
            You're welcome to use our assets to reference Zephyr Cloud — in articles, talks, integrations, or anywhere
            you're talking about us. Please don't modify the logo or wordmark, and avoid using them in ways that suggest
            an official partnership or endorsement.
          </p>
          <p className="text-muted-foreground">
            Questions?{' '}
            <a
              href="mailto:press@zephyr-cloud.io"
              className="text-foreground underline underline-offset-2 decoration-border hover:decoration-foreground transition-colors"
            >
              press@zephyr-cloud.io
            </a>
          </p>
        </section>

        <SectionDivider />

        {/* Wordmark */}
        <section>
          <h2 className="text-2xl font-medium mb-2">Wordmark</h2>
          <p className="text-muted-foreground mb-8">
            The wordmark is our primary brand identifier, combining the logo mark and the Zephyr Cloud logotype. It's
            the preferred asset for most contexts — headers, presentations, co-marketing materials, and anywhere the
            brand needs to be clearly identified. Use the light version on dark backgrounds and the dark version on
            light backgrounds. Always use the SVG; never stretch, recolor, or rasterize it.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group relative bg-card border border-border rounded-xl flex items-center justify-center min-h-52">
              <img src={WordmarkLight} alt="Zephyr Cloud wordmark — light" width={160} />
              <Button variant="secondary" size="sm" asChild className={`absolute bottom-4 right-4 ${CARD_BTN}`}>
                <a href={WordmarkLight} download="zephyr-wordmark-light.svg">
                  <Download className="size-3" />
                  Download SVG
                </a>
              </Button>
            </div>
            <div className="group relative bg-white border border-border rounded-xl flex items-center justify-center min-h-52">
              <img src={WordmarkDark} alt="Zephyr Cloud wordmark — dark" width={160} />
              <Button variant="secondary" size="sm" asChild className={`absolute bottom-4 right-4 ${CARD_BTN}`}>
                <a href={WordmarkDark} download="zephyr-wordmark-dark.svg">
                  <Download className="size-3" />
                  Download SVG
                </a>
              </Button>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Logo Mark */}
        <section>
          <h2 className="text-2xl font-medium mb-2">Logo Mark</h2>
          <p className="text-muted-foreground mb-8">
            The logo mark is the standalone symbol — the interconnected arcs that form the Zephyr Cloud icon. Use it in
            compact spaces where the full wordmark wouldn't be legible: app icons, favicons, social media avatars, and
            small UI contexts. It should never appear at a size where the detail is lost.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="group relative bg-card border border-border rounded-xl flex items-center justify-center min-h-52">
              <img src={LogoLight} alt="Zephyr Cloud logo — light" width={64} />
              <Button variant="secondary" size="sm" asChild className={`absolute bottom-4 right-4 ${CARD_BTN}`}>
                <a href={LogoLight} download="zephyr-logo-light.svg">
                  <Download className="size-3" />
                  Download SVG
                </a>
              </Button>
            </div>
            <div className="group relative bg-white border border-border rounded-xl flex items-center justify-center min-h-52">
              <img src={LogoDark} alt="Zephyr Cloud logo — dark" width={64} />
              <Button variant="secondary" size="sm" asChild className={`absolute bottom-4 right-4 ${CARD_BTN}`}>
                <a href={LogoDark} download="zephyr-logo-dark.svg">
                  <Download className="size-3" />
                  Download SVG
                </a>
              </Button>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-medium mb-2">Colors</h2>
          <p className="text-muted-foreground mb-8">
            Our core brand palette. <span className="sm:hidden">Tap any swatch to copy the hex value.</span>
            <span className="hidden sm:inline">Hover any swatch to copy the hex value.</span>
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {BRAND_COLORS.map((color) => (
              <ColorSwatch key={color.hex} {...color} onCopy={(hex) => showToast(`${hex} copied to clipboard`)} />
            ))}
          </div>
        </section>
      </div>

      <CopyToast message={toastMsg} visible={toastVisible} />
    </div>
  );
}
