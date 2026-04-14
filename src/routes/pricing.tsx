import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

// ── Design tokens ─────────────────────────────────────────────────────────────
const C = {
  black: '#0A0A0F',
  black2: '#0F0F1A',
  black3: '#111118',
  border: '#1E1E2E',
  borderLight: '#2D2D3A',
  purple: '#8B5CF6',
  purpleLight: '#A78BFA',
  purpleDim: '#1A0F3A',
  white: '#F5F4F0',
  gray: '#9CA3AF',
  grayDark: '#6B7280',
  green: '#10B981',
  greenDim: '#064E3B',
  amber: '#E8A830',
} as const;

// ── Pro calculator bands ──────────────────────────────────────────────────────
const PRO_BANDS = [
  { min: 2, max: 10, rate: 39, midpoint: 6, label: '2 – 10 seats' },
  { min: 11, max: 25, rate: 32, midpoint: 18, label: '11 – 25 seats' },
  { min: 26, max: 50, rate: 27, midpoint: 38, label: '26 – 50 seats' },
  { min: 51, max: 75, rate: 24, midpoint: 63, label: '51 – 75 seats' },
];
const INTRO_RATE = PRO_BANDS[0].rate;
const ANNUAL_DISC = 0.85;

function getRate(seats: number) {
  return PRO_BANDS.find((b) => seats >= b.min && seats <= b.max)?.rate ?? 24;
}
function getBandIdx(seats: number) {
  return PRO_BANDS.findIndex((b) => seats >= b.min && seats <= b.max);
}
function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

// ── Page ──────────────────────────────────────────────────────────────────────
function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [path, setPath] = useState<'mf' | 'nonmf' | null>(null);
  const [seats, setSeats] = useState(2);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const billingRef = useRef<HTMLDivElement>(null);
  const isAnnual = billing === 'annual';

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('for');
    if (p === 'mf') setPath('mf');
    else if (p === 'teams' || p === 'nonmf') setPath('nonmf');
  }, []);

  function selectPath(p: 'mf' | 'nonmf') {
    setPath(p);
    setTimeout(() => billingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 400);
  }

  // Calculator
  const rate = getRate(seats);
  const effRate = isAnnual ? Math.round(rate * ANNUAL_DISC * 100) / 100 : rate;
  const moTotal = Math.round(seats * effRate);
  const yrTotal = Math.round(seats * rate * 12 * ANNUAL_DISC);
  const yrFull = seats * rate * 12;
  const yrSave = Math.round(yrFull - yrTotal);
  const bandIdx = getBandIdx(seats);
  const sliderPct = ((seats - 2) / 73) * 100;

  const faqs = [
    {
      q: 'Do I need Module Federation to get value from Zephyr?',
      a: 'No. BYOC, instant rollbacks, and environment variables without redeploying are available on Pro — none of them require Module Federation. MF-native features are additive. Many teams start without MF and adopt it later.',
    },
    {
      q: 'How does Pro pricing work as the team grows?',
      a: "Pro starts at $39/seat for 2–10 seats. At 11–25 seats the rate drops to $32/seat. At 26–50 it's $27/seat. At 51–75 it's $24/seat — 38% less than the intro rate. Use the calculator to see your exact price.",
    },
    {
      q: 'What happens when we hit 76 seats?',
      a: 'You move to Enterprise — custom pricing, quoted same day, no RFP required. Enterprise is volume-based so the per-seat rate keeps decreasing. No cliff, no surprise.',
    },
    {
      q: 'What is BYOC — and what does it mean for our data?',
      a: 'Bring Your Own Cloud. Deployments go to your own infrastructure — Cloudflare, AWS, Fastly, Akamai, or Vercel. Your data never leaves your cloud. This answers most data residency and DPA questions before your security team asks them.',
    },
    {
      q: 'Are there overage charges for bandwidth or storage?',
      a: "Pro includes 1.5TB bandwidth and 500GB storage. We'll reach out before charging anything — no automatic overage fees. Enterprise limits are agreed upfront so procurement always knows the ceiling.",
    },
    {
      q: 'Can we pay by invoice or purchase order?',
      a: "Yes. Enterprise invoicing and PO billing are standard. Pro is credit card monthly or annually. If procurement requires an invoice for Pro, contact sales and we'll accommodate it.",
    },
    {
      q: 'What makes the MF-native features different?',
      a: "They were built by the team that created Module Federation. Environment Overrides, DevTools, UML, and zephyr.dependencies aren't integrations — they require authorship-level understanding of MF. No other platform offers these.",
    },
    {
      q: "Is a data processing agreement available? We're in a regulated sector.",
      a: "Yes. DPAs are available on Enterprise. Zephyr is SOC 2 compliant and BYOC-first — your data stays in your own cloud. If you need a DPA as part of a POC, reach out and we'll accommodate it.",
    },
    {
      q: 'Is there an annual discount?',
      a: 'Yes — 15% off Pro when billed annually. Toggle above to see annual pricing reflected live in the calculator.',
    },
  ];

  return (
    <div style={{ background: C.black, color: C.white, lineHeight: 1.6 }}>
      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '72px 40px 48px', maxWidth: 760, margin: '0 auto' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            background: C.purpleDim,
            border: '1px solid rgba(139,92,246,0.3)',
            color: C.purpleLight,
            fontSize: 11,
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1.2px',
            padding: '5px 14px',
            borderRadius: 20,
            marginBottom: 24,
          }}
        >
          ● Pricing
        </div>
        <h1
          style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            lineHeight: 1.08,
            marginBottom: 18,
          }}
        >
          Deployment that fits
          <br />
          where your team <em style={{ fontStyle: 'normal', color: C.purpleLight }}>actually is.</em>
        </h1>
        <p style={{ fontSize: 16, color: C.gray, maxWidth: 520, margin: '0 auto 48px', lineHeight: 1.75 }}>
          Whether you're running Module Federation or not, Zephyr meets you there — and the price goes down as your team
          scales up.
        </p>

        {/* Path selector */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {(
            [
              {
                id: 'mf',
                icon: '⚡',
                title: 'We use Module Federation',
                sub: "We're running MF and need a proper deployment platform built around it.",
              },
              {
                id: 'nonmf',
                icon: '🚀',
                title: "We don't use MF yet",
                sub: 'We want cloud-agnostic deployments, better rollbacks, and a faster pipeline.',
              },
            ] as const
          ).map(({ id, icon, title, sub }) => {
            const active = path === id;
            const isMf = id === 'mf';
            const activeColor = isMf ? C.purple : C.green;
            return (
              <div
                key={id}
                onClick={() => selectPath(id)}
                style={{
                  background: C.black2,
                  borderRadius: 12,
                  padding: '22px 28px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  maxWidth: 280,
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                  border: `2px solid ${active ? activeColor : C.border}`,
                  boxShadow: active
                    ? `0 0 0 1px ${activeColor}, 0 8px 32px ${isMf ? 'rgba(139,92,246,0.15)' : 'rgba(16,185,129,0.12)'}`
                    : 'none',
                  transform: active ? 'translateY(-2px)' : 'none',
                }}
              >
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: activeColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 10,
                      fontWeight: 900,
                    }}
                  >
                    ✓
                  </div>
                )}
                <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                <div
                  style={{ fontSize: 15, fontWeight: 800, color: C.white, marginBottom: 5, letterSpacing: '-0.3px' }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 12, color: C.gray, lineHeight: 1.5 }}>{sub}</div>
              </div>
            );
          })}
        </div>
        {!path && (
          <p style={{ fontSize: 12, color: C.grayDark }}>
            Select your situation to see what matters most to your team.
          </p>
        )}
      </section>

      {/* ── VALUE PANELS ── */}
      {(['mf', 'nonmf'] as const).map((panelId) => {
        const isMf = panelId === 'mf';
        const visible = path === panelId;
        const accent = isMf ? C.purpleLight : C.green;
        const pains = isMf
          ? [
              {
                problem:
                  "CI is a bottleneck for critical deploys. You're waiting on pipelines to push a config change.",
                solution: 'Environment Overrides',
                mf: true,
              },
              {
                problem:
                  'Engineers maintain internal tooling to develop locally against MFEs. It eats sprint capacity every cycle.',
                solution: 'Zephyr DevTools',
                mf: true,
              },
              {
                problem:
                  'No visibility into who deployed what across remotes. Audit and compliance reviews are painful.',
                solution: 'Audit logs + Activity',
                mf: false,
              },
            ]
          : [
              {
                problem: "You're locked to Vercel or Netlify. Migrating or going multi-cloud is a project in itself.",
                solution: 'BYOC — bring your own cloud',
                mf: false,
              },
              {
                problem:
                  "Rollbacks mean redeploying. When something breaks in production, you're waiting on the pipeline.",
                solution: 'Instant rollbacks, any cloud',
                mf: false,
              },
              {
                problem:
                  'Changing an environment variable triggers a full redeploy. Small config changes block shipping.',
                solution: 'Env Variables, no redeploy',
                mf: false,
              },
            ];
        return (
          <div
            key={panelId}
            style={{
              maxWidth: 960,
              padding: '0 24px',
              overflow: 'hidden',
              maxHeight: visible ? 600 : 0,
              opacity: visible ? 1 : 0,
              marginLeft: 'auto',
              marginRight: 'auto',
              marginTop: visible ? 48 : 0,
              marginBottom: visible ? 56 : 0,
              transition: 'max-height 0.5s ease, opacity 0.4s ease, margin 0.4s ease',
            }}
          >
            <div
              style={{
                borderRadius: 14,
                padding: '40px 48px',
                background: isMf
                  ? 'linear-gradient(135deg,#1A0F3A 0%,#0F0F1A 70%)'
                  : 'linear-gradient(135deg,#062A1F 0%,#0F0F1A 70%)',
                border: `1px solid ${isMf ? 'rgba(139,92,246,0.3)' : 'rgba(16,185,129,0.25)'}`,
              }}
            >
              <div style={{ marginBottom: 32 }}>
                <div
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '1.2px',
                    color: accent,
                    marginBottom: 10,
                  }}
                >
                  {isMf ? 'For Module Federation teams' : 'For teams not yet on Module Federation'}
                </div>
                <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.6px', lineHeight: 1.2, color: C.white }}>
                  {isMf ? (
                    <>
                      You adopted MF. Now you need the platform{' '}
                      <em style={{ fontStyle: 'normal', color: accent }}>built around it.</em>
                    </>
                  ) : (
                    <>
                      Your deployment stack shouldn't be{' '}
                      <em style={{ fontStyle: 'normal', color: accent }}>owned by your cloud provider.</em>
                    </>
                  )}
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
                {pains.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      borderRadius: 10,
                      padding: '18px 16px',
                      border: '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        color: C.grayDark,
                        marginBottom: 6,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                      }}
                    >
                      The problem
                    </div>
                    <p style={{ fontSize: 13, color: C.gray, lineHeight: 1.5, marginBottom: 10 }}>{item.problem}</p>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: accent,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                      }}
                    >
                      → {item.solution}
                      {item.mf && <MfTag />}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── BILLING TOGGLE ── */}
      <div ref={billingRef} style={{ textAlign: 'center', padding: '0 24px 48px' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            background: C.black3,
            border: `1px solid ${C.border}`,
            borderRadius: 40,
            padding: 4,
          }}
        >
          {(['monthly', 'annual'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setBilling(mode)}
              style={{
                background: billing === mode ? C.purple : 'none',
                border: 'none',
                color: billing === mode ? 'white' : C.gray,
                fontSize: 13,
                fontWeight: 600,
                padding: '7px 18px',
                borderRadius: 30,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {mode === 'monthly' ? 'Monthly' : 'Annual'}
              {mode === 'annual' && (
                <span
                  style={{
                    background: C.greenDim,
                    color: C.green,
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '2px 7px',
                    borderRadius: 8,
                  }}
                >
                  Save 15%
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── TIER CARDS ── */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '0 24px 80px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, alignItems: 'start' }}>
          {/* FREE */}
          <div style={card()}>
            <TierName>Free</TierName>
            <div style={amt()}>$0</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>forever</div>
            <TierSeats>1 seat · no credit card required</TierSeats>
            <p style={desc()}>
              For individuals exploring Zephyr. One cloud integration, all bundlers, and tag-based environments — free
              forever.
            </p>
            <Cta href="https://app.zephyr-cloud.io/" v="secondary">
              Get started free
            </Cta>
            <ul style={featList()}>
              {[
                '1 cloud integration',
                'All 15 bundler plugins',
                'Basic version history',
                'Tag / branch env creation',
                '120GB bandwidth · 50GB storage',
              ].map((f) => (
                <Fi key={f} c="green">
                  {f}
                </Fi>
              ))}
            </ul>
          </div>

          {/* PRO */}
          <div
            style={{
              ...card(),
              background: 'linear-gradient(160deg,#1A0F3A 0%,#0F0F1A 60%)',
              border: `1px solid ${C.purple}`,
              boxShadow: '0 0 48px rgba(139,92,246,0.12)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: C.purple,
                color: 'white',
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                padding: '4px 14px',
                borderRadius: 10,
                whiteSpace: 'nowrap',
              }}
            >
              Most Popular
            </div>
            <TierName purple>Pro</TierName>
            <div style={{ fontSize: 13, color: C.grayDark, fontWeight: 500, marginBottom: 2 }}>starting at</div>
            <div style={amt()}>{isAnnual ? fmt(Math.round(INTRO_RATE * ANNUAL_DISC)) : fmt(INTRO_RATE)}</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>
              per seat / month ·{' '}
              <a href="#pro-calc" style={{ color: C.purpleLight, textDecoration: 'none', fontWeight: 600 }}>
                use the calculator ↓
              </a>
            </div>
            <TierSeats>2 – 75 seats · costs decrease as your team scales</TierSeats>
            <p style={desc()}>
              The full platform. BYOC, MF-native features, per-team permissions, and audit logs — everything a scaling
              engineering team needs.
            </p>
            <Cta href="https://app.zephyr-cloud.io/" v="primary">
              Start free 30-day trial
            </Cta>
            <div
              style={{
                fontSize: 11,
                color: C.grayDark,
                textAlign: 'center',
                marginTop: -16,
                marginBottom: 12,
                lineHeight: 1.5,
              }}
            >
              No credit card required · full Pro access · keep your data after trial
            </div>
            <div style={{ fontSize: 12, color: C.grayDark, marginBottom: 16 }}>Up and running in under 15 minutes.</div>
            <ul style={featList()}>
              <Fi c="green">
                <strong style={{ color: C.white }}>BYOC</strong> — any cloud
              </Fi>
              <Fi c="green">All cloud integrations</Fi>
              <Fi c="green">Instant rollbacks</Fi>
              <Fi c="green">Full version history</Fi>
              <Divider />
              <Fi c="purple" dim={path === 'nonmf'}>
                <strong style={{ color: C.white }}>Environment Overrides</strong> <MfTag />
              </Fi>
              <Fi c="purple">
                <strong style={{ color: C.white }}>Env Variables</strong> — no redeploy
              </Fi>
              <Fi c="purple" dim={path === 'nonmf'}>
                <strong style={{ color: C.white }}>Zephyr DevTools</strong> <MfTag />
              </Fi>
              <Fi c="purple" dim={path === 'nonmf'}>
                <strong style={{ color: C.white }}>UML architecture map</strong> <MfTag />
              </Fi>
              <Fi c="purple" dim={path === 'nonmf'}>
                <strong style={{ color: C.white }}>zephyr.dependencies</strong> <MfTag />
              </Fi>
              <Divider />
              <Fi c="green">Per-team deploy permissions</Fi>
              <Fi c="amber">30-day audit logs</Fi>
              <Fi c="amber">Application activity log</Fi>
              <Fi c="green">Up to 75 collaborators</Fi>
            </ul>
          </div>

          {/* ENTERPRISE */}
          <div style={card()}>
            <TierName>Enterprise</TierName>
            <div style={amt()}>Custom</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>&nbsp;</div>
            <TierSeats>76+ seats · no RFP required · quote same day</TierSeats>
            <p style={desc()}>
              For large orgs and regulated sectors. SSO, extended audit retention, DPA, dedicated support, and custom
              SLAs. Pay by invoice. POC / pilot available.
            </p>
            <Cta href="mailto:inbound@zephyr-cloud.io?subject=Enterprise" v="secondary">
              Talk to sales
            </Cta>
            <ul style={featList()}>
              <Fi c="green">
                <strong style={{ color: C.white }}>Everything in Pro</strong>
              </Fi>
              <Divider />
              {[
                'SSO / SAML',
                '60–90 day audit logs',
                '99.9% uptime SLA',
                'Data Processing Agreement',
                'SOC 2 compliant',
                'Dedicated support',
                'Custom bandwidth / storage',
                'Custom SLAs',
              ].map((f) => (
                <Fi key={f} c="amber">
                  {f}
                </Fi>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── ROI BANNER ── */}
      <div style={{ maxWidth: 960, margin: '-56px auto 72px', padding: '0 24px', textAlign: 'center' }}>
        <div
          style={{
            background: C.black3,
            border: `1px solid ${C.border}`,
            borderRadius: 10,
            padding: '14px 24px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span style={{ fontSize: 16, fontWeight: 900, color: C.purpleLight }}>1.5 sprints/quarter</span>
          <span style={{ fontSize: 13, color: C.gray }}>
            recovered by teams replacing internal MF tooling with Zephyr — based on customer data.
          </span>
        </div>
      </div>

      {/* ── PRO CALCULATOR ── */}
      <div id="pro-calc" style={{ maxWidth: 960, margin: '0 auto 72px', padding: '0 24px' }}>
        <div
          style={{
            background: 'linear-gradient(160deg,#1A0F3A 0%,#0F0F1A 60%)',
            border: `1px solid ${C.purple}`,
            borderRadius: 14,
            padding: '40px 48px',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 32,
              gap: 24,
              flexWrap: 'wrap',
            }}
          >
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 900, letterSpacing: '-0.4px', color: C.white, marginBottom: 6 }}>
                Pro — see your exact price
              </h3>
              <p style={{ fontSize: 13, color: C.gray, maxWidth: 400, lineHeight: 1.6 }}>
                The more seats you add, the less you pay per seat. Click a tier or drag the slider.
              </p>
            </div>
            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.8px',
                  color: C.purpleLight,
                  marginBottom: 4,
                }}
              >
                {isAnnual ? 'Effective per month (annual)' : 'Total per month'}
              </div>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-1.5px', color: C.white, lineHeight: 1 }}>
                {fmt(moTotal)}
              </div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>
                {isAnnual
                  ? `Billed as ${fmt(yrTotal)}/yr · you save ${fmt(yrSave)}`
                  : `${fmt(yrTotal)}/yr with annual billing — save ${fmt(yrSave)}`}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.grayDark, fontWeight: 500 }}>Seats</span>
              <strong style={{ fontSize: 14, color: C.white, fontWeight: 800 }}>
                {seats} seat{seats !== 1 ? 's' : ''}
              </strong>
            </div>
            <input
              type="range"
              min={2}
              max={75}
              value={seats}
              onChange={(e) => setSeats(parseInt(e.target.value))}
              className="pricing-slider"
              style={{
                width: '100%',
                height: 5,
                borderRadius: 3,
                outline: 'none',
                WebkitAppearance: 'none',
                cursor: 'pointer',
                background: `linear-gradient(to right,${C.purple} 0%,${C.purple} ${sliderPct}%,${C.borderLight} ${sliderPct}%,${C.borderLight} 100%)`,
              }}
            />
          </div>

          {/* Band cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 24 }}>
            {PRO_BANDS.map((band, i) => {
              const dr = isAnnual ? Math.round(band.rate * ANNUAL_DISC) : band.rate;
              const saving = Math.round((1 - band.rate / INTRO_RATE) * 100);
              const active = bandIdx === i;
              return (
                <div
                  key={i}
                  onClick={() => setSeats(band.midpoint)}
                  style={{
                    background: active ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? C.purple : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: active ? '0 0 16px rgba(139,92,246,0.1)' : 'none',
                    borderRadius: 8,
                    padding: '14px 12px',
                    textAlign: 'center',
                    transition: 'all 0.25s',
                    cursor: 'pointer',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      color: active ? C.purpleLight : C.grayDark,
                      marginBottom: 6,
                    }}
                  >
                    {band.label}
                  </div>
                  <div
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      letterSpacing: '-0.8px',
                      color: C.white,
                      lineHeight: 1,
                      marginBottom: 3,
                    }}
                  >
                    {fmt(dr)}
                  </div>
                  <div style={{ fontSize: 10, color: C.grayDark }}>per seat / {isAnnual ? 'mo (annual)' : 'mo'}</div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.green, marginTop: 5, minHeight: 14 }}>
                    {saving === 0 ? 'introductory rate' : `${saving}% less than intro`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: 20,
              borderTop: '1px solid rgba(255,255,255,0.07)',
              flexWrap: 'wrap',
              gap: 12,
            }}
          >
            <div style={{ fontSize: 12, color: C.gray }}>
              Per seat:{' '}
              <strong style={{ color: C.white }}>
                {fmt(effRate)}
                {isAnnual ? ` (was ${fmt(rate)})` : ''}
              </strong>
            </div>
            <div style={{ fontSize: 12, color: C.gray }}>
              Monthly: <strong style={{ color: C.white }}>{fmt(moTotal)}</strong>
            </div>
            <div style={{ fontSize: 12, color: C.gray }}>
              Annual: <strong style={{ color: C.white }}>{fmt(yrTotal)}</strong>
              <span
                style={{
                  display: 'inline-block',
                  background: C.greenDim,
                  color: C.green,
                  fontSize: 11,
                  fontWeight: 700,
                  padding: '2px 8px',
                  borderRadius: 6,
                  marginLeft: 6,
                }}
              >
                Save {fmt(yrSave)}
              </span>
            </div>
            <div style={{ fontSize: 12, color: C.gray }}>
              Need 76+ seats?{' '}
              <a
                href="mailto:inbound@zephyr-cloud.io?subject=Enterprise"
                style={{ color: C.purpleLight, textDecoration: 'none', fontWeight: 700 }}
              >
                Talk to sales
              </a>{' '}
              — volume rates, quoted same day.
            </div>
          </div>
        </div>
      </div>

      {/* ── PROOF BAR ── */}
      <div
        style={{
          borderTop: `1px solid ${C.border}`,
          borderBottom: `1px solid ${C.border}`,
          padding: '20px 40px',
          display: 'flex',
          justifyContent: 'center',
          gap: 48,
          flexWrap: 'wrap',
          marginBottom: 80,
        }}
      >
        {[
          { n: '6', s: ',213', l: 'Monthly active users' },
          { n: '15', s: '+', l: 'Bundler integrations' },
          { n: '6', s: '+', l: 'Cloud integrations' },
          { n: '15', s: '+', l: 'Countries' },
          { n: 'SOC', s: ' 2', l: 'Compliant' },
        ].map((s) => (
          <div key={s.l} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.8px', color: C.white, lineHeight: 1 }}>
              {s.n}
              <span style={{ color: C.purpleLight }}>{s.s}</span>
            </div>
            <div style={{ fontSize: 11, color: C.grayDark, marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ maxWidth: 960, margin: '0 auto 80px', padding: '0 24px' }}>
        <div
          style={{
            background: C.black2,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: '32px 40px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div>
            <p style={{ fontSize: 16, fontWeight: 600, color: C.white, lineHeight: 1.6, fontStyle: 'italic' }}>
              <span style={{ color: C.purpleLight, fontSize: 24, lineHeight: 0, verticalAlign: -6, marginRight: 4 }}>
                "
              </span>
              Zephyr gave us the deployment orchestration layer we'd been trying to build internally for two years. We
              stopped writing tooling and started shipping product.
              <span style={{ color: C.purpleLight, fontSize: 24, lineHeight: 0, verticalAlign: -6, marginLeft: 4 }}>
                "
              </span>
            </p>
            <p style={{ fontSize: 12, color: C.grayDark, marginTop: 10 }}>
              Engineering leadership ·{' '}
              <strong style={{ color: C.gray, fontWeight: 600 }}>Southern Glazer's Wine &amp; Spirits</strong>
            </p>
          </div>
          <div
            style={{
              textAlign: 'right',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '1px',
              color: C.grayDark,
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                display: 'block',
                fontSize: 18,
                fontWeight: 900,
                color: C.white,
                letterSpacing: '-0.5px',
                marginBottom: 4,
              }}
            >
              Southern
              <br />
              Glazer's
            </span>
            Enterprise customer
          </div>
        </div>
        <div
          style={{
            background: C.black2,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: '28px 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div style={{ paddingRight: 32, borderRight: `1px solid ${C.border}` }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: C.purpleLight,
                marginBottom: 8,
              }}
            >
              Teams using Zephyr report
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', color: C.white, lineHeight: 1 }}>
              1.5 sprints
            </div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>
              recovered per quarter by eliminating internal MF tooling
            </div>
          </div>
          <div style={{ paddingLeft: 32 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: C.purpleLight,
                marginBottom: 8,
              }}
            >
              Average time to first deploy
            </div>
            <div style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-1px', color: C.white, lineHeight: 1 }}>
              &lt; 15 min
            </div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4 }}>
              from signup to first cloud deployment — no infrastructure migration required
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE TABLE ── */}
      <section style={{ maxWidth: 960, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.6px', marginBottom: 8 }}>
            Everything in the platform
          </h2>
          <p style={{ fontSize: 14, color: C.gray }}>Every feature, every tier.</p>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr>
              {[
                ['Feature', 'left', C.grayDark, '40%'],
                ['Free', 'center', C.grayDark],
                ['Pro', 'center', C.purpleLight],
                ['Enterprise', 'center', C.grayDark],
              ].map(([label, align, color, w]) => (
                <th
                  key={label as string}
                  style={{
                    padding: '10px 16px',
                    fontSize: 10,
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: color as string,
                    textAlign: align as 'left' | 'center',
                    borderBottom: `1px solid ${C.border}`,
                    width: w as string | undefined,
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(
              [
                { g: 'Deployment' },
                { f: 'Cloud integrations', fr: '1', pr: 'All', en: 'All' },
                { f: 'Bundler plugins (15)', fr: '✓', pr: '✓', en: '✓' },
                { f: 'BYOC', fr: '—', pr: '✓', en: '✓' },
                { f: 'Instant rollbacks', fr: '—', pr: '✓', en: '✓' },
                { f: 'Tag / branch env', fr: '✓', pr: '✓', en: '✓' },
                { f: 'Version history', fr: 'Limited', pr: '✓', en: 'Custom' },
                { g: 'Module Federation Native', mfg: true },
                { f: 'Environment Overrides', fr: '—', pr: '✓', en: '✓', mf: true },
                { f: 'Env Variables (no redeploy)', fr: '—', pr: '✓', en: '✓' },
                { f: 'Zephyr DevTools', fr: '—', pr: '✓', en: '✓', mf: true },
                { f: 'UML architecture map', fr: '—', pr: '✓', en: '✓', mf: true },
                { f: 'zephyr.dependencies', fr: '—', pr: '✓', en: '✓', mf: true },
                { g: 'Teams & Access' },
                { f: 'Collaborators', fr: '—', pr: 'Up to 75', en: 'Unlimited' },
                { f: 'Per-team permissions', fr: '—', pr: '✓', en: '✓' },
                { f: 'SSO / SAML', fr: '—', pr: '—', en: '✓' },
                { g: 'Security & Compliance' },
                { f: 'Activity log', fr: '—', pr: '✓', en: '✓' },
                { f: 'Audit log retention', fr: '—', pr: '30 days', en: '60–90 days' },
                { f: 'SOC 2 compliance', fr: '—', pr: '—', en: '✓' },
                { f: 'DPA', fr: '—', pr: '—', en: '✓' },
                { f: 'Uptime SLA', fr: '—', pr: '—', en: '99.9%' },
              ] as Array<{ g?: string; mfg?: boolean; f?: string; fr?: string; pr?: string; en?: string; mf?: boolean }>
            ).map((row, i) => {
              if (row.g)
                return (
                  <tr key={i}>
                    <td
                      colSpan={4}
                      style={{
                        background: C.black3,
                        color: C.grayDark,
                        fontSize: 10,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        padding: '8px 16px',
                        borderTop: `1px solid ${C.border}`,
                      }}
                    >
                      {row.g}
                      {row.mfg && (
                        <span style={{ marginLeft: 6 }}>
                          <MfTag />
                        </span>
                      )}
                    </td>
                  </tr>
                );
              const cell = (val = '', isP = false) => {
                const color =
                  val === '✓'
                    ? C.green
                    : val === '—'
                      ? C.borderLight
                      : val === 'Limited'
                        ? C.grayDark
                        : val === 'Custom' || val === 'Unlimited'
                          ? C.purpleLight
                          : C.gray;
                return (
                  <td
                    style={{
                      padding: '11px 16px',
                      borderBottom: `1px solid ${C.border}`,
                      textAlign: 'center',
                      color,
                      background: isP ? 'rgba(139,92,246,0.04)' : 'transparent',
                      fontSize: val === '✓' || val === '—' ? 14 : 11,
                      fontWeight: val === 'Limited' || val === 'Custom' ? 700 : 400,
                    }}
                  >
                    {val}
                  </td>
                );
              };
              return (
                <tr key={i} className={cn(path === 'nonmf' && row.mf && 'opacity-40')}>
                  <td
                    style={{
                      padding: '11px 16px',
                      borderBottom: `1px solid ${C.border}`,
                      color: C.white,
                      fontWeight: 500,
                    }}
                  >
                    {row.f}
                    {row.mf && (
                      <span style={{ marginLeft: 6 }}>
                        <MfTag />
                      </span>
                    )}
                  </td>
                  {cell(row.fr)}
                  {cell(row.pr, true)}
                  {cell(row.en)}
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* ── FAQ ── */}
      <section style={{ maxWidth: 680, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.6px' }}>Common questions</h2>
        </div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: `1px solid ${C.border}` }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{
                width: '100%',
                background: 'none',
                border: 'none',
                color: C.white,
                fontFamily: 'inherit',
                fontSize: 14,
                fontWeight: 600,
                textAlign: 'left',
                padding: '18px 0',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
              }}
            >
              {faq.q}
              <span
                style={{
                  color: openFaq === i ? C.purpleLight : C.grayDark,
                  fontSize: 18,
                  flexShrink: 0,
                  transition: 'transform 0.2s',
                  display: 'inline-block',
                  transform: openFaq === i ? 'rotate(45deg)' : 'none',
                }}
              >
                +
              </span>
            </button>
            {openFaq === i && (
              <div style={{ fontSize: 13, color: C.gray, lineHeight: 1.75, paddingBottom: 18 }}>{faq.a}</div>
            )}
          </div>
        ))}
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ textAlign: 'center', padding: '80px 40px 100px', borderTop: `1px solid ${C.border}` }}>
        <h2 style={{ fontSize: 40, fontWeight: 900, letterSpacing: '-1px', lineHeight: 1.1, marginBottom: 14 }}>
          Start free.
          <br />
          <span style={{ color: C.purpleLight }}>No cliff. No lock-in.</span>
        </h2>
        <p style={{ fontSize: 16, color: C.gray, marginBottom: 32 }}>
          One cloud integration free, forever. Upgrade when your team is ready.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
          <a
            href="https://app.zephyr-cloud.io/"
            target="_blank"
            style={{
              background: C.purple,
              color: 'white',
              fontSize: 14,
              fontWeight: 700,
              padding: '14px 32px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Start for free
          </a>
          <a
            href="mailto:inbound@zephyr-cloud.io?subject=Sales"
            target="_blank"
            style={{
              background: 'transparent',
              border: `1px solid ${C.borderLight}`,
              color: C.white,
              fontSize: 14,
              fontWeight: 600,
              padding: '14px 32px',
              borderRadius: 8,
              textDecoration: 'none',
            }}
          >
            Talk to sales
          </a>
        </div>
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {[
            'No credit card required',
            'Cancel anytime',
            'BYOC — your data stays in your cloud',
            'Invoice billing available',
            'Export your data anytime',
          ].map((t) => (
            <span key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: C.grayDark }}>
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: C.green,
                  flexShrink: 0,
                  display: 'inline-block',
                }}
              />
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Slider thumb styles */}
      <style>{`
        .pricing-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:${C.purple}; cursor:pointer; box-shadow:0 0 0 4px rgba(139,92,246,0.2); border:2px solid ${C.white}; }
        .pricing-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:${C.purple}; cursor:pointer; border:2px solid ${C.white}; }
      `}</style>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
const card = () => ({
  background: C.black2,
  border: `1px solid ${C.border}`,
  borderRadius: 14,
  padding: '32px 28px',
  position: 'relative' as const,
});
const amt = () => ({ fontSize: 48, fontWeight: 900, letterSpacing: '-2px', color: C.white, lineHeight: 1 });
const desc = () => ({ fontSize: 13, color: C.gray, lineHeight: 1.65, marginBottom: 24 });
const featList = () => ({
  listStyle: 'none' as const,
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 10,
});

function TierName({ children, purple }: { children: React.ReactNode; purple?: boolean }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: purple ? C.purpleLight : C.grayDark,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}
function TierSeats({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        fontSize: 12,
        color: C.grayDark,
        paddingBottom: 18,
        marginBottom: 18,
        borderBottom: `1px solid ${C.border}`,
      }}
    >
      {children}
    </div>
  );
}
function Cta({ href, children, v }: { href: string; children: React.ReactNode; v: 'primary' | 'secondary' }) {
  return (
    <a
      href={href}
      target="_blank"
      style={{
        display: 'block',
        width: '100%',
        textAlign: 'center',
        padding: '12px 20px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 700,
        textDecoration: 'none',
        marginBottom: 24,
        transition: 'all 0.2s',
        ...(v === 'primary'
          ? { background: C.purple, color: 'white' }
          : { background: 'transparent', border: `1px solid ${C.borderLight}`, color: C.white }),
      }}
    >
      {children}
    </a>
  );
}
function Fi({ children, c, dim }: { children: React.ReactNode; c: 'green' | 'purple' | 'amber'; dim?: boolean }) {
  const ic = c === 'green' ? C.green : c === 'purple' ? C.purpleLight : C.amber;
  return (
    <li
      style={{
        fontSize: 13,
        color: C.gray,
        display: 'flex',
        alignItems: 'flex-start',
        gap: 9,
        lineHeight: 1.45,
        opacity: dim ? 0.4 : 1,
      }}
    >
      <span style={{ color: ic, fontSize: 12, marginTop: 1, flexShrink: 0 }}>✓</span>
      {children}
    </li>
  );
}
function Divider() {
  return (
    <li>
      <hr style={{ border: 'none', borderTop: `1px dashed ${C.border}`, margin: '6px 0' }} />
    </li>
  );
}
function MfTag() {
  return (
    <span
      style={{
        background: C.purpleDim,
        color: C.purpleLight,
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        padding: '1px 5px',
        borderRadius: 3,
        marginLeft: 4,
        verticalAlign: 'middle',
      }}
    >
      MF
    </span>
  );
}
