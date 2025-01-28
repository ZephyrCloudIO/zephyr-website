import React from 'react';
import { PricingSection } from '@/components/sections/pricing';
import { InfoCard } from '@/components/sections/pricing/info-card';
import JesusBeam from '@/components/sections/pricing/beam.svg';

const PricingPage: React.FC = () => {
  const calculationCards = [
    {
      title: 'Usage',
      description:
        '1000 deployments per month and 5 federated remotes. More than enough to get you started.',
      link: '#',
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 4L4 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 4L20 20"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: 'Users',
      description:
        'We believe that everyone should have visibility into their organization. So Zephyr Cloud has two user types: free (view only) and standard.',
      link: '#',
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M12 6v6l4 2"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      ),
    },
    {
      title: 'Your Price',
      description:
        'Go from development to global scale on the edge in seconds. Make data driven decisions and control your application in ways not possible before.',
      link: '#',
      icon: (
        <svg
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" />
          <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden mt-16">
        <div className="absolute -translate-x-[240px] w-[800px] opacity-90">
          <img
            src={JesusBeam}
            className="w-full"
            style={{
              filter: 'blur(50px) brightness(5)',
              WebkitFilter: 'blur(50px) brightness(5)',
            }}
            alt=""
          />
        </div>
        <div className="absolute w-[800px] opacity-90">
          <img
            src={JesusBeam}
            className="w-full"
            style={{
              filter: 'blur(50px) brightness(5)',
              WebkitFilter: 'blur(50px) brightness(5)',
            }}
            alt=""
          />
        </div>
        <div className="absolute translate-x-[240px] w-[800px] opacity-90">
          <img
            src={JesusBeam}
            className="w-full"
            style={{
              filter: 'blur(50px) brightness(5)',
              WebkitFilter: 'blur(50px) brightness(5)',
            }}
            alt=""
          />
        </div>
      </div>
      <main className="min-h-screen bg-[#010101] text-white pt-12">
        <div className="mx-auto px-4 relative">
          <section className="container relative mb-24">
            <h2 className="text-center text-5xl font-bold mb-12 bg-gradient-to-r from-white/90 from-30% to-[#808080] to-90% bg-clip-text text-transparent tracking-wider">
              How we calculate price
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {calculationCards.map((card) => (
                <InfoCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  // link={card.link}
                />
              ))}
            </div>
          </section>

          <section className="container">
            <PricingSection />
          </section>
        </div>
      </main>
    </>
  );
};

export default PricingPage;
