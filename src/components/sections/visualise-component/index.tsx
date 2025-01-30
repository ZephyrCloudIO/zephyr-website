import { Link } from '@modern-js/runtime/router';
import { ValueCard, ValueCardProps } from './value-cards';
import { siteConfig } from '@/lib/site.config';
import { Button } from '@/components/ui/button';
import value1 from '@/images/value-graphic-1.svg';
import value2 from '@/images/value-graphic-2.svg';
import value3 from '@/images/value-graphic-3.svg';


export default function VisualiseComponentSection() {
  return (
    <section
      aria-label="Zephyr Cloud Features"
      className="container flex flex-col items-center py-10 md:py-32 gap-14 justify-center"
    >
      <div className="flex md:flex-row flex-col gap-10 py-2">
        <header className="md:w-1/2 py-1">
          <h2 className="md:text-6xl text-5xl text-transparent bg-gradient-to-tr bg-clip-text from-zinc-500 from-20% via-zinc-50 to-zinc-400 to-90% font-light leading-[1.2]">
            Visualize components in any environment
          </h2>
        </header>
        <div className="flex md:w-1/2 flex-col gap-4 md:pl-10 py-7">
          <p className="text-lg text-zinc-200/80 font-outfit-light">
            With Zephyr Cloud deployments and rollbacks take seconds
            <br /> instead of minutes.
          </p>
          <Link
            to={siteConfig.chrome}
            target="_blank"
            rel="noopener noreferrer"
            className="lg:w-2/5"
            aria-label="Install Chrome Extension"
          >
            <Button variant="outline">
              <h3 className="text-start">Install our Chrome Extension</h3>{' '}
            </Button>
          </Link>
        </div>
      </div>
      <div
        aria-label="Key Features"
        className="relative w-full  sm:p-[32px] p-[12px] rounded-[24px] border border-white/[0.045]"
        style={{
          boxShadow: 'rgba(255, 255, 255, 0.3) 2px 2px 40px 0px inset',
        }}
      >
        <div className="flex md:flex-row md:flex-wrap lg:flex-nowrap flex-col gap-8 justify-around items-baseline">
          {Values.map((item) => (
            <ValueCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Values: ValueCardProps[] = [
  {
    title: 'From development machines to the edge in milliseconds',
    description: 'Edge deployment',
    content:
      'Deploy on each save? You have it - forget about ngrok and keeping your laptop open, instead, use Zephyr to have applications deployed to production in your terminal. Make each save their own version.',
    graphic: value1,
  },
  {
    title: 'Bring your own cloud - no vendor lock in, full flexibility',
    content:
      'Freedom. Flexibility. No lock-in. Choose the cloud provider of your choice and we will bring you the rest - all you need is an API token from your cloud provider to enable Zephyr move as you wish. Empower your team with integration, scalability and control.',
    description: 'Bring your own cloud',
    graphic: value2,
  },
  {
    title: 'Framework agnostic, use what works best for your team',
    description: 'Framework agnostic',
    content:
      'Zephyr provides plugins for the most popular build tools on the market: Rspack, Vite, Webpack, even using Re.Pack with Rspack to bundle React Native applications. You have it. <a href="https://docs.zephyr-cloud.io/recipes" class="underline decoration-[0.4px] hover:decoration-slate-100 hover:text-slate-100s transition-all decoration-slate-300 underline-offset-4" alt="Recipes for each plugins with Zephyr">Read more from our documentation</a>.',
    graphic: value3,
  },
];
