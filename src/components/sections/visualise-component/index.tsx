import { Link } from '@modern-js/runtime/router';
import { ValueCard, ValueCardType } from './value-cards';
import { siteConfig } from '@/lib/site.config';
import { SecondaryButton } from '@/components/ui/buttons/button.secondary';
import value1 from '@/images/value-graphic-1.svg';
import value2 from '@/images/value-graphic-2.svg';
import value3 from '@/images/value-graphic-3.svg';

export default function VisualiseComponentSection() {
  return (
    <section className="container flex flex-col items-center py-10 md:py-32 gap-14 justify-center px-4">
      <div className="flex md:flex-row flex-col gap-10 py-2 ">
        <div className="md:w-1/2 py-1">
          <h2 className="md:text-6xl text-5xl text-transparent bg-gradient-to-tr bg-clip-text from-zinc-500 from-20% via-zinc-50 to-zinc-400 to-90% font-light leading-[1.2]">
            Visualize components in any environment
          </h2>
        </div>
        <div className="flex md:w-1/2 flex-col gap-4 md:pl-10 py-7 ">
          <p className="text-lg text-zinc-200/80 font-outfit-light">
            With Zephyr Cloud deployments and rollbacks take seconds
            <br /> instead of minutes.
          </p>
          <Link to={siteConfig.chrome} target="_blank" className="lg:w-2/5">
            <SecondaryButton>
              <h3 className="text-start">Install our Chrome Extension</h3>{' '}
            </SecondaryButton>
          </Link>
        </div>
      </div>
      <div
        className="relative w-full max-w-[1278px] min-h-[596px] p-[32px] rounded-[24px] border border-white/[0.045]"
        style={{
          boxShadow: 'rgba(255, 255, 255, 0.3) 2px 2px 40px 0px inset',
        }}
      >
        <div className="flex md:flex-row flex-col gap-8 justify-around items-baseline">
          {Values.map(item => (
            <ValueCard key={item.title} props={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Values: ValueCardType[] = [
  {
    title: 'From development machines to the edge in milliseconds',
    graphic: value1,
  },
  {
    title: 'Bring your own cloud - no vendor lock in, full flexibility',
    content:
      'Freedom. Flexibility. No lock-in. Choose the cloud provider of your choice and we will bring you the rest - all you need is an API token from your cloud provider to enable Zephyr move as you wish. Empower your team with integration, scalability and control.',
    graphic: value2,
  },
  {
    title: 'Framework agnostic, use what works best for your team',
    graphic: value3,
  },
];
