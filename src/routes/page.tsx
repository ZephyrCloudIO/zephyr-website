import Hero from '@/components/sections/hero/index';
import './index.css';
import ValueProposition from '@/components/sections/value-proposition/index';
import VisualiseComponentSection from '@/components/sections/visualise-component';
import Mission from '@/components/sections/mission';
import DeploymentSection from '@/components/sections/deployment';
import ObservabilitySection from '@/components/sections/observability';

export default function App() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ValueProposition />
      <DeploymentSection />
      <VisualiseComponentSection />
      <Mission />
      <ObservabilitySection />
    </div>
  );
}
