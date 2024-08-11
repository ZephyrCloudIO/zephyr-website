import Hero from '@/components/sections/hero/index';
import './index.css';
import Investors from '@/components/sections/investors';
import ValueProposition from '@/components/sections/value-proposition/index';
import VisualiseComponentSection from '@/components/sections/visualise-component';
import Mission from '@/components/sections/mission';

export default function App() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Investors />
      <ValueProposition />
      <VisualiseComponentSection />
      <Mission />
    </div>
  );
}
