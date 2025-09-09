import byoc from '@/images/byoc.webp';
import defaultCloud from '@/images/default-cloud.webp';
import { FeatureDescription, FeatureHeader, FeatureSection, FeatureTitle } from './FeatureSection';

const FeatureDiagram: React.FC<{
  title: string;
  image: string;
}> = ({ title, image }) => {
  return (
    <div className="border border-secondary rounded-2xl p-6 flex flex-col gap-4 items-center relative flex-1">
      <h4 className="text-base font-mono">{title}</h4>
      <img src={image} alt={title} />
    </div>
  );
};

const FeatureCard: React.FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <div className="flex-1 mt-1">
      <p className="text-lg text-primary">{title}</p>
      <p className="text-base text-muted-foreground mt-1">{description}</p>
    </div>
  );
};

const FeatureWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return <div className="flex flex-col md:flex-row gap-6 items-center">{children}</div>;
};

export const WorkflowsSection: React.FC = () => {
  return (
    <FeatureSection hasGradient={true}>
      <FeatureHeader>
        <FeatureTitle>Workflows</FeatureTitle>

        <FeatureDescription>
          With Zephyr you are in control of where you deploy.
          <br />
          Choose between bring your own cloud or use our built in one.
        </FeatureDescription>
      </FeatureHeader>

      <div className="flex flex-col gap-12 md:gap-6">
        <FeatureWrapper>
          <FeatureDiagram title="DEFAULT INTEGRATION" image={defaultCloud} />

          <FeatureCard
            title="Default Cloud"
            description="Powered by the largest CDNs in the world our built in cloud integration provides the fastest way to get started."
          />
        </FeatureWrapper>

        <FeatureWrapper>
          <FeatureDiagram title="BYOC INTEGRATION" image={byoc} />

          <FeatureCard
            title="Bring Your Own Cloud (BYOC)"
            description="Your cloud your choice, with Zephyr you can easily bring your own cloud, switch clouds, and deploy to multiple clouds at once, all with a few clicks."
          />
        </FeatureWrapper>
      </div>
    </FeatureSection>
  );
};
