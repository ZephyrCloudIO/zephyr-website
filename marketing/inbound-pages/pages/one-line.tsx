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
      id="one-line"
      design={modernDesign}
      accents={{ '--a': '#b4e51d', '--ar': '180, 229, 29', '--b': '#f0db20' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">CD without the platform</p>
        <h1>
          One line.<span>Not a platform team.</span>
        </h1>
        <p className="sub">
          Add Zephyr to the bundler you already use. Get preview URLs, environments, release and rollback, without
          building and staffing your own CD platform.
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
          <div className="integration">
            <div>
              <div className="file">● ● ● vite.config.ts</div>
              <pre>
                <code>
                  {"import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n"}
                  <span>+ import &#123; withZephyr &#125; from 'vite-plugin-zephyr';</span>
                  {'\nexport default defineConfig({\n'}
                  <span>+ plugins: [react(), withZephyr()],</span>
                  {'\n});'}
                </code>
              </pre>
              <p className="mono">→ build · upload what changed · live URL</p>
            </div>
            <div>
              <h3>BUNDLERS</h3>
              <div className="chips">
                <span className="chip">Vite</span>
                <span className="chip">Rsbuild</span>
                <span className="chip">Rspack</span>
                <span className="chip">webpack</span>
                <span className="chip">Rollup</span>
                <span className="chip">Parcel</span>
                <span className="chip">Rolldown beta</span>
              </div>
              <h3>FRAMEWORKS</h3>
              <div className="chips">
                <span className="chip">Astro</span>
                <span className="chip">Nuxt</span>
                <span className="chip">Modern.js</span>
                <span className="chip">Rspress</span>
                <span className="chip">TanStack Start</span>
                <span className="chip">Vinext beta</span>
              </div>
            </div>
          </div>
        </div>
        <ProofStrip>
          <div>
            <b>1 line</b>
            <span>or one npx command.</span>
          </div>
          <div>
            <b>7 bundlers</b>
            <span>keep the build you already trust.</span>
          </div>
          <div>
            <b>Free</b>
            <span>for personal projects.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>Build vs. add</>}
        title={<>Your CD platform is not your product.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Build your own</>}>
            <ol>
              <li>Preview environments per branch</li>
              <li>Versioned asset storage and CDN</li>
              <li>Promotion, rollback, permissions</li>
              <li>A team to run it, forever</li>
            </ol>
            <div className="foot">
              <code>{'months to build · headcount to keep'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Add Zephyr</>}>
            <ol>
              <li>A live URL for every build</li>
              <li>Uploads only what changed</li>
              <li>Environments, release and rollback</li>
              <li>Roles and protected environments</li>
            </ol>
            <div className="foot">
              <code>{'one line · this afternoon'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>+1</>} title={<>Keep your build</>}>
            <p>No new build system, no migration. Zephyr plugs into the bundler config you already have.</p>
          </Benefit>
          <Benefit icon={<>Δ</>} title={<>Upload only the diff</>}>
            <p>Files are fingerprinted, so only what changed goes up. Big apps deploy like small ones.</p>
          </Benefit>
          <Benefit icon={<>→|</>} title={<>Release built in</>}>
            <p>Environments, tags, release and rollback come with it. Nothing extra to wire up.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>How it works</>}
        title={<>Live before your coffee is cold.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Run npx with-zephyr</>}>
            <p>Or add withZephyr() to your config by hand.</p>
          </Step>
          <Step number="02" title={<>Build</>}>
            <p>Your normal build command. The result is live at its own URL.</p>
          </Step>
          <Step number="03" title={<>Release</>}>
            <p>Point production at the build when you are ready.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <Testimonial attribution={<>Zhang Lei · WebInfra @ ByteDance</>}>
        Sub second builds and sub second and versioned deploys combined with instant rollbacks help avoid Sev1 downtime.
      </Testimonial>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Add the line<span>on the call.</span>
        </h2>
        <p className="b">30 minutes with an engineer. Bring a repo and leave with a live URL.</p>
        <ul>
          <li>Zephyr added to your bundler</li>
          <li>Your first build live</li>
          <li>What you can stop maintaining</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
