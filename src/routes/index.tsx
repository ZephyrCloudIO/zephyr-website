import { LatestPosts } from '@/components/home/LatestPosts';
import { ProofSection } from '@/components/home/ProofSection';
import { HomeStory } from '@/components/home/story/HomeStory';
import { UsedBySection } from '@/components/home/UsedBySection';
import { WaysIn } from '@/components/home/WaysIn';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HomeStory />
      <UsedBySection />
      <ProofSection />
      <WaysIn />
      <LatestPosts />
    </>
  );
}
