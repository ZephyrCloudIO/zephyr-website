import Hero from '@/components/sections/hero/index';
import './index.css';
import ValueProposition from '@/components/sections/value-proposition/index';
import VisualiseComponentSection from '@/components/sections/visualise-component';
import Mission from '@/components/sections/mission';
import DeploymentSection from '@/components/sections/deployment';
import ObservabilitySection from '@/components/sections/observability';
import { IntegrationsSection } from '@/components/sections/integrations';
import { CommunitySection } from '@/components/sections/community';
import WaitSection from '@/components/sections/wait';
import Footer from '@/components/sections/footer';

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
      <Footer />
    </div>
  );
}
