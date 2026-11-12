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
      id="kill-the-release-train"
      design={modernDesign}
      accents={{ '--a': '#ffe000', '--ar': '255, 224, 0', '--b': '#ffad00' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">For engineering leaders</p>
        <h1>
          Kill the<span>release train.</span>
        </h1>
        <p className="sub">
          Release windows, code freezes and merge queues exist because deploys are risky. Make deploys boring, and let
          every team release when its work is ready.
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
          <div className="week">
            <div>
              <h2>A week on the release train</h2>
              <div className="week-labels">
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
              </div>
              <div className="train-grid">
                <span>merge everything</span>
                <span className="freeze">code freeze</span>
                <span className="release">release</span>
                <span className="hotfix">hotfix</span>
              </div>
            </div>
            <div>
              <h2>A week on Zephyr</h2>
              <div className="release-grid-labels">
                <div className="week-labels">
                  <span>MON</span>
                  <span>TUE</span>
                  <span>WED</span>
                  <span>THU</span>
                  <span>FRI</span>
                </div>
              </div>
              <div
                className="releases"
                role="img"
                aria-label="49 illustrative team releases across five days. Identity rolls back one Friday release; other teams keep shipping."
              >
                <div className="release-row">
                  <span>payments</span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                </div>
                <div className="release-row">
                  <span>search</span>
                  <span className="dots">
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                </div>
                <div className="release-row">
                  <span>identity</span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className="rollback"></i>
                    <i className=""></i>
                  </span>
                </div>
                <div className="release-row">
                  <span>content</span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                  <span className="dots">
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                    <i className=""></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="note">
            Illustrative. Each dot = one release; teams ship many times a day. Outlined dot = one team rolled back on
            its own, the others were not affected.
          </p>
        </div>
        <ProofStrip>
          <div>
            <b>Per team</b>
            <span>release on your own schedule.</span>
          </div>
          <div>
            <b>No freeze</b>
            <span>every build is already deployed.</span>
          </div>
          <div>
            <b>1 move</b>
            <span>to roll back, for one team only.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>The cost of coordination</>}
        title={<>Your release train is a tax on every team.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Release train</>}>
            <ol>
              <li>Done work waits for the window</li>
              <li>Freezes stall the whole org</li>
              <li>Release managers chase sign-offs</li>
              <li>One defect rolls back everyone</li>
            </ol>
            <div className="foot">
              <code>{'weeks of lead time'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Continuous release on Zephyr</>}>
            <ol>
              <li>Done work ships when it is done</li>
              <li>No freeze: deploys change nothing</li>
              <li>Roles decide who releases what</li>
              <li>One team rolls back alone</li>
            </ol>
            <div className="foot">
              <code>{'lead time = review time'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>→|</>} title={<>Release per team</>}>
            <p>Split the frontend into federated modules. Each team owns its release button, nobody else’s.</p>
          </Benefit>
          <Benefit icon={<>env</>} title={<>Release per environment</>}>
            <p>Promote the same build from staging to production. What you tested is exactly what ships.</p>
          </Benefit>
          <Benefit icon={<>↶</>} title={<>Roll back alone</>}>
            <p>A bad release in one module rolls back in one move. The rest of the product keeps shipping.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How to get off the train</>}
        title={<>One team first. Then the rest.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Deploy every build</>}>
            <p>Add Zephyr to your bundler. Every build is live at its own URL.</p>
          </Step>
          <Step number="02" title={<>Give one team the button</>}>
            <p>Let one team release its module on its own. Measure the lead time.</p>
          </Step>
          <Step number="03" title={<>Retire the window</>}>
            <p>When the numbers speak, move the next team. Then cancel the meeting.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <Testimonial attribution={<>Ken Wheeler · Midjourney</>}>
        Zephyr Cloud is a no-brainer if you have a giant app.
      </Testimonial>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Plan your last<span>release window.</span>
        </h2>
        <p className="b">30 minutes with an engineer. We will map how your teams ship today and what changes first.</p>
        <ul>
          <li>Which team to move first</li>
          <li>Roles and protected environments</li>
          <li>Per-team release and rollback, live</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
