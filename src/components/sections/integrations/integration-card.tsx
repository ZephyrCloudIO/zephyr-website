import React from 'react';
import GlowingLinkButton from '@/components/ui/link.glowing-button';
import Cubes from '@/images/cubes.svg';

interface IntegrationCardProps {
  name: string;
  icon?: string;
  link?: string;
  opacity?: number;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({
  name,
  icon,
  link,
  opacity = 1,
}) => {
  return (
    <div
      className="relative flex flex-col items-center justify-center p-8 rounded-lg bg-black/30 backdrop-blur-sm border border-gray-800 min-w-[300px] min-h-[250px] transition-all duration-300 hover:border-gray-700"
      style={{
        boxShadow: 'rgba(255, 255, 255, 0.1) 2px 2px 100px 0px inset',
        backgroundImage: `url(${Cubes})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        opacity,
      }}
      role="article"
      aria-label={`Integration card for ${name}`}
    >
      <div className="w-16 h-16 mb-6 rounded-full bg-black/50 flex items-center justify-center">
        {icon ? (
          <img
            src={icon}
            alt={`Integration icon for ${name}`}
            className="max-w-full max-h-full"
            loading="lazy"
          />
        ) : (
          <div
            className="w-8 h-8 bg-gray-700 rounded-full"
            aria-hidden="true"
          />
        )}
      </div>
      <h3 className="text-xl font-medium text-white mb-4">{name}</h3>
      {!link ? (
        <span className="text-gray-400 px-4 py-2">Coming Soon</span>
      ) : (
        <GlowingLinkButton to={link} className="bg-stone-900" external={true}>
          Learn more
        </GlowingLinkButton>
      )}
    </div>
  );
};
