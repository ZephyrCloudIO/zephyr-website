import { Link } from '@modern-js/runtime/router';
import Lottie from 'lottie-react';
import { useEffect, useRef, useState } from 'react';
import GlowingButton from '@/components/ui/buttons/button.top-right-glow';
import { siteConfig } from '@/lib/site.config';
import { cn } from '@/lib/utils';
import videoPoster from '@/images/VideoPoster.webp';
import documentationGlow from '@/images/lordi/hover/documentation-glow.json';

export default function Hero() {
  const lottieRef = useRef<any>(null);
  const [isHovering, setIsHovering] = useState(false);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const handleMouseEnter = () => {
    if (lottieRef.current) {
      lottieRef.current.play();
      setIsHovering(true);
    }
  };

  const handleMouseLeave = () => {
    if (lottieRef.current) {
      lottieRef.current.stop();
      setIsHovering(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) {
      return;
    }

    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  useEffect(() => {
    const loadVideo = async () => {
      const videoModule = await import('@/images/videos/hero-video.mp4');
      setVideoSrc(videoModule.default);
    };

    loadVideo();
  }, []);

  const handleVideoLoad = () => {
  setIsVideoLoaded(true);
};
  return (
    <section className='px-8'>
      <div>
        <video
           className={cn(
            "absolute top-0 left-0 w-full h-full object-cover -z-10 transition-opacity duration-1000",
            isVideoLoaded ? "opacity-100" : "opacity-0"
          )}
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          poster={videoPoster}
          onLoadedData={handleVideoLoad}
        >
          {videoSrc && <source src={videoSrc} type="video/mp4" />}
        </video>
        <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black via-black/90 via-30% to-transparent to-80%" />
      </div>
      <div className="grid grid-cols-3 md:h-[calc(100vh-30vh)] h-[calc(100vh-28vh)] items-center">
        <div className="flex sm:col-span-2 py-10 sm:py-0 col-span-3 flex-col space-y-2 sm:space-y-10">
          <div className="flex flex-col gap-8 sm:gap-4">
            {' '}
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-400  via-zinc-50 via-30% to-zinc-300 to-70% font-medium leading-10 sm:leading-[5rem] sm:text-7xl text-4xl font-outfit-medium">
              The only <br /> sane way to do <br /> micro-frontends
            </h1>
            <div className="sm:pr-8 pr-6">
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
            <div className="relative">
              <Lottie
                lottieRef={lottieRef}
                animationData={documentationGlow}
                loop={false}
                autoplay={false}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ opacity: isHovering ? 1 : 0 }}
              />
              <Link
                ref={buttonRef}
                target="_black"
                to={siteConfig.headerNav[3].link}
                className={cn(
                  'group relative z-10 lg:px-4 items-center md:w-[166.2px] w-[140px] md:h-[44px] h-[40px] lg:py-4 border-2 border-zinc-500/30 rounded-full hover:border-zinc-400/80 justify-center bg-zinc-900 transition-all lg:hover:!opacity-100 flex lg:hover:bg-zinc-800 overflow-hidden',
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                style={
                  {
                    '--mouse-x': `${mousePosition.x}px`,
                    '--mouse-y': `${mousePosition.y}px`,
                  } as React.CSSProperties
                }
              >
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,120,120,0.15),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <p className="font-outfit-light antialiased font-thin text-sm tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-100">
                  Documentation
                </p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
