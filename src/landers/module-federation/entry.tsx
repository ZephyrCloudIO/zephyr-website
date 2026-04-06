import { mountLander } from '@/landers/runtime';
import { ModuleFederationLanderPage } from './LanderPage';

mountLander({
  slug: 'module-federation',
  title: 'Built for Module Federation | Zephyr',
  component: ModuleFederationLanderPage,
});
