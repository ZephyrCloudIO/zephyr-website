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
    <CampaignFrame
      id="stop-making-users-wait"
      design={classicDesign}
      accents={{ '--a': '#2dd4bf', '--ar': '45, 212, 191' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">Over-the-air updates · React Native · Electron · Tauri</p>
        <h1>
          Stop making your<span>users wait.</span>
        </h1>
        <p className="sub">
          Ship fixes to React Native, Electron and Tauri apps over the air. Skip the store review queue for JS and UI
          changes. Users get the update on next launch.
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
            <h3>One fix, two paths</h3>
            <span>illustrative</span>
          </div>
          <div className="tl">
            <div className="lbl">
              App store release<small>binary update</small>
            </div>
            <div className="steps">
              <span className="chip">Build binary</span>
              <span className="arrow">→</span>
              <span className="chip">Submit</span>
              <span className="arrow">→</span>
              <span className="chip wait">Review</span>
              <span className="arrow">→</span>
              <span className="chip wait">Staged rollout</span>
              <span className="arrow">→</span>
              <span className="chip wait">Users update</span>
            </div>
            <div className="res bad">Days</div>
          </div>
          <div className="tl">
            <div className="lbl">
              Zephyr OTA<small>JS and UI update</small>
            </div>
            <div className="steps">
              <span className="chip hot">Publish</span>
              <span className="arrow">→</span>
              <span className="chip hot">Live on next launch</span>
            </div>
            <div className="res good">Next launch</div>
          </div>
          <div className="plats">
            <div className="plat">
              <i>OTA</i>
              <b>React Native</b>
              <span>iOS · Android</span>
            </div>
            <div className="plat">
              <i>OTA</i>
              <b>Electron</b>
              <span>macOS · Windows · Linux</span>
            </div>
            <div className="plat">
              <i>OTA</i>
              <b>Tauri</b>
              <span>macOS · Windows · Linux</span>
            </div>
          </div>
        </div>
      </Hero>
      <ProofStrip>
        <div>
          <b>3 runtimes</b>
          <span>React Native, Electron and Tauri</span>
        </div>
        <div>
          <b>Next launch</b>
          <span>is when users get the fix</span>
        </div>
        <div>
          <b>1 move</b>
          <span>to roll back to any version</span>
        </div>
        <div>
          <b>Every version</b>
          <span>kept and ready to serve</span>
        </div>
      </ProofStrip>
      <CampaignSection
        eyebrow={<>Store release vs. OTA</>}
        title={<>The fix is done. Why are your users still waiting?</>}
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Store release</>}>
            <ol>
              <li>Build a new binary</li>
              <li>Submit and wait for review</li>
              <li>Stage the rollout</li>
              <li>Wait for users to update</li>
            </ol>
            <div className="foot">
              <code>{'time to fix = store queue + update rate'}</code>
              <span className="big">Days</span>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Zephyr OTA</>}>
            <ol>
              <li>Publish the new bundle</li>
              <li>Point production at it</li>
              <li>Users get it on next launch</li>
            </ol>
            <div className="foot">
              <code>{'time to fix = one release'}</code>
              <span className="big">Next launch</span>
            </div>
          </ComparisonCard>
        </div>
        <p className="note">
          Native code changes still go through the store. JS, UI and web-layer changes ship over the air.
        </p>
      </CampaignSection>
      <CampaignSection eyebrow={<>Why teams use it</>} title={<>Release on your schedule, not the store's.</>}>
        <Benefits>
          <Benefit as="div" icon={<>01</>} title={<>Fix it today</>}>
            <p>A production bug does not wait for a review queue. Publish the fix and users get it on next launch.</p>
          </Benefit>
          <Benefit as="div" icon={<>02</>} title={<>Roll back on the device</>}>
            <p>Every version stays available. Point the app at the last good one and users have it on next launch.</p>
          </Benefit>
          <Benefit as="div" icon={<>03</>} title={<>Choose who gets it</>}>
            <p>Send a version to an internal environment first, then to everyone. Same build, no rebuild.</p>
          </Benefit>
        </Benefits>
      </CampaignSection>
      <CampaignSection id="how" eyebrow={<>How it works</>} title={<>Three steps. No new pipeline.</>}>
        <Steps>
          <Step number="01" title={<>Add Zephyr to your build</>}>
            <p>Add the Zephyr plugin to the bundler you already use for your React Native, Electron or Tauri app.</p>
          </Step>
          <Step number="02" title={<>Publish a version</>}>
            <p>Each build uploads as an immutable version. Nothing goes live until you say so.</p>
          </Step>
          <Step number="03" title={<>Release over the air</>}>
            <p>Point an environment at the version. Apps load it on next launch.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <DemoSection id="demo" className="lead">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2">
          See an OTA update<span>land on a real device.</span>
        </h2>
        <p className="b">
          30 minutes with an engineer. We push an update to a React Native, Electron or Tauri app on the call.
        </p>
        <ul>
          <li>OTA for React Native, Electron and Tauri</li>
          <li>Rollback without a store release</li>
          <li>How it fits your release process</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
