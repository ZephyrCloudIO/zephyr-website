import JesusBeam from '@/components/sections/pricing/beam.svg';
import { BlogCard } from '@/components/ui/blog-card';
import type { BlogPost } from '@/components/ui/blog-card';
import ai_hero from '@/images/blog/ai-e2e-testing/ai-testing-hero.webp';
import ai_hero_listing from '@/images/blog/ai-e2e-testing/ai-testing-listing.webp';
import CaseStudySGWS from '@/images/blog/case-study-sgws.webp';
import cloud_daddy from '@/images/blog/cloud-daddy-hero.png';
import create_zephyr_apps_webm from '@/images/blog/create-zephyr-apps.webm';
import create_zephyr_apps from '@/images/blog/create-zephyr-apps.webp';
import infrastructureless from '@/images/blog/infrastructureless.webp';
import MobileFirstHero from '@/images/blog/mobilefirst.webp';
import ota_hero from '@/images/blog/ota-hero.webp';
import ota_update from '@/images/blog/ota-update.webm';
import soc2_hero from '@/images/blog/soc2/soc2_hero.webp';
import vibe_coding from '@/images/blog/vibe-coding.webp';
import soc2_listing from '@/images/blog/soc2/soc2_listing.webp';
import team_first from '@/images/blog/the-team-first-architecture.webp';
import three_sdlcs_one_zephyr from '@/images/blog/three-sdlc-one-zephyr.svg';
import { Nestor } from '@/lib/blog/authors/Nestor';
import { Rodrigo } from '@/lib/blog/authors/Rodrigo';
import { Shane } from '@/lib/blog/authors/Shane';
import { Zack } from '@/lib/blog/authors/Zack';
import { cn } from '@/lib/utils';
import type { FC, HTMLAttributes } from 'react';

const blogPosts: BlogPost[] = [
  {
    title: 'Coding with Your Artificial Friends - It’s a Vibe',
    slug: './vibe-coding',
    date: new Date('April 23, 2025 20:00:00 GMT+0'),
    heroImage: vibe_coding,
    listingImage: vibe_coding,
    description: 'Leveraging AI, Nx, and Micro Frontends brought together with Zephyr Cloud to make a clone of the social media platform X.',
    authors: [Zack],
  },
  {
    title: "Three SDLC's One Zephyr",
    slug: './three-sdlcs-one-zephyr',
    date: new Date('April 22, 2025 20:00:00 GMT+0'),
    heroImage: three_sdlcs_one_zephyr,
    listingImage: three_sdlcs_one_zephyr,
    description: "You don't have to do things our way, we adapt to you",
    authors: [Shane],
  },
  {
    title: 'Zephyr Cloud is Now SOC 2 Compliant',
    slug: './soc2',
    date: new Date('February 26, 2025 20:00:00 GMT+0'),
    heroImage: soc2_hero,
    listingImage: soc2_listing,
    description: 'Zephyr Cloud achieves SOC 2 compliance',
    authors: [Zack],
  },
  {
    title: 'AI based end-to-end testing',
    slug: './ai-e2e-testing',
    date: new Date('February 18, 2025 20:00:00 GMT+0'),
    heroImage: ai_hero,
    listingImage: ai_hero_listing,
    description:
      'Revolutionizing e2e testing with Midscene, Puppeteer, and Zephyr Cloud',
    authors: [Zack],
  },
  {
    title: "Who's your cloud daddy?",
    slug: './whos-your-cloud-daddy',
    date: new Date('January 30, 2025 16:00:00 GMT+0'),
    heroImage: cloud_daddy,
    listingImage: cloud_daddy,
    description:
      "They say you can't pick your family with Zephyr you can pick your cloud",
    authors: [Shane],
  },
  {
    title: 'The team-first Architecture',
    slug: './the-team-first-architecture',
    date: new Date('January 29, 2025 16:00:00 GMT+0'),
    heroImage: team_first,
    listingImage: team_first,
    description: 'A new architecture for the team-first era',
    authors: [Nestor],
  },
  {
    title: 'Over the Air (OTA) updates withZephyr',
    slug: './ota-with-zephyr',
    date: new Date('January 28, 2025 16:00:00 GMT+0'),
    heroImage: ota_update,
    listingImage: ota_hero,
    description: 'React Native OTA made it easy!',
    authors: [Rodrigo],
  },
  {
    title: "Case Study: Acceleration Week at Southern Glazer's Wine & Spirits",
    slug: './sgws-case-study',
    date: new Date('January 28, 2025 14:00:00 GMT+0'),
    listingImage: CaseStudySGWS,
    heroImage: CaseStudySGWS,
    description: 'An Acceleration Week Case Study with SGWS',
    authors: [Zack],
  },
  {
    title: '<code>npx create-zephyr-apps@latest</code>',
    slug: './create-zephyr-apps',
    date: new Date('January 27, 2025 16:00:00 GMT+0'),
    listingImage: create_zephyr_apps,
    heroImage: create_zephyr_apps_webm,
    authors: [
      {
        displayName: 'lois',
        zephyrMember: true,
        avatar:
          'https://pbs.twimg.com/profile_images/1770185301190709248/hZRQccIu_400x400.jpg',
        socialLinks: [{ link: 'https://x.com/zmzlois', platform: 'X' }],
      },
    ],
    description:
      'Launch Week 2, Day 1: From everyone has their own HACK till use Zephyr',
  },
  {
    title: 'Launch Week 2: Kickoff',
    slug: './mobilefirst',
    date: new Date('January 27, 2025 14:00:00 GMT+0'),
    listingImage: MobileFirstHero,
    heroImage: MobileFirstHero,
    description: 'Kicking off our second launch week with a new theme!',
    authors: [Zack],
  },
  {
    title: 'Infrastructureless Future',
    slug: './infrastructureless',
    date: new Date('July 18, 2024 14:00:00 GMT+0'),
    authors: [
      {
        displayName: 'Zack Jackson',
        zephyrMember: true,
        avatar:
          'https://pbs.twimg.com/profile_images/1601787403185934336/plWmMMB8_400x400.jpg',
        socialLinks: [
          { link: 'https://x.com/ScriptedAlchemy', platform: 'X' },
          { link: 'https://github.com/ScriptedAlchemy', platform: 'Github' },
        ],
      },
    ],
    listingImage: infrastructureless,
    heroImage: infrastructureless,
    description:
      'Serverless computing has been hailed as a groundbreaking shift in web infrastructure. Yet, the term is somewhat misleading.',
  },
];

const JesusBeamAura = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('absolute w-[800px] opacity-90', className)} {...props}>
      <img
        src={JesusBeam}
        className="w-full"
        style={{
          filter: 'blur(50px) brightness(5)',
          WebkitFilter: 'blur(50px) brightness(5)',
        }}
        alt=""
        loading="lazy"
      />
    </div>
  );
};

const BlogPage: FC = () => {
  const featuredPosts = blogPosts.slice(0, 2);
  const remainingPosts = blogPosts.slice(2);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-x-0 top-0 md:h-[600px h-auto overflow-hidden mt-16 -z-10">
        <JesusBeamAura className="-translate-x-[240px] opacity-90" />
        <JesusBeamAura className="" />
        <JesusBeamAura className="translate-x-[240px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 p-4 md:mb-16 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
          Blogs
        </h1>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map(post => (
            <li key={post.slug} className="flex">
              <BlogCard post={post} featured />
            </li>
          ))}
        </ul>

        <section aria-labelledby="latest-posts">
          <h2 id="latest-posts" className="mb-8 text-xl">
            Latest Posts
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {remainingPosts.map(post => (
              <li key={post.slug} className="flex">
                <BlogCard post={post} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default BlogPage;
