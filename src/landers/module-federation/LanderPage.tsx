import ZephyrWordmark from '@/landers/cityjs-london/assets/logo-zephyr-wordmark.svg';
import posthog from 'posthog-js';
import { useEffect, useRef, useState } from 'react';

posthog.init('phc_2BnQabLbt7YVrKbGN02UBKA9kBFH17SXme0Cf5G2iob', {
  api_host: 'https://us.i.posthog.com',
});

function track(event: string, props?: Record<string, unknown>) {
  posthog.capture(event, props);
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="absolute right-4 top-4 rounded border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50 transition hover:border-violet-500/50 hover:text-white"
    >
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

const CMD = 'npx create-zephyr-apps@latest';

export function ModuleFederationLanderPage() {
  const engagedRef = useRef(false);

  useEffect(() => {
    track('asset_viewed', { asset: 'mf-landing-page', referrer: document.referrer, url: window.location.href });

    const timer = setTimeout(() => {
      if (!engagedRef.current) {
        engagedRef.current = true;
        track('asset_engaged', { asset: 'mf-landing-page', engagement_type: 'time_on_page', seconds: 60 });
      }
    }, 60_000);

    return () => clearTimeout(timer);
  }, []);

  function handleCta(destination: string, label: string) {
    track('cta_clicked', { asset: 'mf-landing-page', cta_destination: destination, cta_label: label });
  }

  return (
    <main
      className="min-h-screen overflow-hidden bg-[#110D1A] text-[#F5F4F0]"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <style>{`
        :root {
          --purple: #8B5CF6;
          --purple-glow: rgba(139,92,246,0.08);
          --border: #2D2048;
          --card: #16121E;
          --muted: #8888AA;
          --deep: #0F0C1A;
        }
        .mf-nav-link { color: var(--muted); text-decoration: none; font-size: 14px; transition: color 0.2s; }
        .mf-nav-link:hover { color: #F5F4F0; }
        .mf-btn-primary { background: var(--purple); color: #F5F4F0; padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 700; text-decoration: none; transition: opacity 0.2s; display: inline-block; }
        .mf-btn-primary:hover { opacity: 0.9; }
        .mf-btn-ghost { background: transparent; border: 1px solid var(--border); color: var(--muted); padding: 14px 28px; border-radius: 8px; font-size: 15px; font-weight: 600; text-decoration: none; transition: border-color 0.2s, color 0.2s; display: inline-block; }
        .mf-btn-ghost:hover { border-color: var(--purple); color: #F5F4F0; }
        .mf-price-cta { display: block; text-align: center; margin-top: 20px; padding: 10px; border-radius: 6px; font-size: 13px; font-weight: 600; text-decoration: none; border: 1px solid var(--border); color: var(--muted); transition: border-color 0.2s, color 0.2s; }
        .mf-price-cta:hover { border-color: var(--purple); color: #F5F4F0; }
        .mf-price-cta.featured { background: var(--purple); border-color: var(--purple); color: #F5F4F0; }
        .mf-footer-link { font-size: 13px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
        .mf-footer-link:hover { color: #F5F4F0; }
      `}</style>

      {/* NAV */}
      <nav
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--border)',
          padding: '0 40px',
          height: 60,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <img src={ZephyrWordmark} alt="Zephyr Cloud" style={{ height: 22 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#how" className="mf-nav-link">
            How it works
          </a>
          <a href="#proof" className="mf-nav-link">
            Proof
          </a>
          <a href="#pricing" className="mf-nav-link">
            Pricing
          </a>
          <a href="https://docs.zephyr-cloud.io" className="mf-nav-link" target="_blank">
            Docs
          </a>
          <a
            href="https://app.zephyr-cloud.io"
            className="mf-btn-primary"
            style={{ padding: '8px 20px', fontSize: 14, borderRadius: 6 }}
            onClick={() => handleCta('app.zephyr-cloud.io', 'Start free nav')}
            target="_blank"
          >
            Start free
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ padding: '100px 40px 80px', maxWidth: 1100, margin: '0 auto', textAlign: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--purple-glow)',
            border: '1px solid var(--border)',
            borderRadius: 99,
            padding: '6px 16px',
            fontSize: 13,
            color: 'var(--purple)',
            marginBottom: 36,
          }}
        >
          <div style={{ width: 6, height: 6, background: 'var(--purple)', borderRadius: '50%' }} />
          Built for Module Federation teams
        </div>

        <h1
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(42px, 6vw, 76px)',
            fontWeight: 900,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            marginBottom: 28,
          }}
        >
          You've already decoupled
          <br />
          your frontend.
          <br />
          <em style={{ fontStyle: 'italic', color: 'var(--purple)' }}>Now ship it.</em>
        </h1>

        <p
          style={{
            fontSize: 'clamp(16px, 2vw, 20px)',
            color: 'var(--muted)',
            maxWidth: 640,
            margin: '0 auto 48px',
            lineHeight: 1.6,
          }}
        >
          Module Federation removed the coupling from your architecture.{' '}
          <strong style={{ color: '#F5F4F0' }}>Zephyr removes it from your deploys.</strong> Commit to edge in under a
          second — every remote, every team, independently.
        </p>

        {/* Terminal */}
        <div
          style={{
            background: '#0A0A0F',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px 24px',
            maxWidth: 540,
            margin: '0 auto 48px',
            textAlign: 'left',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }}
            />
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}
            />
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }}
            />
          </div>
          <div
            style={{
              fontFamily: "'Menlo','Monaco','Courier New',monospace",
              fontSize: 15,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <span style={{ color: 'var(--purple)' }}>$</span>
            <span>{CMD}</span>
          </div>
          <div style={{ fontFamily: 'monospace', fontSize: 12, color: 'var(--muted)', marginTop: 10 }}>
            <span style={{ color: '#6a5a8a' }}># </span>Or wrap your existing config: withZephyr(yourConfig)
          </div>
          <CopyButton text={CMD} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="https://app.zephyr-cloud.io"
            className="mf-btn-primary"
            onClick={() => handleCta('app.zephyr-cloud.io', 'Hero CTA')}
            target="_blank"
          >
            Start free — no card required
          </a>
          <a
            href="https://docs.zephyr-cloud.io"
            style={{ color: 'var(--muted)', fontSize: 14, textDecoration: 'none' }}
            target="_blank"
          >
            Read the docs →
          </a>
        </div>
      </section>

      {/* LOGO BAR */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '28px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: 'var(--muted)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            marginRight: 8,
          }}
        >
          Trusted by
        </span>
        {[
          { mark: 'MF Creator', label: 'Zack Jackson' },
          { mark: "Southern Glazer's", label: "North America's largest wine & spirits distributor" },
          { mark: 'ByteDance', label: 'Scale proven' },
          { mark: '7,685', label: 'monthly active users' },
        ].map((p) => (
          <div
            key={p.mark}
            style={{
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '8px 18px',
              fontSize: 13,
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <strong style={{ color: '#F5F4F0' }}>{p.mark}</strong> <span>{p.label}</span>
          </div>
        ))}
      </div>

      {/* PROBLEM / SOLUTION */}
      <div style={{ padding: '96px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
            marginBottom: 20,
            display: 'block',
          }}
        >
          The Gap
        </span>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          Module Federation decoupled your code.
          <br />
          Your deploys are still coupled.
        </h2>
        <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 600, lineHeight: 1.6, marginBottom: 56 }}>
          Every remote still waits on the same pipeline. One slow build holds up every team. That's not a Module
          Federation problem — it's a deployment infrastructure problem.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
          <SplitCard
            type="problem"
            title="Without Zephyr"
            items={[
              {
                head: '10–45 min commit-to-live',
                body: 'Even with MF, deploys still run through a monolithic pipeline.',
              },
              { head: 'Teams block each other', body: "Remote A can't go live until Remote B finishes its build." },
              {
                head: 'Rollback means re-deploy',
                body: 'Something breaks in prod — the fix takes as long as the original deploy.',
              },
              {
                head: 'Preview envs are expensive',
                body: 'Spinning up a full environment per PR blocks review velocity.',
              },
            ]}
          />
          <SplitCard
            type="solution"
            title="With Zephyr"
            items={[
              {
                head: 'Sub-second commit to edge',
                body: 'Zephyr is the missing layer between your CI/CD and the CDN.',
              },
              {
                head: 'Each remote ships independently',
                body: 'Team A deploys when Team A is ready. Zero coordination required.',
              },
              {
                head: 'One-click rollback, no wait',
                body: 'Every deployment is versioned. Rollback is instant — no re-deploy.',
              },
              {
                head: 'Unlimited preview environments',
                body: 'Every PR gets its own preview. Free on all paid plans.',
              },
            ]}
          />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 0 }} />

      {/* HOW IT WORKS */}
      <div id="how" style={{ padding: '96px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
            marginBottom: 20,
            display: 'block',
          }}
        >
          How It Works
        </span>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          One line. No migration.
          <br />
          Live in minutes.
        </h2>
        <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 600, lineHeight: 1.6, marginBottom: 56 }}>
          Zephyr wraps your existing build config. No pipeline rewrite. No new toolchain. Works with webpack, rspack,
          and rsbuild.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
          <HowCard
            step="01"
            title="Wrap your config"
            body={
              <>
                Add <code style={{ color: 'var(--purple)', fontSize: 13 }}>withZephyr()</code> around your existing
                Module Federation build config. That's the entire integration.
              </>
            }
            code={`// webpack.config.js\nconst { withZephyr } = require('zephyr-edge-contract');\n\nmodule.exports = withZephyr({\n  // your existing MF config\n});`}
          />
          <HowCard
            step="02"
            title="Push your code"
            body="Commit and push as normal. Zephyr intercepts the build output and routes it directly to the edge — bypassing the CDN propagation wait entirely."
            code={`# Your normal workflow\ngit add .\ngit commit -m "feat: update header remote"\ngit push origin main`}
          />
          <HowCard
            step="03"
            title="Live at the edge"
            body="Your module is live globally in under a second. Every team that consumes it gets the update immediately — no coordination, no waiting on other remotes."
            code={`# Build output\n✓ Zephyr: deploying header-remote\n✓ Edge: propagated (0.3s)\n✓ Live: cdn.zephyr-cloud.io/...`}
          />
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 0 }} />

      {/* CAPABILITIES */}
      <div style={{ padding: '96px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
            marginBottom: 20,
            display: 'block',
          }}
        >
          Built for Module Federation
        </span>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          Every feature designed
          <br />
          for how MF teams work.
        </h2>
        <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 600, lineHeight: 1.6, marginBottom: 56 }}>
          Not a general deployment platform with MF support bolted on. Zephyr was built by the team that created Module
          Federation.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
          {[
            {
              icon: '⚡',
              title: 'Module-level cache invalidation',
              body: 'Only the modules that changed get redeployed. Unchanged remotes stay cached at the edge — zero propagation overhead.',
            },
            {
              icon: '🔀',
              title: 'Per-team deploy ownership',
              body: "Each team owns their remote's deploy lifecycle. Ship on your schedule. No waiting on other teams, no shared deploy queue.",
            },
            {
              icon: '🏷️',
              title: 'Semver + npm-style version tags',
              body: 'Version your remotes like packages. Pin consumers to a specific version. Roll forward or back without a re-deploy.',
            },
            {
              icon: '☁️',
              title: 'BYOC — Bring Your Own Cloud',
              body: 'Deploy to Cloudflare, Fastly, or Akamai. Your modules stay on your infrastructure. AWS and Vercel support coming.',
            },
            {
              icon: '🔍',
              title: 'Unlimited preview environments',
              body: 'Every PR gets a full preview environment — all remotes included. Free on all paid plans.',
            },
            {
              icon: '↩️',
              title: 'Instant rollback per module',
              body: 'One click. No re-deploy. Roll back a single remote without touching the rest of your MF architecture.',
            },
          ].map((cap) => (
            <div
              key={cap.title}
              style={{
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: 10,
                padding: '24px 28px',
                display: 'flex',
                gap: 18,
                alignItems: 'flex-start',
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 40,
                  background: 'var(--purple-glow)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 18,
                  flexShrink: 0,
                }}
              >
                {cap.icon}
              </div>
              <div>
                <h4 style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{cap.title}</h4>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>{cap.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STATS BAND */}
      <div
        style={{
          background: 'var(--card)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '56px 40px',
        }}
      >
        <div
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 32,
            textAlign: 'center',
          }}
        >
          {[
            { val: '<1s', label: 'Commit to edge' },
            { val: '∞', label: 'Free preview environments on every paid plan' },
            { val: '1', label: 'Line of code to integrate' },
            { val: 'BYOC', label: 'All paid plans — your infrastructure, your control' },
          ].map((s) => (
            <div key={s.val}>
              <div
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: 48,
                  fontWeight: 900,
                  color: 'var(--purple)',
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {s.val}
              </div>
              <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* PROOF */}
      <div id="proof" style={{ padding: '96px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
            marginBottom: 20,
            display: 'block',
          }}
        >
          Enterprise Proof
        </span>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 40,
          }}
        >
          The architecture that runs
          <br />
          North America's largest
          <br />
          wine & spirits distributor.
        </h2>
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderLeft: '4px solid var(--purple)',
            borderRadius: '0 10px 10px 0',
            padding: '36px 40px',
            maxWidth: 860,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'var(--purple)',
              marginBottom: 16,
            }}
          >
            Southern Glazer's Wine & Spirits — Enterprise Deployment
          </div>
          <p
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontStyle: 'italic',
              lineHeight: 1.5,
              marginBottom: 28,
            }}
          >
            "The same Module Federation pattern that Zack Jackson built and proved at ByteDance scale — now the default
            deployment infrastructure for one of the most complex enterprise frontend architectures in distribution."
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { val: '<1s', label: 'Commit to edge in production' },
              { val: '0', label: 'Pipeline rewrites required' },
              { val: '100%', label: 'Team deploy independence' },
            ].map((r) => (
              <div key={r.val}>
                <div
                  style={{
                    fontSize: 28,
                    fontWeight: 900,
                    color: 'var(--purple)',
                    fontFamily: 'Georgia, serif',
                    lineHeight: 1,
                  }}
                >
                  {r.val}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 4 }}>{r.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: 0 }} />

      {/* PRICING */}
      <div id="pricing" style={{ padding: '96px 40px', maxWidth: 1100, margin: '0 auto' }}>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'var(--purple)',
            marginBottom: 20,
            display: 'block',
          }}
        >
          Pricing
        </span>
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(28px, 4vw, 44px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
          }}
        >
          Start free. Scale as your
          <br />
          team grows.
        </h2>
        <p style={{ fontSize: 18, color: 'var(--muted)', maxWidth: 600, lineHeight: 1.6, marginBottom: 48 }}>
          Every paid plan includes BYOC, unlimited preview environments, and full Module Federation support. Annual
          billing saves 15%.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 16 }}>
          <PriceCard
            tier="Personal"
            price="Free"
            seats="1 seat — forever free"
            features={['withZephyr() integration', 'Sub-second deploys', 'Version management', 'Zephyr Cloud hosting']}
            href="https://app.zephyr-cloud.io"
            onCta={() => handleCta('app.zephyr-cloud.io', 'Pricing Personal')}
          />
          <PriceCard
            tier="Team"
            price="$19"
            period="/seat/mo"
            seats="2–10 seats"
            features={[
              'Everything in Personal',
              'BYOC (Cloudflare, Fastly, Akamai)',
              'Unlimited preview environments',
              'Semver + npm-style version tags',
              'Team deploy management',
            ]}
            href="https://app.zephyr-cloud.io"
            featured
            onCta={() => handleCta('app.zephyr-cloud.io', 'Pricing Team')}
          />
          <PriceCard
            tier="Growth"
            price="$49"
            period="/seat/mo"
            seats="11–25 seats"
            features={[
              'Everything in Team',
              'Priority support',
              '99.9% SLA',
              'Advanced rollback controls',
              'Deploy analytics',
            ]}
            href="https://app.zephyr-cloud.io"
            onCta={() => handleCta('app.zephyr-cloud.io', 'Pricing Growth')}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          <PriceCard
            tier="Scale"
            price="$35"
            period="/seat/mo"
            seats="26–75 seats"
            features={['Everything in Growth', 'SAML SSO', 'Custom domains', 'SOC 2 Type II']}
            href="https://app.zephyr-cloud.io"
            onCta={() => handleCta('app.zephyr-cloud.io', 'Pricing Scale')}
          />
          <PriceCard
            tier="Enterprise"
            price="$25"
            period="/seat/mo"
            seats="76–200 seats"
            features={['Everything in Scale', 'Custom SLA', 'Dedicated support', 'Audit logs']}
            href="https://app.zephyr-cloud.io"
            onCta={() => handleCta('app.zephyr-cloud.io', 'Pricing Enterprise')}
          />
          <PriceCard
            tier="Enterprise+"
            price="Custom"
            seats="200+ seats"
            features={[
              'Everything in Enterprise',
              'Custom contract',
              'On-prem / private cloud',
              'White-glove onboarding',
            ]}
            href="mailto:sales@zephyr-cloud.io"
            onCta={() => handleCta('sales@zephyr-cloud.io', 'Pricing Enterprise+')}
            ctaLabel="Talk to us"
          />
        </div>
        <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--muted)', marginTop: 20 }}>
          <strong style={{ color: '#F5F4F0' }}>Annual billing saves 15%.</strong> All plans include a free trial. No
          card required to start.
        </p>
      </div>

      {/* FINAL CTA */}
      <div
        style={{
          padding: '100px 40px',
          textAlign: 'center',
          borderTop: '1px solid var(--border)',
          background: 'linear-gradient(180deg, #110D1A 0%, #0F0C1A 100%)',
        }}
      >
        <h2
          style={{
            fontFamily: 'Georgia, serif',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: 20,
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Your deploys should move as fast as{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--purple)' }}>your code.</em>
        </h2>
        <p style={{ fontSize: 18, color: 'var(--muted)', marginBottom: 48, maxWidth: 480, margin: '0 auto 48px' }}>
          You're already using Module Federation. You're one line away from sub-second deploys.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 40 }}>
          <a
            href="https://app.zephyr-cloud.io"
            className="mf-btn-primary"
            onClick={() => handleCta('app.zephyr-cloud.io', 'Final CTA primary')}
            target="_blank"
          >
            Start free — no card required
          </a>
          <a href="https://docs.zephyr-cloud.io" className="mf-btn-ghost" target="_blank">
            Read the docs
          </a>
        </div>
        <div
          style={{
            background: '#0A0A0F',
            border: '1px solid var(--border)',
            borderRadius: 10,
            padding: '20px 24px',
            maxWidth: 480,
            margin: '0 auto',
            textAlign: 'left',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', gap: 6, marginBottom: 14 }}>
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }}
            />
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }}
            />
            <span
              style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840', display: 'inline-block' }}
            />
          </div>
          <div
            style={{ fontFamily: "'Menlo','Monaco','Courier New',monospace", fontSize: 15, display: 'flex', gap: 10 }}
          >
            <span style={{ color: 'var(--purple)' }}>$</span>
            <span>{CMD}</span>
          </div>
          <CopyButton text={CMD} />
        </div>
      </div>

      {/* FOOTER */}
      <footer
        style={{
          background: '#0A0A0F',
          borderTop: '1px solid var(--border)',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <img src={ZephyrWordmark} alt="Zephyr Cloud" style={{ height: 18 }} />
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="https://docs.zephyr-cloud.io" className="mf-footer-link" target="_blank">
            Docs
          </a>
          <a href="https://app.zephyr-cloud.io" className="mf-footer-link" target="_blank">
            Sign in
          </a>
          <a href="mailto:sales@zephyr-cloud.io" className="mf-footer-link">
            Sales
          </a>
        </div>
        <div style={{ fontSize: 12, color: '#444460' }}>© 2025 Zephyr Cloud. Built for the web.</div>
      </footer>
    </main>
  );
}

function SplitCard({
  type,
  title,
  items,
}: {
  type: 'problem' | 'solution';
  title: string;
  items: { head: string; body: string }[];
}) {
  const isProblem = type === 'problem';
  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderTop: `3px solid ${isProblem ? '#4a2a2a' : 'var(--purple)'}`,
        borderRadius: 10,
        padding: 32,
      }}
    >
      <h3
        style={{
          fontSize: 14,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          marginBottom: 20,
          color: isProblem ? '#8a4a4a' : 'var(--purple)',
        }}
      >
        {title}
      </h3>
      {items.map((item) => (
        <div
          key={item.head}
          style={{
            display: 'flex',
            gap: 14,
            alignItems: 'flex-start',
            marginBottom: 18,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <span style={{ fontSize: 16, flexShrink: 0, marginTop: 1 }}>{isProblem ? '✗' : '✓'}</span>
          <p style={{ color: 'var(--muted)' }}>
            <strong style={{ color: '#F5F4F0', display: 'block', marginBottom: 2 }}>{item.head}</strong>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
}

function HowCard({ step, title, body, code }: { step: string; title: string; body: React.ReactNode; code: string }) {
  return (
    <div style={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 10, padding: 28 }}>
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--purple)',
          marginBottom: 16,
          fontWeight: 700,
        }}
      >
        Step {step}
      </div>
      <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Georgia, serif', marginBottom: 10, lineHeight: 1.2 }}>
        {title}
      </h3>
      <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.6 }}>{body}</p>
      <pre
        style={{
          marginTop: 16,
          background: '#0F0C1A',
          border: '1px solid var(--border)',
          borderRadius: 6,
          padding: '12px 14px',
          fontFamily: "'Menlo',monospace",
          fontSize: 12,
          color: '#F5F4F0',
          lineHeight: 1.6,
          whiteSpace: 'pre-wrap',
          overflowWrap: 'break-word',
        }}
      >
        {code}
      </pre>
    </div>
  );
}

function PriceCard({
  tier,
  price,
  period,
  seats,
  features,
  href,
  featured,
  ctaLabel = 'Get started',
  onCta,
}: {
  tier: string;
  price: string;
  period?: string;
  seats: string;
  features: string[];
  href: string;
  featured?: boolean;
  ctaLabel?: string;
  onCta?: () => void;
}) {
  return (
    <div
      style={{
        background: featured ? 'linear-gradient(135deg, #16121E 0%, #1e1530 100%)' : 'var(--card)',
        border: `1px solid ${featured ? 'var(--purple)' : 'var(--border)'}`,
        borderRadius: 10,
        padding: '28px 24px',
        position: 'relative',
      }}
    >
      {featured && (
        <div
          style={{
            position: 'absolute',
            top: -12,
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--purple)',
            color: '#F5F4F0',
            fontSize: 11,
            fontWeight: 700,
            padding: '3px 12px',
            borderRadius: 99,
            letterSpacing: '0.05em',
            whiteSpace: 'nowrap',
          }}
        >
          Most Popular
        </div>
      )}
      <div
        style={{
          fontSize: 12,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 12,
        }}
      >
        {tier}
      </div>
      <div style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: 4 }}>
        {price}
        {period && (
          <span style={{ fontSize: 16, color: 'var(--muted)', fontFamily: 'system-ui', fontWeight: 400 }}>
            {period}
          </span>
        )}
      </div>
      <div
        style={{
          fontSize: 12,
          color: 'var(--muted)',
          marginBottom: 20,
          paddingBottom: 20,
          borderBottom: '1px solid var(--border)',
        }}
      >
        {seats}
      </div>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {features.map((f) => (
          <li
            key={f}
            style={{
              fontSize: 13,
              color: 'var(--muted)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 8,
              lineHeight: 1.4,
            }}
          >
            <span style={{ color: 'var(--purple)', fontWeight: 700, flexShrink: 0 }}>✓</span> {f}
          </li>
        ))}
      </ul>
      <a href={href} className={`mf-price-cta${featured ? ' featured' : ''}`} onClick={onCta} target="_blank">
        {ctaLabel}
      </a>
    </div>
  );
}
