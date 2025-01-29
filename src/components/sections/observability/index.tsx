import FluidWallpaper from '@/images/fluid-wallpaper.webp';
import ActIcon from '@/images/observability/act.svg';
import CloudIcon from '@/images/observability/cloud.svg';
import CollaborateIcon from '@/images/observability/collaborate.svg';
import DependencyIcon from '@/images/observability/dependency.svg';
import DeployIcon from '@/images/observability/deploy.svg';
import FederatedIcon from '@/images/observability/federated.svg';
import MultiIcon from '@/images/observability/multi.svg';
import VersionIcon from '@/images/observability/version.svg';
import type React from 'react';
import { FeatureCard } from './feature-card';

const features = [
  {
    icon: <img src={CloudIcon} alt="Cloud agnostic" />,
    title: 'Cloud agnostic',
    description: (
      <>
        Bring your own cloud, without vendor lock-in from AWS to Vercel to
        Netlify. See our supported{' '}
        {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
        <a href="#" className="text-white">
          platforms here.
        </a>
      </>
    ),
    gradient: 'bg-linear-to-b from-[#9667ED] to-[#9667ED]/1',
  },
  {
    icon: (
      <img
        src={DependencyIcon}
        className="w-6 h-6"
        alt="Dependency management"
      />
    ),
    title: 'Dependency management',
    description:
      'Visualize dependencies. Streamline the handling of project dependencies and conflicts.',
    gradient: 'bg-linear-to-b from-[#61E8B7] to-[#61E8B7]/1',
  },
  {
    icon: <img src={DeployIcon} className="w-6 h-6" alt="Deploy to the edge" />,
    title: 'Deploy to the edge',
    description:
      'Utilize the full power of your cloud provider to enable global edge deployment.',
    gradient: 'bg-linear-to-b from-[#FBBF92] to-[#FBBF92]/1',
  },
  {
    icon: (
      <img src={VersionIcon} className="w-6 h-6" alt="Versioned Releases" />
    ),
    title: 'Versioned Releases',
    description:
      'Opt in for manual production promotion or comprehensive rule-based promotion with granularity.',
    gradient: 'bg-linear-to-b from-[#FBBF92] to-[#FBBF92]/1',
  },
  {
    icon: (
      <img
        src={CollaborateIcon}
        className="w-6 h-6"
        alt="Collaborate in every environment"
      />
    ),
    title: 'Collaborate in every environment',
    description: 'Preview all different versions within a team in real-time.',
    gradient: 'bg-linear-to-b from-[#9667ED] to-[#9667ED]/1',
  },
  {
    icon: (
      <img src={ActIcon} className="w-6 h-6" alt="Act from your terminal" />
    ),
    title: 'Act from your terminal',
    description: (
      <>
        Integrate with your existing build tool for deployment without
        interfering with your original build process. Deploy upon each `
        <p className="text-white inline">npm run build</p>`.
      </>
    ),
    gradient: 'bg-linear-to-b from-[#61E8B7] to-[#61E8B7]/1',
  },
  {
    icon: (
      <img
        src={FederatedIcon}
        className="w-6 h-6"
        alt="Federated application"
      />
    ),
    title: 'Federated application, visualized',
    description:
      'View graph and sub-module relationships within our dashboard and preview all versions in Chrome Extension.',
    gradient: 'bg-linear-to-b from-[#9667ED] to-[#9667ED]/1',
  },
  {
    icon: <img src={MultiIcon} className="w-6 h-6" alt="Multi-frameworks" />,
    title: 'Multi-frameworks in runtime',
    description:
      'Within our supported frameworks, you can combine them together in one application.',
    gradient: 'bg-linear-to-b from-[#FBBF92] to-[#FBBF92]/1',
  },
];

const ObservabilitySection: React.FC = () => {
  return (
    <section className="mt-24 py-24 bg-black border-2 rounded-lg border-[rgba(255,255,255,0.1)] bg-gradient-to-b from-[#2E335A]/10 from-10% via-[#1C1B33]/5 via-70% to-[#2E335A]/10 to-90%">
      <div className="container mx-auto px-4">
        <div className="py-2">
          <div className="flex md:flex-row flex-col items-center py-4 md:py-6 gap-4 md:gap-8 justify-between">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center md:text-left mb-2 md:mb-4 bg-gradient-to-r from-white to-[#808080] bg-clip-text text-transparent tracking-wider">
              Full observability for
              <br /> federated applications
            </h2>
            <p className="text-lg text-gray-400 text-center md:text-left">
              Zephyr Cloud solves these issues with unparalleled visbility and
              control.
            </p>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `url(${FluidWallpaper})`,
                backgroundSize: 'cover',
                backgroundPosition: '120% 120%',
                opacity: 0.1,
                filter: 'grayscale(100%)',
              }}
            />
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                radial-gradient(circle at 10px 10px, rgba(255, 255, 255, 0.15) 2px, transparent 0)
              `,
                backgroundSize: '24px 24px',
                maskImage:
                  'linear-gradient(115deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, rgba(255,255,255,1) 90%)',
                WebkitMaskImage:
                  'linear-gradient(115deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 70%, rgba(255,255,255,1) 90%)',
              }}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 border-2 rounded-lg border-[rgba(255,255,255,0.1)] p-12">
            {features.map(feature => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                gradient={feature.gradient}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ObservabilitySection;
