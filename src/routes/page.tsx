import Hero from '@/components/sections/hero';
import './index.css';
import Investors from '@/components/sections/investors';

export default function App() {
  return (
    <div className="flex flex-col gap-12">
      <section>
        <Hero />
      </section>
      <section className="flex items-center justify-center">
        <Investors />
      </section>
    </div>
  );
}
