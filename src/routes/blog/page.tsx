import { FC, lazy, useMemo } from 'react';
import { Link } from '@modern-js/runtime/router';
import JesusBeam from '@/components/sections/pricing/beam.svg';
import infrastructureless from '@/images/blog/infrastructureless.jpeg';
import create_zephyr_apps from '@/images/blog/create-zephyr-apps.jpeg';
import { BlogCard, BlogPost } from '@/components/ui/blog-card';

type MDXComponent = {
  default: () => JSX.Element;
};

const blogPosts: BlogPost[] = [
  {
    title: 'Infrastructureless Future',
    slug: './infrastructureless',
    date: '2024-07-18',
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
    description:
      'Serverless computing has been hailed as a groundbreaking shift in web infrastructure. Yet, the term is somewhat misleading.',
  },
  {
    title: '<code>npx create-zephyr-apps@latest</code>',
    slug: './create-zephyr-apps',
    date: '2025-01-27',
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
      <div className="container relative mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl p-4 font-bold text-center m-6 md:mb-12 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
          Blogs
        </h1>
        <div className="flex sm:flex-row flex-col gap-10 justify-center items-center">
          {blogPosts.map(post => (
            <BlogCard post={post} />
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
