import LogoDark from '@/images/logo-dark.svg';
import LogoLight from '@/images/logo-light.svg';
import WordmarkDark from '@/images/wordmark-dark.svg';
import WordmarkLight from '@/images/wordmark-light.svg';
import { createFileRoute } from '@tanstack/react-router';
import { Check, Copy, Download } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/brand')({
  component: BrandPage,
});

const BRAND_COLORS = [
  { name: 'Brand Navy', hex: '#020917', description: 'Primary background' },
  { name: 'White', hex: '#FFFFFF', description: 'Primary foreground' },
  { name: 'Violet', hex: '#7C3AED', description: 'Primary / CTA' },
  { name: 'Surface', hex: '#171717', description: 'Cards & panels' },
];

function ColorSwatch({ name, hex, description }: { name: string; hex: string; description: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const isLight = hex === '#FFFFFF';

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div
        className="h-32 w-full"
        style={{ backgroundColor: hex, border: isLight ? '1px solid var(--border)' : undefined }}
      />
      <div className="p-4">
        <p className="text-sm font-medium text-foreground">{name}</p>
        <p className="text-xs text-muted-foreground mb-3">{description}</p>
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-mono"
        >
          {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
          {copied ? 'Copied!' : hex}
        </button>
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div className="border-t border-border my-16" />;
}

function BrandPage() {
  return (
    <div className="min-h-screen bg-background text-white">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="text-5xl font-medium leading-tight mb-4">Zephyr Cloud Brand Guidelines</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Resources and guidelines for using our brand assets. Please read these guidelines before using our logo,
            wordmark, or colors.
          </p>
          <a
            href="/ZephyrCloud-Brand-Assets.zip"
            download="ZephyrCloud-Brand-Assets.zip"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-neutral-200 transition-colors"
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
            as a shorthand. Do not use "ZephyrCloud" or "zephyr cloud".
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
            The wordmark is our primary text-based identity. Use it when space allows and legibility is a priority.
            Always download the SVG — do not rasterize.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-12 flex items-center justify-center">
              <img src={WordmarkLight} alt="Zephyr Cloud wordmark — light" width={160} />
            </div>
            <div className="bg-white border border-border rounded-xl p-12 flex items-center justify-center">
              <img src={WordmarkDark} alt="Zephyr Cloud wordmark — dark" width={160} />
            </div>
          </div>
          <a
            href={WordmarkLight}
            download="zephyr-wordmark.svg"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:text-foreground hover:border-neutral-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Wordmark SVG
          </a>
        </section>

        <SectionDivider />

        {/* Logo Mark */}
        <section>
          <h2 className="text-2xl font-medium mb-2">Logo Mark</h2>
          <p className="text-muted-foreground mb-8">
            The logo mark is used when space is limited — app icons, favicons, social media profile pictures, and
            situations where the wordmark would be too small to read.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-12 flex items-center justify-center">
              <img src={LogoLight} alt="Zephyr Cloud logo — light" width={80} />
            </div>
            <div className="bg-white border border-border rounded-xl p-12 flex items-center justify-center">
              <img src={LogoDark} alt="Zephyr Cloud logo — dark" width={80} />
            </div>
          </div>
          <a
            href={LogoLight}
            download="zephyr-logo.svg"
            className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground border border-border rounded-lg hover:text-foreground hover:border-neutral-600 transition-colors"
          >
            <Download className="h-4 w-4" />
            Download Logo SVG
          </a>
        </section>

        <SectionDivider />

        {/* Colors */}
        <section>
          <h2 className="text-2xl font-medium mb-2">Colors</h2>
          <p className="text-muted-foreground mb-8">
            These are the core colors of the Zephyr Cloud brand. Click any hex value to copy it to your clipboard.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BRAND_COLORS.map((color) => (
              <ColorSwatch key={color.hex} {...color} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
