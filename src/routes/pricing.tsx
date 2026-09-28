import { EASE_OUT, SPRING_MARKER } from '@/components/motion/tokens';
import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import cloudflare from '@/images/clouds/cloudflare_white.webp';
import fastly from '@/images/clouds/fastly_white.webp';
import zephyr from '@/images/logo-light.svg';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Check, Cloud, Infinity as InfinityIcon, Sparkles, Zap } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { useId, useRef, useState, type CSSProperties, type KeyboardEvent } from 'react';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

const tiers = [
  {
    name: 'Personal',
    id: 'personal',
    href: 'https://app.zephyr-cloud.io/',
    price: { monthly: 0, annually: 0 },
    description: 'Perfect for side projects and personal experiments',
    features: [
      '1 editing user',
      'Unlimited view-only users',
      '∞ Preview environments',
      '120GB bandwidth',
      '50GB storage',
      'Community support',
      'BYOC (Bring Your Own Cloud)',
      'Sub-second deployments',
    ],
    cta: 'Get Started',
    mostPopular: false,
  },
  {
    name: 'Team',
    id: 'team',
    href: 'https://app.zephyr-cloud.io/',
    // TODO: Can we make this drop into the subscription page for team
    price: { monthly: 19, annually: 16 },
    description: 'For teams building and shipping together',
    features: [
      'Up to 10 editing users',
      'Unlimited view-only users',
      '∞ Preview environments',
      '1TB bandwidth',
      '100GB storage',
      'Email support',
      'BYOC (Bring Your Own Cloud)',
      'Sub-second deployments',
      'Team collaboration',
    ],
    cta: 'Start Collaborating',
    mostPopular: true,
  },
  {
    name: 'Business',
    id: 'business',
    href: 'https://app.zephyr-cloud.io/',
    // TODO: Can we make this drop into the subscription page for business
    price: { monthly: 99, annually: 84 },
    description: 'For growing companies with production workloads',
    features: [
      'Up to 20 editing users',
      'Unlimited view-only users',
      '∞ Preview environments',
      '1.5TB bandwidth',
      '500GB storage',
      'Private Slack/Discord channel',
      'BYOC Poly-Cloud Support (Bring Your Own Cloud)',
      'Sub-second deployments',
      'Team collaboration',
      'Priority support',
      'Advanced analytics',
      '99.9% uptime SLA',
    ],
    cta: 'Start Scaling',
    mostPopular: false,
  },
  {
    name: 'Enterprise',
    id: 'enterprise',
    href: 'mailto:inbound@zephyr-cloud.io?subject=Enterprise',
    price: { monthly: null, annually: null },
    description: 'For organizations with advanced security and support needs',
    features: [
      'Unlimited editing users',
      'Unlimited view-only users',
      '∞ Preview environments',
      'Custom bandwidth',
      'Custom storage',
      'Dedicated support manager',
      'Advanced analytics',
      'Team collaboration',
      '99.9% uptime SLA',
      'On-Site Training & Onboarding',
      'BYOC Poly-Cloud Support (Bring Your Own Cloud)',
      'Sub-second deployments',
      'SSO & advanced security',
      'Custom SLAs',
      'Professional services',
    ],
    cta: 'Contact Sales',
    mostPopular: false,
  },
];

type Tier = (typeof tiers)[number];
type Frequency = 'monthly' | 'annually';

const FREQUENCIES: readonly { value: Frequency; label: string; note?: string }[] = [
  { value: 'monthly', label: 'Monthly' },
  { value: 'annually', label: 'Annually', note: 'Save 15%' },
];

const HIGHLIGHTS = [
  { icon: InfinityIcon, label: 'No build minutes' },
  { icon: Zap, label: 'Sub-second deployments' },
  { icon: Cloud, label: 'Bring your own cloud (BYOC)' },
  { icon: Sparkles, label: 'Unlimited preview environments' },
] as const;

const BYOC_POINTS = [
  'No vendor lock-in. Ever.',
  'Deploy to any supported cloud provider',
  'Switch clouds with one click',
  'Multi-cloud deployments',
  'Your security, your compliance',
] as const;

// Integrations the dashboard offers on every plan: the managed default, or your own account.
const PROVIDERS = [
  { name: 'Zephyr Cloud', logo: zephyr, caption: 'Managed', logoClassName: 'size-6' },
  { name: 'Cloudflare', logo: cloudflare, logoClassName: 'h-7' },
  { name: 'AWS', logo: aws, logoClassName: 'h-12' },
  { name: 'Fastly', logo: fastly, logoClassName: 'h-7' },
  { name: 'Akamai', logo: akamai, logoClassName: 'h-8' },
] as const;

const OVERAGES = [
  { plan: 'Personal', bandwidth: '$40 per 100GB', storage: '$10 per 50GB' },
  { plan: 'Team', bandwidth: '$30 per 100GB', storage: '$7 per 50GB' },
  { plan: 'Business', bandwidth: '$25 per 100GB', storage: '$5 per 50GB' },
] as const;

const CONTAINER = 'mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10';
const SECTION = 'border-t border-line py-24 lg:py-32';
const BUTTON =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[0.9375rem] font-medium transition-colors';
const BUTTON_PRIMARY = 'bg-released text-white hover:bg-[#8b4df5]';
const BUTTON_SECONDARY = 'border border-line-strong text-ink-muted hover:border-deployed/60 hover:text-ink';

const PRICE_SWAP = { duration: 0.28, ease: EASE_OUT } as const;

const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

/** Monthly / annual billing as a radio group; the pill glides between options. */
function BillingSwitch({ value, onChange }: { value: Frequency; onChange: (value: Frequency) => void }) {
  const reduce = useReducedMotion();
  const switchId = useId();
  const radios = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = FREQUENCIES.length - 1;
    let next: number | null = null;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = last;
    if (next === null) return;
    event.preventDefault();
    onChange(FREQUENCIES[next].value);
    radios.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label="Billing period"
      className="inline-flex shrink-0 self-start rounded-full border border-line-strong bg-surface p-1 lg:self-auto"
    >
      {FREQUENCIES.map((option, i) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            ref={(el) => {
              radios.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            onClick={() => onChange(option.value)}
            onKeyDown={(event) => onKeyDown(event, i)}
            className="group relative inline-flex h-9 items-center gap-2 rounded-full px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-released-ink"
          >
            {checked ? (
              <motion.span
                layoutId={`billing-${switchId}`}
                className="absolute inset-0 rounded-full bg-surface-3 ring-1 ring-line-strong"
                transition={reduce ? { duration: 0 } : SPRING_MARKER}
              />
            ) : null}
            <span
              className={cn('relative transition-colors', checked ? 'text-ink' : 'text-ink-muted group-hover:text-ink')}
            >
              {option.label}
            </span>
            {/* The space keeps the accessible name "Annually Save 15%"; flex drops it visually. */}
            {option.note ? ' ' : null}
            {option.note ? (
              <span
                className={cn(
                  'relative rounded-full border px-2 py-px text-xs transition-colors',
                  checked ? 'border-line-strong text-ink' : 'border-line text-ink-faint group-hover:text-ink-muted',
                )}
              >
                {option.note}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
}

/** Swaps the number in place when the billing period changes. */
function Price({ amount }: { amount: number }) {
  const reduce = useReducedMotion();
  return (
    <span className="relative inline-flex overflow-hidden text-[2.75rem] leading-none font-semibold tracking-[-0.035em] text-ink tabular-nums">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={amount}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: '70%' }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: '-70%' }}
          transition={PRICE_SWAP}
        >
          ${amount}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function TierCard({ tier, frequency }: { tier: Tier; frequency: Frequency }) {
  const featured = tier.mostPopular;
  const amount =
    tier.price.monthly === null ? null : frequency === 'annually' ? tier.price.annually : tier.price.monthly;
  const external = !tier.href.startsWith('mailto:');

  return (
    // Subgrid rows keep names, prices, buttons and lists aligned across cards.
    <li
      className={cn(
        'row-span-4 grid grid-rows-subgrid rounded-2xl border bg-surface/70 p-6 transition-colors',
        featured ? 'border-released/55' : 'border-line hover:border-line-strong',
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-title m-0 text-ink">{tier.name}</h2>
          {featured ? (
            <span className="rounded-full border border-released/60 bg-released/[0.14] px-2.5 py-0.5 text-xs font-medium whitespace-nowrap text-released-ink">
              Most popular
            </span>
          ) : null}
        </div>
        <p className="mt-2 mb-0 text-sm leading-relaxed text-ink-muted">{tier.description}</p>
      </div>

      <div className="flex min-h-11 items-baseline gap-1.5 pt-3">
        {amount === null ? (
          <span className="text-[1.75rem] leading-none font-semibold tracking-[-0.025em] text-ink">Custom pricing</span>
        ) : (
          <>
            <Price amount={amount} />
            <span className="text-sm text-ink-faint">/user/month</span>
          </>
        )}
      </div>

      <a
        href={tier.href}
        {...(external ? { target: '_blank', rel: 'noopener' } : {})}
        className={cn(BUTTON, 'mt-1 w-full', featured ? BUTTON_PRIMARY : BUTTON_SECONDARY)}
      >
        {tier.cta}
        <ArrowRight className="size-4" aria-hidden />
      </a>

      <ul className="m-0 mt-2 list-none space-y-2.5 border-t border-line p-0 pt-5">
        {tier.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5 text-sm leading-snug text-ink-muted">
            <Check className="mt-[3px] size-4 shrink-0 text-ink-faint" aria-hidden />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </li>
  );
}

function PricingPage() {
  const [frequency, setFrequency] = useState<Frequency>('monthly');

  return (
    <>
      <section aria-labelledby="pricing-title" className="pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className={CONTAINER}>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="min-w-0">
              <p className="mb-3 text-sm text-ink-faint">Plans</p>
              <h1 id="pricing-title" className="text-display m-0 max-w-3xl text-ink">
                Pricing that scales with your team.
              </h1>
              <p className="text-lead mt-6 mb-0 text-ink-muted">Start free and scale as you grow.</p>
              <ul className="m-0 mt-8 flex list-none flex-wrap gap-x-6 gap-y-2.5 p-0 text-sm text-ink-muted">
                {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                  <li key={label} className="flex items-center gap-2">
                    <Icon className="size-4 shrink-0 text-ink-faint" aria-hidden />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
            <BillingSwitch value={frequency} onChange={setFrequency} />
          </div>

          <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-2 xl:grid-cols-4">
            {tiers.map((tier) => (
              <TierCard key={tier.id} tier={tier} frequency={frequency} />
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="byoc-title" className={SECTION}>
        <div className={cn(CONTAINER, 'grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16')}>
          <div className="reveal">
            <p className="mb-3 text-sm text-ink-faint">Multi-cloud</p>
            <h2 id="byoc-title" className="text-headline m-0 text-ink">
              Bring your own cloud (BYOC).
            </h2>
            <p className="mt-6 mb-0 max-w-xl text-[1.0625rem] leading-relaxed text-ink-muted">
              Deploy to your Cloudflare, Akamai, AWS, or any of our supported cloud providers. Switch clouds with a
              setting, deploy to multiple clouds or multiple accounts on a cloud simultaneously.
            </p>
            <p className="mt-4 mb-0 max-w-xl text-[1.0625rem] leading-relaxed text-ink-muted">
              With BYOC, you maintain complete control over your infrastructure and costs.
            </p>
            <ul className="m-0 mt-8 grid list-none gap-3 p-0">
              {BYOC_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[0.9375rem] leading-normal text-ink">
                  <Check className="mt-1 size-4 shrink-0 text-ink-faint" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal rounded-2xl border border-line bg-surface/70 p-5 sm:p-6" style={delay(90)}>
            <p className="m-0 text-sm text-ink-muted">Deploy to your favorite cloud providers</p>
            <ul className="m-0 mt-5 grid list-none grid-cols-2 gap-2.5 p-0 sm:grid-cols-3">
              {PROVIDERS.map((provider) => (
                <li
                  key={provider.name}
                  className="flex h-24 flex-col items-center justify-center gap-1.5 rounded-xl border border-line bg-night/50 px-3 text-center"
                >
                  {'caption' in provider ? (
                    <>
                      <img src={provider.logo} alt="" className={cn('w-auto', provider.logoClassName)} />
                      <span className="text-sm leading-tight font-medium whitespace-nowrap text-ink">
                        {provider.name}
                        <span className="block text-xs font-normal text-ink-faint">{provider.caption}</span>
                      </span>
                    </>
                  ) : (
                    <img
                      src={provider.logo}
                      alt={provider.name}
                      className={cn('w-auto max-w-full object-contain opacity-90', provider.logoClassName)}
                      loading="lazy"
                    />
                  )}
                </li>
              ))}
              <li className="flex h-24 flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-line-strong px-3 text-center">
                <span className="text-sm text-ink-muted">Kubernetes &amp; custom edges</span>
                <span className="text-xs text-ink-faint">Enterprise</span>
              </li>
            </ul>
            <p className="m-0 mt-5 text-sm text-ink-faint">Bring your own cloud on every plan, including Personal.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="overages-title" className={SECTION}>
        <div className={CONTAINER}>
          <div className="reveal max-w-2xl">
            <p className="mb-3 text-sm text-ink-faint">Usage-based pricing</p>
            <h2 id="overages-title" className="text-headline m-0 text-ink">
              Simple, transparent overages.
            </h2>
          </div>
          <ul className="m-0 mt-12 grid list-none gap-4 p-0 md:grid-cols-3">
            {OVERAGES.map((row, i) => (
              <li
                key={row.plan}
                className="reveal rounded-2xl border border-line bg-surface/70 p-6"
                style={delay(i * 80)}
              >
                <h3 className="text-title m-0 text-ink">{row.plan}</h3>
                <dl className="m-0 mt-5 grid gap-3 text-sm">
                  <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-ink-muted">Bandwidth</dt>
                    <dd className="m-0 text-ink tabular-nums">{row.bandwidth}</dd>
                  </div>
                  <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
                    <dt className="text-ink-muted">Storage</dt>
                    <dd className="m-0 text-ink tabular-nums">{row.storage}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="faq-title" className={SECTION}>
        <div className={cn(CONTAINER, 'reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between')}>
          <div className="max-w-2xl">
            <p className="mb-3 text-sm text-ink-faint">Help</p>
            <h2 id="faq-title" className="text-headline m-0 text-ink">
              Frequently asked questions
            </h2>
            <p className="text-lead mt-5 mb-0 text-ink-muted">Have questions? We’re here to help.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://docs.zephyr-cloud.io/"
              target="_blank"
              rel="noopener"
              className={cn(BUTTON, BUTTON_SECONDARY)}
            >
              View Documentation
              <ArrowUpRight className="size-4" aria-hidden />
            </a>
            <a href="mailto:support@zephyr-cloud.io" className={cn(BUTTON, BUTTON_SECONDARY)}>
              Contact Support
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
