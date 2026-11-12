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
      id="agents-deploy"
      design={modernDesign}
      accents={{ '--a': '#e879f9', '--ar': '232, 121, 249', '--b': '#a78bfa' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">The deploy target for agents</p>
        <h1>
          Agents deploy.<span>People release.</span>
        </h1>
        <p className="sub">
          Your agents write more code than your team can read. Zephyr gives every attempt its own live URL, so people
          judge running software and release only the winner.
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
            <h2>Task: redesign the pricing page</h2>
            <small>4 attempts · 4 live URLs · 1 release</small>
          </div>
          <div className="attempts">
            <div className="attempt">
              <div className="screen" aria-hidden="true"></div>
              <b>Attempt 1</b>
              <small>Claude Code</small>
              <code>{'● live · not chosen'}</code>
            </div>
            <div className="attempt">
              <div className="screen" aria-hidden="true"></div>
              <b>Attempt 2</b>
              <small>Cursor</small>
              <code>{'● live · not chosen'}</code>
            </div>
            <div className="attempt chosen">
              <div className="screen" aria-hidden="true"></div>
              <b>Attempt 3</b>
              <small>Codex</small>
              <code>{'✓ released to production'}</code>
            </div>
            <div className="attempt">
              <div className="screen" aria-hidden="true"></div>
              <b>Attempt 4</b>
              <small>OpenCode</small>
              <code>{'● live · waiting review'}</code>
            </div>
          </div>
          <p className="note">Illustrative. Each attempt is deployed with its own URL. A person moves production.</p>
        </div>
        <ProofStrip>
          <div>
            <b>Every attempt</b>
            <span>gets a preview URL.</span>
          </div>
          <div>
            <b>4 agents</b>
            <span>Claude Code, Cursor, Codex, OpenCode.</span>
          </div>
          <div>
            <b>1 person</b>
            <span>decides what customers see.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>The new bottleneck</>}
        title={<>Code is cheap now. Review is not.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Reviewing agent diffs</>}>
            <ol>
              <li>Thousands of lines to read</li>
              <li>Pull the branch, run it locally</li>
              <li>Compare attempts from memory</li>
              <li>Merge and hope it works in prod</li>
            </ol>
            <div className="foot">
              <code>{'review time > build time'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Reviewing live builds</>}>
            <ol>
              <li>Click the URL, use the real thing</li>
              <li>Open attempts side by side</li>
              <li>Send the URL to product team or even a customer</li>
              <li>Release the build you already tested</li>
            </ol>
            <div className="foot">
              <code>{'review the outcome, not the code'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>↗</>} title={<>Preview every attempt</>}>
            <p>Each agent run is deployed with its own URL. Nothing to pull, nothing to run locally.</p>
          </Benefit>
          <Benefit icon={<>&gt;_</>} title={<>Skills for your agents</>}>
            <p>Zephyr Skills teach Claude Code, Cursor, Codex and OpenCode to build and deploy with Zephyr.</p>
          </Benefit>
          <Benefit icon={<>✓</>} title={<>Release stays human</>}>
            <p>Protected environments and roles keep production in the hands of the people you trust with it.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Give your agents a deploy target.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Add the Zephyr skill</>}>
            <p>Install it in the agent you already use. No new tool for the team.</p>
          </Step>
          <Step number="02" title={<>Let agents build and deploy</>}>
            <p>Every attempt lands at its own URL, ready to click and compare.</p>
          </Step>
          <Step number="03" title={<>Release the winner</>}>
            <p>A person points production at the build that earned it.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <Testimonial attribution={<>Jack McCloy · Engineering Manager @ Notion</>}>
        Generating code is not where our bottleneck is, our bottleneck is in reviewing the end result of the code
      </Testimonial>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Let your agents<span>ship. Safely.</span>
        </h2>
        <p className="b">30 minutes with an engineer. Bring the agent your team already uses.</p>
        <ul>
          <li>An agent attempt deployed live</li>
          <li>Side-by-side review of attempts</li>
          <li>Guardrails for who can release</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
