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
      id="saaspocalypse"
      design={modernDesign}
      accents={{ '--a': '#ff6b22', '--ar': '255, 107, 34', '--b': '#ffc247' }}
    >
      <Hero>
        <div className="glow"></div>
        <p className="eyebrow">The SaaSpocalypse is here</p>
        <h1>
          Stop renting software.<span>Ship your own.</span>
        </h1>
        <p className="sub">
          Agents and small teams now build in days what you used to buy for years. Zephyr makes owning it safe: every
          build live, every release your decision.
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
          <table className="ownership">
            <thead>
              <tr>
                <th scope="col">What you rent today</th>
                <th scope="col">What you own on Zephyr</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="rent">
                  <del>Internal tools builder</del>
                  <small>per seat / mo</small>
                </td>
                <td>
                  ops-console<small>● live · v1.4 · released</small>
                </td>
              </tr>
              <tr>
                <td className="rent">
                  <del>Feature flag service</del>
                  <small>per MAU / mo</small>
                </td>
                <td>
                  flags<small>● live · v0.9 · released</small>
                </td>
              </tr>
              <tr>
                <td className="rent">
                  <del>Form and survey builder</del>
                  <small>per response / mo</small>
                </td>
                <td>
                  intake-forms<small>● live · v2.1 · in review</small>
                </td>
              </tr>
              <tr>
                <td className="rent">
                  <del>Customer status page</del>
                  <small>per subscriber / mo</small>
                </td>
                <td>
                  status<small>● live · v1.0 · released</small>
                </td>
              </tr>
              <tr>
                <td className="rent">
                  <del>Dashboard builder</del>
                  <small>per viewer / mo</small>
                </td>
                <td>
                  metrics<small>● live · v0.3 · agent draft</small>
                </td>
              </tr>
            </tbody>
          </table>
          <p className="note">Illustrative. Categories, not vendors. Put your own SaaS line items here.</p>
        </div>
        <ProofStrip>
          <div>
            <b>Days, not quarters</b>
            <span>from idea to a live URL.</span>
          </div>
          <div>
            <b>Your roadmap</b>
            <span>your code, your data.</span>
          </div>
          <div>
            <b>Your cloud</b>
            <span>Cloudflare, AWS, Fastly, Akamai, K8s.</span>
          </div>
        </ProofStrip>
      </Hero>
      <CampaignSection
        aria-labelledby="comparison"
        eyebrow={<>Buy vs. own</>}
        title={<>Building got cheap. Shipping safely is the moat.</>}
        headingId="comparison"
      >
        <div className="cmp">
          <ComparisonCard tone="old" title={<>Renting SaaS</>}>
            <ol>
              <li>The bill grows with every seat</li>
              <li>Their roadmap, not yours</li>
              <li>Your data in their silo</li>
              <li>One more vendor review</li>
              <li>You use 20% and pay for 100%</li>
            </ol>
            <div className="foot">
              <code>{'cost scales with headcount'}</code>
            </div>
          </ComparisonCard>
          <ComparisonCard tone="new" title={<>Owning it with Zephyr</>}>
            <ol>
              <li>Build only the 20% you use</li>
              <li>Ship the feature you need this week</li>
              <li>Data stays where you put it</li>
              <li>Review every build live before release</li>
              <li>Roll back in one move</li>
            </ol>
            <div className="foot">
              <code>{'cost scales with what you run'}</code>
            </div>
          </ComparisonCard>
        </div>
      </CampaignSection>
      <section aria-label="Benefits">
        <Benefits>
          <Benefit icon={<>&gt;_</>} title={<>Agents build it</>}>
            <p>Every agent attempt gets its own preview URL. Judge the running app, not a diff.</p>
          </Benefit>
          <Benefit icon={<>&#123; &#125;</>} title={<>Teams own it</>}>
            <p>Split tools into federated modules. Each team ships its part without waiting for the others.</p>
          </Benefit>
          <Benefit icon={<>↶</>} title={<>You control the risk</>}>
            <p>Protected environments, roles and rollback without a rebuild. Owning software stops being a gamble.</p>
          </Benefit>
        </Benefits>
      </section>
      <CampaignSection
        id="how"
        aria-labelledby="how-title"
        eyebrow={<>Start this quarter</>}
        title={<>Cancel one subscription. Then another.</>}
        headingId="how-title"
      >
        <Steps>
          <Step number="01" title={<>Pick the priciest tool</>}>
            <p>Start where the bill hurts and you use the least of what you pay for.</p>
          </Step>
          <Step number="02" title={<>Build the part you use</>}>
            <p>With your team and your agents. Every build is live on Zephyr for review.</p>
          </Step>
          <Step number="03" title={<>Release it when it wins</>}>
            <p>Move production when your version beats the vendor. Roll back if not.</p>
          </Step>
        </Steps>
      </CampaignSection>
      <Testimonial attribution={<>Large international women's apparel organization</>}>
        Zephyr changes how we do procurement, now our gate is 'how long would it take for us to build this with Zephyr'.
      </Testimonial>
      <DemoSection id="demo" className="lead" aria-labelledby="demo-title">
        <p className="eyebrow">Book a demo</p>
        <h2 className="h2" id="demo-title">
          Pick the first tool<span>you stop renting.</span>
        </h2>
        <p className="b">30 minutes with an engineer. We will map one tool you pay for to something you own.</p>
        <ul>
          <li>A replacement plan for one SaaS tool</li>
          <li>Your build live on Zephyr</li>
          <li>Release and rollback, shown live</li>
        </ul>
      </DemoSection>
    </CampaignFrame>
  );
}
