/* eslint-disable import/no-named-as-default */
import Balancer from 'react-wrap-balancer';
import { Link } from '@modern-js/runtime/router';
import GlowingButton from '@/components/ui/buttons/button.glowing-border';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <div className="grid grid-cols-3 h-[calc(100vh-30vh)] items-center">
      <div className="flex sm:col-span-2 col-span-3 flex-col space-y-4 sm:space-y-10">
        <h1 className=" text-zinc-300/80 font-medium leading-10 sm:leading-[5rem] sm:text-7xl text-4xl font-outfit-medium">
          The only sane way <br /> to do micro-frontends
        </h1>
        <div className="sm:pr-80 pr-10 border">
          {' '}
          <p className="tracking-wider font-outfit-light pr-10 border">
            Zephyr is a cloud-agnostic, framework-agnostic platform for
            lightning fast deployment with best-in-class support for
            micro-frontends and module federation.
          </p>
        </div>
        <div className="flex gap-6">
          <Link to={siteConfig.signUp}>
            <GlowingButton>Try Alpha</GlowingButton>
          </Link>
          <Link
            to={siteConfig.headerNav[3].link}
            className={cn(
              'z-10 lg:px-4 items-center w-40 lg:py-4 border-2 border-zinc-500/30 rounded-full hover:border-zinc-400/80 justify-center bg-zinc-900 transition-all lg:hover:!opacity-100 flex lg:hover:bg-zinc-800 ',
            )}
          >
            <p className="text-center tracking-wide font-medium">
              Documentation
            </p>
          </Link>
        </div>
      </div>
      <div className="col-span-1">
        <video
          className="absolute z-20"
          src={
            'https://my.spline.design/website3dherodesignanimatedrlvnt-afe06b1ac1170eb8b596121bf41961a8/'
          }
        ></video>
      </div>
    </div>
  );
}
