import React from 'react';
import { Database, Filter, Grid } from 'lucide-react';
import { FeatureListItem } from '../FeatureListItem';
import {
  FeatureSection,
  FeatureHeader,
  FeatureTitle,
  FeatureDescription,
  FeatureContent,
  FeatureColumn,
} from './FeatureSection';

const MicrofrontendSection: React.FC = () => (
  <FeatureSection hasGradient={true}>
    <FeatureHeader>
      <FeatureTitle>
        Micro Frontends and Mini Apps
      </FeatureTitle>
      <FeatureDescription>
        With support for React Native and the web you can ship no wherever your users are
      </FeatureDescription>
    </FeatureHeader>
    <FeatureContent layout="right-left">
      <FeatureColumn>
        <FeatureListItem
          icon={Database}
          title="Default MF Configuration"
          description="Built to work with Module Federation by default, no extra configuration."
        />
        <FeatureListItem
          icon={Filter}
          title="Zephyr MF Configuration"
          description="For more advanced configurations including cross repo and cross organization setup you can use the Zephyr MF Configuration."
        />
        <FeatureListItem
          icon={Grid}
          title="Zephyr package.json configuration"
          description="Keep configuration simple and managed alongside your npm dependencies."
        />
      </FeatureColumn>
      <FeatureColumn>
        <FeatureListItem
          icon={Database}
          title="Semver"
          description="Don't settle for hardcoded URLs or evergreen only deployments. Secure your organization with Semver versioning."
        />
        <FeatureListItem
          icon={Filter}
          title="Tags"
          description="Just like with NPM tags offer simple, easy to understand versioning to connect versions to your environements."
        />
        <FeatureListItem
          icon={Grid}
          title="Environments"
          description="With Zephyr environments are unlimited and at zero additional cost."
        />
      </FeatureColumn>
    </FeatureContent>
  </FeatureSection>
);

export default MicrofrontendSection;
