import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { type ReactNode, useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

// ── Design tokens ──────────────────────────────────────────────────────────────
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
  amberDim: '#2A1F08',
} as const;

// ── Volume bands ───────────────────────────────────────────────────────────────
const PRO_BANDS = [
  { min: 2, max: 10, rate: 39, midpoint: 6, label: '2 – 10 seats' },
  { min: 11, max: 25, rate: 32, midpoint: 18, label: '11 – 25 seats' },
  { min: 26, max: 50, rate: 27, midpoint: 38, label: '26 – 50 seats' },
  { min: 51, max: 75, rate: 24, midpoint: 63, label: '51 – 75 seats' },
];
const BIZ_BANDS = [
  { min: 2, max: 25, rate: 99, midpoint: 14, label: '2 – 25 seats' },
  { min: 26, max: 75, rate: 82, midpoint: 50, label: '26 – 75 seats' },
  { min: 76, max: 150, rate: 69, midpoint: 113, label: '76 – 150 seats' },
  { min: 151, max: 200, rate: 59, midpoint: 175, label: '151 – 200 seats' },
];
const PRO_INTRO = PRO_BANDS[0].rate;
const BIZ_INTRO = BIZ_BANDS[0].rate;
const ANNUAL_DISC = 0.85;

function getProRate(s: number) {
  return PRO_BANDS.find((b) => s >= b.min && s <= b.max)?.rate ?? 24;
}
function getBizRate(s: number) {
  return BIZ_BANDS.find((b) => s >= b.min && s <= b.max)?.rate ?? 34;
}
function getProBandIdx(s: number) {
  return PRO_BANDS.findIndex((b) => s >= b.min && s <= b.max);
}
function getBizBandIdx(s: number) {
  return BIZ_BANDS.findIndex((b) => s >= b.min && s <= b.max);
}
function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

// ── Page ───────────────────────────────────────────────────────────────────────
function PricingPage() {
  const [billing, setBilling] = useState<'monthly' | 'annual'>('monthly');
  const [path, setPath] = useState<'mf' | 'nonmf' | null>(null);
  const [proSeats, setProSeats] = useState(6);
  const [bizSeats, setBizSeats] = useState(14);
  const [calcTab, setCalcTab] = useState<'pro' | 'biz'>('pro');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const billingRef = useRef<HTMLDivElement>(null);
  const tiersRef = useRef<HTMLElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const isAnnual = billing === 'annual';

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get('for');
    if (p === 'mf') setPath('mf');
    else if (p === 'teams' || p === 'nonmf') setPath('nonmf');
  }, []);

  function selectPath(p: 'mf' | 'nonmf') {
    setPath(p);
    setTimeout(() => panelsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50);
  }

  // Pro calc
  const proRate = getProRate(proSeats);
  const proEffRate = isAnnual ? Math.round(proRate * ANNUAL_DISC * 100) / 100 : proRate;
  const proMonthly = Math.round(proSeats * proEffRate);
  const proYearly = Math.round(proSeats * proRate * 12 * ANNUAL_DISC);
  const proSave = Math.round(proSeats * proRate * 12 - proYearly);
  const proBandIdx = getProBandIdx(proSeats);
  const proSliderPct = ((proSeats - 2) / 73) * 100;

  // Business calc
  const bizRate = getBizRate(bizSeats);
  const bizEffRate = isAnnual ? Math.round(bizRate * ANNUAL_DISC * 100) / 100 : bizRate;
  const bizMonthly = Math.round(bizSeats * bizEffRate);
  const bizYearly = Math.round(bizSeats * bizRate * 12 * ANNUAL_DISC);
  const bizSave = Math.round(bizSeats * bizRate * 12 - bizYearly);
  const bizBandIdx = getBizBandIdx(bizSeats);
  const bizSliderPct = ((bizSeats - 2) / 198) * 100;

  const faqs = [
    {
      q: 'Do I need Module Federation to get value from Zephyr?',
      a: 'No. BYOC, instant rollbacks, and environment variables without redeploying are available on Teams — none of them require Module Federation. MF-native features are additive. Many teams start without MF and adopt it later.',
    },
    {
      q: 'How does Teams pricing work?',
      a: "Teams starts at $39/seat for 2–10 seats. At 11–25 seats the rate drops to $32/seat. At 26–50 it's $27/seat. At 51–75 it's $24/seat — 38% less than the intro rate. Use the calculator to see your exact price.",
    },
    {
      q: 'How does Business pricing work?',
      a: 'Business starts at $52/seat for 2–25 seats, dropping to $45/seat at 26–75, $38/seat at 76–150, and $34/seat at 151–200. It includes everything in Pro plus SSO/SAML, advanced roles, approval workflows, webhook integrations, 90-day audit logs, and a 99.9% uptime SLA.',
    },
    {
      q: 'When should I upgrade from Teams to Business?',
      a: 'Upgrade to Business when you need SSO for your identity provider, SLA guarantees, advanced access controls, or 90-day audit retention. Most teams make the switch when IT or compliance asks for SSO, or when deployment approval workflows become a requirement.',
    },
    {
      q: 'What is BYOC — and what does it mean for our data?',
      a: 'Bring Your Own Cloud. Deployments go to your own infrastructure — Cloudflare, AWS, Fastly, Akamai, or Vercel. Your data never leaves your cloud. BYOC is available on all plans including Free. This answers most data residency and DPA questions before your security team asks them.',
    },
    {
      q: 'Are there overage charges for bandwidth or storage?',
      a: "Teams includes 1.5TB bandwidth and 500GB storage. We'll reach out before charging anything — no automatic overage fees. Business and Enterprise limits are agreed upfront so procurement always knows the ceiling.",
    },
    {
      q: 'Can we pay by invoice or purchase order?',
      a: "Yes. Business and Enterprise invoicing and PO billing are standard. Teams is credit card monthly or annually. If procurement requires an invoice for Teams, contact sales and we'll accommodate it.",
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
      a: 'Yes — 15% off Teams and Business when billed annually. Toggle above to see annual pricing reflected live in the calculator.',
    },
  ];

  return (
    <div style={{ background: C.black, color: C.white, lineHeight: 1.6 }}>
      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '40px 40px 20px', maxWidth: 760, margin: '0 auto' }}>
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
            marginBottom: 14,
          }}
        >
          ● Pricing
        </div>
        <h1
          style={{
            fontSize: 'clamp(26px, 4vw, 40px)',
            fontWeight: 900,
            letterSpacing: '-1.5px',
            lineHeight: 1.08,
            marginBottom: 10,
          }}
        >
          Pricing that scales with your team
        </h1>
        <p style={{ fontSize: 14, color: C.gray, maxWidth: 520, margin: '0 auto 0', lineHeight: 1.65 }}>
          Start free and scale as you grow.
        </p>
      </section>

      {/* ── FEATURE BAR ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          flexWrap: 'nowrap',
          background: 'linear-gradient(135deg, #1A0F3A 0%, #0F0F1A 100%)',
          borderTop: `1px solid rgba(139,92,246,0.2)`,
          borderBottom: `1px solid rgba(139,92,246,0.2)`,
          padding: '16px 40px',
          width: '100%',
        }}
      >
        {(
          [
            { icon: '∞', label: 'No build minutes' },
            { icon: '⚡', label: 'Sub-second deployments' },
            { icon: '☁', label: 'Bring Your Own Cloud (BYOC)' },
            { icon: '✦', label: 'Unlimited preview environments' },
          ] as { icon: string; label: string }[]
        ).map(({ icon, label }) => (
          <span
            key={label}
            style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.gray, whiteSpace: 'nowrap' }}
          >
            <span style={{ color: C.purpleLight, fontSize: 15 }}>{icon}</span>
            {label}
          </span>
        ))}
      </div>

      {/* ── PATH SELECTOR ── */}
      <div style={{ textAlign: 'center', padding: '20px 40px', maxWidth: 760, margin: '0 auto' }}>
        {/* Path selector */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 16 }}>
          {(
            [
              {
                id: 'mf',
                icon: '⚡',
                title: 'We use Module Federation',
                sub: "We're running MF and need a deployment platform built around it.",
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
              <button
                key={id}
                onClick={() => selectPath(id)}
                style={{
                  background: active ? (isMf ? 'rgba(139,92,246,0.12)' : 'rgba(16,185,129,0.1)') : C.black2,
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
                    ? `0 0 0 1px ${activeColor}, 0 8px 32px ${isMf ? 'rgba(139,92,246,0.2)' : 'rgba(16,185,129,0.15)'}`
                    : 'none',
                  transform: active ? 'translateY(-2px)' : 'none',
                  fontFamily: 'inherit',
                  color: C.white,
                }}
              >
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 22,
                      height: 22,
                      borderRadius: '50%',
                      background: activeColor,
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 11,
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
              </button>
            );
          })}
        </div>
        {!path && (
          <p style={{ fontSize: 12, color: C.grayDark }}>
            Select your situation to see what matters most to your team.
          </p>
        )}
      </div>

      {/* ── VALUE PANELS ── */}
      <div ref={panelsRef}>
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
                  <h2
                    style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.6px', lineHeight: 1.2, color: C.white }}
                  >
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
                <div className="value-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
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
      </div>

      {/* ── BILLING TOGGLE ── */}
      <div ref={billingRef} style={{ textAlign: 'center', padding: '0 24px 24px' }}>
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
      <section ref={tiersRef} id="tiers" style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {/* FREE */}
          <div style={card()}>
            <TierName>Free</TierName>
            <div style={amt()}>$0</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>forever</div>
            <TierSeats>1 seat · no credit card required</TierSeats>
            <p style={desc()}>
              For individuals exploring Zephyr. Full BYOC, all bundlers, and tag-based environments — free forever.
            </p>
            <Cta href="https://app.zephyr-cloud.io/" v="secondary">
              Get started free
            </Cta>
            <ul style={featList()}>
              {[
                'BYOC — bring your own cloud',
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
            <TierName purple>Teams</TierName>
            <div style={{ fontSize: 13, color: C.grayDark, fontWeight: 500, marginBottom: 2 }}>starting at</div>
            <div style={amt()}>{isAnnual ? fmt(Math.round(PRO_INTRO * ANNUAL_DISC)) : fmt(PRO_INTRO)}</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>
              per seat / month ·{' '}
              <a href="#calc" style={{ color: C.purpleLight, textDecoration: 'none', fontWeight: 600 }}>
                use the calculator ↓
              </a>
            </div>
            <TierSeats>2 – 75 seats · costs decrease as your team scales</TierSeats>
            <p style={desc()}>
              The full deployment platform. MF-native features, BYOC, per-team permissions, and audit logs — everything
              a shipping team needs.
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
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              No credit card required · full Pro access
            </div>
            <ul style={featList()}>
              <Fi c="green">
                <strong style={{ color: C.white }}>BYOC</strong> — all cloud integrations
              </Fi>
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
              <Fi c="green">30-day audit logs</Fi>
              <Fi c="green">Up to 75 collaborators</Fi>
            </ul>
          </div>

          {/* BUSINESS */}
          <div
            style={{
              ...card(),
              background: 'linear-gradient(160deg,#2A1F08 0%,#0F0F1A 60%)',
              border: `1px solid ${C.amber}`,
              boxShadow: '0 0 48px rgba(232,168,48,0.1)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -12,
                left: '50%',
                transform: 'translateX(-50%)',
                background: C.amber,
                color: '#0A0A0F',
                fontSize: 10,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                padding: '4px 14px',
                borderRadius: 10,
                whiteSpace: 'nowrap',
              }}
            >
              For Growing Teams
            </div>
            <TierName amber>Business</TierName>
            <div style={{ fontSize: 13, color: C.grayDark, fontWeight: 500, marginBottom: 2 }}>starting at</div>
            <div style={amt()}>{isAnnual ? fmt(Math.round(BIZ_INTRO * ANNUAL_DISC)) : fmt(BIZ_INTRO)}</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>
              per seat / month ·{' '}
              <a
                href="#calc"
                onClick={() => setCalcTab('biz')}
                style={{ color: C.amber, textDecoration: 'none', fontWeight: 600 }}
              >
                use the calculator ↓
              </a>
            </div>
            <TierSeats>2 – 200 seats · SSO, SLAs, and governance included</TierSeats>
            <p style={desc()}>
              For teams that need SSO, approval workflows, and SLA guarantees. The governance layer between Pro and
              Enterprise — without the Enterprise price tag.
            </p>
            <Cta href="https://app.zephyr-cloud.io/" v="amber">
              Start free 30-day trial
            </Cta>
            <div
              style={{
                fontSize: 11,
                color: C.grayDark,
                textAlign: 'center',
                marginTop: -16,
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              No credit card required · full Business access
            </div>
            <ul style={featList()}>
              <Fi c="amber">
                <strong style={{ color: C.white }}>Everything in Teams</strong>
              </Fi>
              <Divider />
              <Fi c="amber">SSO / SAML</Fi>
              <Fi c="amber">Advanced roles &amp; permissions</Fi>
              <Fi c="amber">Deployment approval workflows</Fi>
              <Fi c="amber">Webhook integrations</Fi>
              <Fi c="amber">90-day audit logs</Fi>
              <Fi c="amber">99.9% uptime SLA</Fi>
              <Fi c="amber">Priority support</Fi>
              <Fi c="amber">Up to 200 collaborators</Fi>
            </ul>
          </div>

          {/* ENTERPRISE */}
          <div style={card()}>
            <TierName>Enterprise</TierName>
            <div style={amt()}>Custom</div>
            <div style={{ fontSize: 13, color: C.gray, marginTop: 4, marginBottom: 6 }}>&nbsp;</div>
            <TierSeats>200+ seats · no RFP required · quote same day</TierSeats>
            <p style={desc()}>
              For large orgs and regulated sectors. SOC 2, DPA, dedicated CSM, and custom SLAs. Pay by invoice. POC /
              pilot available.
            </p>
            <Cta href="mailto:inbound@zephyr-cloud.io?subject=Enterprise" v="secondary">
              Talk to sales
            </Cta>
            <ul style={featList()}>
              <Fi c="green">
                <strong style={{ color: C.white }}>Everything in Business</strong>
              </Fi>
              <Divider />
              {[
                'SOC 2 Type II compliance',
                'Data Processing Agreement',
                'Dedicated CSM',
                'Custom SLA (99.99%)',
                'Negotiated contracts',
                'Invoice / PO billing',
                'White-glove onboarding',
                'Custom bandwidth / storage',
                'Unlimited collaborators',
              ].map((f) => (
                <Fi key={f} c="green">
                  {f}
                </Fi>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── ROI BANNER ── */}
      <div style={{ maxWidth: 1160, margin: '-56px auto 72px', padding: '0 24px', textAlign: 'center' }}>
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

      {/* ── CALCULATOR ── */}
      <div id="calc" style={{ maxWidth: 960, margin: '0 auto 72px', padding: '0 24px' }}>
        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            borderRadius: '14px 14px 0 0',
            overflow: 'hidden',
            border: `1px solid ${calcTab === 'pro' ? C.purple : C.amber}`,
            borderBottom: 'none',
          }}
        >
          {(
            [
              {
                id: 'pro',
                label: 'Teams Calculator',
                color: C.purple,
                activeBg: 'linear-gradient(160deg,#1A0F3A 0%,#0F0F1A 60%)',
              },
              {
                id: 'biz',
                label: 'Business Calculator',
                color: C.amber,
                activeBg: 'linear-gradient(160deg,#2A1F08 0%,#0F0F1A 60%)',
              },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setCalcTab(tab.id)}
              style={{
                flex: 1,
                padding: '12px 20px',
                background: calcTab === tab.id ? tab.activeBg : C.black3,
                border: 'none',
                color: calcTab === tab.id ? tab.color : C.grayDark,
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.2s',
                letterSpacing: '0.3px',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Calc body */}
        <div
          style={{
            background:
              calcTab === 'pro'
                ? 'linear-gradient(160deg,#1A0F3A 0%,#0F0F1A 60%)'
                : 'linear-gradient(160deg,#2A1F08 0%,#0F0F1A 60%)',
            border: `1px solid ${calcTab === 'pro' ? C.purple : C.amber}`,
            borderRadius: '0 0 14px 14px',
            padding: '40px 48px',
            transition: 'background 0.3s, border-color 0.3s',
          }}
        >
          <div
            className="calc-header"
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
                {calcTab === 'pro' ? 'Teams' : 'Business'} — see your exact price
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
                  color: calcTab === 'pro' ? C.purpleLight : C.amber,
                  marginBottom: 4,
                }}
              >
                {isAnnual ? 'Effective per month (annual)' : 'Total per month'}
              </div>
              <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: '-1.5px', color: C.white, lineHeight: 1 }}>
                {fmt(calcTab === 'pro' ? proMonthly : bizMonthly)}
              </div>
              <div style={{ fontSize: 12, color: C.gray, marginTop: 4 }}>
                {isAnnual
                  ? `Billed as ${fmt(calcTab === 'pro' ? proYearly : bizYearly)}/yr · you save ${fmt(calcTab === 'pro' ? proSave : bizSave)}`
                  : `${fmt(calcTab === 'pro' ? proYearly : bizYearly)}/yr with annual — save ${fmt(calcTab === 'pro' ? proSave : bizSave)}`}
              </div>
            </div>
          </div>

          {/* Slider */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.grayDark, fontWeight: 500 }}>Seats</span>
              <strong style={{ fontSize: 14, color: C.white, fontWeight: 800 }}>
                {calcTab === 'pro' ? proSeats : bizSeats} seats
              </strong>
            </div>
            <input
              type="range"
              min={2}
              max={calcTab === 'pro' ? 75 : 200}
              value={calcTab === 'pro' ? proSeats : bizSeats}
              onChange={(e) =>
                calcTab === 'pro' ? setProSeats(parseInt(e.target.value)) : setBizSeats(parseInt(e.target.value))
              }
              className={calcTab === 'pro' ? 'pricing-slider' : 'pricing-slider-biz'}
              style={{
                width: '100%',
                height: 5,
                borderRadius: 3,
                outline: 'none',
                WebkitAppearance: 'none',
                cursor: 'pointer',
                background: `linear-gradient(to right,${calcTab === 'pro' ? C.purple : C.amber} 0%,${calcTab === 'pro' ? C.purple : C.amber} ${calcTab === 'pro' ? proSliderPct : bizSliderPct}%,${C.borderLight} ${calcTab === 'pro' ? proSliderPct : bizSliderPct}%,${C.borderLight} 100%)`,
              }}
            />
          </div>

          {/* Band cards */}
          <div
            className="band-grid"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 24 }}
          >
            {(calcTab === 'pro' ? PRO_BANDS : BIZ_BANDS).map((band, i) => {
              const acColor = calcTab === 'pro' ? C.purple : C.amber;
              const introRate = calcTab === 'pro' ? PRO_INTRO : BIZ_INTRO;
              const dr = isAnnual ? Math.round(band.rate * ANNUAL_DISC) : band.rate;
              const saving = Math.round((1 - band.rate / introRate) * 100);
              const active = calcTab === 'pro' ? proBandIdx === i : bizBandIdx === i;
              const rgbActive = calcTab === 'pro' ? '139,92,246' : '232,168,48';
              return (
                <div
                  key={i}
                  onClick={() => (calcTab === 'pro' ? setProSeats(band.midpoint) : setBizSeats(band.midpoint))}
                  style={{
                    background: active ? `rgba(${rgbActive},0.15)` : 'rgba(255,255,255,0.04)',
                    border: `1px solid ${active ? acColor : 'rgba(255,255,255,0.06)'}`,
                    boxShadow: active ? `0 0 16px rgba(${rgbActive},0.1)` : 'none',
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
                      color: active ? acColor : C.grayDark,
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

          {/* Meta row */}
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
                {fmt(calcTab === 'pro' ? proEffRate : bizEffRate)}
                {isAnnual ? ` (was ${fmt(calcTab === 'pro' ? proRate : bizRate)})` : ''}
              </strong>
            </div>
            <div style={{ fontSize: 12, color: C.gray }}>
              Monthly: <strong style={{ color: C.white }}>{fmt(calcTab === 'pro' ? proMonthly : bizMonthly)}</strong>
            </div>
            <div style={{ fontSize: 12, color: C.gray }}>
              Annual: <strong style={{ color: C.white }}>{fmt(calcTab === 'pro' ? proYearly : bizYearly)}</strong>
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
                Save {fmt(calcTab === 'pro' ? proSave : bizSave)}
              </span>
            </div>
            <div style={{ fontSize: 12, color: C.gray }}>
              {calcTab === 'pro' ? (
                <>
                  Need governance or SSO?{' '}
                  <button
                    onClick={() => setCalcTab('biz')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: C.purpleLight,
                      fontWeight: 700,
                      cursor: 'pointer',
                      fontSize: 12,
                      fontFamily: 'inherit',
                      padding: 0,
                    }}
                  >
                    See Business pricing ↑
                  </button>
                </>
              ) : (
                <>
                  Need 200+ seats?{' '}
                  <a
                    href="mailto:inbound@zephyr-cloud.io?subject=Enterprise"
                    style={{ color: C.amber, textDecoration: 'none', fontWeight: 700 }}
                  >
                    Talk to sales
                  </a>{' '}
                  — quoted same day.
                </>
              )}
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
          { n: '< 15', s: ' min', l: 'Avg. time to first deploy' },
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
          className="stats-grid"
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
      <section style={{ maxWidth: 1160, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.6px', marginBottom: 8 }}>
            Everything in the platform
          </h2>
          <p style={{ fontSize: 14, color: C.gray }}>Every feature, every tier.</p>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 680 }}>
            <thead>
              <tr>
                {(
                  [
                    ['Feature', 'left', C.grayDark, '28%'],
                    ['Free', 'center', C.grayDark, undefined],
                    ['Teams', 'center', C.purpleLight, undefined],
                    ['Business', 'center', C.amber, undefined],
                    ['Enterprise', 'center', C.grayDark, undefined],
                  ] as [string, string, string, string | undefined][]
                ).map(([label, align, color, w]) => (
                  <th
                    key={label}
                    style={{
                      padding: '10px 16px',
                      fontSize: 10,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.8px',
                      color,
                      textAlign: align as 'left' | 'center',
                      borderBottom: `1px solid ${C.border}`,
                      width: w,
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
                  { f: 'Cloud integrations', fr: '1', pr: 'All', bz: 'All', en: 'All' },
                  { f: 'Bundler plugins (15)', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'BYOC', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Instant rollbacks', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Tag / branch env', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Version history', fr: 'Limited', pr: '✓', bz: '✓', en: 'Custom' },
                  { g: 'Module Federation Native', mfg: true },
                  { f: 'Environment Overrides', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'Env Variables (no redeploy)', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Zephyr DevTools', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'UML architecture map', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'zephyr.dependencies', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { g: 'Teams & Access' },
                  { f: 'Collaborators', fr: '—', pr: 'Up to 75', bz: 'Up to 200', en: 'Unlimited' },
                  { f: 'Per-team permissions', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Advanced roles', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'SSO / SAML', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Approval workflows', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Webhook integrations', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { g: 'Security & Compliance' },
                  { f: 'Activity log', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Audit log retention', fr: '—', pr: '30 days', bz: '90 days', en: 'Custom' },
                  { f: 'Uptime SLA', fr: '—', pr: '—', bz: '99.9%', en: '99.99%' },
                  { f: 'SOC 2 compliance', fr: '—', pr: '—', bz: '—', en: '✓' },
                  { f: 'DPA', fr: '—', pr: '—', bz: '—', en: '✓' },
                  { g: 'Support' },
                  { f: 'Community support', fr: '✓', pr: '—', bz: '—', en: '—' },
                  { f: 'Email support', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Priority support', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Dedicated CSM', fr: '—', pr: '—', bz: '—', en: '✓' },
                ] as Array<{
                  g?: string;
                  mfg?: boolean;
                  f?: string;
                  fr?: string;
                  pr?: string;
                  bz?: string;
                  en?: string;
                  mf?: boolean;
                }>
              ).map((row, i) => {
                if (row.g)
                  return (
                    <tr key={i}>
                      <td
                        colSpan={5}
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
                const cell = (val = '', hl?: 'pro' | 'biz') => {
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
                        background:
                          hl === 'pro'
                            ? 'rgba(139,92,246,0.04)'
                            : hl === 'biz'
                              ? 'rgba(232,168,48,0.04)'
                              : 'transparent',
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
                    {cell(row.pr, 'pro')}
                    {cell(row.bz, 'biz')}
                    {cell(row.en)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
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

      {/* Slider + responsive styles */}
      <style>{`
        .pricing-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:${C.purple}; cursor:pointer; box-shadow:0 0 0 4px rgba(139,92,246,0.2); border:2px solid ${C.white}; }
        .pricing-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:${C.purple}; cursor:pointer; border:2px solid ${C.white}; }
        .pricing-slider-biz::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:${C.amber}; cursor:pointer; box-shadow:0 0 0 4px rgba(232,168,48,0.2); border:2px solid ${C.white}; }
        .pricing-slider-biz::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:${C.amber}; cursor:pointer; border:2px solid ${C.white}; }
        @media (max-width: 960px) {
          .tier-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .tier-grid { grid-template-columns: 1fr !important; }
          .band-grid { grid-template-columns: repeat(2,1fr) !important; }
          .value-grid { grid-template-columns: 1fr !important; }
          .calc-header { flex-direction: column !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div:first-child { padding-right: 0 !important; border-right: none !important; padding-bottom: 24px; border-bottom: 1px solid ${C.border}; }
          .stats-grid > div:last-child { padding-left: 0 !important; padding-top: 24px; }
        }
      `}</style>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
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
  margin: 0,
  padding: 0,
});

function TierName({ children, purple, amber }: { children: ReactNode; purple?: boolean; amber?: boolean }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '1px',
        color: purple ? C.purpleLight : amber ? C.amber : C.grayDark,
        marginBottom: 14,
      }}
    >
      {children}
    </div>
  );
}
function TierSeats({ children }: { children: ReactNode }) {
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
function Cta({
  href,
  children,
  v,
  onClick,
}: {
  href: string;
  children: ReactNode;
  v: 'primary' | 'secondary' | 'amber';
  onClick?: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      onClick={onClick}
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
          : v === 'amber'
            ? { background: C.amber, color: '#0A0A0F' }
            : { background: 'transparent', border: `1px solid ${C.borderLight}`, color: C.white }),
      }}
    >
      {children}
    </a>
  );
}
function Fi({ children, c, dim }: { children: ReactNode; c: 'green' | 'purple' | 'amber'; dim?: boolean }) {
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
  return <li style={{ listStyle: 'none', height: 1, background: C.border, margin: '4px 0' }} />;
}
function MfTag() {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        background: C.purpleDim,
        color: C.purpleLight,
        border: `1px solid rgba(139,92,246,0.3)`,
        padding: '1px 5px',
        borderRadius: 3,
      }}
    >
      MF
    </span>
  );
}
