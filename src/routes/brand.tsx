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
      <div className="container mx-auto px-4 py-20 max-w-4xl">
        {/* Hero */}
        <div className="mb-20">
          <h1 className="text-5xl font-medium leading-tight mb-4">Zephyr Cloud Brand Guidelines</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
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
          <p className="text-muted-foreground mb-6">
            When referring to us in writing, use <strong className="text-foreground">Zephyr Cloud</strong> — two words,
            both capitalized. Do not use "ZephyrCloud", "zephyr cloud", or "zephyr" as a standalone product name.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-xs font-medium text-emerald-500 uppercase tracking-wider mb-3">Correct</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  Zephyr Cloud
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                  Built with Zephyr Cloud
                </li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <p className="text-xs font-medium text-red-500 uppercase tracking-wider mb-3">Incorrect</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2 line-through opacity-60">ZephyrCloud</li>
                <li className="flex items-center gap-2 line-through opacity-60">zephyr cloud</li>
                <li className="flex items-center gap-2 line-through opacity-60">Zephyr (as a product name alone)</li>
              </ul>
            </div>
          </div>
        </section>

        <SectionDivider />

        {/* Usage */}
        <section>
          <h2 className="text-2xl font-medium mb-4">Usage</h2>
          <p className="text-muted-foreground mb-6">
            Our brand assets are protected intellectual property. You may use them to reference Zephyr Cloud in
            editorial contexts. You may not use them in a way that implies endorsement, partnership, or affiliation
            without written permission.
          </p>
          <div className="bg-card border border-border rounded-xl p-6 space-y-3 text-sm text-muted-foreground">
            <p className="flex items-start gap-3">
              <span className="text-red-500 font-medium shrink-0">✕</span>
              Do not modify, distort, rotate, or recolor the logo or wordmark.
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-500 font-medium shrink-0">✕</span>
              Do not place the logo on backgrounds that reduce legibility.
            </p>
            <p className="flex items-start gap-3">
              <span className="text-red-500 font-medium shrink-0">✕</span>
              Do not combine our logo with other logos or icons without approval.
            </p>
            <p className="flex items-start gap-3">
              <span className="text-emerald-500 font-medium shrink-0">✓</span>
              Use the light version on dark backgrounds, and the dark version on light backgrounds.
            </p>
            <p className="flex items-start gap-3">
              <span className="text-emerald-500 font-medium shrink-0">✓</span>
              Maintain clear space equal to the height of the "Z" on all sides of the mark.
            </p>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            For licensing inquiries, email{' '}
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
