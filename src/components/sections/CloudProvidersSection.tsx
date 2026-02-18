import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import azure from '@/images/clouds/azure_white.webp';
import cloudflare from '@/images/clouds/cloudflare_white.webp';
import fastly from '@/images/clouds/fastly_white.webp';
import vercel from '@/images/clouds/vercel_white.webp';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, ExternalLink, Zap } from 'lucide-react';
import React from 'react';

interface CloudProvider {
  name: string;
  status: 'available' | 'eap' | 'coming-soon';
  logo: string;
  docsLink?: string;
}

const cloudProviders: CloudProvider[] = [
  {
    name: 'Cloudflare',
    status: 'available',
    logo: cloudflare,
    docsLink: 'https://docs.zephyr-cloud.io/cloud/cloudflare',
  },
  {
    name: 'Fastly',
    status: 'available',
    logo: fastly,
    docsLink: 'https://docs.zephyr-cloud.io/cloud/fastly',
  },
  {
    name: 'Akamai',
    status: 'available',
    logo: akamai,
    docsLink: 'https://docs.zephyr-cloud.io/cloud/akamai',
  },
  {
    name: 'AWS',
    status: 'available',
    logo: aws,
  },
  {
    name: 'Vercel',
    status: 'coming-soon',
    logo: vercel,
  },
  {
    name: 'Azure',
    status: 'coming-soon',
    logo: azure,
  },
];

const statusConfig = {
  available: {
    label: 'Available',
    icon: CheckCircle2,
    className: 'text-emerald-500',
    bgClassName: 'bg-emerald-500/10',
    borderClassName: 'border-emerald-500/20',
  },
  eap: {
    label: 'Early Access',
    icon: Zap,
    className: 'text-yellow-500',
    bgClassName: 'bg-yellow-500/10',
    borderClassName: 'border-yellow-500/20',
  },
  'coming-soon': {
    label: 'Coming Soon',
    icon: Clock,
    className: 'text-neutral-500',
    bgClassName: 'bg-neutral-500/10',
    borderClassName: 'border-neutral-500/20',
  },
};

export const CloudProvidersSection: React.FC = () => {
  return (
    <section className="py-20 bg-neutral-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Deploy Anywhere</h2>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Zephyr Cloud integrates seamlessly with leading cloud providers, enabling instant deployments and runtime
            updates across your preferred infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cloudProviders.map((provider) => {
            const config = statusConfig[provider.status];
            const Icon = config.icon;

            const CardContent = (
              <>
                <div className="flex flex-col items-center">
                  {/* Logo Container */}
                  <div
                    className={cn(
                      'w-full h-20 flex items-center justify-center mb-4',
                      provider.status === 'coming-soon' && 'opacity-60',
                    )}
                  >
                    <img
                      src={provider.logo}
                      alt={`${provider.name} logo`}
                      className={cn(
                        'h-10 w-auto object-contain',
                        provider.status === 'coming-soon' ? 'opacity-50 grayscale' : 'opacity-100',
                      )}
                    />
                  </div>

                  {/* Status Badge */}
                  <div
                    className={cn(
                      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium',
                      config.bgClassName,
                      config.borderClassName,
                      'border',
                    )}
                  >
                    <Icon size={12} className={config.className} />
                    <span className={config.className}>{config.label}</span>
                  </div>
                </div>

                {/* Hover Effect Gradient */}
                <div
                  className={cn(
                    'absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity',
                    'bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none',
                  )}
                />

                {/* Docs Link Indicator */}
                {provider.docsLink && (
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={16} className="text-neutral-400" />
                  </div>
                )}
              </>
            );

            const cardClasses = cn(
              'relative group rounded-lg p-6 border transition-all duration-300',
              'hover:border-neutral-700 hover:shadow-lg hover:shadow-emerald-500/5',
              provider.status === 'coming-soon' ? 'border-neutral-800/50' : 'border-neutral-800',
              provider.docsLink && 'cursor-pointer',
            );

            if (provider.docsLink) {
              return (
                <a key={provider.name} href={provider.docsLink} target="_blank" rel="noopener" className={cardClasses}>
                  {CardContent}
                </a>
              );
            }

            return (
              <div key={provider.name} className={cardClasses}>
                {CardContent}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-neutral-500">
            Need support for a different cloud provider?{' '}
            <a
              href="mailto:inbound@zephyr-cloud.io"
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              Let us know
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
