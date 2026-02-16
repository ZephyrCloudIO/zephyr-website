import appMockup from '@/images/products/app-mockup.png';
import { useState } from 'react';

export function AppScreenshot({ shaderReady }: { shaderReady: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const ready = imageLoaded && shaderReady;

  return (
    <img
      src={appMockup}
      alt="Zephyr app interface"
      className="tilt-in -mt-1 h-auto w-full max-w-[980px] md:-mt-3 md:w-[calc(100%+148px)] md:max-w-none md:-mx-[74px]"
      style={{
        opacity: ready ? 1 : 0,
        ...(ready && { transition: 'opacity 0.6s ease-out 0.15s' }),
        animationPlayState: ready ? 'running' : 'paused',
        animationDelay: '0.15s',
      }}
      onLoad={() => setImageLoaded(true)}
    />
  );
}
