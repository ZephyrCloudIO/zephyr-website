import { Button } from '@/components/ui/button';
import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import cloudflare from '@/images/clouds/cloudflare_white.webp';
import fastly from '@/images/clouds/fastly_white.webp';
import vercel from '@/images/clouds/vercel_white.webp';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Check, ChevronRight, Minus } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

// ── Constants ─────────────────────────────────────────────────────────────────

const ANNUAL_DISCOUNT = 0.85;

const PRO_BANDS = [
  { min: 2, max: 10, rate: 39, midpoint: 6, label: '2 – 10 seats' },
  { min: 11, max: 25, rate: 32, midpoint: 18, label: '11 – 25 seats' },
  { min: 26, max: 50, rate: 27, midpoint: 38, label: '26 – 50 seats' },
  { min: 51, max: 75, rate: 24, midpoint: 63, label: '51 – 75 seats' },
];

const INTRO_RATE = PRO_BANDS[0].rate;

function getProRate(seats: number) {
  return PRO_BANDS.find((b) => seats >= b.min && seats <= b.max)?.rate ?? 24;
}

function getBandIndex(seats: number) {
  return PRO_BANDS.findIndex((b) => seats >= b.min && seats <= b.max);
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US');
}

// ── Page ──────────────────────────────────────────────────────────────────────

function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [path, setPath] = useState<'mf' | 'nonmf' | null>(null);
  const [proSeats, setProSeats] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const billingRef = useRef<HTMLDivElement>(null);
  const isAnnual = billing === 'annual';

  // URL param pre-selection
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('for');
    if (p === 'mf') setPath('mf');
    else if (p === 'teams' || p === 'nonmf') setPath('nonmf');
  }, []);

  // Scroll to billing when path selected
  function selectPath(p: 'mf' | 'nonmf') {
    setPath(p);
    setTimeout(() => billingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
  }

  // Pro calculator values
  const rate = getProRate(proSeats);
  const effectiveRate = isAnnual ? Math.round(rate * ANNUAL_DISCOUNT * 100) / 100 : rate;
  const moTotal = Math.round(proSeats * effectiveRate);
  const yrTotal = Math.round(proSeats * rate * 12 * ANNUAL_DISCOUNT);
  const yrFull = proSeats * rate * 12;
  const yrSave = Math.round(yrFull - yrTotal);
  const bandIdx = getBandIndex(proSeats);

  const faqs = [
    {
      q: 'Do I need Module Federation to get value from Zephyr?',
      a: 'No. BYOC, instant rollbacks, and environment variables without redeploying are available on Pro — none of them require Module Federation. MF-native features are additive. Many teams start without MF and adopt it later once they see how Zephyr handles composition.',
    },
    {
      q: 'How does Pro pricing work as the team grows?',
      a: "Pro starts at $39/seat for teams of 2–10. At 11–25 seats the rate drops to $32/seat. At 26–50 seats it's $27/seat. At 51–75 seats it's $24/seat — 38% less than the intro rate. Use the calculator on this page to see your exact price. No custom quote wall until Enterprise at 76+ seats.",
    },
    {
      q: 'What happens when we hit 76 seats?',
      a: "You move to Enterprise — custom pricing, quoted same day, no RFP required. Enterprise is volume-based, so the per-seat rate continues to decrease as you scale beyond 75 seats. There's no cliff and no surprise. Reach out to sales and we'll turn around a number before your next internal meeting.",
    },
    {
      q: 'What is BYOC — and what does it mean for our data?',
      a: "Bring Your Own Cloud. Your deployments go to your own cloud infrastructure — Cloudflare, AWS, Fastly, Akamai, or Vercel — not Zephyr's servers. Your data never leaves your cloud account. This answers most data residency questions before your security team asks them, and simplifies DPA conversations significantly for regulated sectors. No infrastructure migration is required to get started.",
    },
    {
      q: 'Are there overage charges for bandwidth or storage?',
      a: "Pro includes 1.5TB bandwidth and 500GB storage. If you exceed these, we'll reach out before charging anything — there are no automatic overage fees that show up on your bill without warning. Enterprise includes custom bandwidth and storage limits agreed upfront, so procurement always knows the ceiling.",
    },
    {
      q: 'Can we pay by invoice or purchase order?',
      a: "Yes. Enterprise invoicing and PO-based billing are standard. Pro can be paid by credit card monthly or annually. If your procurement process requires an invoice for Pro, contact sales and we'll accommodate it.",
    },
    {
      q: 'What makes the MF-native features different?',
      a: "They were built from first principles by the team that created Module Federation. Environment Overrides, DevTools, UML, and zephyr.dependencies aren't integrations layered on top of MF — they require authorship-level understanding of how MF works. No other platform offers these because no other platform built the underlying technology.",
    },
    {
      q: "Is a data processing agreement available? We're in a regulated sector.",
      a: "Yes. DPAs are available on Enterprise. Zephyr is SOC 2 compliant and BYOC-first — your data stays in your own cloud, which simplifies most data residency conversations significantly. If you need a DPA as part of a POC, reach out to sales and we'll accommodate it.",
    },
    {
      q: 'Is there an annual discount?',
      a: 'Yes — 15% off on Pro when billed annually. Toggle above to see annual pricing reflected in the calculator.',
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── HERO ── */}
      <section className="px-6 pt-20 pb-12 text-center max-w-3xl mx-auto">
        <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-4">Pricing</div>
        <h1 className="text-5xl font-black tracking-tight mb-4 leading-tight">
          Deployment that fits
          <br />
          <span className="text-emerald-400">where your team actually is.</span>
        </h1>
        <p className="text-neutral-400 text-lg">
          Whether you're running Module Federation or not, Zephyr meets you there — and the price goes down as your team
          scales up.
        </p>
      </section>

      {/* ── PATH SELECTOR ── */}
      <section className="max-w-2xl mx-auto px-6 pb-4">
        <div className="grid grid-cols-2 gap-4">
          {/* MF card */}
          <button
            onClick={() => selectPath('mf')}
            className={cn(
              'relative text-left rounded-xl border p-6 transition-all duration-200',
              path === 'mf'
                ? 'border-emerald-500 bg-emerald-900/20 shadow-lg shadow-emerald-900/30'
                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-600',
            )}
          >
            {path === 'mf' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-black" />
              </div>
            )}
            <div className="text-2xl mb-3">⚡</div>
            <div className="font-bold text-sm mb-1">We use Module Federation</div>
            <div className="text-xs text-neutral-400">
              We're running MF and need a proper deployment platform built around it.
            </div>
          </button>

          {/* Non-MF card */}
          <button
            onClick={() => selectPath('nonmf')}
            className={cn(
              'relative text-left rounded-xl border p-6 transition-all duration-200',
              path === 'nonmf'
                ? 'border-emerald-500 bg-emerald-900/20 shadow-lg shadow-emerald-900/30'
                : 'border-neutral-800 bg-neutral-900 hover:border-neutral-600',
            )}
          >
            {path === 'nonmf' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                <Check className="w-3 h-3 text-black" />
              </div>
            )}
            <div className="text-2xl mb-3">🚀</div>
            <div className="font-bold text-sm mb-1">We don't use MF yet</div>
            <div className="text-xs text-neutral-400">
              We want cloud-agnostic deployments, better rollbacks, and a faster pipeline.
            </div>
          </button>
        </div>
        {!path && (
          <p className="text-center text-xs text-neutral-500 mt-3">
            Select your situation to see what matters most to your team.
          </p>
        )}
      </section>

      {/* ── VALUE PANELS ── */}
      {path === 'mf' && (
        <section className="max-w-3xl mx-auto px-6 py-8">
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/20 p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              For Module Federation teams
            </div>
            <h2 className="text-2xl font-black mb-6">
              You adopted MF. Now you need the platform <em>built around it.</em>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  problem:
                    "CI is a bottleneck for critical deploys. You're waiting on pipelines to push a config change.",
                  solution: 'Environment Overrides',
                  mf: true,
                },
                {
                  problem:
                    'Engineers maintain internal tooling just to develop locally against MFEs. It eats sprint capacity every cycle.',
                  solution: 'Zephyr DevTools',
                  mf: true,
                },
                {
                  problem:
                    'No visibility into who deployed what across remotes. Audit and compliance reviews are painful.',
                  solution: 'Audit logs + Activity',
                  mf: false,
                },
              ].map((item, i) => (
                <div key={i} className="bg-black/40 rounded-lg p-4 border border-neutral-800">
                  <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">The problem</div>
                  <p className="text-sm text-neutral-300 mb-3">{item.problem}</p>
                  <div className="text-sm font-semibold text-emerald-400">
                    → {item.solution}
                    {item.mf && (
                      <span className="ml-2 text-xs bg-violet-900/50 text-violet-300 border border-violet-700/50 px-1.5 py-0.5 rounded font-bold">
                        MF
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {path === 'nonmf' && (
        <section className="max-w-3xl mx-auto px-6 py-8">
          <div className="rounded-xl border border-emerald-800/40 bg-emerald-950/20 p-8">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              For teams not yet on Module Federation
            </div>
            <h2 className="text-2xl font-black mb-6">
              Your deployment stack shouldn't be <em>owned by your cloud provider.</em>
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  problem: "You're locked to Vercel or Netlify. Migrating or going multi-cloud is a project in itself.",
                  solution: 'BYOC — bring your own cloud',
                },
                {
                  problem:
                    "Rollbacks mean redeploying. When something breaks in production, you're waiting on the pipeline.",
                  solution: 'Instant rollbacks, any cloud',
                },
                {
                  problem:
                    'Changing an environment variable triggers a full redeploy. Small config changes block shipping.',
                  solution: 'Env Variables, no redeploy',
                },
              ].map((item, i) => (
                <div key={i} className="bg-black/40 rounded-lg p-4 border border-neutral-800">
                  <div className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2">The problem</div>
                  <p className="text-sm text-neutral-300 mb-3">{item.problem}</p>
                  <div className="text-sm font-semibold text-emerald-400">→ {item.solution}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BILLING TOGGLE ── */}
      <div ref={billingRef} className="flex justify-center py-8">
        <div className="flex rounded-full bg-neutral-900 border border-neutral-800 p-1">
          <button
            onClick={() => setBilling('monthly')}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold transition-all',
              billing === 'monthly' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white',
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling('annual')}
            className={cn(
              'px-5 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2',
              billing === 'annual' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white',
            )}
          >
            Annual
            <span
              className={cn(
                'text-xs font-bold px-1.5 py-0.5 rounded',
                billing === 'annual' ? 'bg-emerald-600 text-white' : 'bg-emerald-900/60 text-emerald-400',
              )}
            >
              Save 15%
            </span>
          </button>
        </div>
      </div>

      {/* ── TIER CARDS ── */}
      <section className="max-w-5xl mx-auto px-6 pb-6">
        <div className="grid md:grid-cols-3 gap-6">
          {/* FREE */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-7 flex flex-col">
            <div className="text-lg font-black mb-1">Free</div>
            <div className="text-4xl font-black tracking-tight mb-1">$0</div>
            <div className="text-xs text-neutral-500 mb-1">forever</div>
            <div className="text-xs text-neutral-500 mb-4">1 seat · no credit card required</div>
            <p className="text-sm text-neutral-400 mb-5">
              For individuals exploring Zephyr. One cloud integration, all bundlers, and tag-based environments — free
              forever.
            </p>
            <Button
              asChild
              className="w-full mb-4 border border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
            >
              <a href="https://app.zephyr-cloud.io/" target="_blank">
                Get started free <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <ul className="space-y-2.5 mt-auto">
              {[
                '1 cloud integration',
                'All 15 bundler plugins',
                'Basic version history',
                'Tag / branch env creation',
                '120GB bandwidth · 50GB storage',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* PRO — featured */}
          <div className="relative rounded-2xl border border-emerald-600 bg-neutral-900 p-7 flex flex-col shadow-xl shadow-emerald-900/20">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
            </div>
            <div className="text-lg font-black mb-1">Pro</div>
            <div className="text-xs text-emerald-400 font-semibold mb-0.5">starting at</div>
            <div className="text-4xl font-black tracking-tight mb-0.5">
              {isAnnual ? fmt(Math.round(INTRO_RATE * ANNUAL_DISCOUNT)) : fmt(INTRO_RATE)}
            </div>
            <div className="text-xs text-neutral-400 mb-1">
              per seat / mo ·{' '}
              <a href="#pro-calc" className="text-emerald-400 font-semibold hover:underline">
                use the calculator ↓
              </a>
            </div>
            <div className="text-xs text-neutral-500 mb-4">2 – 75 seats · costs decrease as your team scales</div>
            <p className="text-sm text-neutral-400 mb-4">
              The full platform. BYOC, MF-native features, per-team permissions, and audit logs — everything a scaling
              engineering team needs.
            </p>
            <Button asChild className="w-full mb-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold">
              <a href="https://app.zephyr-cloud.io/" target="_blank">
                Start free 30-day trial <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <p className="text-xs text-neutral-500 text-center mb-5">
              No credit card required · full Pro access · keep your data after trial
            </p>
            <p className="text-xs text-neutral-500 mb-5">Up and running in under 15 minutes.</p>
            <ul className="space-y-2.5 mt-auto">
              {[
                { label: 'BYOC — any cloud', mf: false },
                { label: 'All cloud integrations', mf: false },
                { label: 'Instant rollbacks', mf: false },
                { label: 'Full version history', mf: false },
              ].map((f) => (
                <li key={f.label} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                  <strong>{f.label}</strong>
                </li>
              ))}
              <li className="border-t border-neutral-800 pt-2.5" />
              {[
                { label: 'Environment Overrides', mf: true },
                { label: 'Env Variables — no redeploy', mf: false },
                { label: 'Zephyr DevTools', mf: true },
                { label: 'UML architecture map', mf: true },
                { label: 'zephyr.dependencies', mf: true },
              ].map((f) => (
                <li
                  key={f.label}
                  className={cn(
                    'flex items-start gap-2 text-sm',
                    path === 'nonmf' && f.mf ? 'opacity-40' : 'text-neutral-300',
                  )}
                >
                  <Check className="h-4 w-4 text-violet-400 mt-0.5 shrink-0" />
                  <span>
                    <strong>{f.label}</strong>
                    {f.mf && (
                      <span className="ml-1.5 text-xs bg-violet-900/50 text-violet-300 border border-violet-700/50 px-1.5 py-0.5 rounded font-bold">
                        MF
                      </span>
                    )}
                  </span>
                </li>
              ))}
              <li className="border-t border-neutral-800 pt-2.5" />
              {[
                'Per-team deploy permissions',
                '30-day audit logs',
                'Application activity log',
                'Up to 75 collaborators',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* ENTERPRISE */}
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-7 flex flex-col">
            <div className="text-lg font-black mb-1">Enterprise</div>
            <div className="text-4xl font-black tracking-tight mb-1">Custom</div>
            <div className="text-xs text-neutral-500 mb-1">&nbsp;</div>
            <div className="text-xs text-neutral-500 mb-4">76+ seats · no RFP required · quote same day</div>
            <p className="text-sm text-neutral-400 mb-5">
              For large orgs and regulated sectors. SSO, extended audit retention, DPA, dedicated support, and custom
              SLAs. Pay by invoice. POC / pilot available.
            </p>
            <Button
              asChild
              className="w-full mb-4 border border-neutral-700 bg-neutral-800 text-white hover:bg-neutral-700"
            >
              <a href="mailto:inbound@zephyr-cloud.io?subject=Enterprise" target="_blank">
                Talk to sales <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
            <ul className="space-y-2.5 mt-auto">
              <li className="flex items-start gap-2 text-sm text-neutral-300">
                <Check className="h-4 w-4 text-emerald-500 mt-0.5 shrink-0" />
                <strong>Everything in Pro</strong>
              </li>
              <li className="border-t border-neutral-800 pt-2.5" />
              {[
                'SSO / SAML',
                '60–90 day audit logs',
                '99.9% uptime SLA',
                'Data Processing Agreement',
                'SOC 2 compliant',
                'Dedicated support',
                'Custom bandwidth / storage',
                'Custom SLAs',
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-neutral-300">
                  <Check className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── PRO CALCULATOR ── */}
      <section id="pro-calc" className="max-w-3xl mx-auto px-6 py-12">
        <div className="rounded-2xl border border-neutral-800 bg-neutral-900 p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-xl font-black mb-1">Pro — see your exact price</h2>
              <p className="text-sm text-neutral-400">
                The more seats you add, the less you pay per seat. Click a tier or drag the slider.
              </p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-1">
                {isAnnual ? 'Effective per month (annual)' : 'Total per month'}
              </div>
              <div className="text-4xl font-black tracking-tight">{fmt(moTotal)}</div>
              <div className="text-xs text-neutral-400 mt-1">
                {isAnnual
                  ? `Billed as ${fmt(yrTotal)}/yr · you save ${fmt(yrSave)}`
                  : `${fmt(yrTotal)}/yr with annual billing — save ${fmt(yrSave)}`}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs text-neutral-500 font-semibold uppercase tracking-wider">Seats</span>
              <span className="text-sm font-bold">
                {proSeats} seat{proSeats !== 1 ? 's' : ''}
              </span>
            </div>
            <input
              type="range"
              min={2}
              max={75}
              value={proSeats}
              onChange={(e) => setProSeats(parseInt(e.target.value))}
              className="w-full h-2 appearance-none rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, rgb(5 150 105) 0%, rgb(16 185 129) ${((proSeats - 2) / 73) * 100}%, rgb(38 38 38) ${((proSeats - 2) / 73) * 100}%)`,
              }}
            />
          </div>

          {/* Band cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {PRO_BANDS.map((band, i) => {
              const displayRate = isAnnual ? Math.round(band.rate * ANNUAL_DISCOUNT) : band.rate;
              const saving = Math.round((1 - band.rate / INTRO_RATE) * 100);
              return (
                <button
                  key={i}
                  onClick={() => setProSeats(band.midpoint)}
                  className={cn(
                    'text-left rounded-xl border p-4 transition-all duration-150 cursor-pointer',
                    bandIdx === i
                      ? 'border-emerald-500 bg-emerald-900/20'
                      : 'border-neutral-700 bg-neutral-800/50 hover:border-neutral-600',
                  )}
                >
                  <div
                    className={cn(
                      'text-xs font-semibold mb-1',
                      bandIdx === i ? 'text-emerald-400' : 'text-neutral-400',
                    )}
                  >
                    {band.label}
                  </div>
                  <div className="text-xl font-black">{fmt(displayRate)}</div>
                  <div className="text-xs text-neutral-500">per seat / {isAnnual ? 'mo (annual)' : 'mo'}</div>
                  <div className="text-xs text-neutral-500 mt-1">
                    {saving === 0 ? 'introductory rate' : `${saving}% less than intro`}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-neutral-800 pt-6 text-sm text-neutral-400">
            <div>
              Per seat{' '}
              <strong className="block text-white">
                {fmt(effectiveRate)}
                {isAnnual ? ` (was ${fmt(rate)})` : ''}
              </strong>
            </div>
            <div>
              Monthly total <strong className="block text-white">{fmt(moTotal)}</strong>
            </div>
            <div>
              Annual total <strong className="block text-white">{fmt(yrTotal)}</strong>
            </div>
            <div>
              Annual savings <strong className="block text-emerald-400">{fmt(yrSave)}</strong>
            </div>
          </div>
          <div className="mt-4 text-sm text-neutral-500">
            Need 76+ seats?{' '}
            <a
              href="mailto:inbound@zephyr-cloud.io?subject=Enterprise"
              className="text-emerald-400 hover:underline font-semibold"
            >
              Talk to sales for Enterprise pricing
            </a>{' '}
            — volume rates, quoted same day.
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="max-w-3xl mx-auto px-6 pb-12 space-y-4">
        {/* Quote */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8 grid sm:grid-cols-[1fr_auto] gap-6 items-center">
          <div>
            <p className="text-base font-semibold text-white leading-relaxed italic">
              "Zephyr gave us the deployment orchestration layer we'd been trying to build internally for two years. We
              stopped writing tooling and started shipping product."
            </p>
            <p className="text-xs text-neutral-500 mt-3">
              Engineering leadership ·{' '}
              <strong className="text-neutral-400">Southern Glazer's Wine &amp; Spirits</strong> · one of the largest
              distributors in the United States
            </p>
          </div>
          <div className="text-right shrink-0">
            <div className="text-base font-black text-white leading-tight">
              Southern
              <br />
              Glazer's
            </div>
            <div className="text-xs text-neutral-500 mt-1 uppercase tracking-wider">Enterprise customer</div>
          </div>
        </div>

        {/* Stats */}
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-6 grid grid-cols-2 gap-6 divide-x divide-neutral-800">
          <div className="pr-6">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Teams using Zephyr report
            </div>
            <div className="text-4xl font-black tracking-tight">1.5 sprints</div>
            <div className="text-sm text-neutral-400 mt-1">
              recovered per quarter by eliminating internal MF tooling
            </div>
          </div>
          <div className="pl-6">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Average time to first deploy
            </div>
            <div className="text-4xl font-black tracking-tight">&lt; 15 min</div>
            <div className="text-sm text-neutral-400 mt-1">
              from signup to first cloud deployment — no infrastructure migration required
            </div>
          </div>
        </div>
      </section>

      {/* ── PROOF BAR ── */}
      <section className="border-y border-neutral-800 bg-neutral-900/50 py-6 mb-12">
        <div className="max-w-3xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-4">
          {[
            { num: '6,213+', label: 'Monthly active users' },
            { num: '15+', label: 'Bundler integrations' },
            { num: '6+', label: 'Cloud integrations' },
            { num: '15+', label: 'Countries' },
            { num: 'SOC 2', label: 'Compliant' },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-xl font-black text-white">{s.num}</div>
              <div className="text-xs text-neutral-500">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURE TABLE ── */}
      <section className="max-w-4xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-black text-center mb-2">Everything in the platform</h2>
        <p className="text-neutral-400 text-center text-sm mb-8">Every feature, every tier.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800">
                <th className="text-left pb-3 text-neutral-400 font-semibold w-2/5">Feature</th>
                <th className="pb-3 text-center text-neutral-400 font-semibold">Free</th>
                <th className="pb-3 text-center text-emerald-400 font-bold">Pro</th>
                <th className="pb-3 text-center text-neutral-400 font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                { group: 'Deployment' },
                { feat: 'Cloud integrations', free: '1', pro: 'All', ent: 'All' },
                { feat: 'Bundler plugins (15)', free: true, pro: true, ent: true },
                { feat: 'BYOC', free: false, pro: true, ent: true },
                { feat: 'Instant rollbacks', free: false, pro: true, ent: true },
                { feat: 'Tag / branch env creation', free: true, pro: true, ent: true },
                { feat: 'Version history', free: 'Limited', pro: true, ent: 'Custom' },
                { group: 'Module Federation Native' },
                { feat: 'Environment Overrides', free: false, pro: true, ent: true, mf: true },
                { feat: 'Env Variables (no redeploy)', free: false, pro: true, ent: true },
                { feat: 'Zephyr DevTools', free: false, pro: true, ent: true, mf: true },
                { feat: 'UML architecture map', free: false, pro: true, ent: true, mf: true },
                { feat: 'zephyr.dependencies', free: false, pro: true, ent: true, mf: true },
                { group: 'Teams & Access' },
                { feat: 'Collaborators', free: false, pro: 'Up to 75', ent: 'Unlimited' },
                { feat: 'Per-team deploy permissions', free: false, pro: true, ent: true },
                { feat: 'SSO / SAML', free: false, pro: false, ent: true },
                { group: 'Security & Compliance' },
                { feat: 'Application activity log', free: false, pro: true, ent: true },
                { feat: 'Audit log retention', free: false, pro: '30 days', ent: '60–90 days' },
                { feat: 'SOC 2 compliance', free: false, pro: false, ent: true },
                { feat: 'Data Processing Agreement', free: false, pro: false, ent: true },
                { feat: 'Uptime SLA', free: false, pro: false, ent: '99.9%' },
              ].map((row, i) => {
                if ('group' in row) {
                  return (
                    <tr key={i} className="border-b border-neutral-800">
                      <td colSpan={4} className="py-3 text-xs font-bold uppercase tracking-widest text-neutral-500">
                        {row.group}
                        {row.group === 'Module Federation Native' && (
                          <span className="ml-2 text-xs bg-violet-900/50 text-violet-300 border border-violet-700/50 px-1.5 py-0.5 rounded font-bold normal-case tracking-normal">
                            MF
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                }
                const cell = (val: boolean | string | undefined, highlight = false) => {
                  if (val === true)
                    return (
                      <Check className={cn('h-4 w-4 mx-auto', highlight ? 'text-emerald-400' : 'text-emerald-600')} />
                    );
                  if (val === false) return <Minus className="h-4 w-4 mx-auto text-neutral-700" />;
                  return (
                    <span className={cn('text-xs', highlight ? 'text-emerald-400 font-semibold' : 'text-neutral-400')}>
                      {val}
                    </span>
                  );
                };
                return (
                  <tr key={i} className="border-b border-neutral-800/50 hover:bg-neutral-900/30">
                    <td className={cn('py-3 pr-4 text-neutral-300', path === 'nonmf' && row.mf && 'opacity-40')}>
                      {row.feat}
                      {row.mf && (
                        <span className="ml-1.5 text-xs bg-violet-900/50 text-violet-300 border border-violet-700/50 px-1 py-0.5 rounded font-bold">
                          MF
                        </span>
                      )}
                    </td>
                    <td className="py-3 text-center">{cell(row.free)}</td>
                    <td className="py-3 text-center bg-emerald-900/5">{cell(row.pro, true)}</td>
                    <td className="py-3 text-center">{cell(row.ent)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── BYOC CLOUD LOGOS ── */}
      <section className="max-w-3xl mx-auto px-6 pb-16">
        <div className="rounded-xl border border-neutral-800 bg-neutral-900 p-8">
          <div className="text-center mb-6">
            <div className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-2">
              Bring Your Own Cloud
            </div>
            <h2 className="text-xl font-black">Deploy to your cloud. Your data never leaves.</h2>
            <p className="text-sm text-neutral-400 mt-2">
              No vendor lock-in. Switch clouds with one click. Multi-cloud supported.
            </p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {[
              { src: cloudflare, alt: 'Cloudflare', dim: false },
              { src: fastly, alt: 'Fastly', dim: false },
              { src: akamai, alt: 'Akamai', dim: false },
              { src: aws, alt: 'AWS', dim: true },
              { src: vercel, alt: 'Vercel', dim: true },
            ].map(({ src, alt, dim }) => (
              <img
                key={alt}
                src={src}
                alt={alt}
                title={dim ? 'Coming Soon' : undefined}
                className={cn(
                  'h-7 w-auto',
                  dim ? 'opacity-30 grayscale' : 'opacity-70 hover:opacity-100 transition-opacity',
                )}
              />
            ))}
          </div>
          <p className="text-xs text-neutral-600 text-center mt-4">
            Available on all paid plans · More providers coming soon
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="max-w-2xl mx-auto px-6 pb-16">
        <h2 className="text-2xl font-black text-center mb-8">Common questions</h2>
        <div className="space-y-1">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-neutral-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full text-left px-5 py-4 flex justify-between items-center text-sm font-semibold hover:bg-neutral-900 transition-colors"
              >
                {faq.q}
                <span
                  className={cn('ml-4 shrink-0 text-neutral-400 transition-transform', openFaq === i && 'rotate-45')}
                >
                  +
                </span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-sm text-neutral-400 leading-relaxed border-t border-neutral-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="max-w-2xl mx-auto px-6 pb-20 text-center">
        <h2 className="text-4xl font-black tracking-tight mb-2">
          Start free.
          <br />
          <span className="text-emerald-400">No cliff. No lock-in.</span>
        </h2>
        <p className="text-neutral-400 mb-8">One cloud integration free, forever. Upgrade when your team is ready.</p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-3">
            <a href="https://app.zephyr-cloud.io/" target="_blank">
              Start for free <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
          <Button
            asChild
            className="border border-neutral-700 bg-transparent text-white hover:bg-neutral-900 font-semibold px-8 py-3"
          >
            <a href="mailto:inbound@zephyr-cloud.io?subject=Sales" target="_blank">
              Talk to sales
            </a>
          </Button>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-neutral-500">
          {[
            'No credit card required',
            'Cancel anytime',
            'BYOC — your data stays in your cloud',
            'Invoice billing available',
            'Export your data anytime',
          ].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block" />
              {t}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
