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
      id="ship-everywhere"
      design={modernDesign}
      accents={{ '--a': '#ff6b86', '--ar': '255, 107, 134', '--b': '#ffb47b' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">Ship everywhere</p>
        <h1>
          Web. Mobile. Desktop.<span>One release.</span>
        </h1>
        <p className="sub">
          Build a feature once as a federated module. Zephyr delivers it to browsers, to React Native apps and to
          desktop apps, and you release all three the same way.
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
          <div className="remote-pill">checkout remote · v3.2 · production</div>
          <svg className="platform-lines" viewBox="0 0 1000 70" aria-hidden="true" preserveAspectRatio="none">
            <path
              d="M500 0 C500 30 170 20 170 70"
              fill="none"
              stroke="var(--a)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            ></path>
            <path d="M500 0 L500 70" fill="none" stroke="var(--a)" strokeOpacity=".6" strokeWidth="1.5"></path>
            <path
              d="M500 0 C500 30 820 20 820 70"
              fill="none"
              stroke="var(--a)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            ></path>
          </svg>
          <div className="platforms">
            <div className="device browser">
              <div className="device-bar" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="device-content">
                <span>checkout@3.2</span>
                <i aria-hidden="true"></i>
              </div>
              <b>Web · every build has a URL</b>
            </div>
            <div className="device phone">
              <div className="device-bar" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="device-content">
                <span>checkout@3.2</span>
              </div>
              <b>React Native</b>
            </div>
            <div className="device desktop">
              <div className="device-bar" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="device-content">
                <span>checkout@3.2</span>
              </div>
              <b>Desktop · installed app, same remote</b>
            </div>
          </div>
          <p className="note">Illustrative. One remote, three hosts.</p>
        </div>
        <ProofStrip>
          <div>
            <b>Web</b>
            <span>every build gets a live URL.</span>
          </div>
          <div>
            <b>Mobile</b>
            <span>React Native mini-apps from the edge.</span>
          </div>
          <div>
            <b>Desktop</b>
            <span>federated remotes in installed apps.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>Three pipelines vs. one</>}
        title={<>Stop shipping the same feature three times.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>One pipeline per platform</>}>
            <ol>
              <li>Web ships today</li>
              <li>Mobile waits for app store review</li>
              <li>Desktop waits for the next installer</li>
              <li>Three versions of the truth in prod</li>
            </ol>
            <div className="foot">
              <code>{'3 releases · 3 rollbacks · 3 teams'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>One federated release</>}>
            <ol>
              <li>Build the feature once as a remote</li>
              <li>Web, mobile and desktop load it</li>
              <li>Release once, per environment</li>
              <li>Roll back once, everywhere</li>
            </ol>
            <div className="foot">
              <code>{'1 release · 1 rollback · every platform'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>www</>} title={<>Web</>}>
            <p>
              Every build is deployed with its own URL. Release moves production. SSR at the edge where you need it.
            </p>
          </Benefit>
          <Benefit icon={<>RN</>} title={<>Mobile</>}>
            <p>React Native apps built with Re.Pack or Metro load mini-apps from the edge.</p>
          </Benefit>
          <Benefit icon={<>[ ]</>} title={<>Desktop</>}>
            <p>Desktop apps load the same federated remotes. Ship features without a new installer.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Write once. Release once.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Build a remote</>}>
            <p>Package a feature as a Module Federation remote with Zephyr.</p>
          </Step>
          <Step number="02" title={<>Load it in every host</>}>
            <p>Web app, React Native app and desktop app resolve the same remote.</p>
          </Step>
          <Step number="03" title={<>Release it everywhere</>}>
            <p>Move production once. Every platform follows. Roll back the same way.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          One feature.<span>Every screen.</span>
        </h2>
        <p className="b">30 minutes with an engineer. See one remote released to web and mobile at the same time.</p>
        <ul>
          <li>A shared remote across platforms</li>
          <li>React Native over-the-edge delivery</li>
          <li>One release, one rollback</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
