export const workerChangelogMetadataEntries = [
  {
    slug: '2026-10-07-v0-7-0-project-environment-releases',
    metadata: {
      title: 'Workers v0.7.0: Project Environment Releases and Clearer Akamai Errors',
      date: '2026-10-07',
      version: 'v0.7.0',
      summary:
        'The Cloudflare workers can release a host and its remotes to an environment together, and failed Akamai activations show the validation errors Akamai reported.',
      tags: ['workers', 'environments', 'cloudflare', 'akamai'],
      category: 'platform',
      author: 'Zephyr Team',
    },
  },
  {
    slug: '2026-10-13-v0-8-0-akamai-dash-delimiter',
    metadata: {
      title: 'Workers v0.8.0: Akamai Dash Delimiter and Authenticated Uploads Fix',
      date: '2026-10-13',
      version: 'v0.8.0',
      summary:
        'Akamai integrations can serve version URLs with the "-" delimiter, like other clouds, and new Akamai properties can verify deployment tokens again.',
      tags: ['workers', 'akamai', 'edge', 'domains'],
      category: 'integration',
      author: 'Zephyr Team',
    },
  },
] as const;
