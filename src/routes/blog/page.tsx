import { FC } from 'react';
import MobileFirstHero from '@/images/blog/mobilefirst.webp';
import CaseStudySGWS from '@/images/blog/case-study-sgws.webp';
import JesusBeam from '@/components/sections/pricing/beam.svg';
import infrastructureless from '@/images/blog/infrastructureless.webp';
import create_zephyr_apps from '@/images/blog/create-zephyr-apps.webp';
import ota_update from '@/images/blog/ota-update.webm';
import ota_hero from '@/images/blog/ota-hero.webp';
import { BlogCard, BlogPost } from '@/components/ui/blog-card';
import { Zack } from '@/lib/blog/authors/Zack';
import { Rodrigo } from '@/lib/blog/authors/Rodrigo';

const blogPosts: BlogPost[] = [
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

const BlogPage: FC = () => {
  const featuredPosts = blogPosts.slice(0, 2);
  const remainingPosts = blogPosts.slice(2);

  return (
    <div className="min-h-screen">
      <div className="fixed inset-x-0 top-0 h-[600px] overflow-hidden mt-16 -z-10">
        {['-translate-x-[240px]', '', 'translate-x-[240px]'].map(
          (transform) => (
            <div
              key={transform || 'center'}
              className={`absolute w-[800px] opacity-90 ${transform}`}
            >
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
          ),
        )}
      </div>

      <main className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 p-4 md:mb-16 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
          Blogs
        </h1>

        {/* Featured Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {featuredPosts.map((post) => (
            <div key={post.slug} className="flex">
              <BlogCard post={post} featured />
            </div>
          ))}
        </div>

        {/* Remaining Posts */}
        {remainingPosts?.length && (
          <h2 className="mb-8 text-xl">Latest Posts</h2>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {remainingPosts.map((post) => (
            <div key={post.slug} className="flex">
              <BlogCard post={post} />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;
