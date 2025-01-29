import type React from 'react';
import { memo } from 'react';

interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  avatar: string;
  index?: number;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = memo(
  ({ name, role, content, avatar }) => {
    return (
      <div className="testimonial-card bg-zinc-900/30 backdrop-blur-md rounded-2xl p-8 hover:bg-zinc-900/40 transition-all duration-300 border border-zinc-800/50 shadow-xl hover:shadow-2xl mx-2 h-[280px] flex flex-col">
        <div className="flex items-center gap-4 mb-6">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover testimonial-avatar border-2 border-zinc-700/50 text-white"
            loading="lazy"
            decoding="async"
          />
          <div>
            <h3 className="text-white/90 font-medium text-sm">{name}</h3>
            {role && <p className="text-gray-500 text-xs">{role}</p>}
          </div>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed tracking-wide flex-1">
          {content}
        </p>
      </div>
    );
  },
);

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
