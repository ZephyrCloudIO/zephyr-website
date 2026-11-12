export const campaignRoutes = [
  {
    id: 'always-deployed',
    slug: 'always-deployed',
    title: 'Always deployed',
    description:
      'Give every build a live URL. Release and roll back through Zephyr Cloud without rebuilding your application.',
  },
  {
    id: 'saaspocalypse',
    slug: 'saaspocalypse',
    title: 'SaaSpocalypse',
    description:
      'Build and own the software your team needs. Review each build live and control releases with Zephyr Cloud.',
  },
  {
    id: 'composable-enterprise',
    slug: 'composable-enterprise',
    title: 'Composable enterprise',
    description:
      'Let each team build and release its own modules while delivering one product through Module Federation and Zephyr Cloud.',
  },
  {
    id: 'agents-deploy',
    slug: 'agents-deploy',
    title: 'Agents deploy',
    description:
      'Review running software from every agent attempt. Let agents deploy and keep production releases in human hands.',
  },
  {
    id: 'kill-the-release-train',
    slug: 'kill-the-release-train',
    title: 'Kill the release train',
    description:
      'Release each team’s work when it is ready. Replace coordinated release windows with independent releases through Zephyr Cloud.',
  },
  {
    id: 'rollback-isnt-a-rebuild',
    slug: 'rollback-isnt-a-rebuild',
    title: "Rollback isn't a rebuild",
    description:
      'Roll production back to a build that is already deployed. Recover through Zephyr Cloud without rebuilding or uploading again.',
  },
  {
    id: 'one-line',
    slug: 'one-line',
    title: 'One line',
    description: 'Add Zephyr to your existing bundler for live build URLs, environments, releases and rollback.',
  },
  {
    id: 'cloud-is-a-commodity',
    slug: 'cloud-is-a-commodity',
    title: 'Cloud is a commodity',
    description:
      'Deploy the same build across cloud providers. Choose a cloud per environment and move without rebuilding your application.',
  },
  {
    id: 'ship-everywhere',
    slug: 'ship-everywhere',
    title: 'Ship everywhere',
    description: 'Release federated features across web, React Native and desktop applications through Zephyr Cloud.',
  },
  {
    id: 'stop-making-users-wait',
    slug: 'stop-making-users-wait',
    title: 'Stop making users wait',
    description:
      'Deliver JavaScript and UI updates to React Native, Electron and Tauri applications without waiting for a new store release.',
  },
  {
    id: 'ship-the-part',
    slug: 'ship-the-part',
    title: 'Ship the part, not the app',
    description:
      'Release individual app features through Module Federation and Zephyr Cloud. Update one remote without rebuilding the whole app.',
  },
] as const;

export type CampaignId = (typeof campaignRoutes)[number]['id'];

export interface CampaignPageProps {
  assetBaseUrl: string;
}
