import ButtonGlow from '@/components/ui/buttons/button.glow';
import AWS from '@/images/providers/aws.svg';
import Azure from '@/images/providers/azure.svg';
import CloudFlare from '@/images/providers/cloudflare.svg';
import Fastly from '@/images/providers/fastly.svg';
import Netlify from '@/images/providers/netlify.svg';
import Supabase from '@/images/providers/supabase.svg';
import VercelLogo from '@/images/providers/vercel.svg';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { IntegrationCard } from './integration-card';

const integrations = [
  {
    name: 'Cloudflare',
    link: 'https://docs.zephyr-cloud.io/cloud/cloudflare',
    icon: CloudFlare,
  },
  {
    name: 'Netlify',
    link: 'https://docs.zephyr-cloud.io/cloud/netlify',
    icon: Netlify,
  },
  {
    name: 'Fastly',
    link: 'https://docs.zephyr-cloud.io/cloud/fastly',
    icon: Fastly,
  },
  { name: 'AWS', icon: AWS },
  { name: 'Vercel', icon: VercelLogo },
  { name: 'Supabase', icon: Supabase },
  { name: 'Azure', icon: Azure },
];

export const IntegrationsSection: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const handleScroll = () => {
    if (!sliderRef.current) {
      return;
    }
    const cardWidth = 300 + 24; // card width + gap
    const currentIndex = Math.round(sliderRef.current.scrollLeft / cardWidth);

    // Check if we're at the end of the scroll
    const maxScroll =
      sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
    const isEnd = Math.abs(sliderRef.current.scrollLeft - maxScroll) < 10;

    setIsAtEnd(isEnd);
    setScrollIndex(currentIndex);
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) {
      return;
    }

    slider.addEventListener('scroll', handleScroll);
    return () => slider.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!sliderRef.current) {
      return;
    }

    const cardWidth = 300 + 24; // card width + gap
    const newScrollPosition =
      sliderRef.current.scrollLeft +
      (direction === 'left' ? -cardWidth : cardWidth);

    sliderRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    });
  };

  const cards = integrations.map((item, index) => {
    // If we're at the end, show all cards at full opacity
    // Otherwise, show only the first 3 visible cards at full opacity
    let opacity = 0.3;
    if (isAtEnd || (index >= scrollIndex && index < scrollIndex + 3)) {
      opacity = 1;
    }

    return (
      <div key={item.name} data-card-id={item.name}>
        <IntegrationCard {...item} opacity={opacity} />
      </div>
    );
  });

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="py-2">
          <div className="flex md:flex-row flex-col items-center py-4 md:py-6 gap-4 md:gap-8 justify-between">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left mb-2 md:mb-4 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
              Integrate your own cloud with flexibility
            </h2>
            <div className="flex flex-col items-center md:items-start">
              <p className="text-lg text-gray-400 text-center md:text-left mb-4">
                Connect your environment with our integrations following
                rule-based promotion - use our managed cloud or bring your own.
              </p>
              <div className="flex justify-center md:justify-end gap-4 mt-2 w-full">
                <ButtonGlow
                  onClick={() => scroll('left')}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-gray-800 hover:bg-black/70 transition-colors"
                  aria-label="Scroll left"
                >
                  <svg
                    className="w-5 h-5 text-white relative z-20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </ButtonGlow>

                <ButtonGlow
                  onClick={() => scroll('right')}
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-gray-800 hover:bg-black/70 transition-colors"
                  aria-label="Scroll right"
                >
                  <svg
                    className="w-5 h-5 text-white relative z-20"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </ButtonGlow>
              </div>
            </div>
          </div>
        </div>
        <div className="relative mt-8">
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory touch-pan-x"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {cards}
          </div>
        </div>
      </div>
    </section>
  );
};
