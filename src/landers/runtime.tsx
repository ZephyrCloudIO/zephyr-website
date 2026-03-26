import { StrictMode, type ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const ALWAYS_ON_MARKERS = new Set(['*', 'all']);

function parseEnabledLanders(rawValue: string | undefined) {
  if (!rawValue) {
    return new Set<string>();
  }

  return new Set(
    rawValue
      .split(',')
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

const enabledLanders = parseEnabledLanders(import.meta.env.ZE_PUBLIC_ENABLED_LANDERS);

export function isLanderEnabled(slug: string) {
  const normalizedSlug = slug.trim().toLowerCase();

  return enabledLanders.has(normalizedSlug) || [...ALWAYS_ON_MARKERS].some((marker) => enabledLanders.has(marker));
}

export function mountLander({
  slug,
  component: Component,
  title,
}: {
  slug: string;
  component: ComponentType;
  title?: string;
}) {
  const rootEl = document.getElementById('root');

  if (!rootEl) {
    return;
  }

  if (title) {
    document.title = title;
  }

  if (!isLanderEnabled(slug)) {
    window.location.replace('/');
    return;
  }

  document.documentElement.classList.add('dark');

  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <StrictMode>
      <Component />
    </StrictMode>,
  );
}
