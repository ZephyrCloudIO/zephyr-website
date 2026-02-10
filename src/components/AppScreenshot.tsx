import appMockup from '@/images/products/app-mockup.png';
import { useState } from 'react';

export function AppScreenshot({ shaderReady }: { shaderReady: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const ready = imageLoaded && shaderReady;

  return (
    <img
      src={appMockup}
      alt="Zephyr app interface"
      className="tilt-in -mt-2 h-auto w-[calc(100%+104px)] max-w-none -mx-[52px] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] md:-mt-3"
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
