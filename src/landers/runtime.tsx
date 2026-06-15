import { StrictMode, type ComponentType } from 'react';
import ReactDOM from 'react-dom/client';
import { isLanderEnabled } from './enabled';
import './styles.css';

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
