import { Link } from '@modern-js/runtime/router';
// @ts-expect-error this file exists
import trueVenture from '@/images/truev.avif';
import stepFunction from '@/images/stepf-p-500.png';
import ninja from '@/images/ninjac-p-500.png';
import { siteConfig } from '@/lib/site.config';

export default function Investors() {
  return (
    <div className="flex flex-col min-h-[30vh] items-center gap-3">
      <h2 className="text-base text-transparent bg-clip-text bg-gradient-to-br from-zinc-600 via-zinc-500 to-zinc-400 font-[50]">
        Backed by
      </h2>
      <Link to={siteConfig.investors.true} target="_blank" className="w-60">
        {' '}
        <img
          src={trueVenture}
          alt="True venture logo - Zephyr Cloud Investor"
        />
      </Link>
      <div className=" flex ">
        <Link
          to={siteConfig.investors.stepFunction}
          className="w-40"
          target="_blank"
        >
          <img
            src={stepFunction}
            alt="Step Function logo - Zephyr Cloud Investor"
          />
        </Link>
        <Link to={siteConfig.investors.ninja} target="_blank" className="w-40">
          <img src={ninja} alt="Ninja Capital logo - Zephyr Cloud Investor" />
        </Link>
      </div>
    </div>
  );
}
