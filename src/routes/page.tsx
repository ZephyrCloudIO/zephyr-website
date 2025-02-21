import { Helmet } from '@modern-js/runtime/head';
import Hero from '@/components/sections/hero/index';
import './index.css';
import ValueProposition from '@/components/sections/value-proposition/index';
import VisualiseComponentSection from '@/components/sections/visualise-component';
import Mission from '@/components/sections/mission';
import DeploymentSection from '@/components/sections/deployment';
import ObservabilitySection from '@/components/sections/observability';
import { IntegrationsSection } from '@/components/sections/integrations';
import { CommunitySection } from '@/components/sections/community';
import WaitSection from '@/components/sections/wait';
import Footer from '@/components/sections/footer';

export default function App() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ValueProposition />
      <DeploymentSection />
      <VisualiseComponentSection />
      <Mission />
      <ObservabilitySection />
      <IntegrationsSection />
      <CommunitySection />
      <WaitSection />
      <Footer />
      <Helmet>
        {/* Primary Meta Tags */}
        <title>Zephyr Cloud | The only sane way to do micro-frontends</title>
        <meta
          name="description"
          content="Zephyr seeks to leverage data driven decisions and AI throughout the entire SDLC to help organizations to increase software development team velocity, reduce infrastructure costs, and improve end user experiences."
        />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Zephyr Cloud | The only sane way to do micro-frontends"
        />
        <meta
          property="og:description"
          content="Zephyr seeks to leverage data driven decisions and AI throughout the entire SDLC to help organizations to increase software development team velocity, reduce infrastructure costs, and improve end user experiences."
        />
        <meta
          property="og:image"
          content="https://cdn.prod.website-files.com/669061ee3adb95b628c3acda/66981c766e352fe1f57191e2_Opengraph-zephyr.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Meta Tags */}
        <meta
          property="twitter:title"
          content="Zephyr Cloud | The only sane way to do micro-frontends"
        />
        <meta
          property="twitter:description"
          content="Zephyr seeks to leverage data driven decisions and AI throughout the entire SDLC to help organizations to increase software development team velocity, reduce infrastructure costs, and improve end user experiences."
        />
        <meta
          property="twitter:image"
          content="https://cdn.prod.website-files.com/669061ee3adb95b628c3acda/66981c766e352fe1f57191e2_Opengraph-zephyr.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
    </div>
  );
}
