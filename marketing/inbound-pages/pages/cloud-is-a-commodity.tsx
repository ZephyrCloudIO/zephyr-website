import type { CampaignPageProps } from '../../../campaigns';
import { CampaignFrame } from '../components/CampaignFrame';
import {
  Benefit,
  Benefits,
  CampaignSection,
  ComparisonCard,
  DemoSection,
  Hero,
  ProofStrip,
  Step,
  Steps,
} from '../components/sections';
import { modernDesign } from '../design/modern';

export default function CampaignPage({ assetBaseUrl }: CampaignPageProps) {
  return (
    <CampaignFrame
      assetBaseUrl={assetBaseUrl}
      id="cloud-is-a-commodity"
      design={modernDesign}
      accents={{ '--a': '#60a5fa', '--ar': '96, 165, 250', '--b': '#25c6ae' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">Make the clouds compete</p>
        <h1>
          The cloud is a<span>commodity. Act like it.</span>
        </h1>
        <p className="sub">
          Zephyr deploys the same build to Cloudflare, AWS, Fastly, Akamai or your own edge. Pick the best cloud per
          environment, and move when a better deal shows up.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#demo">
            Book a demo
          </a>
          <a className="btn ghost" href="https://app.zephyr-cloud.io">
            Start free →
          </a>
        </div>
        <div className="card visual">
          <div className="vhead">
            <h2>One build. Every cloud. You choose per environment.</h2>
          </div>
          <div className="cloud-map">
            <div className="host card">
              <b>build #1284</b>
              <code>
                {'built once'}
                <br />
                {'uploaded once'}
                <br />
                {'deployed anywhere'}
              </code>
            </div>
            <svg className="cloud-lines" viewBox="0 0 240 280" aria-hidden="true" preserveAspectRatio="none">
              <path
                d="M0 140 C80 140 100 20 240 20"
                fill="none"
                stroke="var(--a)"
                strokeOpacity=".6"
                strokeWidth="1.5"
              ></path>
              <path
                d="M0 140 C80 140 100 80 240 80"
                fill="none"
                stroke="var(--a)"
                strokeOpacity=".6"
                strokeWidth="1.5"
              ></path>
              <path
                d="M0 140 C80 140 100 140 240 140"
                fill="none"
                stroke="var(--a)"
                strokeOpacity=".6"
                strokeWidth="1.5"
              ></path>
              <path
                d="M0 140 C80 140 100 200 240 200"
                fill="none"
                stroke="var(--a)"
                strokeOpacity=".6"
                strokeWidth="1.5"
              ></path>
              <path
                d="M0 140 C80 140 100 260 240 260"
                fill="none"
                stroke="var(--a)"
                strokeOpacity=".6"
                strokeWidth="1.5"
              ></path>
            </svg>
            <div className="providers">
              <div className="provider">
                <b>Cloudflare</b>
                <code>{'production-eu'}</code>
              </div>
              <div className="provider">
                <b>AWS</b>
                <code>{'production-us'}</code>
              </div>
              <div className="provider">
                <b>Fastly</b>
                <code>{'staging'}</code>
              </div>
              <div className="provider">
                <b>Akamai</b>
                <code>{'ready when you are'}</code>
              </div>
              <div className="provider">
                <b>Kubernetes / custom edge</b>
                <code>{'Enterprise'}</code>
              </div>
            </div>
          </div>
          <p className="note">Illustrative environment mapping.</p>
        </div>
        <ProofStrip>
          <div>
            <b>Build once</b>
            <span>deploy to every cloud.</span>
          </div>
          <div>
            <b>Per environment</b>
            <span>a different cloud per region or product.</span>
          </div>
          <div>
            <b>No lock-in</b>
            <span>move without a rebuild.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>Locked in vs. in control</>}
        title={<>Your provider should earn your traffic.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Locked to one cloud</>}>
            <ol>
              <li>Pipelines written for one provider</li>
              <li>Moving means a migration project</li>
              <li>Renewal day: you take their price</li>
              <li>One outage takes everything down</li>
            </ol>
            <div className="foot">
              <code>{'switching cost = leverage lost'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Clouds compete on Zephyr</>}>
            <ol>
              <li>One release flow for every provider</li>
              <li>Move an environment, not a codebase</li>
              <li>Renewal day: you have options</li>
              <li>Run more than one cloud on purpose</li>
            </ol>
            <div className="foot">
              <code>{'switching cost = a release'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>$</>} title={<>Leverage</>}>
            <p>When leaving is easy, every renewal is a negotiation. Make providers bid for your traffic.</p>
          </Benefit>
          <Benefit icon={<>→</>} title={<>Mobility</>}>
            <p>Point an environment at a different cloud. Same build, same release flow, no rebuild.</p>
          </Benefit>
          <Benefit icon={<>1+1</>} title={<>Multi-cloud on purpose</>}>
            <p>Run regions, products or failover on different providers at the same time, from one place.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Decouple the app from the cloud.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Connect your clouds</>}>
            <p>Add the providers you use, or start on managed Zephyr Cloud.</p>
          </Step>
          <Step number="02" title={<>Map environments</>}>
            <p>Choose which cloud serves each environment and region.</p>
          </Step>
          <Step number="03" title={<>Release and move freely</>}>
            <p>Release per environment. Change the mapping when the math changes.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Get your cloud<span>options back.</span>
        </h2>
        <p className="b">30 minutes with an engineer. We map where you run today and where you could run.</p>
        <ul>
          <li>The same build on two clouds, live</li>
          <li>Environment-to-cloud mapping</li>
          <li>A plan for your next renewal</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
