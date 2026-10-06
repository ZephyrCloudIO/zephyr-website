import { LatestPosts } from '@/components/home/LatestPosts';
import { ProofSection } from '@/components/home/ProofSection';
import { HomeStory } from '@/components/home/story/HomeStory';
import { WaysIn } from '@/components/home/WaysIn';
import type { BlogPost } from '@/lib/blog/types';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

export function HomePage({ posts = [] }: { posts?: BlogPost[] }) {
  return (
    <>
      <HomeStory />
      <ProofSection />
      <WaysIn />
      <LatestPosts posts={posts} />
    </>
  );
}
