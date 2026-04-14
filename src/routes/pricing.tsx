import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tab } from '@/components/ui/tab';
import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import cloudflare from '@/images/clouds/cloudflare_white.webp';
import fastly from '@/images/clouds/fastly_white.webp';
import vercel from '@/images/clouds/vercel_white.webp';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Check, ChevronRight, Cloud, Infinity, Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

// ── Constants ─────────────────────────────────────────────────────────────────

const ENTERPRISE_SEAT_RATE = 70; // $/seat/month
const ENTERPRISE_FLOOR = 5000; // $/month minimum
const TEAM_SEAT_RATE = 49; // $/seat/month

const TIERS = [
  {
    id: 'personal',
    name: 'Personal',
    description: 'For side projects and personal experiments.',
    price: 'Free',
    cta: 'Get Started',
    href: 'https://app.zephyr-cloud.io/',
    highlight: false,
    features: [
      '1 editing seat',
      'Unlimited view-only users',
      '∞ Preview environments',
      '120 GB bandwidth',
      '50 GB storage',
      'Sub-second deployments',
      'BYOC (Bring Your Own Cloud)',
      'Community support',
    ],
  },
  {
    id: 'team',
    name: 'Team',
    description: 'For teams building and shipping together.',
    price: `$${TEAM_SEAT_RATE}`,
    priceSuffix: '/seat/month',
    cta: 'Start Collaborating',
    href: 'https://app.zephyr-cloud.io/',
    highlight: true,
    features: [
      'Up to 25 editing seats',
      'Unlimited view-only users',
      '∞ Preview environments',
      '1 TB bandwidth',
      '100 GB storage',
      'Sub-second deployments',
      'BYOC (Bring Your Own Cloud)',
      'Team collaboration',
      'Email support',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'For organizations with production-scale micro-frontend infrastructure.',
    price: 'Custom',
    cta: 'Contact Sales',
    href: 'mailto:inbound@zephyr-cloud.io?subject=Enterprise',
    highlight: false,
    features: [
      '25+ editing seats',
      'Unlimited view-only users',
      '∞ Preview environments',
      'Custom bandwidth & storage',
      'Sub-second deployments',
      'BYOC Poly-Cloud support',
      'Advanced analytics',
      '99.9% uptime SLA',
      'Dedicated support manager',
      'SSO & advanced security',
      'Custom SLAs',
      'On-site training & onboarding',
      'Professional services',
    ],
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatMoney(n: number): string {
  return n.toLocaleString('en-US');
}

function calcEnterprise(seats: number, annual: boolean): { monthly: number; effective: number; floored: boolean } {
  const raw = seats * ENTERPRISE_SEAT_RATE;
  const floored = raw < ENTERPRISE_FLOOR;
  const base = Math.max(raw, ENTERPRISE_FLOOR);
  const monthly = annual ? Math.round(base * 0.85) : base;
  return { monthly, effective: Math.round(monthly / seats), floored };
}

// ── Page ──────────────────────────────────────────────────────────────────────

function PricingPage() {
  const [frequency, setFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [seats, setSeats] = useState(50);
  const isAnnual = frequency === 'annually';

  const { monthly, effective, floored } = calcEnterprise(seats, isAnnual);
  const annual = monthly * 12;
  const baseFull = calcEnterprise(seats, false).monthly * 12;
  const annualSavings = isAnnual ? baseFull - annual : 0;

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Pricing that scales with your team</h1>
        <p className="text-xl text-neutral-300 mb-1 max-w-2xl mx-auto">
          Start free. Ship faster. Scale without cliff edges.
        </p>
      </div>

      {/* Highlights */}
      <div className="bg-gradient-to-r from-emerald-900/20 to-emerald-700/20 border border-emerald-700/30 rounded-lg p-6 mb-12">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Infinity className="h-4 w-4 text-emerald-700" />
            <span>No build minutes</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-emerald-700" />
            <span>Sub-second deployments</span>
          </div>
          <div className="flex items-center gap-2">
            <Cloud className="h-4 w-4 text-emerald-700" />
            <span>Bring Your Own Cloud</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-emerald-700" />
            <span>Unlimited preview environments</span>
          </div>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="p-6 mb-8">
        <div className="mx-auto flex w-fit rounded-full bg-neutral-900 p-1">
          <Tab text="monthly" selected={frequency === 'monthly'} setSelected={() => setFrequency('monthly')} />
          <Tab
            text="annually"
            selected={frequency === 'annually'}
            setSelected={() => setFrequency('annually')}
            discount={true}
          />
        </div>
      </div>

      {/* Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {TIERS.map((tier) => (
          <Card
            key={tier.id}
            className={cn(
              'relative flex flex-col',
              tier.highlight && 'border-emerald-700 shadow-lg shadow-emerald-700/20',
            )}
          >
            {tier.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader>
              <div className="text-2xl font-bold">{tier.name}</div>
              <div className="text-sm text-neutral-400">{tier.description}</div>
              <div className="mt-4">
                {tier.priceSuffix ? (
                  <>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">
                        {isAnnual ? `$${Math.round(TEAM_SEAT_RATE * 0.85)}` : tier.price}
                      </span>
                      <span className="text-neutral-400 text-sm">{tier.priceSuffix}</span>
                    </div>
                    {isAnnual && (
                      <div className="text-neutral-500 text-xs mt-1 line-through">${TEAM_SEAT_RATE}/seat/month</div>
                    )}
                  </>
                ) : tier.price === 'Free' ? (
                  <div className="text-4xl font-bold">Free</div>
                ) : (
                  <div className="text-3xl font-bold">Custom pricing</div>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                    <span className="text-sm text-neutral-300">{f}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <div className="p-6 pt-0">
              <Button
                className={cn(
                  'w-full font-semibold transition-transform duration-200 hover:-translate-y-0.5',
                  tier.highlight
                    ? 'border border-emerald-500/70 bg-emerald-600 text-white hover:bg-emerald-500'
                    : tier.id === 'enterprise'
                      ? 'border border-neutral-700 bg-neutral-900 text-white hover:border-neutral-500 hover:bg-neutral-800'
                      : 'border border-neutral-700 bg-neutral-900 text-white hover:border-emerald-700/70 hover:bg-neutral-800',
                )}
                asChild
              >
                <a href={tier.href} target="_blank">
                  {tier.cta}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Enterprise Seat Calculator */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-16">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Enterprise pricing calculator</h2>
          <p className="text-neutral-400 text-sm">
            ${ENTERPRISE_SEAT_RATE}/seat/month · $5k/month minimum · Volume discounts available for 150+ seats
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Slider */}
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">Editing seats</p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-6xl font-extrabold tracking-tight">{seats >= 300 ? '300+' : seats}</span>
              <span className="text-neutral-500">{seats === 1 ? 'seat' : 'seats'}</span>
            </div>

            <div className="relative mb-3">
              <input
                type="range"
                min={25}
                max={301}
                value={seats > 300 ? 301 : seats}
                onChange={(e) => setSeats(parseInt(e.target.value))}
                className="w-full h-2 appearance-none bg-neutral-800 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-900/50 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(4 120 87) 0%, rgb(16 185 129) ${((Math.min(seats, 301) - 25) / 276) * 100}%, rgb(38 38 38) ${((Math.min(seats, 301) - 25) / 276) * 100}%)`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-neutral-600">
              <span>25</span>
              <span>50</span>
              <span>100</span>
              <span>200</span>
              <span>300+</span>
            </div>
          </div>

          {/* Price Output */}
          <div className="lg:text-right lg:min-w-[260px]">
            {seats >= 300 ? (
              <>
                <div className="text-4xl font-extrabold tracking-tight">Custom</div>
                <div className="text-neutral-500 text-sm mt-1">Contact us for a quote</div>
              </>
            ) : (
              <>
                <div className="text-4xl font-extrabold tracking-tight">${formatMoney(monthly)}</div>
                <div className="text-neutral-500 text-sm mt-1">/month{isAnnual ? ', billed annually' : ''}</div>
                {floored && (
                  <div className="mt-2 inline-block bg-emerald-900/30 border border-emerald-700/40 text-emerald-400 text-xs px-2 py-1 rounded">
                    $5k/month minimum applies
                  </div>
                )}
                {isAnnual && annualSavings > 0 && (
                  <div className="text-emerald-500 text-sm font-semibold mt-2">
                    ${formatMoney(annual)}/yr — save ${formatMoney(annualSavings)}
                  </div>
                )}
                {!isAnnual && <div className="text-neutral-500 text-sm mt-2">${formatMoney(annual)}/yr</div>}
                <div className="text-neutral-600 text-xs mt-1">${effective}/seat/month effective</div>
              </>
            )}

            <Button
              className="mt-6 w-full lg:w-auto font-semibold border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800 transition-transform duration-200 hover:-translate-y-0.5"
              asChild
            >
              <a href="mailto:inbound@zephyr-cloud.io?subject=Enterprise" target="_blank">
                Contact Sales
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Reference benchmarks */}
        <div className="mt-8 pt-6 border-t border-neutral-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          {[
            { label: '50 seats/mo', value: `$${formatMoney(Math.max(50 * ENTERPRISE_SEAT_RATE, ENTERPRISE_FLOOR))}` },
            { label: '100 seats/mo', value: `$${formatMoney(Math.max(100 * ENTERPRISE_SEAT_RATE, ENTERPRISE_FLOOR))}` },
            {
              label: '100 seats/yr (annual)',
              value: `$${formatMoney(Math.round(Math.max(100 * ENTERPRISE_SEAT_RATE, ENTERPRISE_FLOOR) * 0.85 * 12))}`,
            },
            { label: '300+ seats', value: 'Custom' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div className="text-lg font-bold text-emerald-400">{value}</div>
              <div className="text-xs text-neutral-500 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* BYOC Section */}
      <div className="bg-neutral-900 rounded-lg p-8 mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <Cloud className="inline-block h-8 w-8 text-emerald-700 mr-2" />
              Bring Your Own Cloud (BYOC)
            </h2>
            <p className="text-neutral-400 mb-6">
              Deploy to Cloudflare, Akamai, Vercel, or any supported cloud provider. Switch clouds instantly, deploy to
              multiple clouds or multiple accounts simultaneously. With BYOC, you maintain complete control over your
              infrastructure and costs.
            </p>
            <ul className="space-y-2">
              {[
                'No vendor lock-in. Ever.',
                'Deploy to any cloud provider',
                'Switch clouds with one click',
                'Multi-cloud deployments',
                'Your security, your compliance',
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-emerald-700" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="text-sm text-neutral-400 text-center">Deploy to your favorite cloud providers</div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { src: cloudflare, alt: 'Cloudflare', dim: false },
                  { src: fastly, alt: 'Fastly', dim: false },
                  { src: akamai, alt: 'Akamai', dim: false },
                  { src: aws, alt: 'AWS', dim: true },
                  { src: vercel, alt: 'Vercel', dim: true },
                ].map(({ src, alt, dim }) => (
                  <div key={alt} className="flex items-center justify-center p-3">
                    <img
                      src={src}
                      alt={alt}
                      title={dim ? 'Coming Soon' : undefined}
                      className={cn(
                        'h-8 w-auto transition-opacity',
                        dim ? 'opacity-50 grayscale' : 'opacity-80 hover:opacity-100',
                      )}
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs text-neutral-500 text-center pt-2">
                Available on all paid plans · More providers coming soon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overages */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-2 text-center">Simple, transparent overages</h2>
        <p className="text-neutral-400 text-center text-sm mb-8">Only pay for what you use beyond your plan.</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Personal', bw: '$40 per 100 GB', storage: '$10 per 50 GB' },
            { name: 'Team', bw: '$30 per 100 GB', storage: '$7 per 50 GB' },
            { name: 'Enterprise', bw: 'Negotiated per contract', storage: 'Negotiated per contract' },
          ].map((tier) => (
            <Card key={tier.name} className="bg-neutral-900">
              <CardHeader>
                <CardTitle className="text-lg">{tier.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-neutral-400">
                  <li>Bandwidth: {tier.bw}</li>
                  <li>Storage: {tier.storage}</li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Have questions?</h2>
        <p className="text-neutral-400 mb-6">Our team is here to help.</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="outline" asChild>
            <a href="https://docs.zephyr-cloud.io/" target="_blank">
              View Documentation
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="mailto:support@zephyr-cloud.io">Contact Support</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
