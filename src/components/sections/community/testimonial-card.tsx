import React from 'react';

interface TestimonialCardProps {
  name: string;
  role?: string;
  content: string;
  avatar: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  content,
  avatar,
}) => {
  return (
    <div className="bg-zinc-900/30 backdrop-blur-md rounded-2xl p-6 hover:bg-zinc-900/40 transition-all duration-300 border border-zinc-800/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 hover:scale-[1.02] w-[320px] mx-2">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar}
          alt={`${name}'s avatar`}
          className="w-12 h-12 rounded-full object-cover testimonial-avatar border-2 border-zinc-700/50"
          loading="lazy"
        />
        <div>
          <h3 className="text-white/90 font-medium text-sm">{name}</h3>
          {role && (
            <p className="text-gray-500 text-xs">
              {role}
            </p>
          )}
        </div>
      </div>
      <p className="text-gray-400 text-sm leading-relaxed tracking-wide">{content}</p>
    </div>
  );
};

export default TestimonialCard;
