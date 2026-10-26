import appMockup from '@/images/products/app-mockup.png';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

// Fades and tilts in once both the image and the page's shader are ready. The hidden starting state is
// scoped to html[data-motion='on'] (see the page's <style>), so the image is visible without JS.
export function AppScreenshot({ shaderReady }: { shaderReady: boolean }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const ready = imageLoaded && shaderReady;

  useEffect(() => {
    if (imageRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <img
      ref={imageRef}
      src={appMockup}
      alt="Zephyr app interface"
      width={3600}
      height={2264}
      className={cn(
        'ai-shot -mt-1 h-auto w-full max-w-[980px] md:-mx-[74px] md:-mt-3 md:w-[calc(100%+148px)] md:max-w-none',
        ready && 'is-ready',
      )}
      onLoad={() => setImageLoaded(true)}
    />
  );
}
