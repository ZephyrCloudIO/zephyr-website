import { mountLander } from '@/landers/runtime';
import { DeployCalculatorLanderPage } from './LanderPage';

mountLander({
  slug: 'deploy-calculator',
  title: 'Deploy Velocity Calculator | Zephyr',
  component: DeployCalculatorLanderPage,
});
