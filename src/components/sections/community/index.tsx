import React from 'react';
import { TestimonialCard } from './testimonial-card';
import GlowingLink from '@/components/ui/link.glowing-button';
import './community.css';
import Community1 from '@/images/community/Community1.webp';
import Community2 from '@/images/community/Community2.webp'
import Community3 from '@/images/community/Lois.avif'
import Community4 from '@/images/community/Colum.avif'

interface Testimonial {
  name: string;
  role?: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Grumble Bundle',
    content: 'Kickoff with @ZephyrCloudIO and this is the most compelling first 15 minutes i can remember from a platform in a long time, in terms of humans and proposition. TLDR: very fucking fast framework agnostic micro frontend deployment. 6 people kicking ass.',
    avatar: Community1
  },
  {
    name: 'Conference Attendee',
    content: 'Mad man deploying to prod on each save',
    avatar: Community2
  },
  {
    name: 'Lois',
    role: 'CEO of htmx.org',
    content: 'Our first hire got pitched by CEO before she joined the team: "I just tried @ZephyrCloudIO and … wow."',
    avatar: Community3
  },
  {
    name: 'Colum Ferry',
    role: 'Senior Software Engineer - NXdevtools',
    content: 'A demo of RSC MF, @vercel, @ZephyrCloudIO and @NxDevTools would be very interesting. Nx has made great strides to make the local developer experience with MF as frictionless and scalable as possible, whilst Zephyr Cloud takes MF and gives it steroids.',
    avatar: Community4
  },
];

export const CommunitySection: React.FC = () => {
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="bg-black py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="py-2 mb-12">
          <div className="flex flex-col items-center gap-4 justify-between">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left mb-2 md:mb-4 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
              What the community says
            </h2>
            <p className="text-md md:text-md text-gray-500 text-center md:text-left max-w-xs md:max-w-none">
              Micro-frontend on steroids.
            </p>
          </div>
        </div>

        <div className="testimonials-container">
          <div className="testimonials-wrapper">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.name}-${index}`}
                className="testimonial-card"
                style={{ '--base-y': `${(index % 3) * 20}px` } as React.CSSProperties}
              >
                <TestimonialCard
                  name={testimonial.name}
                  role={testimonial.role}
                  content={testimonial.content}
                  avatar={testimonial.avatar}
                />
              </div>
            ))}
          </div>
          <div className="testimonials-fade-overlay" />
        </div>

        <div className="flex justify-center gap-6 mt-16">
          <GlowingLink to="https://discord.gg/pSxWRVayEu" className='w-60'>
            <svg className="w-5 h-5 mr-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z"/>
            </svg>
            Join Community
        </GlowingLink>
            <GlowingLink to="https://x.com/ZephyrCloudIO" className='w-60'>
            <svg className="w-5 h-5 mr-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            Follow us on X
            </GlowingLink>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
