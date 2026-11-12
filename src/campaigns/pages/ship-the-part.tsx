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
import { classicDesign } from '../design/classic';

export default function CampaignPage() {
  return (
    <CampaignFrame id="ship-the-part" design={classicDesign} accents={{ '--a': '#818cf8', '--ar': '129, 140, 248' }}>
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">Granular OTA · Module Federation</p>
        <h1>
          Ship the part,<span>not the whole app.</span>
        </h1>
        <p className="sub">
          Module Federation splits your app into parts that load at runtime. Each team ships its part over the air, on
          its own schedule. The rest of the app does not change.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#demo">
            Book a demo
          </a>
          <a className="btn ghost" href="#how">
            See how it works
          </a>
        </div>
        <div className="card visual">
          <div className="vhead">
            <h3>One app, many parts</h3>
            <span>illustrative</span>
          </div>
          <div className="mf">
            <div className="app">
              <div className="bar">
                <i></i>
                <i></i>
                <i></i>
                <span>your-app · production</span>
              </div>
              <div className="grid">
                <div className="mod shell">
                  <div>
                    <b>App shell</b>
                    <small>· platform team</small>
                  </div>
                  <code>{'v4.0'}</code>
                </div>
                <div className="mod upd">
                  <div className="row">
                    <b>Checkout</b>
                    <code>{'v3.2 → v3.3'}</code>
                  </div>
                  <small>payments team · updating over the air</small>
                </div>
                <div className="mod">
                  <div className="row">
                    <b>Search</b>
                    <code>{'v1.8'}</code>
                  </div>
                  <small>search team · unchanged</small>
                </div>
                <div className="mod">
                  <div className="row">
                    <b>Profile</b>
                    <code>{'v2.0'}</code>
                  </div>
                  <small>identity team · unchanged</small>
                </div>
                <div className="mod">
                  <div className="row">
                    <b>Feed</b>
                    <code>{'v5.1'}</code>
                  </div>
                  <small>content team · unchanged</small>
                </div>
              </div>
            </div>
            <div className="feed">
              <div className="ev hot">
                <span className="t">now</span>
                <b>Checkout v3.3 released</b>
                <span>Only the checkout part downloads. Users get it on next launch.</span>
              </div>
              <div className="ev">
                <span className="t">earlier today</span>
                <b>Feed v5.1 released</b>
                <span>Content team shipped on its own schedule.</span>
              </div>
              <div className="ev">
                <span className="t">yesterday</span>
                <b>Search pinned to v1.8</b>
                <span>One part rolled back. Nothing else changed.</span>
              </div>
            </div>
          </div>
        </div>
      </Hero>
      <ProofStrip>
        <div>
          <b>Per part</b>
          <span>OTA per remote, not per app</span>
        </div>
        <div>
          <b>Any team</b>
          <span>ships on its own schedule</span>
        </div>
        <div>
          <b>1 part</b>
          <span>to roll back, not the whole app</span>
        </div>
        <div>
          <b>All platforms</b>
          <span>web, mobile and desktop, one model</span>
        </div>
      </ProofStrip>
      <CampaignSection
        eyebrow={<>Whole-app OTA vs. granular OTA</>}
        title={<>One team's change should not ship everyone's code.</>}
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Whole-app OTA</>}>
            <ol>
              <li>Every change ships the full bundle</li>
              <li>One team's bug blocks every release</li>
              <li>Rollback reverts every team</li>
            </ol>
            <div className="foot">
              <code>{'blast radius = whole app'}</code>
              <span className="big">Everyone waits</span>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Granular OTA on Zephyr</>}>
            <ol>
              <li>Each team ships its own part</li>
              <li>Other parts do not change</li>
              <li>Roll back one part on its own</li>
            </ol>
            <div className="foot">
              <code>{'blast radius = one part'}</code>
              <span className="big">Nobody waits</span>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <CampaignSection eyebrow={<>Why teams use it</>} title={<>Small updates. Independent teams. Safe rollbacks.</>}>
        <Benefits>
          <Benefit as="div" icon={<>01</>} title={<>Smaller updates</>}>
            <p>Users download the part that changed, not the whole app.</p>
          </Benefit>
          <Benefit as="div" icon={<>02</>} title={<>Teams ship on their own</>}>
            <p>Checkout ships Tuesday, search ships Friday. Nobody waits for a release train.</p>
          </Benefit>
          <Benefit as="div" icon={<>03</>} title={<>Roll back one part</>}>
            <p>Pin one part to its last good version. The rest of the app keeps its new versions.</p>
          </Benefit>
        </Benefits>
      </CampaignSection>
      <CampaignSection id="how" eyebrow={<>How it works</>} title={<>Split once. Ship parts forever.</>}>
        <Steps>
          <Step number="01" title={<>Split with Module Federation</>}>
            <p>Expose parts of the app as remotes. The app shell loads them at runtime.</p>
          </Step>
          <Step number="02" title={<>Each team publishes its part</>}>
            <p>Zephyr versions every remote on every build.</p>
          </Step>
          <Step number="03" title={<>Pick versions per environment</>}>
            <p>Choose which version of each part runs where. Apps pick it up over the air.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <DemoSection id="demo" className="lead">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2">
          Map your app<span>into parts in 30 minutes.</span>
        </h2>
        <p className="b">
          30 minutes with an engineer. We map which parts of your app can ship on their own, and show one part update
          live.
        </p>
        <ul>
          <li>Module Federation for web, mobile and desktop</li>
          <li>Per-part releases and rollbacks</li>
          <li>How it fits your team structure</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
