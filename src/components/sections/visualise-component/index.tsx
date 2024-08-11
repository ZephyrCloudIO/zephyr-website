import { Link } from '@modern-js/runtime/router';
import { ValueCard, ValueCardType } from './value-cards';
import { siteConfig } from '@/lib/site.config';
import { SecondaryButton } from '@/components/ui/buttons/button.secondary';
import value1 from '@/images/value-graphic-1.svg';
import value2 from '@/images/value-graphic-2.svg';
import value3 from '@/images/value-graphic-3.svg';

export default function VisualiseComponentSection() {
  return (
    <section className="flex flex-col items-center py-10 md:py-32 gap-14 justify-center">
      <div className="flex md:flex-row flex-col gap-10  py-2 ">
        <div className="md:w-1/2  py-1 ">
          <h2 className="md:text-6xl text-5xl text-transparent bg-gradient-to-tr bg-clip-text from-zinc-500 from-20% via-zinc-50 to-zinc-400 to-90% font-light leading-[1.2]">
            Visualise components on every cloud
          </h2>
        </div>
        <div className="flex md:w-1/2 flex-col gap-4 md:pl-10 py-7 ">
          <p className="text-lg text-zinc-200/80 font-outfit-light">
            Rollback your component&apos;s version in seconds. Not hours.
          </p>
          <Link to={siteConfig.chrome} target="_blank" className="lg:w-2/5">
            <SecondaryButton>
              <h3 className="text-start">Install our Chrome Extension</h3>{' '}
            </SecondaryButton>
          </Link>
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-8 items-start">
        {Values.map(item => (
          <ValueCard key={item.content[3]} props={item} />
        ))}
      </div>
    </section>
  );
}

const Values: ValueCardType[] = [
  {
    title: 'Build. Integrate. Deploy. Faster than ever before.',
    content:
      'Unlock new possibilities in frontend deployment built for large teams using module federation and micro-frontends. Discover relationships between modules and publish module–level updates for different environments. Deploy to the edge in millie-seconds.',
    graphic: value1,
  },
  {
    title: 'No vendor lock-in. Full flexibility.',
    content:
      'Freedom. Flexibility. No lock-in. Choose the cloud provider of your choice and we will bring you the rest - all you need is an API token from your cloud provider to enable Zephyr move as you wish. Empower your team with integration, scalability and control.',
    graphic: value2,
  },
  {
    title: 'Framework agnostic, use what works best for your team.',
    content:
      'We build from the bundler level rather than frameworks. Leverage the tools and technologies your team excels in without restrictions. Needs a new plugin for your framework or bundler? Talk to our team in Discord.',
    graphic: value3,
  },
];
