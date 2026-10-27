export const pluginChangelogMetadataEntries = [
  {
    slug: '2026-10-02-v1-5-0-agent-skills-in-every-plugin',
    metadata: {
      title: 'Plugins v1.5.0: Agent Skills Ship With Every Plugin',
      date: '2026-10-02',
      version: 'v1.5.0',
      summary:
        'Every Zephyr plugin now ships its own AI agent skill, so coding agents read setup guidance that matches the exact plugin version you installed.',
      tags: ['plugins', 'ai-agents', 'skills', 'ze-cli'],
      category: 'dx',
      author: 'Zephyr Team',
    },
  },
  {
    slug: '2026-10-06-v1-6-0-change-attribution-eas-rstack',
    metadata: {
      title: 'Plugins v1.6.0: Change Attribution, Expo EAS Build, and Rstack Setup',
      date: '2026-10-06',
      version: 'v1.6.0',
      summary:
        'Builds from uncommitted changes can record who or which agent made them, ZE_CI_TOKEN works inside Expo EAS Build, and with-zephyr sets up Rstack projects.',
      tags: ['plugins', 'ci', 'expo', 'rstack', 'codemod', 'ai-agents'],
      category: 'feature',
      author: 'Zephyr Team',
    },
  },
  {
    slug: '2026-10-18-v1-7-0-json-deploy-output-vinext',
    metadata: {
      title: 'Plugins v1.7.0: JSON Deploy Output and Vinext on Cloudflare Vite Plugin 2.x',
      date: '2026-10-18',
      version: 'v1.7.0',
      summary:
        'ze-cli can print the deploy result as JSON, Vinext apps get the right plugin from with-zephyr and deploy with the Cloudflare Vite plugin 2.x, and federated containers are described once.',
      tags: ['plugins', 'ze-cli', 'vinext', 'cloudflare', 'module-federation'],
      category: 'feature',
      author: 'Zephyr Team',
    },
  },
] as const;
