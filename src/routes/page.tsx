import { Helmet } from '@modern-js/runtime/head';
import Hero from '@/components/sections/hero/index';
import './index.css';
import { CommunitySection } from '@/components/sections/community';
import DeploymentSection from '@/components/sections/deployment';
import Footer from '@/components/sections/footer';
import { IntegrationsSection } from '@/components/sections/integrations';
import Mission from '@/components/sections/mission';
import ObservabilitySection from '@/components/sections/observability';
import ValueProposition from '@/components/sections/value-proposition/index';
import VisualiseComponentSection from '@/components/sections/visualise-component';
import WaitSection from '@/components/sections/wait';

export default function App() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ValueProposition />
      <DeploymentSection />
      <VisualiseComponentSection />
      <Mission />
      <ObservabilitySection />
      <IntegrationsSection />
      <CommunitySection />
      <WaitSection />
    </div>
  );
}
