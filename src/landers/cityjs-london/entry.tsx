import { mountLander } from '@/landers/runtime';
import { CityjsLondonLanderPage } from './LanderPage';

mountLander({
  slug: 'cityjs-london',
  title: 'CityJS London | Zephyr',
  component: CityjsLondonLanderPage,
});
