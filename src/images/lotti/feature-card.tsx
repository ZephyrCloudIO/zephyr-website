import React from 'react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  className = '',
}) => {
  return (
    <div
      className={`relative p-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] transition-all duration-300 hover:border-[#3A3A3A] ${className}`}
    >
      <div className="flex flex-col gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A]">
          {icon}
        </div>

        <h3 className="text-xl font-medium text-white">{title}</h3>

        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
};
