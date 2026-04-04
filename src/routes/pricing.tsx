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

type Tier = {
  name: string;
  id: string;
  seats: [number, number];
  pricePerSeat: number | null;
  href: string;
  cta: string;
  color: string;
  activeColor: string;
  features: { text: string; isNew?: boolean }[];
};

const TIERS: Tier[] = [
  {
    name: 'Personal',
    id: 'personal',
    seats: [1, 1],
    pricePerSeat: 0,
    href: 'https://app.zephyr-cloud.io/',
    cta: 'Get Started',
    color: 'border-neutral-700',
    activeColor: 'border-neutral-500',
    features: [
      { text: '1 editing user' },
      { text: 'Unlimited view-only users' },
      { text: '∞ Preview environments' },
      { text: '120GB bandwidth' },
      { text: '50GB storage' },
      { text: 'Community support' },
      { text: 'BYOC (Bring Your Own Cloud)' },
      { text: 'Sub-second deployments' },
    ],
  },
  {
    name: 'Team',
    id: 'team',
    seats: [2, 10],
    pricePerSeat: 19,
    href: 'https://app.zephyr-cloud.io/',
    cta: 'Start Collaborating',
    color: 'border-emerald-700/50',
    activeColor: 'border-emerald-500',
    features: [
      { text: 'Up to 10 editing users' },
      { text: 'Unlimited view-only users' },
      { text: '∞ Preview environments' },
      { text: '1TB bandwidth' },
      { text: '100GB storage' },
      { text: 'Email support' },
      { text: 'BYOC (Bring Your Own Cloud)' },
      { text: 'Sub-second deployments' },
      { text: 'Team collaboration' },
    ],
  },
  {
    name: 'Growth',
    id: 'growth',
    seats: [11, 25],
    pricePerSeat: 49,
    href: 'https://app.zephyr-cloud.io/',
    cta: 'Start Growing',
    color: 'border-blue-700/50',
    activeColor: 'border-blue-500',
    features: [
      { text: 'Up to 25 editing users', isNew: true },
      { text: 'Unlimited view-only users' },
      { text: '∞ Preview environments' },
      { text: '1.5TB bandwidth' },
      { text: '500GB storage' },
      { text: 'Priority support' },
      { text: 'Private Slack/Discord channel' },
      { text: 'BYOC (Bring Your Own Cloud)' },
      { text: 'Sub-second deployments' },
      { text: 'Team collaboration' },
      { text: 'Advanced analytics' },
      { text: '99.9% uptime SLA' },
    ],
  },
  {
    name: 'Scale',
    id: 'scale',
    seats: [26, 75],
    pricePerSeat: 35,
    href: 'https://app.zephyr-cloud.io/',
    cta: 'Start Scaling',
    color: 'border-violet-700/50',
    activeColor: 'border-violet-500',
    features: [
      { text: 'Up to 75 editing users', isNew: true },
      { text: 'Unlimited view-only users' },
      { text: '∞ Preview environments' },
      { text: '3TB bandwidth' },
      { text: '1TB storage' },
      { text: 'BYOC Poly-Cloud Support', isNew: true },
      { text: 'Sub-second deployments' },
      { text: 'Team collaboration' },
      { text: 'Advanced analytics' },
      { text: '99.9% uptime SLA' },
      { text: 'Dedicated support manager', isNew: true },
      { text: 'Priority support' },
    ],
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    seats: [76, 200],
    pricePerSeat: 25,
    href: 'mailto:inbound@zephyr-cloud.io?subject=Enterprise',
    cta: 'Get Started',
    color: 'border-amber-700/50',
    activeColor: 'border-amber-500',
    features: [
      { text: 'Up to 200 editing users', isNew: true },
      { text: 'Unlimited view-only users' },
      { text: '∞ Preview environments' },
      { text: 'Custom bandwidth' },
      { text: 'Custom storage' },
      { text: 'SSO & advanced security', isNew: true },
      { text: 'Custom SLAs', isNew: true },
      { text: 'On-site training & onboarding', isNew: true },
      { text: 'BYOC Poly-Cloud Support' },
      { text: 'Sub-second deployments' },
      { text: 'Dedicated support manager' },
      { text: '99.9% uptime SLA' },
    ],
  },
  {
    name: 'Enterprise+',
    id: 'enterprise-plus',
    seats: [201, Infinity],
    pricePerSeat: null,
    href: 'mailto:inbound@zephyr-cloud.io?subject=Enterprise+',
    cta: 'Contact Sales',
    color: 'border-orange-700/50',
    activeColor: 'border-orange-500',
    features: [
      { text: 'Unlimited editing users' },
      { text: 'Unlimited view-only users' },
      { text: '∞ Preview environments' },
      { text: 'Custom bandwidth & storage' },
      { text: 'Professional services', isNew: true },
      { text: 'SSO & advanced security' },
      { text: 'Custom SLAs' },
      { text: 'On-site training & onboarding' },
      { text: 'BYOC Poly-Cloud Support' },
      { text: 'Dedicated support manager' },
      { text: '99.9% uptime SLA' },
    ],
  },
];

const COMPARE_FEATURES = [
  { label: 'Preview environments', values: ['∞', '∞', '∞', '∞', '∞', '∞'] },
  { label: 'Sub-second deployments', values: [true, true, true, true, true, true] },
  { label: 'BYOC', values: [true, true, true, true, true, true] },
  { label: 'Bandwidth', values: ['120GB', '1TB', '1.5TB', '3TB', 'Custom', 'Custom'] },
  { label: 'Storage', values: ['50GB', '100GB', '500GB', '1TB', 'Custom', 'Custom'] },
  { label: 'Team collaboration', values: [false, true, true, true, true, true] },
  { label: 'Advanced analytics', values: [false, false, true, true, true, true] },
  { label: '99.9% uptime SLA', values: [false, false, true, true, true, true] },
  { label: 'BYOC Poly-Cloud', values: [false, false, false, true, true, true] },
  { label: 'Dedicated support manager', values: [false, false, false, true, true, true] },
  { label: 'SSO & advanced security', values: [false, false, false, false, true, true] },
  { label: 'Custom SLAs', values: [false, false, false, false, true, true] },
  { label: 'Professional services', values: [false, false, false, false, false, true] },
];

function getTier(seats: number): Tier {
  return TIERS.find((t) => seats >= t.seats[0] && seats <= t.seats[1]) ?? TIERS[TIERS.length - 1];
}

function formatNumber(n: number): string {
  return n.toLocaleString('en-US');
}

function PricingPage() {
  const [frequency, setFrequency] = useState<'monthly' | 'annually'>('monthly');
  const [seats, setSeats] = useState(10);
  const isAnnual = frequency === 'annually';

  const tier = getTier(seats);
  const isCustom = tier.pricePerSeat === null;
  const isFree = tier.pricePerSeat === 0;
  const perSeat =
    isCustom || isFree ? tier.pricePerSeat : isAnnual ? Math.round(tier.pricePerSeat * 0.85) : tier.pricePerSeat;
  const monthly = isFree || isCustom || perSeat === null ? null : seats * perSeat;
  const annual = monthly !== null ? monthly * 12 : null;
  const annualFull = isFree || isCustom || tier.pricePerSeat === null ? null : seats * tier.pricePerSeat * 12;
  const annualSavings = annualFull !== null && annual !== null ? annualFull - annual : null;

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Pricing that scales with your team</h1>
        <p className="text-xl text-neutral-300 mb-1 max-w-2xl mx-auto">
          Start free and scale as you grow — no cliff, no sticker shock.
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
            <span>Bring Your Own Cloud (BYOC)</span>
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

      {/* Seat Calculator */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          {/* Slider side */}
          <div className="flex-1">
            <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-3">Editing seats</p>
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-6xl font-extrabold tracking-tight">{seats >= 201 ? '200+' : seats}</span>
              <span className="text-neutral-500">{seats === 1 ? 'seat' : 'seats'}</span>
            </div>

            <div className="relative mb-3">
              <input
                type="range"
                min={1}
                max={201}
                value={seats > 200 ? 201 : seats}
                onChange={(e) => setSeats(parseInt(e.target.value))}
                className="w-full h-2 appearance-none bg-neutral-800 rounded-full cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-emerald-500 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald-900/50 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-emerald-500 [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                style={{
                  background: `linear-gradient(to right, rgb(4 120 87) 0%, rgb(16 185 129) ${((Math.min(seats, 201) - 1) / 200) * 100}%, rgb(38 38 38) ${((Math.min(seats, 201) - 1) / 200) * 100}%)`,
                }}
              />
            </div>

            <div className="flex justify-between text-xs text-neutral-600">
              <span>1</span>
              <span>10</span>
              <span>25</span>
              <span>75</span>
              <span>200</span>
              <span>200+</span>
            </div>
          </div>

          {/* Price side */}
          <div className="lg:text-right lg:min-w-[240px]">
            <span
              className={cn(
                'inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border',
                tier.color,
              )}
            >
              {tier.name}
            </span>

            {isCustom ? (
              <>
                <div className="text-4xl font-extrabold tracking-tight">Custom</div>
                <div className="text-neutral-500 text-sm mt-1">Contact us for a quote</div>
              </>
            ) : isFree ? (
              <>
                <div className="text-4xl font-extrabold tracking-tight">$0</div>
                <div className="text-neutral-500 text-sm mt-1">Always free</div>
              </>
            ) : (
              <>
                <div className="text-4xl font-extrabold tracking-tight">${formatNumber(monthly!)}</div>
                <div className="text-neutral-500 text-sm mt-1">/month{isAnnual ? ', billed annually' : ''}</div>
                {isAnnual && annualSavings !== null && (
                  <div className="text-emerald-500 text-sm font-semibold mt-2">
                    ${formatNumber(annual!)}/yr — save ${formatNumber(annualSavings)}
                  </div>
                )}
                {!isAnnual && annual !== null && (
                  <div className="text-neutral-500 text-sm mt-2">${formatNumber(annual)}/yr billed monthly</div>
                )}
                <div className="text-neutral-600 text-xs mt-1">${perSeat}/seat/month</div>
              </>
            )}

            <Button
              className={cn(
                'mt-6 w-full lg:w-auto font-semibold transition-transform duration-200 hover:-translate-y-0.5',
                isCustom
                  ? 'border border-neutral-700 bg-neutral-900 text-white hover:bg-neutral-800'
                  : 'border border-emerald-500/70 bg-emerald-600 text-white hover:bg-emerald-500',
              )}
              asChild
            >
              <a href={tier.href} target="_blank">
                {tier.cta}
                <ChevronRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Features for active tier */}
        <div className="mt-8 pt-8 border-t border-neutral-800">
          <p className="text-xs uppercase tracking-widest text-neutral-500 font-bold mb-4">Included in {tier.name}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {tier.features.map((f, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-neutral-300">
                <Check className="h-4 w-4 text-emerald-700 shrink-0" />
                <span>{f.text}</span>
                {f.isNew && (
                  <span className="text-[10px] font-bold uppercase tracking-wide bg-emerald-900/50 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-700/40">
                    new
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Tier Reference Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
        {TIERS.map((t) => {
          const isActive = t.id === tier.id;
          const midpoint = t.seats[1] === Infinity ? 201 : Math.round((t.seats[0] + Math.min(t.seats[1], 200)) / 2);
          return (
            <button
              key={t.id}
              onClick={() => setSeats(midpoint)}
              className={cn(
                'bg-neutral-900 border rounded-xl p-4 text-center cursor-pointer transition-all duration-150',
                isActive
                  ? cn('border-emerald-600 bg-neutral-800', t.activeColor)
                  : 'border-neutral-800 hover:border-neutral-700',
              )}
            >
              <div className="text-sm font-bold text-white mb-1">{t.name}</div>
              <div className="text-xs text-neutral-500 mb-2">
                {t.seats[1] === Infinity
                  ? '200+ seats'
                  : t.seats[0] === t.seats[1]
                    ? '1 seat'
                    : `${t.seats[0]}–${t.seats[1]} seats`}
              </div>
              <div className={cn('text-base font-extrabold', isActive ? 'text-emerald-400' : 'text-neutral-400')}>
                {t.pricePerSeat === null ? 'Custom' : t.pricePerSeat === 0 ? 'Free' : `$${t.pricePerSeat}`}
                {t.pricePerSeat !== null && t.pricePerSeat > 0 && (
                  <span className="text-xs font-normal text-neutral-600">/seat</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Compare Table */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">What's included</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="text-left py-3 px-4 text-neutral-500 font-bold text-xs uppercase tracking-wider border-b border-neutral-800 min-w-[180px]">
                  Feature
                </th>
                {TIERS.map((t) => (
                  <th
                    key={t.id}
                    className={cn(
                      'py-3 px-4 text-center font-bold text-xs uppercase tracking-wider border-b border-neutral-800',
                      t.id === tier.id ? 'text-emerald-400' : 'text-neutral-500',
                    )}
                  >
                    {t.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_FEATURES.map((row, i) => (
                <tr key={i} className="hover:bg-neutral-900/50">
                  <td className="py-3 px-4 text-neutral-300 font-medium border-b border-neutral-900">{row.label}</td>
                  {row.values.map((val, j) => (
                    <td key={j} className="py-3 px-4 text-center border-b border-neutral-900">
                      {val === true ? (
                        <Check className="h-4 w-4 text-emerald-700 mx-auto" />
                      ) : val === false ? (
                        <span className="text-neutral-700">—</span>
                      ) : (
                        <span className="text-neutral-400 text-xs">{val}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* BYOC Feature Section */}
      <div className="bg-neutral-900 rounded-lg p-8 mb-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">
              <Cloud className="inline-block h-8 w-8 text-emerald-700 mr-2" />
              Bring Your Own Cloud (BYOC)
            </h2>
            <p className="text-neutral-400 mb-6">
              Deploy to your Cloudflare, Akamai, Vercel, or any of our supported cloud providers. Switch clouds
              instantly, deploy to multiple clouds or multiple accounts on a cloud simultaneously.
              <br />
              With BYOC, you maintain complete control over your infrastructure and costs.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-700" />
                <span>No vendor lock-in. Ever.</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-700" />
                <span>Deploy to any cloud provider</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-700" />
                <span>Switch clouds with one click</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-700" />
                <span>Multi-cloud deployments</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-emerald-700" />
                <span>Your security, your compliance</span>
              </li>
            </ul>
          </div>
          <div className="bg-neutral-800 rounded-lg p-6">
            <div className="space-y-4">
              <div className="text-sm text-neutral-400 text-center">Deploy to your favorite cloud providers</div>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center justify-center p-3">
                  <img
                    src={cloudflare}
                    alt="Cloudflare"
                    className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center p-3">
                  <img
                    src={fastly}
                    alt="Fastly"
                    className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center p-3">
                  <img
                    src={akamai}
                    alt="Akamai"
                    className="h-8 w-auto opacity-80 hover:opacity-100 transition-opacity"
                  />
                </div>
                <div className="flex items-center justify-center p-3">
                  <img src={aws} alt="AWS" className="h-8 w-auto opacity-50 grayscale" title="Coming Soon" />
                </div>
                <div className="flex items-center justify-center p-3">
                  <img src={vercel} alt="Vercel" className="h-8 w-auto opacity-50 grayscale" title="Coming Soon" />
                </div>
              </div>
              <div className="text-xs text-neutral-500 text-center pt-2">
                Available on all paid plans • More providers coming soon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Overages */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Simple, transparent overages</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-neutral-900">
            <CardHeader>
              <CardTitle className="text-lg">Personal</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>Bandwidth: $40 per 100GB</li>
                <li>Storage: $10 per 50GB</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900">
            <CardHeader>
              <CardTitle className="text-lg">Team</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>Bandwidth: $30 per 100GB</li>
                <li>Storage: $7 per 50GB</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900">
            <CardHeader>
              <CardTitle className="text-lg">Growth / Scale</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>Bandwidth: $25 per 100GB</li>
                <li>Storage: $5 per 50GB</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="bg-neutral-900">
            <CardHeader>
              <CardTitle className="text-lg">Enterprise</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>Custom overage rates</li>
                <li>Negotiated per contract</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Frequently asked questions</h2>
        <p className="text-neutral-400 mb-6">Have questions? We're here to help.</p>
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
