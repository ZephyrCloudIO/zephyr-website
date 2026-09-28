import { useReducedMotion } from 'motion/react';
import { useState } from 'react';
import UnicornScene from 'unicornstudio-react';

/**
 * WebGL background for The AI Platform page. Uses the SDK version bundled with
 * `unicornstudio-react` (a pinned older SDK failed to load and retried in a loop),
 * and unmounts on error so a failure leaves a plain background instead.
 */
export function UnicornBackground({ onLoad }: { onLoad?: () => void }) {
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <UnicornScene
      projectId="xcqTpy33ZfkBvoKk52Jd"
      width="100%"
      height="900px"
      lazyLoad
      paused={Boolean(reduce)}
      showPlaceholderOnError={false}
      placeholderClassName="bg-transparent"
      onLoad={onLoad}
      onError={() => {
        setFailed(true);
        onLoad?.();
      }}
    />
  );
}
