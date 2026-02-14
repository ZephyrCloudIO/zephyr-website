import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tab } from '@/components/ui/tab';
import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import azure from '@/images/clouds/azure_white.webp';
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
    cta: 'Start Building',
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

function PricingPage() {
  const [frequency, setFrequency] = useState<'monthly' | 'annually'>('monthly');
  const isAnnual = frequency === 'annually';

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Hero Section */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold mb-4">Pricing that scales with your team</h1>
        <p className="text-xl text-neutral-300 mb-1 max-w-2xl mx-auto">Start free and scale as you grow.</p>
      </div>

      {/* Key Features Banner */}
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
      <div className="p-6 mb-6">
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
      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={cn(
              'relative flex flex-col',
              tier.mostPopular && 'border-emerald-700 shadow-lg shadow-emerald-700/20',
            )}
          >
            {tier.mostPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-emerald-700 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription className="text-sm">{tier.description}</CardDescription>

              <div className="mt-4">
                {tier.price.monthly !== null ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">${isAnnual ? tier.price.annually : tier.price.monthly}</span>
                    <span className="text-neutral-400">/user/month</span>
                  </div>
                ) : (
                  <div className="text-3xl font-bold">Custom pricing</div>
                )}
              </div>
            </CardHeader>

            <CardContent className="flex-1">
              <ul className="space-y-3">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-emerald-700 mt-0.5 shrink-0" />
                    <span className="text-sm text-neutral-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>

            <CardFooter>
              <Button
                className={cn(
                  'w-full',
                  tier.mostPopular ? 'bg-emerald-700 hover:bg-emerald-600' : 'bg-neutral-500 hover:bg-neutral-600',
                )}
                asChild
              >
                <a href={tier.href} target="_blank">
                  {tier.cta}
                  <ChevronRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
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
              Deploy to Cloudflare, Fastly, Akamai, Vercel, or any of our supported cloud providers. Switch clouds
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
                <div className="flex items-center justify-center p-3">
                  <img src={azure} alt="Azure" className="h-8 w-auto opacity-50 grayscale" title="Coming Soon" />
                </div>
              </div>
              <div className="text-xs text-neutral-500 text-center pt-2">
                Available on all paid plans • More providers coming soon
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Usage-Based Pricing */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Simple, transparent overages</h2>
        <div className="grid md:grid-cols-3 gap-6">
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
              <CardTitle className="text-lg">Business</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-neutral-400">
                <li>Bandwidth: $25 per 100GB</li>
                <li>Storage: $5 per 50GB</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
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
