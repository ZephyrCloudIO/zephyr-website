import { FC } from 'react';
import MobileFirstHero from './heros/mobilefirst.webp';
import JesusBeam from '@/components/sections/pricing/beam.svg';
import infrastructureless from '@/images/blog/infrastructureless.webp';
import create_zephyr_apps from '@/images/blog/create-zephyr-apps.webp';
import { BlogCard, BlogPost } from '@/components/ui/blog-card';

import { Zack } from '@/routes/blog/authors/Zack';

const blogPosts: BlogPost[] = [
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
        socialLinks: [
          {
            link: 'https://x.com/zmzlois',
            platform: 'X',
          },
        ],
      },
    ],
    // image: create_zephyr_apps,
    description: 'From everyone has their own HACK till use Zephyr',
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
          {
            link: 'https://x.com/ScriptedAlchemy',
            platform: 'X',
          },
          {
            link: 'https://github.com/ScriptedAlchemy',
            platform: 'Github',
          },
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
  return (
    <>
      <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden mt-16">
        <div className="absolute -translate-x-[240px] w-[800px] opacity-90">
          <img
            src={JesusBeam}
            className="w-full"
            style={{
              filter: 'blur(50px) brightness(5)',
              WebkitFilter: 'blur(50px) brightness(5)',
            }}
            alt=""
          />
        </div>
        <div className="absolute w-[800px] opacity-90">
          <img
            src={JesusBeam}
            className="w-full"
            style={{
              filter: 'blur(50px) brightness(5)',
              WebkitFilter: 'blur(50px) brightness(5)',
            }}
            alt=""
          />
        </div>
        <div className="absolute translate-x-[240px] w-[800px] opacity-90">
          <img
            src={JesusBeam}
            className="w-full"
            style={{
              filter: 'blur(50px) brightness(5)',
              WebkitFilter: 'blur(50px) brightness(5)',
            }}
            alt=""
          />
        </div>
      </div>
      <div className="container relative mx-auto border-red-200 border justify-center items-center px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl p-4 font-bold text-center m-6 md:mb-12 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
          Blogs
        </h1>
        <div className="flex sm:flex-row flex-wrap flex-col md:gap-20 gap-10 justify-start border-blue-300 border-2 mx-auto container justify-items-center">
          {blogPosts.map(post => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
