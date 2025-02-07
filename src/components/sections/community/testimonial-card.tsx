import React, { memo } from 'react';
import {
  ExternalLinkIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';

interface TestimonialCardProps {
  name: string;
  socialLinks?: Array<{
    link: string;
    platform: 'LinkedIn' | 'X' | 'YouTube' | 'Twitch';
  }>;
  company?: string;
  role?: string;
  content: string;
  avatar: string;
  index?: number;
}

const getSocialIcon = (platform: string) => {
  switch (platform) {
    case 'LinkedIn':
      return <LinkedInLogoIcon />;
    case 'X':
      return <TwitterLogoIcon />;
    case 'GitHub':
      return <GitHubLogoIcon />;
    default:
      return <ExternalLinkIcon />;
  }
};

export const TestimonialCard: React.FC<TestimonialCardProps> = memo(
  ({ socialLinks, name, company, role, content, avatar }) => {
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
            {company && (
              <p className="text-gray-500 text-xs italic" itemProp="company">
                @ {company}
              </p>
            )}
          </div>
        </header>
        {socialLinks && (
          <p>
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-200"
                title={`${name}'s ${link.platform}`}
              >
                {getSocialIcon(link.platform)}
              </a>
            ))}
          </p>
        )}
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
