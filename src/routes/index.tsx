import { BlogSection } from '@/components/sections/BlogSection';
import { CloudProvidersSection } from '@/components/sections/CloudProvidersSection';
import { DeploymentSection } from '@/components/sections/DeploymentSection';
import { HeroSection } from '@/components/sections/HeroSection';
import MicrofrontendSection from '@/components/sections/MicrofrontendSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { WorkflowsSection } from '@/components/sections/WorkflowsSection';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <HeroSection />
      <TestimonialsSection />
      {/* Feature Sections */}
      <WorkflowsSection />
      <CloudProvidersSection />
      <DeploymentSection />
      <MicrofrontendSection />
      <BlogSection />
    </>
  );
}
