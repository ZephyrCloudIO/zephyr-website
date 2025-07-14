import GlowingLink from '@/components/ui/link.glowing-button';
import separateBottom from '@/images/separator-pointing-up.svg';
import { Helmet } from '@modern-js/runtime/head';
import type React from 'react';
import { TestimonialCard } from './testimonial-card';
import './community.css';
import AlexB from '@/images/community/AlexB.jpeg';
import Colum from '@/images/community/Colum.avif';
import Giorgio from '@/images/community/GiorgioBoa.jpeg';
import Hux from '@/images/community/Hux.jpg';
import Jack from '@/images/community/JackHerrington.jpg';
import Ken from '@/images/community/KenWheeler.jpg';
import MikeG from '@/images/community/MikeG.jpeg';
import RonR from '@/images/community/RonR.jpeg';
import Theo from '@/images/community/Theo.jpeg';
import Generic from '@/images/z-logo.avif';

interface Testimonial {
  name: string;
  company?: string;
  role?: string;
  content: string;
  avatar: string;
  socialLinks?: Array<{
    link: string;
    platform: 'LinkedIn' | 'X' | 'YouTube' | 'Twitch';
  }>;
}

const testimonials: Testimonial[] = [
  {
    name: 'Mike Grabowski',
    content:
      'Thanks to Zephyr we can confidently take Module Federation apps to production, on our own cloud and focus on features and leave all the infrastructure setup to them.',
    avatar: MikeG,
    role: 'CTO & Co-Founder',
    company: 'Callstack',
    socialLinks: [
      {
        link: 'https://x.com/grabbou',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/mikede30',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Jack Herrington',
    content:
      "Zephyr brings the promise of Module Federation to life. Immediate deploys and rollbacks. Version control. Native and Web support. It's all there.",
    avatar: Jack,
    role: 'Founder',
    company: 'Blue Collar Coder',
    socialLinks: [
      {
        link: 'https://x.com/jherr',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/jherr',
        platform: 'LinkedIn',
      },
      {
        link: 'https://www.youtube.com/@jherr',
        platform: 'YouTube',
      },
    ],
  },
  {
    name: 'Xuan Huang (Huxpro)',
    content:
      "Let's make Micro Frontend and Module Federation a first-class citizen of the future of frontend development.",
    avatar: Hux,
    role: 'Software Architect',
    company: 'ByteDance',
    socialLinks: [
      {
        link: 'https://x.com/Huxpro',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/huxpro',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Alex Bennett',
    content:
      'As our organization leans more into AI generated UI, I see Zephyr as the key piece to make our experimentation safe, reliable, and versioned so we can easily understand impact.',
    avatar: AlexB,
    role: 'Sr. Principal Architect',
    company: 'Accuris',
    socialLinks: [
      {
        link: 'https://x.com/alexUX_UI',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/alexuxui',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Ken Wheeler',
    content: 'Zephyr Cloud is a no-brainer if you have a giant app',
    avatar: Ken,
    role: 'Software Engineer',
    company: 'Citadel Securities',
    socialLinks: [
      {
        link: 'https://x.com/ken_wheeler',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/kennywheeler',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Ron R.',
    content:
      'Module Federation is amazing, but for it to really shine you need a way to glue it to the daily development process and CI. Zephyr is that glue. Expect Zephyr to speed up your dev cycle by 10x if not more.',
    avatar: RonR,
    role: 'Software Engineer',
    company: 'Snap',
    socialLinks: [
      {
        link: 'https://x.com/ronos_r',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/ronrosenshain',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Giorgio Boa',
    content:
      'With Zephyr Cloud you can seamlessly combine your micro frontends to unprecedented levels of performance. Join the revolution with a platform that will transform your development workflow.',
    avatar: Giorgio,
    role: 'Sr. Software Engineer',
    company: 'Qarik',
    socialLinks: [
      {
        link: 'https://x.com/giorgio_boa',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/giorgio-boa',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Zhang Lei',
    content:
      "Going from idea to global scale production couldn't be easier than with Rspack and Zephhr Cloud. Sub second builds and sub second and versioned deploys combined with instant rollbacks help avoid Sev1 downtime.",
    avatar: Generic,
    role: 'Web Infra manager',
    company: 'Web Infra',
    socialLinks: [
      {
        link: 'https://x.com/zoolsher',
        platform: 'X',
      },
    ],
  },
  {
    name: 'Colum Ferry',
    content:
      'Zephyr Cloud is the Micro Frontend orchestration tool you never knew you needed. What they have built will change deployments for the better. Think of the disruption k8s caused. Zephyr Cloud will do the same for the Micro Frontend world.',
    avatar: Colum,
    role: 'Sr. Software Engineer',
    company: 'Nx',
    socialLinks: [
      {
        link: 'https://x.com/FerryColum',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/colum-ferry-3a36a9169',
        platform: 'LinkedIn',
      },
    ],
  },
  {
    name: 'Theo Browne',
    content: 'Big teams deserve good DX too',
    avatar: Theo,
    role: 'Founder & CEO',
    company: 'Ping Labs',
    socialLinks: [
      {
        link: 'https://x.com/theo',
        platform: 'X',
      },
      {
        link: 'https://www.linkedin.com/in/t3gg',
        platform: 'LinkedIn',
      },
      {
        link: 'https://www.youtube.com/@t3dotgg',
        platform: 'YouTube',
      },
      {
        link: 'https://www.twitch.tv/theo',
        platform: 'Twitch',
      },
    ],
  },
];

export const CommunitySection: React.FC = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Zephyr Cloud',
    review: testimonials.map(t => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: t.name,
        jobTitle: t.role,
        worksFor: {
          '@type': 'Organization',
          name: t.company,
        },
      },
      reviewBody: t.content,
    })),
  };

  // Create a longer train by duplicating testimonials
  const scrollContent = [...testimonials, ...testimonials, ...testimonials];

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <section
        className="bg-black py-32 relative overflow-hidden"
        aria-labelledby="community-heading"
      >
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2E335A]/10 from-10% via-[#1C1B33]/5 via-70% to-[#2E335A]/10 to-90%" />
          <img
            src={separateBottom}
            className="absolute top-0 w-full object-cover opacity-50"
            alt="Decorative section separator"
            width="100%"
          />
        </div>
        <div className="container mx-auto px-4 mt-24 pt-12 relative z-10">
          <div className="py-2 mb-8">
            <div className="flex flex-col items-center gap-6 justify-between">
              <h2
                className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-4 bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent tracking-wider"
                id="community-heading"
              >
                What the community says
              </h2>
              <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl">
                Micro-frontends on steroids
              </p>
            </div>
          </div>

          <div className="testimonials-container relative">
            <div className="testimonials-wrapper">
              <div className="testimonials-group">
                {scrollContent.map(testimonial => (
                  <div
                    key={`${testimonial.name}-${testimonial.company || ''}-${
                      testimonial.role || ''
                    }-${testimonial.content.substring(0, 10)}`}
                    className="testimonial-card transform transition-all duration-300 hover:scale-105"
                  >
                    <TestimonialCard
                      socialLinks={testimonial.socialLinks}
                      name={testimonial.name}
                      company={testimonial.company}
                      role={testimonial.role}
                      content={testimonial.content}
                      avatar={testimonial.avatar}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="testimonials-fade-overlay bg-gradient-to-r from-black" />
            <div className="testimonials-fade-overlay-right bg-gradient-to-l from-black" />
          </div>

          <div className="flex md:justify-evenly flex-col md:flex-row justify-center gap-8 mt-20 items-center">
            <GlowingLink
              to="https://discord.gg/pSxWRVayEu"
              className="w-60"
              external={true}
              aria-label="Follow Zephyr Cloud on Discord"
            >
              <svg
                className="w-5 h-5 mr-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963.021-.04.001-.088-.041-.104a13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028zM8.02 15.278c-1.182 0-2.157-1.069-2.157-2.38 0-1.312.956-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.956 2.38-2.157 2.38zm7.975 0c-1.183 0-2.157-1.069-2.157-2.38 0-1.312.955-2.38 2.157-2.38 1.21 0 2.176 1.077 2.157 2.38 0 1.312-.946 2.38-2.157 2.38z" />
              </svg>
              Join Community
            </GlowingLink>
            <GlowingLink
              to="https://x.com/ZephyrCloudIO"
              className="w-60"
              external={true}
              aria-label="Follow Zephyr Cloud on X"
            >
              <svg
                className="w-5 h-5 mr-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              Follow us on X
            </GlowingLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default CommunitySection;
