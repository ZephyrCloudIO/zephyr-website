import React, { memo } from 'react';
import {
  ExternalLinkIcon,
  LinkedInLogoIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import TwitchIcon from '../../../images/twitch.svg?react';
import YoutubeIcon from '../../../images/yt.svg?react';

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
      return <LinkedInLogoIcon className="w-4 h-4" />;
    case 'X':
      return <TwitterLogoIcon className="w-4 h-4" />;
    case 'YouTube':
      return <YoutubeIcon className="w-4 h-4" />;
    case 'Twitch':
      return <TwitchIcon className="w-4 h-4" />;
    default:
      return <ExternalLinkIcon className="w-4 h-4" />;
  }
};

export const TestimonialCard: React.FC<TestimonialCardProps> = memo(
  ({ name, role, company, content, avatar, socialLinks }) => {
    return (
      <article
        className="testimonial-card bg-zinc-900/30 backdrop-blur-md rounded-2xl p-8
        hover:bg-zinc-900/40 transition-all duration-300 border border-zinc-800/50
        shadow-xl hover:shadow-2xl mx-2 h-[280px] flex flex-col group"
        itemScope
        itemType="https://schema.org/Review"
      >
        <header className="flex items-center gap-4 mb-6">
          <img
            src={avatar}
            alt={`${name}'s avatar`}
            className="w-12 h-12 rounded-full object-cover testimonial-avatar
            border-2 border-zinc-700/50 text-white group-hover:border-zinc-600/50
            transition-all duration-300"
            loading="lazy"
            decoding="async"
            width="48"
            height="48"
            itemProp="image"
          />
          <div className="flex flex-col gap-1">
            <div
              itemProp="author"
              itemScope
              itemType="https://schema.org/Person"
            >
              <h3 className="text-white/90 font-medium text-sm" itemProp="name">
                {name}
              </h3>
              <div className="flex flex-col">
                {role && (
                  <p className="text-gray-500 text-xs" itemProp="jobTitle">
                    {role}
                  </p>
                )}
                {company && (
                  <p
                    className="text-gray-400 text-xs font-medium"
                    itemProp="worksFor"
                  >
                    @ {company}
                  </p>
                )}
              </div>
            </div>
            {socialLinks && socialLinks.length > 0 && (
              <div className="flex gap-2 mt-1">
                {socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-gray-300 transition-colors duration-200"
                    aria-label={`Follow on ${social.platform}`}
                  >
                    {getSocialIcon(social.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>
        </header>
        <p
          className="text-gray-400 text-sm leading-relaxed tracking-wide flex-1
          group-hover:text-gray-300 transition-colors duration-300"
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
