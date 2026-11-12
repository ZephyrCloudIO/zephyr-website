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

export default function CampaignPage() {
  return (
    <CampaignFrame
      id="rollback-isnt-a-rebuild"
      design={modernDesign}
      accents={{ '--a': '#10cee1', '--ar': '16, 206, 225', '--b': '#3887ff' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">For SRE and platform</p>
        <h1>
          Rollback isn’t<span>a rebuild.</span>
        </h1>
        <p className="sub">
          Production is a pointer to a build that is already deployed. Rolling back is moving the pointer back. No
          rebuild, no re-upload. Friday deploys are fine.
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
            <h2>Friday, 14:00. Error rate, checkout.</h2>
            <small>time to recover: 4 min</small>
          </div>
          <svg className="incident" viewBox="0 0 1100 280" role="img" aria-labelledby="incident-title incident-desc">
            <title id="incident-title">Rollback restores the previous build</title>
            <desc id="incident-desc">
              An illustrative incident. Errors rise after build 1290 at 14:02 and fall after production moves back to
              build 1289 at 14:06.
            </desc>
            <defs>
              <linearGradient id="errors" x1="0" y1="0" x2="0" y2="1">
                <stop stopColor="#ff6b6b" stopOpacity=".35"></stop>
                <stop offset="1" stopColor="#ff6b6b" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
            <path d="M0 222H1100M0 164H1100M0 106H1100" stroke="#23232e"></path>
            <path d="M0 222L395 221L435 78L550 68L577 222L1100 222Z" fill="url(#errors)"></path>
            <path d="M0 222L395 221L435 78L550 68L577 222L1100 222" stroke="#ff6b6b" strokeWidth="3" fill="none"></path>
            <path d="M395 30V224" stroke="#858596"></path>
            <path d="M550 30V224" stroke="var(--a)" strokeWidth="2"></path>
            <text x="260" y="30" className="chart-label">
              14:02 → #1290
            </text>
            <text x="565" y="30" className="chart-label">
              14:06 → back to #1289
            </text>
            <text x="650" y="140" className="chart-good">
              One move. #1289 was still deployed.
            </text>
            <text x="0" y="255" className="chart-label">
              13:50
            </text>
            <text x="375" y="255" className="chart-label">
              14:00
            </text>
            <text x="730" y="255" className="chart-label">
              14:10
            </text>
            <text x="1050" y="255" className="chart-label">
              14:20
            </text>
          </svg>
          <p className="note">
            Illustrative incident. Recovery time depends on how fast your team detects the problem.
          </p>
        </div>
        <ProofStrip>
          <div>
            <b>No rebuild</b>
            <span>the last good build is still live.</span>
          </div>
          <div>
            <b>No re-upload</b>
            <span>nothing to push again.</span>
          </div>
          <div>
            <b>Roles</b>
            <span>decide who can move production.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>Rebuild vs. repoint</>}
        title={<>The fastest rollback is one you never build.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Rollback by rebuild</>}>
            <ol>
              <li>Find the last good commit</li>
              <li>Revert, wait for CI</li>
              <li>Build it again, hope it matches</li>
              <li>Upload and deploy, under pressure</li>
            </ol>
            <div className="foot">
              <code>{'recovery = full pipeline'}</code>
              <strong className="big">Minutes to hours</strong>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Rollback on Zephyr</>}>
            <ol>
              <li>Point production at the last good build</li>
              <li>There is no step 2</li>
            </ol>
            <div className="foot">
              <code>{'recovery = one move'}</code>
              <strong className="big">Seconds</strong>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>↶</>} title={<>Repoint, don’t rebuild</>}>
            <p>Every build stays deployed. Rollback moves the production tag to a build already ran.</p>
          </Benefit>
          <Benefit icon={<>✓</>} title={<>Ship what you tested</>}>
            <p>Release promotes the exact build you reviewed, not a rebuild of the same commit.</p>
          </Benefit>
          <Benefit icon={<>env</>} title={<>Guard production</>}>
            <p>Protected environments and role-based permissions decide who can release and who can roll back.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Deploy is not release.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Every build deploys</>}>
            <p>Each build is uploaded once and kept live at its own URL.</p>
          </Step>
          <Step number="02" title={<>Release moves a tag</>}>
            <p>production points at one build. The change takes effect without a rebuild.</p>
          </Step>
          <Step number="03" title={<>Rollback moves it back</>}>
            <p>Same move, opposite direction. The old build never left.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Watch us break prod<span>and roll it back live.</span>
        </h2>
        <p className="b">30 minutes with an engineer. We ship a bad build on purpose and recover it on the call.</p>
        <ul>
          <li>Release and rollback without a rebuild</li>
          <li>Protected environments and roles</li>
          <li>How it fits your incident process</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
