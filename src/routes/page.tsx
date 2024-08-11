import Hero from '@/components/sections/hero/index';
import './index.css';
import Investors from '@/components/sections/investors';
import ValueProposition from '@/components/sections/value-proposition/index';

export default function App() {
  return (
    <div className="flex flex-col gap-12">
      <Hero />
      <Investors />
      <ValueProposition />
    </div>
  );
}
