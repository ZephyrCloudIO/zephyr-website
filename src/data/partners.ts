export interface Partner {
  id: string;
  name: string;
  logo: string;
  url: string;
  types: PartnerType[];
  capabilities: Capability[];
}

export type PartnerType = 'integration' | 'implementation';
export type Capability = 'web' | 'mobile' | 'bff' | 'tooling' | 'react-native';

// Import logos
import callstackLogo from '@/images/partners/callstack_logo.webp';
import nxLogo from '@/images/partners/nx_logo.webp';
import valorLogo from '@/images/partners/valor_logo.webp';

export const partners: Partner[] = [
  {
    id: 'nx',
    name: 'Nx',
    logo: nxLogo,
    url: 'https://nx.dev/',
    types: ['integration'],
    capabilities: ['tooling'],
  },
  {
    id: 'callstack',
    name: 'Callstack',
    logo: callstackLogo,
    url: 'https://www.callstack.com/',
    types: ['integration', 'implementation'],
    capabilities: ['mobile', 'web', 'react-native', 'tooling'],
  },
  {
    id: 'valor-software',
    name: 'Valor Software',
    logo: valorLogo,
    url: 'https://valor-software.com/',
    types: ['implementation'],
    capabilities: ['web', 'mobile'],
  },
];

// Helper functions for formatting
export const formatPartnerType = (type: PartnerType): string => {
  return type.charAt(0).toUpperCase() + type.slice(1);
};

export const formatCapability = (capability: Capability): string => {
  const formatted: Record<Capability, string> = {
    web: 'Web',
    mobile: 'Mobile',
    bff: 'BFF',
    tooling: 'Tooling',
    'react-native': 'React Native',
  };
  return formatted[capability] || capability;
};
