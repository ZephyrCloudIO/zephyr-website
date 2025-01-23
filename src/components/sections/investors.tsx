import { Link } from '@modern-js/runtime/router';
import trueVenture from '@/images/truev.avif';
import stepFunction from '@/images/stepf-p-500.png';
import ninja from '@/images/ninjac-p-500.png';
import night from '@/images/nightcapital.avif';
import { siteConfig } from '@/lib/site.config';

export default function Investors() {
  return (
    <section className="flex items-center justify-center z-10 px-4 py-8">
      <div className="flex flex-col min-h-[20vh] items-center gap-6 sm:gap-3">
        <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-br from-zinc-600 via-zinc-500 to-zinc-400 font-[50] text-center">
          Backed by
        </h2>
        <Link
          to={siteConfig.investors.true}
          target="_blank"
          className="w-48 sm:w-60 transition-transform duration-300 hover:scale-95"
        >
          <img
            src={trueVenture}
            alt="True venture logo - Zephyr Cloud Investor"
            className="w-full"
          />
        </Link>
        <div className="flex flex-col sm:flex-row gap-8 sm:gap-20 items-center">
          <Link
            to={siteConfig.investors.night}
            className="w-24 sm:w-32 transition-transform duration-300 hover:scale-95"
            target="_blank"
          >
            <img
              src={night}
              alt="Night Capital logo - Zephyr Cloud Investor"
              className="w-full"
            />
          </Link>
          <Link
            to={siteConfig.investors.stepFunction}
            className="w-24 sm:w-32 transition-transform duration-300 hover:scale-95"
            target="_blank"
          >
            <img
              src={stepFunction}
              alt="Step Function logo - Zephyr Cloud Investor"
              className="w-full"
            />
          </Link>
          <Link
            to={siteConfig.investors.ninja}
            target="_blank"
            className="w-20 sm:w-28 transition-transform duration-300 hover:scale-95"
          >
            <img
              src={ninja}
              alt="Ninja Capital logo - Zephyr Cloud Investor"
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
