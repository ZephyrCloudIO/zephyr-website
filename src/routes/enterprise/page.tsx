import React from 'react';
import { Hero } from '@/components/sections/enterprise/hero';
import { ContactForm } from '@/components/sections/enterprise/contact-form';
import Hexagons from '@/images/hexagons-combined.svg';

const EnterprisePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <Hero />
          <ContactForm />
        </div>
      </div>
      {/* Hexagonal background pattern - absolute positioned */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url(${Hexagons})`,
          backgroundPosition: '120% 120%',
        }}
      />
    </div>
  );
};

export default EnterprisePage;
