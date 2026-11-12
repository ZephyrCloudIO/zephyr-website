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
  Testimonial,
} from '../components/sections';
import { modernDesign } from '../design/modern';

export default function CampaignPage() {
  return (
    <CampaignFrame
      id="composable-enterprise"
      design={modernDesign}
      accents={{ '--a': '#a78bfa', '--ar': '167, 139, 250', '--b': '#14c9e2' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">The composable enterprise platform</p>
        <h1>
          Split the app.<span>Keep one product.</span>
        </h1>
        <p className="sub">
          Every team builds, deploys and releases its part on its own. Zephyr resolves each remote by environment, tag
          or version, so customers still get one product.
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
          <div className="host card">
            <b>storefront</b>
            <code>{'host · production'}</code>
          </div>
          <svg className="branches" viewBox="0 0 1000 100" aria-hidden="true" preserveAspectRatio="none">
            <path
              d="M500 0 C500 60 80 30 80 100"
              fill="none"
              stroke="var(--a)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            ></path>
            <path
              d="M500 0 C500 60 365 30 365 100"
              fill="none"
              stroke="var(--a)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            ></path>
            <path
              d="M500 0 C500 60 645 30 645 100"
              fill="none"
              stroke="var(--a)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            ></path>
            <path
              d="M500 0 C500 60 920 30 920 100"
              fill="none"
              stroke="var(--a)"
              strokeOpacity=".6"
              strokeWidth="1.5"
            ></path>
          </svg>
          <div className="remotes">
            <div className="remote">
              <b>checkout</b>
              <span>team payments</span>
              <code>{'3.2.1 · pinned'}</code>
            </div>
            <div className="remote">
              <b>search</b>
              <span>team discovery</span>
              <code>{'^2.x · semver range'}</code>
            </div>
            <div className="remote active">
              <b>account</b>
              <span>team identity</span>
              <code>{'staging · in review'}</code>
            </div>
            <div className="remote">
              <b>content</b>
              <span>team marketing</span>
              <code>{'production tag'}</code>
            </div>
          </div>
          <p className="note">
            Illustrative. Each remote is built, deployed and released by its own team. The host resolves them at
            runtime.
          </p>
        </div>
        <ProofStrip>
          <div>
            <b>Per team</b>
            <span>builds, deploys and releases.</span>
          </div>
          <div>
            <b>Semver ranges</b>
            <span>resolve remotes without a host rebuild.</span>
          </div>
          <div>
            <b>Guardrails</b>
            <span>protected environments and roles.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>Monolith vs. composable</>}
        title={<>One product. Many teams. No more release train.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>One big release</>}>
            <ol>
              <li>Every team waits for the slowest</li>
              <li>One bad change blocks everyone</li>
              <li>Rollback reverts every team</li>
              <li>Build times grow with headcount</li>
            </ol>
            <div className="foot">
              <code>{'shared fate'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Composable on Zephyr</>}>
            <ol>
              <li>Each team ships on its own clock</li>
              <li>A bad remote rolls back alone</li>
              <li>Pin, range or tag each dependency</li>
              <li>Small builds, uploaded by diff</li>
            </ol>
            <div className="foot">
              <code>{'independent fate, one product'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>&#123; &#125;</>} title={<>Resolve by environment</>}>
            <p>The same host loads staging remotes in staging and production remotes in production. No config forks.</p>
          </Benefit>
          <Benefit icon={<>^</>} title={<>Pin or float versions</>}>
            <p>
              Pin a remote to an exact version, or accept a semver range or a tag. You choose how much each team trusts.
            </p>
          </Benefit>
          <Benefit icon={<>✓</>} title={<>Govern who releases</>}>
            <p>Protected environments and role-based permissions decide who can move production for each remote.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Start with one remote.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Add Zephyr to host</>}>
            <p>One plugin line in the bundler config of the host and of each remote.</p>
          </Step>
          <Step number="02" title={<>Carve out one feature</>}>
            <p>Move one area into a remote that its own team builds and releases.</p>
          </Step>
          <Step number="03" title={<>Release per remote</>}>
            <p>Move that remote through environments without touching the rest of the app.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <Testimonial attribution={<>Theo Browne · Ping Labs</>}>Big teams deserve good DX too.</Testimonial>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Map your app<span>into modules.</span>
        </h2>
        <p className="b">30 minutes with an engineer who has split large frontends with Module Federation.</p>
        <ul>
          <li>Which feature to carve out first</li>
          <li>Version and environment strategy</li>
          <li>Governance for many teams</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
