import React from 'react';
import CardIcon from './card-icon.svg';

interface FeatureCardProps {
  title: string;
  link: string;
  description: string;
}

export const InfoCard: React.FC<FeatureCardProps> = (props) => {
  const handleLearnMore = (e: React.MouseEvent) => {
    e.preventDefault();
    const pricingTable = document.getElementById('pricing-table');
    if (pricingTable) {
      pricingTable.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="relative p-6 rounded-2xl border border-[#2A2A2A] transition-all duration-300 hover:border-[#3A3A3A] bg-gradient-to-b from-[#2E335A]/10 from-10% via-[#1C1B33]/5 via-70% to-[#2E335A]/10 to-90% h-[300px]">
      <div className="flex flex-col h-full">
        <div className="flex flex-col gap-4">
          <div className="w-12 h-12 flex items-center justify-center rounded-full border border-white bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] transition-transform duration-200 hover:scale-110">
            <img src={CardIcon} alt={props.title} />
          </div>

          <h3 className="text-xl font-medium text-white">{props.title}</h3>
          <p className="text-sm text-gray-400">{props.description}</p>
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={handleLearnMore}
            className="text-blue-500 hover:text-blue-400 cursor-pointer"
          >
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
};
