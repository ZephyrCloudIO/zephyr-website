import type { BlogPost } from '@/components/ui/blog-card';
import ai_hero from '@/images/blog/ai-e2e-testing/ai-testing-hero.webp';
import ai_hero_listing from '@/images/blog/ai-e2e-testing/ai-testing-listing.webp';
import CaseStudySGWS from '@/images/blog/case-study-sgws.webp';
import create_zephyr_apps from '@/images/blog/create-zephyr-apps.webp';
import infrastructureless from '@/images/blog/infrastructureless.webp';
import MobileFirstHero from '@/images/blog/mobilefirst.webp';
import ota_hero from '@/images/blog/ota-hero.webp';
import ota_update from '@/images/blog/ota-update.webm';
import team_first from '@/images/blog/the-team-first-architecture.webp';
import { Lois } from '@/lib/blog/authors/Lois';
import { Nestor } from '@/lib/blog/authors/Nestor';
import { Rodrigo } from '@/lib/blog/authors/Rodrigo';
import { Zack } from '@/lib/blog/authors/Zack';

export const blogPosts: BlogPost[] = [
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
    authors: [Lois],
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
