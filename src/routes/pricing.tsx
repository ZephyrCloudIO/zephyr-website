import sgwsLogo from '@/images/companies/sgws.webp';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Check, ChevronDown } from 'lucide-react';
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
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', lineHeight: 1.6 }}>
      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '64px 40px 20px', maxWidth: 760, margin: '0 auto' }}>
        <h1 className="text-5xl font-medium leading-tighter mb-4 text-white">Pricing that scales with your team</h1>
        <p className="text-xl text-muted-foreground">Start for free and scale as you grow.</p>
      </section>

      {/* ── PATH SELECTOR ── */}
      <div style={{ display: 'none' }}>
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
            const activeColor = isMf ? 'var(--primary)' : C.green;
            return (
              <button
                key={id}
                onClick={() => selectPath(id)}
                style={{
                  background: active ? (isMf ? 'rgba(139,92,246,0.12)' : 'rgba(16,185,129,0.1)') : 'var(--card)',
                  borderRadius: 12,
                  padding: '22px 28px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  maxWidth: 280,
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.25s',
                  border: `2px solid ${active ? activeColor : 'var(--border)'}`,
                  boxShadow: active
                    ? `0 0 0 1px ${activeColor}, 0 8px 32px ${isMf ? 'rgba(139,92,246,0.2)' : 'rgba(16,185,129,0.15)'}`
                    : 'none',
                  transform: active ? 'translateY(-2px)' : 'none',
                  fontFamily: 'inherit',
                  color: 'var(--foreground)',
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
                      fontWeight: 600,
                    }}
                  >
                    ✓
                  </div>
                )}
                <div style={{ fontSize: 22, marginBottom: 10 }}>{icon}</div>
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    marginBottom: 5,
                    letterSpacing: '-0.3px',
                  }}
                >
                  {title}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>{sub}</div>
              </button>
            );
          })}
        </div>
        {!path && (
          <p style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
            Select your situation to see what matters most to your team.
          </p>
        )}
      </div>

      {/* ── VALUE PANELS ── */}
      <div ref={panelsRef} style={{ display: 'none' }}>
        {(['mf', 'nonmf'] as const).map((panelId) => {
          const isMf = panelId === 'mf';
          const visible = path === panelId;
          const accent = isMf ? 'var(--primary-muted)' : C.green;
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
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '1.2px',
                      color: accent,
                      marginBottom: 10,
                    }}
                  >
                    {isMf ? 'For Module Federation teams' : 'For teams not yet on Module Federation'}
                  </div>
                  <h2
                    style={{
                      fontSize: 26,
                      fontWeight: 600,
                      letterSpacing: '-0.6px',
                      lineHeight: 1.2,
                      color: 'var(--foreground)',
                    }}
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
                          color: 'var(--muted-foreground)',
                          marginBottom: 6,
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px',
                        }}
                      >
                        The problem
                      </div>
                      <p style={{ fontSize: 13, color: 'var(--muted-foreground)', lineHeight: 1.5, marginBottom: 10 }}>
                        {item.problem}
                      </p>
                      <div
                        style={{
                          fontSize: 12,
                          fontWeight: 600,
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
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 40,
            padding: 4,
          }}
        >
          {(['monthly', 'annual'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setBilling(mode)}
              style={{
                background: billing === mode ? 'var(--primary)' : 'none',
                border: 'none',
                color: billing === mode ? 'var(--primary-foreground)' : 'var(--muted-foreground)',
                fontSize: 13,
                fontWeight: 600,
                padding: '8px 16px',
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
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '2px 8px',
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
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TierName>Free</TierName>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>1 seat</p>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'transparent', marginBottom: 4, userSelect: 'none' }}>
                  starting at
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1 }}>$</span>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      letterSpacing: '-1px',
                      lineHeight: 1,
                    }}
                  >
                    0
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted-foreground)', marginLeft: 6, fontWeight: 400 }}>
                    / seat / mo
                  </span>
                </div>
              </div>
              <Cta href="https://app.zephyr-cloud.io/" v="secondary">
                Get started free
              </Cta>
            </div>
            <div style={{ height: 1, background: 'var(--accent)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
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
          </div>

          {/* TEAMS */}
          <div
            style={{
              ...card(),
              background: 'linear-gradient(193.6deg, var(--card) 0%, rgba(124,58,237,0.35) 100%)',
              border: '2px solid var(--primary)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, position: 'relative' }}>
                <TierName>Teams</TierName>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>2 – 75 seats</p>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    background: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    fontSize: 11,
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: 6,
                  }}
                >
                  Popular
                </div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 4 }}>starting at</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1 }}>$</span>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      letterSpacing: '-1px',
                      lineHeight: 1,
                    }}
                  >
                    {isAnnual ? Math.round(PRO_INTRO * ANNUAL_DISC) : PRO_INTRO}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted-foreground)', marginLeft: 6, fontWeight: 400 }}>
                    / seat / mo
                  </span>
                </div>
              </div>
              <Cta href="https://app.zephyr-cloud.io/" v="primary">
                Start free 30-day trial
              </Cta>
            </div>
            <div style={{ height: 1, background: 'var(--accent)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ul style={featList()}>
                <Fi c="green">
                  <strong style={{ color: 'var(--foreground)' }}>BYOC</strong> — all cloud integrations
                </Fi>
                <Fi c="green">Instant rollbacks</Fi>
                <Fi c="green">Full version history</Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <strong style={{ color: 'var(--foreground)' }}>Environment Overrides</strong>
                </Fi>
                <Fi c="purple">
                  <strong style={{ color: 'var(--foreground)' }}>Env Variables</strong> — no redeploy
                </Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <strong style={{ color: 'var(--foreground)' }}>Zephyr DevTools</strong>
                </Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <strong style={{ color: 'var(--foreground)' }}>UML architecture map</strong>
                </Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <strong style={{ color: 'var(--foreground)' }}>zephyr.dependencies</strong>
                </Fi>
                <Fi c="green">Per-team deploy permissions</Fi>
                <Fi c="green">30-day audit logs</Fi>
                <Fi c="green">Up to 75 collaborators</Fi>
              </ul>
            </div>
          </div>

          {/* BUSINESS */}
          <div
            style={{
              ...card(),
              border: '1px solid var(--border)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TierName>Business</TierName>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>2 – 200 seats</p>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginBottom: 4 }}>starting at</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span style={{ fontSize: 22, fontWeight: 600, color: 'var(--foreground)', lineHeight: 1 }}>$</span>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      letterSpacing: '-1px',
                      lineHeight: 1,
                    }}
                  >
                    {isAnnual ? Math.round(BIZ_INTRO * ANNUAL_DISC) : BIZ_INTRO}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted-foreground)', marginLeft: 6, fontWeight: 400 }}>
                    / seat / mo
                  </span>
                </div>
              </div>
              <Cta href="https://app.zephyr-cloud.io/" v="secondary">
                Start free 30-day trial
              </Cta>
            </div>
            <div style={{ height: 1, background: 'var(--accent)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ul style={featList()}>
                <li style={{ fontSize: 14, color: 'var(--muted-foreground)', listStyle: 'none' }}>
                  Everything in Teams, plus:
                </li>
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
          </div>

          {/* ENTERPRISE */}
          <div style={card()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TierName>Enterprise</TierName>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>200+ seats</p>
              </div>
              <div>
                <div style={{ fontSize: 12, color: 'transparent', marginBottom: 4, userSelect: 'none' }}>
                  starting at
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                  <span
                    style={{
                      fontSize: 36,
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      letterSpacing: '-1px',
                      lineHeight: 1,
                    }}
                  >
                    Custom
                  </span>
                  <span style={{ fontSize: 14, color: 'transparent', marginLeft: 6, fontWeight: 400 }}>
                    / seat / mo
                  </span>
                </div>
              </div>
              <Cta href="mailto:inbound@zephyr-cloud.io?subject=Enterprise" v="secondary">
                Talk to sales
              </Cta>
            </div>
            <div style={{ height: 1, background: 'var(--accent)' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <ul style={featList()}>
                <li style={{ fontSize: 14, color: 'var(--muted-foreground)', listStyle: 'none' }}>
                  Everything in Business, plus:
                </li>
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
        </div>
      </section>

      {/* ── CALCULATOR ── */}
      <div id="calc" style={{ maxWidth: 960, margin: '0 auto 72px', padding: '0 24px' }}>
        {/* Single outer border wraps tabs + body — no double borders */}
        <div
          style={{
            border: `1px solid ${calcTab === 'pro' ? 'var(--primary)' : 'rgba(255,255,255,0.18)'}`,
            borderRadius: 14,
            overflow: 'hidden',
            transition: 'border-color 0.3s',
          }}
        >
          {/* Tab switcher */}
          <div
            style={{
              display: 'flex',
              borderBottom: `1px solid ${calcTab === 'pro' ? 'var(--primary)' : 'rgba(255,255,255,0.18)'}`,
              transition: 'border-color 0.3s',
            }}
          >
            {(
              [
                {
                  id: 'pro',
                  label: 'Teams Calculator',
                  color: 'var(--foreground)' as string,
                  activeBg: 'linear-gradient(160deg,#1A0F3A 0%,#0F0F1A 60%)',
                },
                {
                  id: 'biz',
                  label: 'Business Calculator',
                  color: 'var(--foreground)' as string,
                  activeBg: 'var(--card)',
                },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setCalcTab(tab.id)}
                style={{
                  flex: 1,
                  padding: '8px 16px',
                  background: calcTab === tab.id ? tab.activeBg : 'var(--card)',
                  border: 'none',
                  color: calcTab === tab.id ? tab.color : 'var(--muted-foreground)',
                  fontSize: 14,
                  fontWeight: 500,
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
              background: calcTab === 'pro' ? 'linear-gradient(160deg,#1A0F3A 0%,#0F0F1A 60%)' : 'var(--card)',
              padding: '40px 48px',
              transition: 'background 0.3s',
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
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 600,
                    letterSpacing: '-0.4px',
                    color: 'var(--foreground)',
                    marginBottom: 6,
                  }}
                >
                  {calcTab === 'pro' ? 'Teams' : 'Business'} — see your exact price
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted-foreground)', maxWidth: 400, lineHeight: 1.6 }}>
                  The more seats you add, the less you pay per seat. Click a tier or drag the slider.
                </p>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: calcTab === 'pro' ? 'var(--primary-muted)' : 'var(--muted-foreground)',
                    marginBottom: 4,
                  }}
                >
                  {isAnnual ? 'Effective per month (annual)' : 'Total per month'}
                </div>
                <div
                  style={{
                    fontSize: 42,
                    fontWeight: 600,
                    letterSpacing: '-1.5px',
                    color: 'var(--foreground)',
                    lineHeight: 1,
                  }}
                >
                  {fmt(calcTab === 'pro' ? proMonthly : bizMonthly)}
                </div>
                <div style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 4 }}>
                  {isAnnual
                    ? `Billed as ${fmt(calcTab === 'pro' ? proYearly : bizYearly)}/yr · you save ${fmt(calcTab === 'pro' ? proSave : bizSave)}`
                    : `${fmt(calcTab === 'pro' ? proYearly : bizYearly)}/yr with annual — save ${fmt(calcTab === 'pro' ? proSave : bizSave)}`}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span style={{ fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 500 }}>Seats</span>
                <strong style={{ fontSize: 14, color: 'var(--foreground)', fontWeight: 600 }}>
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
                  background: `linear-gradient(to right,${calcTab === 'pro' ? 'var(--primary)' : 'var(--foreground)'} 0%,${calcTab === 'pro' ? 'var(--primary)' : 'var(--foreground)'} ${calcTab === 'pro' ? proSliderPct : bizSliderPct}%,var(--input) ${calcTab === 'pro' ? proSliderPct : bizSliderPct}%,var(--input) 100%)`,
                }}
              />
            </div>

            {/* Band cards */}
            <div
              className="band-grid"
              style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 10, marginBottom: 24 }}
            >
              {(calcTab === 'pro' ? PRO_BANDS : BIZ_BANDS).map((band, i) => {
                const acColor = calcTab === 'pro' ? 'var(--primary)' : 'var(--muted-foreground)';
                const introRate = calcTab === 'pro' ? PRO_INTRO : BIZ_INTRO;
                const dr = isAnnual ? Math.round(band.rate * ANNUAL_DISC) : band.rate;
                const saving = Math.round((1 - band.rate / introRate) * 100);
                const active = calcTab === 'pro' ? proBandIdx === i : bizBandIdx === i;
                const rgbActive = calcTab === 'pro' ? '139,92,246' : '115,115,115';
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
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
                        marginBottom: 6,
                      }}
                    >
                      {band.label}
                    </div>
                    <div
                      style={{
                        fontSize: 22,
                        fontWeight: 600,
                        letterSpacing: '-0.8px',
                        color: 'var(--foreground)',
                        lineHeight: 1,
                        marginBottom: 3,
                      }}
                    >
                      {fmt(dr)}
                    </div>
                    <div style={{ fontSize: 10, color: 'var(--muted-foreground)' }}>
                      per seat / {isAnnual ? 'mo (annual)' : 'mo'}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 500, color: C.green, marginTop: 5, minHeight: 14 }}>
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
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                Per seat:{' '}
                <strong style={{ color: 'var(--foreground)' }}>
                  {fmt(calcTab === 'pro' ? proEffRate : bizEffRate)}
                  {isAnnual ? ` (was ${fmt(calcTab === 'pro' ? proRate : bizRate)})` : ''}
                </strong>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                Monthly:{' '}
                <strong style={{ color: 'var(--foreground)' }}>
                  {fmt(calcTab === 'pro' ? proMonthly : bizMonthly)}
                </strong>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                Annual:{' '}
                <strong style={{ color: 'var(--foreground)' }}>{fmt(calcTab === 'pro' ? proYearly : bizYearly)}</strong>
                <span
                  style={{
                    display: 'inline-block',
                    background: C.greenDim,
                    color: C.green,
                    fontSize: 12,
                    fontWeight: 500,
                    padding: '2px 8px',
                    borderRadius: 8,
                    marginLeft: 6,
                  }}
                >
                  Save {fmt(calcTab === 'pro' ? proSave : bizSave)}
                </span>
              </div>
              <div style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                {calcTab === 'pro' ? (
                  <>
                    Need governance or SSO?{' '}
                    <button
                      onClick={() => setCalcTab('biz')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-muted)',
                        fontWeight: 600,
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
                      style={{ color: 'var(--foreground)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      Talk to sales
                    </a>{' '}
                    — quoted same day.
                  </>
                )}
              </div>
            </div>

            {/* Checkout CTA */}
            <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <a
                href="https://app.zephyr-cloud.io/"
                target="_blank"
                rel="noopener"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 16px',
                  borderRadius: 8,
                  fontWeight: 500,
                  fontSize: 14,
                  textDecoration: 'none',
                  transition: 'all 0.2s',
                  background: calcTab === 'pro' ? 'var(--primary)' : 'var(--secondary)',
                  color: calcTab === 'pro' ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                }}
              >
                Get started — {calcTab === 'pro' ? proSeats : bizSeats} seats ·{' '}
                {fmt(calcTab === 'pro' ? proMonthly : bizMonthly)}/mo
              </a>
              <span style={{ fontSize: 12, color: 'var(--muted-foreground)' }}>
                No credit card required · free 30-day trial
              </span>
            </div>
          </div>
        </div>
        {/* end outer border wrapper */}
      </div>

      {/* ── PROOF BAR ── */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
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
            <div
              style={{
                fontSize: 22,
                fontWeight: 600,
                letterSpacing: '-0.8px',
                color: 'var(--foreground)',
                lineHeight: 1,
              }}
            >
              {s.n}
              <span style={{ color: 'var(--primary-muted)' }}>{s.s}</span>
            </div>
            <div style={{ fontSize: 11, color: 'var(--muted-foreground)', marginTop: 3 }}>{s.l}</div>
          </div>
        ))}
      </div>

      {/* ── SOCIAL PROOF ── */}
      <section style={{ maxWidth: 960, margin: '0 auto 80px', padding: '0 24px' }}>
        <div
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '28px 40px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 32,
            alignItems: 'center',
            marginBottom: 16,
          }}
        >
          <div>
            <p
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: 'var(--foreground)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              <span
                style={{
                  color: 'var(--primary-muted)',
                  fontSize: 24,
                  lineHeight: 0,
                  verticalAlign: -6,
                  marginRight: 4,
                }}
              >
                "
              </span>
              Zephyr gave us the deployment orchestration layer we'd been trying to build internally for two years. We
              stopped writing tooling and started shipping product.
              <span
                style={{ color: 'var(--primary-muted)', fontSize: 24, lineHeight: 0, verticalAlign: -6, marginLeft: 4 }}
              >
                "
              </span>
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 10 }}>
              Engineering leadership ·{' '}
              <strong style={{ color: 'var(--foreground)', fontWeight: 600 }}>
                Southern Glazer's Wine &amp; Spirits
              </strong>
            </p>
          </div>
          <div
            style={{
              textAlign: 'right',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            <img
              src={sgwsLogo}
              alt="Southern Glazer's Wine & Spirits"
              style={{ height: 36, width: 'auto', opacity: 0.9 }}
            />
            <span
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--muted-foreground)',
              }}
            >
              Enterprise customer
            </span>
          </div>
        </div>
        <div
          className="stats-grid"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 12,
            padding: '28px 40px',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
          }}
        >
          <div style={{ paddingRight: 32, borderRight: '1px solid var(--border)' }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--muted-foreground)',
                marginBottom: 8,
              }}
            >
              Teams using Zephyr report
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: '-1px',
                color: 'var(--foreground)',
                lineHeight: 1,
              }}
            >
              1.5 sprints
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 4 }}>
              recovered per quarter by eliminating internal MF tooling
            </div>
          </div>
          <div style={{ paddingLeft: 32 }}>
            <div
              style={{
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                color: 'var(--muted-foreground)',
                marginBottom: 8,
              }}
            >
              Average time to first deploy
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 600,
                letterSpacing: '-1px',
                color: 'var(--foreground)',
                lineHeight: 1,
              }}
            >
              &lt; 15 min
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted-foreground)', marginTop: 4 }}>
              from signup to first cloud deployment — no infrastructure migration required
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE TABLE ── */}
      <section style={{ maxWidth: 1160, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ marginBottom: 36 }}>
          <h2 className="text-4xl font-normal text-[#faf5ff]" style={{ marginBottom: 8 }}>
            Everything in the platform
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Every feature, every tier.</p>
        </div>
        <div
          style={{
            overflowX: 'auto',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#0d0d0d',
            boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 680 }}>
            <thead>
              <tr style={{ background: 'black', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                {(
                  [
                    ['', 'left', '28%'],
                    ['Free', 'center', undefined],
                    ['Teams', 'center', undefined],
                    ['Business', 'center', undefined],
                    ['Enterprise', 'center', undefined],
                  ] as [string, string, string | undefined][]
                ).map(([label, align, w], i) => (
                  <th
                    key={label || 'feature'}
                    style={{
                      padding: '20px',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--foreground)',
                      textAlign: align as 'left' | 'center',
                      width: w,
                      borderLeft: i > 0 ? '0.5px solid rgba(255,255,255,0.15)' : undefined,
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
                          background: 'rgba(255,255,255,0.05)',
                          color: 'var(--foreground)',
                          fontSize: 20,
                          fontWeight: 500,
                          padding: '16px 20px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          {row.g}
                          {row.mfg && <MfTag />}
                        </div>
                      </td>
                    </tr>
                  );
                const cell = (val = '') => {
                  const color =
                    val === '✓'
                      ? 'var(--foreground)'
                      : val === '—'
                        ? 'var(--input)'
                        : val === 'Limited'
                          ? 'var(--muted-foreground)'
                          : val === 'Custom' || val === 'Unlimited'
                            ? 'var(--primary-muted)'
                            : 'var(--muted-foreground)';
                  return (
                    <td
                      style={{
                        padding: '16px 20px',
                        borderTop: '0.5px solid rgba(255,255,255,0.15)',
                        borderLeft: '0.5px solid rgba(255,255,255,0.15)',
                        textAlign: 'center',
                        color,
                        minHeight: 60,
                        fontSize: val === '✓' || val === '—' ? 15 : 13,
                        fontWeight: val === 'Limited' || val === 'Custom' ? 600 : 400,
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
                        padding: '20px',
                        borderTop: '0.5px solid rgba(255,255,255,0.15)',
                        color: 'var(--foreground)',
                        fontWeight: 400,
                        fontSize: 14,
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
                    {cell(row.pr)}
                    {cell(row.bz)}
                    {cell(row.en)}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="grid gap-8 pb-20 lg:grid-cols-[1fr_1fr]"
        style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px 80px' }}
      >
        <div>
          <h2 className="max-w-md text-4xl font-normal text-foreground">Common questions</h2>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={i} className="overflow-hidden rounded-[18px] border border-border bg-card">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-4 text-left text-base text-foreground"
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`h-5 w-5 shrink-0 transition duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && <p className="px-4 pb-4 text-[15px] leading-7 text-muted-foreground">{faq.a}</p>}
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section style={{ padding: '80px 24px 100px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1160, margin: '0 auto' }}>
          <div
            className="cta-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: 'var(--card)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 16,
              padding: '56px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            {/* Purple gradient shader */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to left, oklch(0.541 0.247 293) 0%, oklch(0.541 0.247 293 / 0.85) 15%, oklch(0.38 0.18 285 / 0.45) 38%, oklch(0.22 0.07 270 / 0.1) 58%, transparent 72%)',
                pointerEvents: 'none',
              }}
            />
            {/* Text */}
            <div style={{ position: 'relative', minWidth: 0 }}>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 500,
                  color: 'var(--foreground)',
                  lineHeight: '32px',
                  marginBottom: 8,
                }}
              >
                Start free. <span style={{ color: 'var(--primary-muted)' }}>No cliff. No lock-in.</span>
              </h2>
              <p style={{ fontSize: 16, fontWeight: 400, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>
                One cloud integration free, forever. Upgrade when your team is ready.
              </p>
            </div>
            {/* Button */}
            <a
              href="https://app.zephyr-cloud.io/"
              target="_blank"
              rel="noopener"
              style={{
                position: 'relative',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255,255,255,0.92)',
                color: '#0A0A0F',
                fontSize: 14,
                fontWeight: 500,
                padding: '8px 16px',
                borderRadius: 8,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                flexShrink: 0,
                border: '1px solid rgba(255,255,255,0.2)',
              }}
            >
              Get started
            </a>
          </div>
        </div>
      </section>

      {/* Slider + responsive styles */}
      <style>{`
        .pricing-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:var(--primary); cursor:pointer; box-shadow:0 0 0 4px rgba(139,92,246,0.2); border:2px solid var(--foreground); }
        .pricing-slider::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:var(--primary); cursor:pointer; border:2px solid var(--foreground); }
        .pricing-slider-biz::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:var(--foreground); cursor:pointer; box-shadow:0 0 0 4px rgba(255,255,255,0.1); border:2px solid var(--border); }
        .pricing-slider-biz::-moz-range-thumb { width:22px; height:22px; border-radius:50%; background:var(--foreground); cursor:pointer; border:2px solid var(--border); }
        @media (max-width: 960px) {
          .tier-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 600px) {
          .tier-grid { grid-template-columns: 1fr !important; }
          .band-grid { grid-template-columns: repeat(2,1fr) !important; }
          .value-grid { grid-template-columns: 1fr !important; }
          .calc-header { flex-direction: column !important; }
          .stats-grid { grid-template-columns: 1fr !important; }
          .stats-grid > div:first-child { padding-right: 0 !important; border-right: none !important; padding-bottom: 24px; border-bottom: 1px solid var(--border); }
          .stats-grid > div:last-child { padding-left: 0 !important; padding-top: 24px; }
          .cta-card { flex-direction: column !important; padding: 32px 24px !important; }
          .cta-card > a { width: 100% !important; }
        }
      `}</style>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────────
const card = () => ({
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: 16,
  padding: '32px',
  position: 'relative' as const,
  display: 'flex',
  flexDirection: 'column' as const,
  gap: 32,
});
const featList = () => ({
  listStyle: 'none' as const,
  display: 'flex' as const,
  flexDirection: 'column' as const,
  gap: 12,
  margin: 0,
  padding: 0,
});

function TierName({ children }: { children: ReactNode }) {
  return <div style={{ fontSize: 20, fontWeight: 600, color: 'var(--foreground)' }}>{children}</div>;
}
function Cta({
  href,
  children,
  v,
  onClick,
}: {
  href: string;
  children: ReactNode;
  v: 'primary' | 'secondary';
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
        padding: '8px 16px',
        borderRadius: 8,
        fontSize: 14,
        fontWeight: 500,
        textDecoration: 'none',
        marginBottom: 24,
        transition: 'all 0.2s',
        ...(v === 'primary'
          ? { background: 'var(--primary)', color: 'var(--primary-foreground)' }
          : { background: 'var(--secondary)', color: 'var(--secondary-foreground)' }),
      }}
    >
      {children}
    </a>
  );
}
function Fi({
  children,
  c,
  dim,
  mf,
}: {
  children: ReactNode;
  c: 'green' | 'purple' | 'amber';
  dim?: boolean;
  mf?: boolean;
}) {
  const ic = 'var(--foreground)';
  return (
    <li
      style={{
        fontSize: 14,
        color: 'var(--muted-foreground)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: 9,
        lineHeight: 1.45,
        opacity: dim ? 0.4 : 1,
      }}
    >
      <Check size={16} style={{ color: ic, flexShrink: 0, marginTop: 1 }} />
      <span style={{ flex: 1 }}>{children}</span>
      {mf && (
        <span style={{ flexShrink: 0, marginTop: 2 }}>
          <MfTag />
        </span>
      )}
    </li>
  );
}
function Divider() {
  return <li style={{ listStyle: 'none', height: 1, background: 'var(--accent)', margin: '4px 0' }} />;
}
function MfTag() {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        background: 'rgba(124,58,237,0.15)',
        color: 'var(--primary-muted)',
        border: `1px solid rgba(139,92,246,0.3)`,
        padding: '1px 5px',
        borderRadius: 3,
      }}
    >
      MF
    </span>
  );
}
