import React from 'react';
import { PricingCard } from './pricing-card';
import PricingTable from './pricing-table';

interface PricingTier {
  name: string;
  price: string;
  link: string;
  features: string[];
  isHighlighted?: boolean;
}

const pricingTiers: PricingTier[] = [
  {
    name: 'Free',
    price: '$0',
    link: 'https://app.zephyr-cloud.io/',
    features: [
      '1 user',
      '5 remotes',
      '1000 deploys',
      '2 named environments',
      '100,000 Zephyr view requests',
    ],
  },
  {
    name: 'Standard',
    price: '$99',
    link: 'https://app.zephyr-cloud.io/',
    isHighlighted: true,
    features: [
      'Includes all Free features',
      'Starts after the first user',
      'Free for view only access',
      'Free for billing and account admins only accounts',
      'Open Source Projects first 5 people free',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    link: '/enterprise',
    features: ['Please reach out to us for further details'],
  },
];

export const PricingSection: React.FC = () => {
  return (
    <section className="relative mb-24 overflow-hidden">
      <div className="relative z-10">
        <h2 className="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-white/90 from-30% to-[#808080] bg-clip-text text-transparent tracking-wider">
          Our prices
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingTiers.map((tier, index) => (
            <PricingCard
              key={index}
              name={tier.name}
              link={tier.link}
              price={tier.price}
              features={tier.features}
              isHighlighted={tier.isHighlighted}
            />
          ))}
        </div>
        <div className="mt-20">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};
