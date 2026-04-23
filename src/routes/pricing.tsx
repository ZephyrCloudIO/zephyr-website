import sgwsLogo from '@/images/companies/sgws.webp';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { Check, ChevronDown } from 'lucide-react';
import { type ReactNode, useEffect, useRef, useState } from 'react';

export const Route = createFileRoute('/pricing')({
  component: PricingPage,
});

// Non-MF path accent — no DS variable for green
const GREEN = '#10B981';
const GREEN_DIM = '#064E3B';

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
  const [mobilePlan, setMobilePlan] = useState<'fr' | 'pr' | 'bz' | 'en'>('fr');
  const [showCalc, setShowCalc] = useState(false);
  const [showOverages, setShowOverages] = useState(false);
  const [animatedTotal, setAnimatedTotal] = useState(0);
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

  const calcMonthly = calcTab === 'pro' ? proMonthly : bizMonthly;
  useEffect(() => {
    const start = animatedTotal;
    const end = calcMonthly;
    const duration = 300;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedTotal(Math.round(start + (end - start) * eased));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [calcMonthly]); // eslint-disable-line react-hooks/exhaustive-deps

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
      a: "Yes. Business and Enterprise invoicing and PO billing are standard. Teams is credit card monthly or yearly. If procurement requires an invoice for Teams, contact sales and we'll accommodate it.",
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
      q: 'Is there a yearly discount?',
      a: 'Yes — 15% off Teams and Business when billed yearly. Toggle above to see yearly pricing reflected live in the calculator.',
    },
  ];

  return (
    <div style={{ background: 'var(--background)', color: 'var(--foreground)', lineHeight: 1.6 }}>
      {/* ── HERO ── */}
      <section style={{ textAlign: 'center', padding: '64px 40px 24px', maxWidth: 760, margin: '0 auto' }}>
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
            const activeColor = isMf ? 'var(--primary)' : GREEN;
            return (
              <button
                key={id}
                onClick={() => selectPath(id)}
                style={{
                  background: active
                    ? isMf
                      ? 'color-mix(in oklch, var(--primary) 12%, transparent)'
                      : `color-mix(in oklch, ${GREEN} 10%, transparent)`
                    : 'var(--card)',
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
                    ? `0 0 0 1px ${activeColor}, 0 8px 32px ${isMf ? 'color-mix(in oklch, var(--primary) 20%, transparent)' : `color-mix(in oklch, ${GREEN} 15%, transparent)`}`
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
          const accent = isMf ? 'var(--primary-muted)' : GREEN;
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
                    ? 'linear-gradient(135deg, color-mix(in oklch, var(--primary) 20%, var(--card)) 0%, var(--card) 70%)'
                    : `linear-gradient(135deg, color-mix(in oklch, ${GREEN_DIM} 80%, var(--card)) 0%, var(--card) 70%)`,
                  border: `1px solid ${isMf ? 'color-mix(in oklch, var(--primary) 30%, transparent)' : `color-mix(in oklch, ${GREEN} 25%, transparent)`}`,
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
                borderRadius: 9999,
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontFamily: 'inherit',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              {mode === 'monthly' ? 'Monthly' : 'Yearly'}
            </button>
          ))}
        </div>
      </div>

      {/* ── TIER CARDS ── */}
      <section ref={tiersRef} id="tiers" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}>
        <div className="tier-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 14 }}>
          {/* FREE */}
          <div style={card()}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <TierName>Free</TierName>
                <p style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1.5 }}>1 seat</p>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    color: 'transparent',
                    marginBottom: 4,
                    userSelect: 'none',
                  }}
                >
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
                  <span style={{ fontSize: 14, color: 'var(--muted-foreground)', marginLeft: 4, fontWeight: 400 }}>
                    /seat/mo.
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
              background:
                'linear-gradient(193.6deg, var(--card) 0%, color-mix(in oklch, var(--primary) 28%, transparent) 100%)',
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
                    padding: '4px 8px',
                    borderRadius: 8,
                  }}
                >
                  Popular
                </div>
              </div>
              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--muted-foreground)',
                    marginBottom: 4,
                  }}
                >
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
                    {isAnnual ? Math.round(PRO_INTRO * ANNUAL_DISC) : PRO_INTRO}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted-foreground)', marginLeft: 4, fontWeight: 400 }}>
                    /seat/mo.
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
                  <span style={{ color: 'var(--foreground)' }}>BYOC</span> — all cloud integrations
                </Fi>
                <Fi c="green">Instant rollbacks</Fi>
                <Fi c="green">Full version history</Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <span style={{ color: 'var(--foreground)' }}>Environment Overrides</span>
                </Fi>
                <Fi c="purple">
                  <span style={{ color: 'var(--foreground)' }}>Env Variables</span> — no redeploy
                </Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <span style={{ color: 'var(--foreground)' }}>Zephyr DevTools</span>
                </Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <span style={{ color: 'var(--foreground)' }}>UML architecture map</span>
                </Fi>
                <Fi c="purple" dim={path === 'nonmf'} mf>
                  <span style={{ color: 'var(--foreground)' }}>zephyr.dependencies</span>
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
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    color: 'var(--muted-foreground)',
                    marginBottom: 4,
                  }}
                >
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
                    {isAnnual ? Math.round(BIZ_INTRO * ANNUAL_DISC) : BIZ_INTRO}
                  </span>
                  <span style={{ fontSize: 14, color: 'var(--muted-foreground)', marginLeft: 4, fontWeight: 400 }}>
                    /seat/mo.
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
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: 'var(--font-mono)',
                    textTransform: 'uppercase',
                    letterSpacing: '4px',
                    color: 'transparent',
                    marginBottom: 4,
                    userSelect: 'none',
                  }}
                >
                  starting at
                </div>
                <div style={{ display: 'flex', alignItems: 'center', minHeight: 36 }}>
                  <span
                    style={{
                      fontSize: 20,
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      lineHeight: 1,
                    }}
                  >
                    Custom pricing
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
      <div id="calc" style={{ maxWidth: 640, margin: '0 auto 72px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)', marginBottom: 16 }}>
            Seats-based pricing — see your exact monthly total.
          </p>
          <button
            onClick={() => setShowCalc((v) => !v)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}
          >
            {showCalc ? 'Hide calculator' : 'Open pricing calculator'}
            <span
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s',
                transform: showCalc ? 'rotate(45deg)' : 'rotate(0deg)',
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              +
            </span>
          </button>
        </div>
        <div
          style={{
            maxHeight: showCalc ? 800 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <div
            style={{
              background:
                'linear-gradient(180deg, color-mix(in oklch, var(--primary) 6%, transparent) 0%, var(--card) 40%)',
              border: '1px solid var(--border)',
              borderRadius: 16,
              overflow: 'hidden',
            }}
          >
            {/* Tab switcher */}
            <div style={{ display: 'flex', position: 'relative', borderBottom: '1px solid var(--border)' }}>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: calcTab === 'pro' ? '0%' : '50%',
                  width: '50%',
                  height: 2,
                  background: 'var(--primary)',
                  transition: 'left 0.3s',
                  borderRadius: '1px 1px 0 0',
                }}
              />
              {(['pro', 'biz'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    if (t === 'biz') setBizSeats(Math.min(proSeats, 200));
                    else setProSeats(Math.min(bizSeats, 75));
                    setCalcTab(t);
                  }}
                  style={{
                    flex: 1,
                    padding: '16px 0',
                    border: 'none',
                    background: 'rgba(255,255,255,0.03)',
                    color: calcTab === t ? 'var(--foreground)' : 'var(--muted-foreground)',
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'color 0.2s',
                    letterSpacing: '0.02em',
                  }}
                >
                  {t === 'pro' ? 'Teams' : 'Business'}
                </button>
              ))}
            </div>

            <div style={{ padding: '32px' }}>
              {/* CSS Grid: two-column on desktop, stacked on mobile — see index.css .calc-output */}
              <div className="calc-output">
                <div
                  className="calc-output-label"
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  Monthly total
                </div>
                <button
                  className="calc-output-switch"
                  onClick={() => setBilling((b) => (b === 'annual' ? 'monthly' : 'annual'))}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    fontFamily: 'inherit',
                  }}
                >
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 600,
                      letterSpacing: '1.5px',
                      textTransform: 'uppercase',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    Annual
                  </span>
                  <div
                    style={{
                      width: 36,
                      height: 20,
                      borderRadius: 9999,
                      background: isAnnual ? 'var(--primary)' : 'var(--input)',
                      padding: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: isAnnual ? 'flex-end' : 'flex-start',
                      transition: 'background 0.2s',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 16,
                        height: 16,
                        borderRadius: 9999,
                        background: 'var(--primary-foreground)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                        transition: 'transform 0.2s',
                      }}
                    />
                  </div>
                </button>
                <div
                  className="calc-output-number"
                  style={{
                    fontSize: 56,
                    fontWeight: 600,
                    color: 'var(--foreground)',
                    lineHeight: 1,
                    letterSpacing: '-0.02em',
                  }}
                >
                  <span style={{ fontSize: 32, opacity: 0.5, marginRight: 2 }}>$</span>
                  {animatedTotal.toLocaleString('en-US')}
                </div>
                <div className="calc-output-rate">
                  <div style={{ fontSize: 14, color: 'var(--muted-foreground)', lineHeight: 1 }}>
                    {fmt(calcTab === 'pro' ? proEffRate : bizEffRate)}
                    <span style={{ fontSize: 12, opacity: 0.6 }}>/seat</span>
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--muted-foreground)', fontWeight: 500, lineHeight: 1 }}>
                    Save {fmt(calcTab === 'pro' ? proSave : bizSave)}/yr on yearly
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
                  margin: '24px 0',
                }}
              />

              {/* Seats row + slider */}
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}
              >
                <span style={{ fontSize: 14, color: 'var(--muted-foreground)', fontWeight: 500 }}>Seats</span>
                <span style={{ fontSize: 28, fontWeight: 600, color: 'var(--foreground)' }}>
                  {calcTab === 'pro' ? proSeats : bizSeats}
                </span>
              </div>
              <div style={{ marginBottom: 24 }}>
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
                    height: 6,
                    borderRadius: 3,
                    outline: 'none',
                    WebkitAppearance: 'none',
                    cursor: 'pointer',
                    background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${calcTab === 'pro' ? proSliderPct : bizSliderPct}%, var(--input) ${calcTab === 'pro' ? proSliderPct : bizSliderPct}%, var(--input) 100%)`,
                  }}
                />
              </div>

              {/* Tier pills */}
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
                {(calcTab === 'pro' ? PRO_BANDS : BIZ_BANDS).map((band, i) => {
                  const active = calcTab === 'pro' ? proBandIdx === i : bizBandIdx === i;
                  return (
                    <button
                      key={i}
                      onClick={() => (calcTab === 'pro' ? setProSeats(band.midpoint) : setBizSeats(band.midpoint))}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 999,
                        fontSize: 13,
                        fontWeight: 500,
                        cursor: 'pointer',
                        border: `1px solid ${active ? 'var(--primary)' : 'var(--border)'}`,
                        background: active ? 'color-mix(in oklch, var(--primary) 15%, transparent)' : 'transparent',
                        color: active ? 'var(--primary-muted)' : 'var(--muted-foreground)',
                        fontFamily: 'inherit',
                        transition: 'all 0.2s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {band.min}–{band.max} seats
                    </button>
                  );
                })}
              </div>

              {/* Divider */}
              <div
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, var(--border), transparent)',
                  margin: '0 0 32px',
                }}
              />

              {/* CTA */}
              <a
                href="https://app.zephyr-cloud.io/"
                target="_blank"
                rel="noopener"
                style={{
                  display: 'block',
                  width: '100%',
                  textAlign: 'center',
                  padding: '10px 24px',
                  borderRadius: 8,
                  background: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  fontSize: 14,
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'opacity 0.2s',
                }}
              >
                Get started — {calcTab === 'pro' ? proSeats : bizSeats} seats ·{' '}
                {fmt(calcTab === 'pro' ? proMonthly : bizMonthly)}/mo
              </a>
              <div style={{ textAlign: 'center', marginTop: 16, fontSize: 13, color: 'var(--muted-foreground)' }}>
                No credit card required · free 30-day trial
              </div>
            </div>
          </div>
        </div>
        {/* end collapse wrapper */}
      </div>

      {/* ── PROOF BAR ── (hidden) */}

      {/* ── SOCIAL PROOF ── */}
      <section style={{ maxWidth: 960, margin: '0 auto 80px', padding: '0 24px' }}>
        <div
          className="testimonial-card"
          style={{
            background: '#0d0d0d',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '32px 40px',
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 32,
          }}
        >
          <div style={{ flex: 1 }}>
            <span
              style={{
                display: 'block',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: 'var(--muted-foreground)',
                marginBottom: 16,
              }}
            >
              Enterprise customer
            </span>
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
            <p style={{ fontSize: 12, color: 'var(--muted-foreground)', marginTop: 8 }}>
              Engineering leadership ·{' '}
              <strong style={{ color: 'var(--foreground)', fontWeight: 600 }}>
                Southern Glazer's Wine &amp; Spirits
              </strong>
            </p>
          </div>
          <img
            className="testimonial-logo"
            src={sgwsLogo}
            alt="Southern Glazer's Wine & Spirits"
            style={{ height: 72, width: 72, objectFit: 'contain', opacity: 0.9, flexShrink: 0 }}
          />
        </div>
        <div
          className="stats-grid"
          style={{
            background: 'var(--card)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '32px 40px',
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
      <section style={{ maxWidth: 1280, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ marginBottom: 32 }}>
          <h2 className="text-4xl font-normal text-[#faf5ff]" style={{ marginBottom: 8 }}>
            Everything in the platform
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted-foreground)' }}>Every feature, every tier.</p>
        </div>

        {/* ── Mobile plan badge switcher ── */}
        <div className="feature-table-badges" style={{ display: 'none', marginBottom: 16, gap: 8, flexWrap: 'wrap' }}>
          {(
            [
              { key: 'fr', label: 'Free' },
              { key: 'pr', label: 'Teams' },
              { key: 'bz', label: 'Business' },
              { key: 'en', label: 'Enterprise' },
            ] as { key: 'fr' | 'pr' | 'bz' | 'en'; label: string }[]
          ).map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setMobilePlan(key)}
              style={{
                padding: '4px 8px',
                minHeight: 32,
                borderRadius: 8,
                fontSize: 12,
                fontWeight: 500,
                cursor: 'pointer',
                border: 'none',
                background: mobilePlan === key ? 'var(--primary)' : 'var(--secondary)',
                color: mobilePlan === key ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
                transition: 'background 0.15s, color 0.15s',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Desktop table ── */}
        <div
          className="feature-table-desktop"
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
                      fontSize: 16,
                      fontWeight: 500,
                      color: 'var(--foreground)',
                      textAlign: align as 'left' | 'center',
                      width: w,
                      borderRight: i < 4 ? '1px solid rgba(255,255,255,0.15)' : undefined,
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
                  { g: 'Deployment', sub: 'Preview environments, rollbacks, and pipeline control' },
                  { f: 'Cloud integrations', fr: '1', pr: 'All', bz: 'All', en: 'All' },
                  { f: 'Bundler plugins (15)', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'BYOC', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Instant rollbacks', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Tag / branch env', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Version history', fr: 'Limited', pr: '✓', bz: '✓', en: 'Custom' },
                  { g: 'Module Federation Native', sub: 'Built for MF teams, not bolted on', mfg: true },
                  { f: 'Environment Overrides', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'Env Variables (no redeploy)', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Zephyr DevTools', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'UML architecture map', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'zephyr.dependencies', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { g: 'Teams & Access', sub: 'Roles, seat management, and permissions' },
                  { f: 'Collaborators', fr: '—', pr: 'Up to 75', bz: 'Up to 200', en: 'Unlimited' },
                  { f: 'Per-team permissions', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Advanced roles', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'SSO / SAML', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Approval workflows', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Webhook integrations', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { g: 'Security & Compliance', sub: 'Audit logs, certifications, and data governance' },
                  { f: 'Activity log', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Audit log retention', fr: '—', pr: '30 days', bz: '90 days', en: 'Custom' },
                  { f: 'Uptime SLA', fr: '—', pr: '—', bz: '99.9%', en: '99.99%' },
                  { f: 'SOC 2 compliance', fr: '—', pr: '—', bz: '—', en: '✓' },
                  { f: 'DPA', fr: '—', pr: '—', bz: '—', en: '✓' },
                  { g: 'Support', sub: 'Help when you need it' },
                  { f: 'Community support', fr: '✓', pr: '—', bz: '—', en: '—' },
                  { f: 'Email support', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Priority support', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Dedicated CSM', fr: '—', pr: '—', bz: '—', en: '✓' },
                ] as Array<{
                  g?: string;
                  sub?: string;
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
                          background: 'transparent',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          padding: '32px 24px 24px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: row.sub ? 8 : 0 }}>
                          <span
                            style={{
                              fontSize: 24,
                              fontWeight: 400,
                              color: 'var(--foreground)',
                              letterSpacing: '-0.3px',
                            }}
                          >
                            {row.g}
                          </span>
                          {row.mfg && <MfTag />}
                        </div>
                        {row.sub && (
                          <div style={{ fontSize: 16, color: 'var(--muted-foreground)', fontWeight: 400 }}>
                            {row.sub}
                          </div>
                        )}
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
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
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
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--foreground)',
                        fontWeight: 400,
                        fontSize: 14,
                      }}
                    >
                      {row.f}
                      {row.mf && (
                        <span style={{ marginLeft: 8 }}>
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

        {/* ── Mobile table ── */}
        <div
          className="feature-table-mobile-table"
          style={{
            display: 'none',
            borderRadius: 16,
            border: '1px solid rgba(255,255,255,0.1)',
            background: '#0d0d0d',
            overflow: 'hidden',
          }}
        >
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'black', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <th
                  style={{
                    padding: '16px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--foreground)',
                    textAlign: 'left',
                    width: '60%',
                  }}
                >
                  Feature
                </th>
                <th
                  style={{
                    padding: '16px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--foreground)',
                    textAlign: 'center',
                    borderLeft: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {mobilePlan === 'fr'
                    ? 'Free'
                    : mobilePlan === 'pr'
                      ? 'Teams'
                      : mobilePlan === 'bz'
                        ? 'Business'
                        : 'Enterprise'}
                </th>
              </tr>
            </thead>
            <tbody>
              {(
                [
                  { g: 'Deployment', sub: 'Preview environments, rollbacks, and pipeline control' },
                  { f: 'Cloud integrations', fr: '1', pr: 'All', bz: 'All', en: 'All' },
                  { f: 'Bundler plugins (15)', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'BYOC', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Instant rollbacks', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Tag / branch env', fr: '✓', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Version history', fr: 'Limited', pr: '✓', bz: '✓', en: 'Custom' },
                  { g: 'Module Federation Native', sub: 'Built for MF teams, not bolted on', mfg: true },
                  { f: 'Environment Overrides', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'Env Variables (no redeploy)', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Zephyr DevTools', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'UML architecture map', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { f: 'zephyr.dependencies', fr: '—', pr: '✓', bz: '✓', en: '✓', mf: true },
                  { g: 'Teams & Access', sub: 'Roles, seat management, and permissions' },
                  { f: 'Collaborators', fr: '—', pr: 'Up to 75', bz: 'Up to 200', en: 'Unlimited' },
                  { f: 'Per-team permissions', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Advanced roles', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'SSO / SAML', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Approval workflows', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Webhook integrations', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { g: 'Security & Compliance', sub: 'Audit logs, certifications, and data governance' },
                  { f: 'Activity log', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Audit log retention', fr: '—', pr: '30 days', bz: '90 days', en: 'Custom' },
                  { f: 'Uptime SLA', fr: '—', pr: '—', bz: '99.9%', en: '99.99%' },
                  { f: 'SOC 2 compliance', fr: '—', pr: '—', bz: '—', en: '✓' },
                  { f: 'DPA', fr: '—', pr: '—', bz: '—', en: '✓' },
                  { g: 'Support', sub: 'Help when you need it' },
                  { f: 'Community support', fr: '✓', pr: '—', bz: '—', en: '—' },
                  { f: 'Email support', fr: '—', pr: '✓', bz: '✓', en: '✓' },
                  { f: 'Priority support', fr: '—', pr: '—', bz: '✓', en: '✓' },
                  { f: 'Dedicated CSM', fr: '—', pr: '—', bz: '—', en: '✓' },
                ] as Array<{
                  g?: string;
                  sub?: string;
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
                        colSpan={2}
                        style={{
                          background: 'transparent',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          padding: '24px 16px 16px',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: row.sub ? 8 : 0 }}>
                          <span
                            style={{
                              fontSize: 20,
                              fontWeight: 400,
                              color: 'var(--foreground)',
                              letterSpacing: '-0.3px',
                            }}
                          >
                            {row.g}
                          </span>
                          {row.mfg && <MfTag />}
                        </div>
                        {row.sub && (
                          <div style={{ fontSize: 14, color: 'var(--muted-foreground)', fontWeight: 400 }}>
                            {row.sub}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                const val = row[mobilePlan] ?? '';
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
                  <tr key={i} className={cn(path === 'nonmf' && row.mf && 'opacity-40')}>
                    <td
                      style={{
                        padding: '16px',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        color: 'var(--foreground)',
                        fontWeight: 400,
                        fontSize: 13,
                      }}
                    >
                      {row.f}
                      {row.mf && (
                        <span style={{ marginLeft: 8 }}>
                          <MfTag />
                        </span>
                      )}
                    </td>
                    <td
                      style={{
                        padding: '16px',
                        borderTop: '1px solid rgba(255,255,255,0.1)',
                        borderLeft: '1px solid rgba(255,255,255,0.1)',
                        textAlign: 'center',
                        color,
                        fontSize: val === '✓' || val === '—' ? 15 : 12,
                        fontWeight: val === 'Limited' || val === 'Custom' ? 600 : 400,
                      }}
                    >
                      {val}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── OVERAGES ── */}
      <section style={{ maxWidth: 1280, margin: '0 auto 80px', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <button
            onClick={() => setShowOverages((v) => !v)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              background: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              border: 'none',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'opacity 0.2s',
            }}
          >
            {showOverages ? 'Hide overage rates' : 'View overage rates'}
            <span
              style={{
                display: 'inline-block',
                transition: 'transform 0.3s',
                transform: showOverages ? 'rotate(45deg)' : 'rotate(0deg)',
                fontSize: 16,
                lineHeight: 1,
              }}
            >
              +
            </span>
          </button>
        </div>
        <div
          style={{
            maxHeight: showOverages ? 600 : 0,
            overflow: 'hidden',
            transition: 'max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          {/* Desktop */}
          <div
            className="feature-table-desktop"
            style={{
              overflowX: 'auto',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#0d0d0d',
              boxShadow: '0 20px 60px rgba(0,0,0,0.28)',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, minWidth: 680 }}>
              <colgroup>
                <col style={{ width: '28%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
                <col style={{ width: '18%' }} />
              </colgroup>
              <tbody>
                {/* Group header */}
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      background: 'transparent',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      padding: '32px 24px 24px',
                    }}
                  >
                    <span
                      style={{ fontSize: 24, fontWeight: 400, color: 'var(--foreground)', letterSpacing: '-0.3px' }}
                    >
                      Overages
                    </span>
                    <div style={{ fontSize: 16, color: 'var(--muted-foreground)', fontWeight: 400, marginTop: 8 }}>
                      Transparent rates for usage beyond your plan limits.
                    </div>
                  </td>
                </tr>
                {[
                  { f: 'Bandwidth', fr: '$40 / 100 GB', pr: '$30 / 100 GB', bz: '$25 / 100 GB', en: 'Custom' },
                  { f: 'Storage', fr: '$10 / 50 GB', pr: '$7 / 50 GB', bz: '$5 / 50 GB', en: 'Custom' },
                ].map((row, i) => {
                  const cell = (val = '') => {
                    const color =
                      val === '—'
                        ? 'var(--input)'
                        : val === 'Custom'
                          ? 'var(--primary-muted)'
                          : 'var(--muted-foreground)';
                    return (
                      <td
                        style={{
                          padding: '16px 20px',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          borderLeft: '1px solid rgba(255,255,255,0.1)',
                          textAlign: 'center',
                          color,
                          fontSize: val === '—' ? 15 : 13,
                          fontWeight: val === 'Custom' ? 600 : 400,
                        }}
                      >
                        {val}
                      </td>
                    );
                  };
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          padding: '20px',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--foreground)',
                          fontWeight: 400,
                          fontSize: 14,
                        }}
                      >
                        {row.f}
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

          {/* Mobile */}
          <div
            className="feature-table-mobile-table"
            style={{
              display: 'none',
              borderRadius: 16,
              border: '1px solid rgba(255,255,255,0.1)',
              background: '#0d0d0d',
              overflow: 'hidden',
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
              <tbody>
                <tr>
                  <td
                    colSpan={2}
                    style={{
                      background: 'transparent',
                      borderTop: '1px solid rgba(255,255,255,0.1)',
                      padding: '24px 16px 16px',
                    }}
                  >
                    <span
                      style={{ fontSize: 20, fontWeight: 400, color: 'var(--foreground)', letterSpacing: '-0.3px' }}
                    >
                      Overages
                    </span>
                    <div style={{ fontSize: 14, color: 'var(--muted-foreground)', fontWeight: 400, marginTop: 8 }}>
                      Transparent rates for usage beyond your plan limits.
                    </div>
                  </td>
                </tr>
                {[
                  { f: 'Bandwidth', fr: '$40 / 100 GB', pr: '$30 / 100 GB', bz: '$25 / 100 GB', en: 'Custom' },
                  { f: 'Storage', fr: '$10 / 50 GB', pr: '$7 / 50 GB', bz: '$5 / 50 GB', en: 'Custom' },
                ].map((row, i) => {
                  const val = (row as Record<string, string>)[mobilePlan] ?? '';
                  const color =
                    val === '—'
                      ? 'var(--input)'
                      : val === 'Custom'
                        ? 'var(--primary-muted)'
                        : 'var(--muted-foreground)';
                  return (
                    <tr key={i}>
                      <td
                        style={{
                          padding: '16px',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          color: 'var(--foreground)',
                          fontWeight: 400,
                          fontSize: 13,
                        }}
                      >
                        {row.f}
                      </td>
                      <td
                        style={{
                          padding: '16px',
                          borderTop: '1px solid rgba(255,255,255,0.1)',
                          borderLeft: '1px solid rgba(255,255,255,0.1)',
                          textAlign: 'center',
                          color,
                          fontSize: val === '—' ? 15 : 12,
                          fontWeight: val === 'Custom' ? 600 : 400,
                        }}
                      >
                        {val}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section
        className="grid gap-8 pb-20 lg:grid-cols-[1fr_1fr]"
        style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px 80px' }}
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
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div
            className="cta-card"
            style={{
              position: 'relative',
              overflow: 'hidden',
              background: '#0d0d0d',
              borderRadius: 16,
              padding: '56px 48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 32,
            }}
          >
            {/* Purple gradient shader */}
            <div className="cta-gradient" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
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
                color: 'var(--background)',
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
        .pricing-slider::-webkit-slider-thumb { -webkit-appearance:none; width:22px; height:22px; border-radius:50%; background:var(--primary); cursor:pointer; box-shadow:0 0 0 4px color-mix(in oklch, var(--primary) 20%, transparent); border:2px solid var(--foreground); }
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
          .testimonial-card { flex-direction: column !important; align-items: flex-start !important; padding: 24px !important; }
          .testimonial-card > div:first-child { order: 2; }
          .testimonial-card .testimonial-logo { order: 1; align-self: flex-end; }
          .feature-table-badges { display: flex !important; }
          .feature-table-mobile-table { display: block !important; }
          .feature-table-desktop { display: none !important; }
        }
        @keyframes cta-gradient-shift {
          from { background-position: 100% 50%; }
          to   { background-position: 80% 50%; }
        }
        @keyframes cta-gradient-mobile-shift {
          from { transform: translate(0px, 0px) scale(1); }
          to   { transform: translate(16px, -20px) scale(1.12); }
        }
        .cta-gradient {
          background: linear-gradient(to left, var(--primary) 0%, color-mix(in oklch, var(--primary) 85%, transparent) 8%, color-mix(in oklch, var(--primary) 45%, transparent) 18%, color-mix(in oklch, var(--primary) 4%, transparent) 28%, transparent 35%);
          background-size: 200% 100%;
          animation: cta-gradient-shift 5s ease-in-out infinite alternate;
        }
        @media (max-width: 600px) {
          .cta-gradient {
            background: radial-gradient(ellipse 140% 90% at 10% 110%, var(--primary) 0%, color-mix(in oklch, var(--primary) 85%, transparent) 25%, color-mix(in oklch, var(--primary) 50%, transparent) 50%, transparent 72%) !important;
            background-size: 100% 100% !important;
            animation: cta-gradient-mobile-shift 5s ease-in-out infinite alternate !important;
          }
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
  gap: 16,
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
  c: _c,
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
        gap: 8,
        lineHeight: 1.45,
        opacity: dim ? 0.4 : 1,
      }}
    >
      <Check size={16} style={{ color: ic, flexShrink: 0 }} />
      <span style={{ flex: 1 }}>{children}</span>
      {mf && (
        <span style={{ flexShrink: 0, marginTop: 2 }}>
          <MfTag />
        </span>
      )}
    </li>
  );
}
function MfTag() {
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        background: 'color-mix(in oklch, var(--primary) 15%, transparent)',
        color: 'var(--primary-muted)',
        border: '1px solid color-mix(in oklch, var(--primary) 30%, transparent)',
        padding: '2px 4px',
        borderRadius: 4,
      }}
    >
      MF
    </span>
  );
}
