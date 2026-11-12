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
  Testimonial,
} from '../components/sections';
import { modernDesign } from '../design/modern';

export default function CampaignPage({ assetBaseUrl }: CampaignPageProps) {
  return (
    <CampaignFrame
      assetBaseUrl={assetBaseUrl}
      id="always-deployed"
      design={modernDesign}
      accents={{ '--a': '#22f5a3', '--ar': '34, 245, 163', '--b': '#10cfe0' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">Zephyr is your CD</p>
        <h1>
          You already built it.<span>It’s already deployed.</span>
        </h1>
        <p className="sub">
          Every build gets its own live URL the moment it finishes. Production changes only when you say so. You decide
          what ships and when.
        </p>
        <div className="ctas">
          <a className="btn primary" href="#demo">
            Book a demo
          </a>
          <a className="btn ghost" href="https://app.zephyr-cloud.io">
            Start free →
          </a>
          <code className="command">{'$ npx with-zephyr'}</code>
        </div>
        <div className="card visual">
          <div className="vhead">
            <h2>
              checkout-app <small className="mono">main</small>
            </h2>
            <small>6 builds · 6 live URLs · 1 release</small>
          </div>
          <p className="release-note">Release = move the tag. No rebuild.</p>
          <div className="timeline">
            <div className="build">
              <b>#1279</b>
              <span>fix cart rounding</span>
              <a href="#demo" aria-label="See a demo of build 1279">
                ● live URL ↗
              </a>
            </div>
            <div className="build">
              <b>#1280</b>
              <span>new promo banner</span>
              <a href="#demo" aria-label="See a demo of build 1280">
                ● live URL ↗
              </a>
            </div>
            <div className="build tag">
              <em>production</em>
              <b>#1281</b>
              <span>checkout v2</span>
              <a href="#demo" aria-label="See a demo of build 1281">
                ● live URL ↗
              </a>
            </div>
            <div className="build">
              <b>#1282</b>
              <span>a11y pass</span>
              <a href="#demo" aria-label="See a demo of build 1282">
                ● live URL ↗
              </a>
            </div>
            <div className="build stage">
              <em>staging</em>
              <b>#1283</b>
              <span>apple pay</span>
              <a href="#demo" aria-label="See a demo of build 1283">
                ● live URL ↗
              </a>
            </div>
            <div className="build">
              <em>latest</em>
              <b>#1284</b>
              <span>agent: copy tweak</span>
              <a href="#demo" aria-label="See a demo of build 1284">
                ● live URL ↗
              </a>
            </div>
          </div>
          <p className="note">
            Illustrative builds. Every build is deployed; only the production tag decides what customers see.
          </p>
        </div>
        <ProofStrip>
          <div>
            <b>Every build</b>
            <span>gets a live URL. Review the real thing.</span>
          </div>
          <div>
            <b>0 rebuilds</b>
            <span>to release or to roll back.</span>
          </div>
          <div>
            <b>1 line</b>
            <span>in the bundler you already use.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>The old way vs. Zephyr</>}
        title={<>Deploying is a side effect. Releasing is a decision.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Your pipeline today</>}>
            <ol>
              <li>Build for staging</li>
              <li>Wait for approval</li>
              <li>Build again for production</li>
              <li>Deploy and watch the graphs</li>
              <li>Something breaks: build an old commit again</li>
            </ol>
            <div className="foot">
              <code>{'hours per release · rollback = rebuild'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>With Zephyr</>}>
            <ol>
              <li>Build. It is deployed, with its own URL.</li>
              <li>Review the live build, not a screenshot.</li>
              <li>Release: point production at it.</li>
              <li>Roll back: point it at the last one.</li>
            </ol>
            <div className="foot">
              <code>{'no rebuild · no re-upload · no release train'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>↗</>} title={<>Every build is live</>}>
            <p>
              Each build gets its own URL. Share it with QA, product, design or a customer before anything is released.
            </p>
          </Benefit>
          <Benefit icon={<>→|</>} title={<>Release by moving a tag</>}>
            <p>
              latest follows main. production moves only when you release it. Protected environments and roles decide
              who can.
            </p>
          </Benefit>
          <Benefit icon={<>↶</>} title={<>Rollback is the same move</>}>
            <p>
              Point production back at the last good build. It is already deployed, so there is nothing to rebuild or
              upload.
            </p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Three steps. No platform team.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Add the plugin</>}>
            <pre>
              <code>{'// vite.config.ts\nplugins: [react(), withZephyr()]\n// or: npx with-zephyr'}</code>
            </pre>
          </Step>
          <Step number="02" title={<>Build like you already do</>}>
            <p>
              Zephyr fingerprints your files and uploads only what changed. The build is live at its own URL when it
              finishes.
            </p>
          </Step>
          <Step number="03" title={<>Release when you are ready</>}>
            <p>
              Point production, staging or any environment at the build you want. Vite, Rsbuild, Rspack, webpack and
              more.
            </p>
          </Step>
        </Steps>
      </CampaignSection>
      <Testimonial attribution={<>Ron R. · Netflix</>}>
        Expect Zephyr to speed up your dev cycle by 10x if not more.
      </Testimonial>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          See it on<span>your stack.</span>
        </h2>
        <p className="b">30 minutes with an engineer, not a script. Bring your bundler and your hardest release.</p>
        <ul>
          <li>Your app deployed with Zephyr, live</li>
          <li>Release and rollback without a rebuild</li>
          <li>Your questions answered by the team</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
