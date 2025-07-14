import moduleFederationLogo from '@/images/platforms/module-federation.webp';
import reactLogo from '@/images/platforms/react.webp';
import rolldownLogo from '@/images/platforms/rolldown.webp';
import rspackLogo from '@/images/platforms/rspack.webp';
import rspressLogo from '@/images/platforms/rspress.webp';
import turborepoLogo from '@/images/platforms/turborepo.webp';
import viteLogo from '@/images/platforms/vite.webp';

interface Platform {
  logos: string[];
  backgroundColor: string;
  title: string;
  url: string;
}

export const platforms: Platform[] = [
  {
    logos: [rolldownLogo, reactLogo],
    backgroundColor: '#F3C4440D',
    title: 'Rolldown + React',
    url: 'https://docs.zephyr-cloud.io/recipes/rolldown-react',
  },
  {
    logos: [reactLogo, viteLogo],
    backgroundColor: '#BC35FE0D',
    title: 'React + Vite',
    url: 'https://docs.zephyr-cloud.io/recipes/react-vite',
  },
  {
    logos: [rspressLogo],
    backgroundColor: '#F4BE9A0D',
    title: 'Rspress',
    url: 'https://docs.zephyr-cloud.io/recipes/rspress',
  },
  {
    logos: [reactLogo],
    backgroundColor: '#61DAFB14',
    title: 'React Native',
    url: 'https://docs.zephyr-cloud.io/recipes/react-native',
  },
  {
    logos: [reactLogo, moduleFederationLogo, rspackLogo],
    backgroundColor: '#9589EC14',
    title: 'React + MF + Rspack',
    url: 'https://docs.zephyr-cloud.io/recipes/vite-rspack-webpack-mf',
  },
  {
    logos: [reactLogo, rspackLogo, turborepoLogo],
    backgroundColor: '#41B8830D',
    title: 'React + Rspack + Turborepo',
    url: 'https://docs.zephyr-cloud.io/recipes/turborepo-react',
  },
];
