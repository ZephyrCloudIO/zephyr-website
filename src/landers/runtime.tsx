import { StrictMode, type ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import './styles.css';

const ENABLED_LANDERS_ENV_VAR = 'ZE_PUBLIC_ENABLED_LANDERS';
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

function DisabledLander({ slug }: { slug: string }) {
  return (
    <main className="lander-disabled">
      <div className="lander-disabled__panel">
        <p className="lander-eyebrow">Lander disabled</p>
        <h1>{slug} is not enabled right now.</h1>
        <p>
          Add <code>{slug}</code> to <code>{ENABLED_LANDERS_ENV_VAR}</code> to serve this page.
        </p>
      </div>
    </main>
  );
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

  document.documentElement.classList.add('dark');

  const root = ReactDOM.createRoot(rootEl);
  root.render(<StrictMode>{isLanderEnabled(slug) ? <Component /> : <DisabledLander slug={slug} />}</StrictMode>);
}
