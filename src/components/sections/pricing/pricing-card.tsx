import React from 'react';
import GlowingLinkButton from '@/components/ui/link.glowing-button';

interface PricingCardProps {
  name: string;
  price: string;
  features: string[];
  link: string;
  isHighlighted?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  features,
  link,
  isHighlighted,
}) => {
  return (
    <div
      className="p-8 grid grid-rows-[auto_1fr_auto] h-full rounded-2xl backdrop-blur-sm relative border-2 border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#2E335A]/1 from-10% via-[#1C1B33]/50 via-70% to-[#2E335A]/1 to-90%"
      style={
        !isHighlighted
          ? {}
          : {
              boxShadow: 'rgba(255, 255, 255, 0.1) 2px 2px 200px 0px inset',
            }
      }
    >
      <div className="text-center h-[160px]">
        <h3 className="text-xl mb-4">{name}</h3>
        <div className="text-5xl font-bold tracking-wider">
          <span className="bg-gradient-to-r from-[#2a2a2a] via-white to-[#2a2a2a] text-transparent bg-clip-text">
            {price}
          </span>
          {price !== 'Custom' && (
            <span className="text-5xl text-gray-400"> / month</span>
          )}
        </div>
        <div className="bg-gradient-to-r from-[#2a2a2a] from-15% via-white via-50% to-[#2a2a2a] to-90% h-[0.1rem] mt-8"></div>
      </div>

      <div className="min-h-0">
        <div className="text-gray-400 text-center mb-6">
          What&apos;s included:
        </div>
        <ul className="space-y-4">
          {features.map((feature) => (
            <li
              key={`feature-${feature.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center"
            >
              <svg
                className="w-5 h-5 mr-3 text-gray-400 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-gray-300">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <GlowingLinkButton to={link} className="text-white font-medium w-full">
          Get Started
        </GlowingLinkButton>
      </div>
    </div>
  );
};
