import ZephyrWordmark from '@/landers/cityjs-london/assets/logo-zephyr-wordmark.svg';
import posthog from 'posthog-js';
import { useEffect, useMemo, useRef, useState } from 'react';

posthog.init('phc_2BnQabLbt7YVrKbGN02UBKA9kBFH17SXme0Cf5G2iob', {
  api_host: 'https://us.i.posthog.com',
});

function track(event: string, props?: Record<string, unknown>) {
  posthog.capture(event, props);
}

function fmt(n: number) {
  if (n >= 1_000_000) return '$' + (n / 1_000_000).toFixed(1) + 'M';
  if (n >= 1_000) return '$' + Math.round(n / 1_000) + 'k';
  return '$' + Math.round(n).toLocaleString();
}

function fmtFull(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

function getCloudCost(seats: number): number | null {
  if (seats <= 1) return 0;
  if (seats <= 10) return seats * 19 * 12;
  if (seats <= 25) return seats * 49 * 12;
  if (seats <= 75) return seats * 35 * 12;
  if (seats <= 200) return seats * 25 * 12;
  return null;
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  unit,
  rangeMax,
}: {
  label: React.ReactNode;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  unit: string;
  rangeMax?: number;
}) {
  const rMax = rangeMax ?? max;
  return (
    <div style={{ background: '#16121E', border: '1px solid #2D2048', padding: '24px 28px', borderBottom: 'none' }}>
      <div style={{ fontSize: 13, color: '#8888AA', marginBottom: 10, lineHeight: 1.5 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          onChange={(e) => onChange(Math.min(max, Math.max(min, Number(e.target.value) || 0)))}
          style={{
            width: 100,
            background: '#0F0C1A',
            border: '1px solid #2D2048',
            borderRadius: 4,
            padding: '8px 12px',
            color: '#F5F4F0',
            fontSize: 16,
            fontWeight: 700,
            outline: 'none',
          }}
        />
        <span style={{ fontSize: 13, color: '#8888AA' }}>{unit}</span>
      </div>
      <input
        type="range"
        min={min}
        max={rMax}
        value={Math.min(value, rMax)}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: '100%', accentColor: '#8B5CF6' }}
      />
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  color = '#F5F4F0',
}: {
  label: string;
  value: string;
  sub?: string;
  color?: string;
}) {
  return (
    <div
      style={{
        background: '#16121E',
        border: '1px solid #2D2048',
        borderRadius: 8,
        padding: '24px 20px',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          fontSize: 11,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: '#8888AA',
          marginBottom: 8,
          fontFamily: 'system-ui',
        }}
      >
        {label}
      </div>
      <div style={{ fontSize: 36, fontWeight: 900, fontFamily: 'Georgia, serif', color, lineHeight: 1 }}>{value}</div>
      {sub && <div style={{ fontSize: 12, color: '#8888AA', marginTop: 6 }}>{sub}</div>}
    </div>
  );
}

export function DeployCalculatorLanderPage() {
  const [engTeam, setEngTeam] = useState(20);
  const [salary, setSalary] = useState(175_000);
  const [deploysPerWeek, setDeploysPerWeek] = useState(10);
  const [deployMins, setDeployMins] = useState(20);
  const [rollbackHours, setRollbackHours] = useState(40);
  const [cloudSeats, setCloudSeats] = useState(20);

  const engagedRef = useRef(false);

  useEffect(() => {
    track('asset_viewed', { asset: 'roi-calculator', referrer: document.referrer, url: window.location.href });

    const timer = setTimeout(() => {
      if (!engagedRef.current) {
        engagedRef.current = true;
        track('asset_engaged', { asset: 'roi-calculator', engagement_type: 'time_on_page', seconds: 60 });
      }
    }, 60_000);

    return () => clearTimeout(timer);
  }, []);

  // Fire engaged on first slider interaction
  function onInput(setter: (v: number) => void) {
    return (v: number) => {
      setter(v);
      if (!engagedRef.current) {
        engagedRef.current = true;
        track('asset_engaged', {
          asset: 'roi-calculator',
          engagement_type: 'input_interaction',
          eng_team_size: engTeam,
          deploys_per_week: deploysPerWeek,
        });
      }
    };
  }

  const calc = useMemo(() => {
    const hourlyRate = salary / 2080;
    const annualDeployHours = ((deploysPerWeek * deployMins) / 60) * 52;
    const deployWaitCost = annualDeployHours * engTeam * hourlyRate;
    const rollbackCost = rollbackHours * hourlyRate * engTeam;
    const totalBottleneckCost = deployWaitCost + rollbackCost;
    const waitRecovery = deployWaitCost * 0.85;
    const rollbackRecovery = rollbackCost * 0.9;
    const totalRecovery = waitRecovery + rollbackRecovery;
    const hoursRecovered = Math.round((annualDeployHours * 0.85 + rollbackHours * 0.9) * engTeam);
    const cloudAnnualCost = getCloudCost(cloudSeats);
    const zephyrTotal = cloudAnnualCost ?? 0;
    const netBenefit = totalRecovery - zephyrTotal;
    const paybackMonths = zephyrTotal > 0 ? Math.ceil(zephyrTotal / (totalRecovery / 12)) : 0;
    return {
      deployWaitCost,
      rollbackCost,
      totalBottleneckCost,
      waitRecovery,
      rollbackRecovery,
      totalRecovery,
      hoursRecovered,
      cloudAnnualCost,
      zephyrTotal,
      netBenefit,
      paybackMonths,
    };
  }, [engTeam, salary, deploysPerWeek, deployMins, rollbackHours, cloudSeats]);

  function handleCta() {
    track('cta_clicked', {
      asset: 'roi-calculator',
      cta_destination: 'app.zephyr-cloud.io',
      calculated_net_benefit: fmtFull(calc.netBenefit),
    });
  }

  const netPositive = calc.netBenefit >= 0;

  return (
    <div style={{ background: '#0A0A0F', color: '#F5F4F0', minHeight: '100vh', fontFamily: 'Georgia, serif' }}>
      <style>{`
        input[type=range] { accent-color: #8B5CF6; }
        input[type=number]::-webkit-outer-spin-button,
        input[type=number]::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
        input[type=number] { -moz-appearance: textfield; }
      `}</style>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '72px 48px' }}>
        {/* HEADER */}
        <header style={{ textAlign: 'center', marginBottom: 64 }}>
          <img src={ZephyrWordmark} alt="Zephyr Cloud" style={{ height: 22, marginBottom: 28 }} />
          <h1 style={{ fontSize: 48, fontWeight: 900, lineHeight: 1.0, marginBottom: 14 }}>
            The Deploy Bottleneck
            <br />
            Calculator
          </h1>
          <p style={{ fontSize: 17, color: '#8888AA', fontStyle: 'italic' }}>
            Quantify what slow, coupled deployments cost your engineering team — and what removing the bottleneck is
            worth.
          </p>
        </header>

        {/* INSTRUCTION */}
        <div
          style={{
            background: '#16121E',
            borderLeft: '4px solid #8B5CF6',
            borderRadius: '0 6px 6px 0',
            padding: '20px 24px',
            marginBottom: 48,
            fontSize: 14,
            color: '#8888AA',
            lineHeight: 1.6,
            fontFamily: 'system-ui',
          }}
        >
          <strong style={{ color: '#F5F4F0' }}>Fill in your team's real numbers.</strong> Deploy frequency, average wait
          time, and rollback incidents — engineers know these off the top of their head. The model is conservative by
          design: real costs are typically 1.5–2x what shows here because it doesn't capture downstream teams waiting on
          web changes.
        </div>

        {/* MAIN LAYOUT */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 48 }}>
          {/* INPUTS */}
          <div>
            <div
              style={{
                background: '#0F0C1A',
                padding: '12px 28px',
                borderBottom: 'none',
                border: '1px solid #2D2048',
                borderRadius: '8px 8px 0 0',
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  fontFamily: 'system-ui',
                }}
              >
                Engineering Team
              </span>
            </div>
            <SliderInput
              label={
                <>
                  <strong>Engineering team size</strong> — developers who touch the frontend deployment pipeline
                </>
              }
              value={engTeam}
              onChange={onInput(setEngTeam)}
              min={1}
              max={500}
              unit="engineers"
              rangeMax={200}
            />
            <SliderInput
              label={
                <>
                  <strong>Average fully-loaded salary</strong> for engineering roles (USD/year)
                </>
              }
              value={salary}
              onChange={onInput(setSalary)}
              min={50_000}
              max={500_000}
              unit="$/yr"
            />

            <div
              style={{
                background: '#0F0C1A',
                padding: '12px 28px',
                borderBottom: 'none',
                border: '1px solid #2D2048',
                borderTop: '1px solid #2D2048',
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  fontFamily: 'system-ui',
                }}
              >
                Deploy Pattern
              </span>
            </div>
            <SliderInput
              label={
                <>
                  <strong>Deploys per week</strong> — across the full frontend team
                </>
              }
              value={deploysPerWeek}
              onChange={onInput(setDeploysPerWeek)}
              min={1}
              max={100}
              unit="deploys/wk"
            />
            <SliderInput
              label={
                <>
                  <strong>Average deploy wait time</strong> — from commit to live (minutes)
                </>
              }
              value={deployMins}
              onChange={onInput(setDeployMins)}
              min={1}
              max={120}
              unit="minutes"
            />

            <div
              style={{
                background: '#0F0C1A',
                padding: '12px 28px',
                borderBottom: 'none',
                border: '1px solid #2D2048',
                borderTop: '1px solid #2D2048',
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  fontFamily: 'system-ui',
                }}
              >
                Incidents
              </span>
            </div>
            <SliderInput
              label={
                <>
                  <strong>Rollback incident hours/year</strong> — total eng hours spent on production rollback events
                </>
              }
              value={rollbackHours}
              onChange={onInput(setRollbackHours)}
              min={0}
              max={500}
              unit="hrs/yr"
            />

            <div
              style={{
                background: '#0F0C1A',
                padding: '12px 28px',
                border: '1px solid #2D2048',
                borderTop: '1px solid #2D2048',
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  fontFamily: 'system-ui',
                }}
              >
                Zephyr Cloud
              </span>
            </div>
            <div
              style={{
                background: '#16121E',
                border: '1px solid #2D2048',
                borderTop: 'none',
                borderRadius: '0 0 8px 8px',
                padding: '24px 28px',
              }}
            >
              <div style={{ fontSize: 13, color: '#8888AA', marginBottom: 10, lineHeight: 1.5 }}>
                <strong>Zephyr Cloud seats</strong> — number of developers who will use Zephyr
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                <input
                  type="number"
                  value={cloudSeats}
                  min={1}
                  max={500}
                  onChange={(e) => setCloudSeats(Math.max(1, Number(e.target.value) || 1))}
                  style={{
                    width: 100,
                    background: '#0F0C1A',
                    border: '1px solid #2D2048',
                    borderRadius: 4,
                    padding: '8px 12px',
                    color: '#F5F4F0',
                    fontSize: 16,
                    fontWeight: 700,
                    outline: 'none',
                  }}
                />
                <span style={{ fontSize: 13, color: '#8888AA' }}>seats</span>
              </div>
              <input
                type="range"
                min={1}
                max={200}
                value={Math.min(cloudSeats, 200)}
                onChange={(e) => setCloudSeats(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <div
                style={{
                  marginTop: 12,
                  padding: '10px 14px',
                  background: '#0F0C1A',
                  border: '1px solid #2D2048',
                  borderRadius: 4,
                  fontSize: 12,
                  color: '#8888AA',
                  fontFamily: 'system-ui',
                }}
              >
                {cloudSeats <= 1
                  ? 'Personal — Free'
                  : cloudSeats <= 10
                    ? `Team — $19/seat/mo`
                    : cloudSeats <= 25
                      ? `Growth — $49/seat/mo`
                      : cloudSeats <= 75
                        ? `Scale — $35/seat/mo`
                        : cloudSeats <= 200
                          ? `Enterprise — $25/seat/mo`
                          : 'Enterprise+ — Custom pricing'}{' '}
                <span style={{ color: '#8B5CF6', fontWeight: 700 }}>
                  {calc.cloudAnnualCost !== null ? `(${fmtFull(calc.cloudAnnualCost)}/yr)` : '(contact us)'}
                </span>
              </div>
            </div>
          </div>

          {/* RESULTS */}
          <div>
            <div
              style={{
                background: '#16121E',
                border: '1px solid #2D2048',
                borderRadius: 8,
                padding: 28,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  marginBottom: 24,
                  display: 'block',
                  fontFamily: 'system-ui',
                }}
              >
                Your Deploy Bottleneck Cost
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
                <StatCard label="Deploy wait cost" value={fmt(calc.deployWaitCost)} sub="per year" />
                <StatCard label="Rollback incident cost" value={fmt(calc.rollbackCost)} sub="per year" />
              </div>
              <div
                style={{
                  background: '#0F0C1A',
                  border: '2px solid #8B5CF6',
                  borderRadius: 8,
                  padding: '20px 24px',
                  textAlign: 'center',
                  marginBottom: 16,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: '#8888AA',
                    marginBottom: 8,
                    fontFamily: 'system-ui',
                  }}
                >
                  Total annual bottleneck cost
                </div>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    fontFamily: 'Georgia, serif',
                    color: '#8B5CF6',
                    lineHeight: 1,
                  }}
                >
                  {fmt(calc.totalBottleneckCost)}
                </div>
              </div>
            </div>

            <div
              style={{
                background: '#16121E',
                border: '1px solid #2D2048',
                borderRadius: 8,
                padding: 28,
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  marginBottom: 24,
                  display: 'block',
                  fontFamily: 'system-ui',
                }}
              >
                With Zephyr
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <StatCard
                  label="Hours recovered"
                  value={calc.hoursRecovered.toLocaleString()}
                  sub="engineer-hours/yr"
                  color="#8B5CF6"
                />
                <StatCard
                  label="Zephyr investment"
                  value={calc.cloudAnnualCost !== null ? fmt(calc.zephyrTotal) : 'Custom'}
                  sub="annual"
                />
              </div>
              <div
                style={{
                  background: '#0F0C1A',
                  border: `2px solid ${netPositive ? '#3a9a5a' : '#8B5CF6'}`,
                  borderRadius: 8,
                  padding: '20px 24px',
                  textAlign: 'center',
                  marginBottom: 12,
                }}
              >
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: '#8888AA',
                    marginBottom: 8,
                    fontFamily: 'system-ui',
                  }}
                >
                  Net annual benefit
                </div>
                <div
                  style={{
                    fontSize: 48,
                    fontWeight: 900,
                    fontFamily: 'Georgia, serif',
                    color: netPositive ? '#3a9a5a' : '#8B5CF6',
                    lineHeight: 1,
                  }}
                >
                  {calc.netBenefit >= 0 ? '+' : ''}
                  {fmtFull(calc.netBenefit)}
                </div>
              </div>
              {calc.cloudAnnualCost !== null && calc.paybackMonths > 0 && (
                <div
                  style={{
                    background: '#0F0C1A',
                    border: '1px solid #2D2048',
                    borderRadius: 6,
                    padding: '12px 16px',
                    textAlign: 'center',
                    fontSize: 13,
                    color: '#8888AA',
                    fontFamily: 'system-ui',
                  }}
                >
                  Payback period:{' '}
                  <strong style={{ color: '#8B5CF6' }}>
                    {calc.paybackMonths} {calc.paybackMonths === 1 ? 'month' : 'months'}
                  </strong>
                </div>
              )}
            </div>

            {/* BREAKDOWN */}
            <div style={{ background: '#16121E', border: '1px solid #2D2048', borderRadius: 8, padding: 28 }}>
              <span
                style={{
                  fontSize: 9,
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#8B5CF6',
                  marginBottom: 20,
                  display: 'block',
                  fontFamily: 'system-ui',
                }}
              >
                Breakdown
              </span>
              {[
                {
                  label: 'Bottleneck cost (total)',
                  value: fmtFull(calc.totalBottleneckCost),
                  note: 'Annual cost of current deploy friction',
                },
                {
                  label: 'Deploy wait recovery',
                  value: fmtFull(calc.waitRecovery),
                  note: '85% of deploy wait cost recovered',
                },
                {
                  label: 'Rollback recovery',
                  value: fmtFull(calc.rollbackRecovery),
                  note: '90% of rollback cost recovered',
                },
                {
                  label: 'Zephyr annual cost',
                  value: calc.cloudAnnualCost !== null ? fmtFull(calc.zephyrTotal) : 'Custom',
                  note: `${cloudSeats} seats/yr`,
                },
                {
                  label: 'Net benefit',
                  value: (calc.netBenefit >= 0 ? '+' : '') + fmtFull(calc.netBenefit),
                  note: 'Recovery minus Zephyr investment',
                  highlight: true,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto',
                    gap: '0 16px',
                    alignItems: 'center',
                    padding: '10px 0',
                    borderBottom: '1px solid #1e1e28',
                    fontFamily: 'system-ui',
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: '#8888AA' }}>{row.label}</span>
                  <span style={{ color: '#4a4a6a', fontSize: 11 }}>{row.note}</span>
                  <span
                    style={{
                      color: row.highlight ? (netPositive ? '#3a9a5a' : '#8B5CF6') : '#8B5CF6',
                      fontWeight: 700,
                    }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            background: 'linear-gradient(135deg, #16121E, #120F1C)',
            border: '1px solid #8B5CF6',
            borderRadius: 8,
            padding: '40px 44px',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: 40,
            alignItems: 'center',
          }}
        >
          <div>
            <h2 style={{ fontSize: 26, fontWeight: 900, marginBottom: 12 }}>
              The deploy tax is already paid.
              <br />
              The question is whether you keep paying it.
            </h2>
            <p style={{ fontSize: 15, color: '#8888AA', fontFamily: 'system-ui', lineHeight: 1.6 }}>
              This calculator is conservative — it only captures deploy wait time and rollback costs. It doesn't account
              for the downstream impact when non-engineering teams wait days for web changes. Zephyr removes the
              bottleneck. Starting with one line of code.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minWidth: 200 }}>
            <a
              href="https://app.zephyr-cloud.io"
              target="_blank"
              onClick={handleCta}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '12px 16px',
                background: '#8B5CF6',
                border: '1px solid #8B5CF6',
                borderRadius: 4,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: 'rgba(245,244,240,0.7)',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                  fontFamily: 'system-ui',
                }}
              >
                Start free
              </span>
              <span style={{ fontSize: 14, color: '#F5F4F0', fontFamily: 'system-ui' }}>app.zephyr-cloud.io</span>
            </a>
            <a
              href="https://docs.zephyr-cloud.io"
              target="_blank"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '12px 16px',
                background: '#0A0A0F',
                border: '1px solid #2D2048',
                borderRadius: 4,
                textDecoration: 'none',
                textAlign: 'center',
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  color: '#8888AA',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  marginBottom: 4,
                  fontFamily: 'system-ui',
                }}
              >
                Documentation
              </span>
              <span style={{ fontSize: 14, color: '#8B5CF6', fontFamily: 'system-ui' }}>docs.zephyr-cloud.io</span>
            </a>
          </div>
        </div>

        <footer
          style={{
            marginTop: 56,
            paddingTop: 24,
            borderTop: '1px solid #2D2048',
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 12,
            color: '#8888AA',
            fontFamily: 'system-ui',
          }}
        >
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            <img src={ZephyrWordmark} alt="Zephyr Cloud" style={{ height: 14 }} />
            <span>— Deploy Velocity Calculator · Results are estimates based on inputs provided</span>
          </span>
          <span style={{ color: '#8B5CF6', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>We All Build.</span>
        </footer>
      </div>
    </div>
  );
}
