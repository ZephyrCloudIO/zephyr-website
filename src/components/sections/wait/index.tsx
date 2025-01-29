import { useEffect, useState } from 'react';
import GlowingLinkButton from '@/components/ui/link.glowing-button';

const WaitSection = () => {
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const loadVideo = async () => {
      let videoModule;
      const testVideoEl = document.createElement('video');
      const canPlayWebm = testVideoEl.canPlayType(
        'video/webm; codecs="vp8, vorbis"',
      );

      if (canPlayWebm === 'probably' || canPlayWebm === 'maybe') {
        videoModule = await import('@/images/videos/points.webm');
      } else {
        videoModule = await import('@/images/videos/points.mp4');
      }

      setVideoSrc(videoModule.default);
    };

    loadVideo();
  }, []);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <section className="container relative px-4 overflow-hidden">
      <div className="relative z-20 mt-6 w-full">
        <div
          className="relative p-4 md:p-16 rounded-3xl border border-white/10 overflow-hidden"
          style={{
            boxShadow: 'rgba(255, 255, 255, 0.1) 2px 2px 200px 0px inset',
          }}
        >
          {videoSrc && (
            <video
              src={videoSrc}
              onLoadedData={handleVideoLoad}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
                isVideoLoaded ? 'opacity-30' : 'opacity-0'
              }`}
              style={{
                backgroundSize: 'cover',
                backgroundPosition: '120% 120%',
              }}
              autoPlay
              muted
              loop
              playsInline
            />
          )}
          <div className="flex flex-col lg:flex-row items-start gap-12 relative z-10">
            <div className="flex-1 space-y-6">
              <h2 className="text-5xl md:text-6xl font-light tracking-wide">
                Never <span className="font-normal">wait</span>
                <br />
                again.
              </h2>
              <p className="text-lg text-gray-400 max-w-xl">
                Integrate this afternoon and enjoy seamless deployments,
                unmatched flexibility across clouds and frameworks without
                vendor lock-in.
              </p>
              <GlowingLinkButton
                to="https://app.zephyr-cloud.io/"
                external={true}
                className="w-48"
              >
                Sign Up Now
              </GlowingLinkButton>
            </div>

            <div className="relative flex-1 min-h-[300px]">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#2E335A]/20 to-transparent rounded-full blur-3xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WaitSection;
