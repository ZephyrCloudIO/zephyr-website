declare module 'campaigns/*' {
  import type { ComponentType } from 'react';
  const CampaignPage: ComponentType<import('../../campaigns').CampaignPageProps>;
  export default CampaignPage;
}
