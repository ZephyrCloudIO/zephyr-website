import { Link } from '@modern-js/runtime/router';
import GlowingButton from '@/components/ui/buttons/button.glowing-border';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section>
      <div className="grid grid-cols-3 md:h-[calc(100vh-30vh)] h-[calc(100vh-28vh)] items-center">
        <div className="flex sm:col-span-2 py-10 sm:py-0 col-span-3 flex-col space-y-2 sm:space-y-10">
          <div className="flex flex-col gap-8 sm:gap-4">
            {' '}
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400  via-zinc-50 via-30% to-zinc-300 to-70% font-medium leading-10 sm:leading-[5rem] sm:text-7xl text-4xl font-outfit-medium">
              The only sane way <br /> to do micro-frontends
            </h1>
            <div className="sm:pr-80 pr-6">
              {' '}
              <p className="tracking-wider font-outfit-light text-[#A9A9A9] font-thin sm:pr-10 pr-4 ">
                Zephyr is a cloud-agnostic, framework-agnostic platform for
                lightning fast deployment with best-in-class support for
                micro-frontends and module federation.
              </p>
            </div>
          </div>

          <div className="flex sm:flex-row flex-col py-8 sm:py-0 gap-6 items-center">
            <Link to={siteConfig.signUp}>
              <GlowingButton>Try Alpha</GlowingButton>
            </Link>
            <Link
              target="_black"
              to={siteConfig.headerNav[3].link}
              className={cn(
                'z-10 lg:px-4 items-center md:w-[166.2px] w-[140px] md:h-[44px] h-[40px] lg:py-4 border-2 border-zinc-500/30 rounded-full hover:border-zinc-400/80 justify-center bg-zinc-900 transition-all lg:hover:!opacity-100 flex lg:hover:bg-zinc-800 ',
              )}
            >
              <p className="font-outfit-light antialiased font-thin text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-100">
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
    </section>
  );
}
