import React, { memo } from 'react';

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
      <article
        className="testimonial-card bg-zinc-900/30 backdrop-blur-md rounded-2xl p-8 hover:bg-zinc-900/40 transition-all duration-300 border border-zinc-800/50 shadow-xl hover:shadow-2xl mx-2 h-[280px] flex flex-col"
        itemScope
        itemType="https://schema.org/Review"
      >
        <header className="flex items-center gap-4 mb-6">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover testimonial-avatar border-2 border-zinc-700/50 text-white"
            loading="lazy"
            decoding="async"
            width="48"
            height="48"
            itemProp="image"
          />
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <h3 className="text-white/90 font-medium text-sm" itemProp="name">
              {name}
            </h3>
            {role && (
              <p className="text-gray-500 text-xs" itemProp="jobTitle">
                {role}
              </p>
            )}
          </div>
        </header>
        <p
          className="text-gray-400 text-sm leading-relaxed tracking-wide flex-1"
          itemProp="reviewBody"
        >
          {content}
        </p>
      </article>
    );
  },
);

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
