import React from 'react';
import { Hero } from '@/components/sections/enterprise/hero';
import ButtonGlow from '@/components/ui/buttons/button.glow';
import Hexagons from '@/images/hexagons-combined.svg';

const EnterprisePage: React.FC = () => {
  const handleContactClick = () => {
    window.location.href = 'mailto:inbound@zephyr-cloud.io?subject=Enterprise%20Inquiry';
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="flex flex-col gap-12 items-center">
          <Hero />
          <div className="flex justify-center items-center">
            <ButtonGlow
              onClick={handleContactClick}
              className="text-lg px-24 py-6"
            >
              Contact Us
            </ButtonGlow>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${Hexagons})`,
          backgroundPosition: '0% 20%',
        }}
      />
    </div>
  );
};

export default EnterprisePage;
