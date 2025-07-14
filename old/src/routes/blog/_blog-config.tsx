import type { BlogPost } from '@/components/ui/blog-card';
import ai_hero from '@/images/blog/ai-e2e-testing/ai-testing-hero.webp';
import ai_hero_listing from '@/images/blog/ai-e2e-testing/ai-testing-listing.webp';
import all_the_pipelines from '@/images/blog/all-the-pipelines.svg';
import CaseStudySGWS from '@/images/blog/case-study-sgws.webp';
import cloud_daddy from '@/images/blog/cloud-daddy-hero.png';
import create_zephyr_apps_webm from '@/images/blog/create-zephyr-apps.webm';
import create_zephyr_apps from '@/images/blog/create-zephyr-apps.webp';
import infrastructureless from '@/images/blog/infrastructureless.webp';
import MobileFirstHero from '@/images/blog/mobilefirst.webp';
import ota_hero from '@/images/blog/ota-hero.webp';
import ota_update from '@/images/blog/ota-update.webm';
import runtime_ota from '@/images/blog/runtime-ota/runtime-ota.webp';
import soc2_hero from '@/images/blog/soc2/soc2_hero.webp';
import soc2_listing from '@/images/blog/soc2/soc2_listing.webp';
import team_first from '@/images/blog/the-team-first-architecture.webp';
import three_sdlcs_one_zephyr from '@/images/blog/three-sdlc-one-zephyr.svg';
import vibe_coding from '@/images/blog/vibe-coding.webp';
import { Lois } from '@/lib/blog/authors/Lois';
import { Nestor } from '@/lib/blog/authors/Nestor';
import { Rodrigo } from '@/lib/blog/authors/Rodrigo';
import { Shane } from '@/lib/blog/authors/Shane';
import { Zack } from '@/lib/blog/authors/Zack';

export const blogPosts: BlogPost[] = [
  {
    title: 'My Neck, My Back, My Updates and My App',
    slug: './week-3-runtime-ota',
    date: new Date('April 24, 2025 20:00:00 GMT+0'),
    heroImage: runtime_ota,
    listingImage: runtime_ota,
    description: 'My Neck, My Back, My Updates and My App',
    authors: [Lois],
  },
  {
    title: 'One Build. Many Clouds. Zero Headaches.',
    slug: './all-the-pipelines',
    date: new Date('April 24, 2025 20:00:00 GMT+0'),
    heroImage: all_the_pipelines,
    listingImage: all_the_pipelines,
    description:
      'Have you ever been in love with more than one cloud provider at once? Why choose, introducing Poly Cloud support by Zephyr Cloud',
    authors: [Rodrigo],
  },
  {
    title: 'Coding with Your Artificial Friends - It’s a Vibe',
    slug: './vibe-coding',
    date: new Date('April 23, 2025 20:00:00 GMT+0'),
    heroImage: vibe_coding,
    listingImage: vibe_coding,
    description:
      'Leveraging AI, Nx, and Micro Frontends brought together with Zephyr Cloud to make a clone of the social media platform X.',
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
