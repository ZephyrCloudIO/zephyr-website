import { WhyZephyrCloudPage } from '@/components/pages/why-zephyr-cloud/WhyZephyrCloudPage';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/why-zephyr-cloud')({
  component: WhyZephyrCloudPage,
});
