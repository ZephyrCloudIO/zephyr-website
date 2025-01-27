import { FC } from 'react';
import { Link } from '@modern-js/runtime/router';
import JesusBeam from '@/components/sections/pricing/beam.svg';

interface BlogPost {
  title: string;
  slug: string;
  listingImage?: string;
  heroImage?: string;
  date: string;
  time?: string;
  authors?: [
    {
      displayName: string;
      zephyrMember: boolean;
      avatar: string;
      socialLinks?: Array<{
        link: string;
        platform: 'LinkedIn' | 'X' | 'YouTube' | 'Twitch';
      }>;
    },
  ];
  description: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Infrastructureless Future',
    slug: './infrastructureless',
    date: '2024-07-18',
    description:
      'Serverless computing has been hailed as a groundbreaking shift in web infrastructure. Yet, the term is somewhat misleading.',
  },
  {
    title: 'Launch Week 2: Kickoff',
    slug: './mobilefirst',
    date: '2025-01-27',
    description: 'Kicking off our second launch week with a new theme!',
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
      <div className="container relative max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl p-4 font-bold text-center m-6 md:mb-12 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
          Blogs
        </h1>
        <div className="flex flex-row justify-center items-center">
          {blogPosts.map(post => (
            <article
              key={post.slug}
              className="flex value-card-background backdrop-blur-lg md:w-[calc((100vw-19vw)/3)] p-5 flex-col items-center justify-between gap-3 rounded-2xl -[0.4px] -zinc-400/80"
            >
              <Link
                to={`/blog/${post.slug}`}
                className="no-underline block h-full"
              >
                <div className="relative z-10">
                  <h2 className="text-xl font-semibold mb-2 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {post.title}
                  </h2>
                  <div className="text-gray-400 text-sm mb-3">
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>
                  <p className="text-gray-300 line-clamp-3">
                    {post.description}
                  </p>
                </div>
                <div className="relative z-10 mt-4">
                  <span className="text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300">
                    Read more →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
};

export default BlogPage;
