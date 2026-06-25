import { useEffect, useState, type ComponentType } from 'react';
import { isLanderEnabled } from './enabled';

export function LanderRoute({ slug, component: Component }: { slug: string; component: ComponentType }) {
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    if (!isLanderEnabled(slug)) {
      setEnabled(false);
      window.location.replace('/');
    }
  }, [slug]);

  if (!enabled) {
    return null;
  }

  return <Component />;
}
