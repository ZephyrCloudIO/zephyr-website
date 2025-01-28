import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  className?: string;
  gradient: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  gradient,
  className = '',
}) => {
  return (
    <div
      className={`relative p-6 rounded-2xl border border-[#2A2A2A] transition-all duration-300 hover:border-[#3A3A3A] ${className} bg-gradient-to-b from-[#2E335A]/10 from-10% via-[#1C1B33]/5 via-70% to-[#2E335A]/10 to-90%`}
    >
      <div className="flex flex-col gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full border border-white bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A] ${gradient} transition-transform duration-200 hover:scale-110`}
        >
          {icon}
        </div>

        <h3 className="text-xl font-medium text-white">{title}</h3>

        <span className="text-sm text-gray-400">{description}</span>
      </div>
    </div>
  );
};
