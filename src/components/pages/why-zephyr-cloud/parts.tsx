import { cn } from '@/lib/utils';
import { Link } from '@tanstack/react-router';
import { ArrowRight, Check, Gauge, Shield, Sparkles, Timer } from 'lucide-react';
import React from 'react';

export function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute -top-56 left-1/2 h-[520px] w-[920px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-56 left-1/3 h-[560px] w-[980px] -translate-x-1/2 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(16,185,129,0.20),transparent_35%),radial-gradient(circle_at_82%_20%,rgba(56,189,248,0.16),transparent_38%),radial-gradient(circle_at_50%_92%,rgba(245,158,11,0.08),transparent_45%)]" />
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/40 to-black" />
    </div>
  );
}

export function Section({
  id,
  kicker,
  title,
  icon: Icon,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="mt-16 scroll-mt-28">
      <div className="flex items-center gap-3 text-sm text-neutral-400">
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60">
          <Icon className="h-4 w-4 text-emerald-400" />
        </span>
        <span className="uppercase tracking-wide">{kicker}</span>
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

export function PromiseCard({ icon, title, detail }: { icon: React.ReactNode; title: string; detail: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-neutral-800 bg-black/30 p-3">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/60 text-emerald-300">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-0.5 text-xs text-neutral-400">{detail}</p>
      </div>
    </div>
  );
}

export function Callout({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="flex gap-3 rounded-xl border border-neutral-800 bg-black/30 p-4">
      <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950/60 text-neutral-200">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-white">{title}</p>
        <p className="mt-1 text-sm text-neutral-400">{body}</p>
      </div>
    </div>
  );
}

export function PersonaCard({
  className,
  title,
  subtitle,
  items,
  icon,
}: {
  className?: string;
  title: string;
  subtitle: string;
  items: string[];
  icon: React.ReactNode;
}) {
  return (
    <div className={cn('rounded-2xl border border-neutral-800 bg-neutral-950/50 p-6', className)}>
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-white">{title}</p>
          <p className="mt-1 text-sm text-neutral-400">{subtitle}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/60 text-emerald-300">
          {icon}
        </div>
      </div>
      <ul className="mt-5 space-y-3 text-sm text-neutral-300">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check className="mt-0.5 h-4 w-4 text-emerald-400" />
            <span className="text-pretty">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function EnterpriseRibbon() {
  return (
    <div className="mt-8 relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/50 p-5">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute -bottom-28 -right-28 h-72 w-72 rounded-full bg-violet-500/12 blur-3xl" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:radial-gradient(circle_at_25%_10%,black,transparent_62%)]" />
      </div>

      <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2 text-sm font-medium text-white">
            <Sparkles className="h-4 w-4 text-emerald-400" />
            <span>Enterprise shipping, simplified</span>
          </div>
          <p className="mt-1 text-pretty text-sm text-neutral-300">
            Purpose-built for <span className="text-white">release velocity</span>, with{' '}
            <span className="text-white">risk reduction</span> baked in.
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { icon: <Gauge className="h-3.5 w-3.5 text-emerald-300" />, label: 'Faster cadence' },
              { icon: <Shield className="h-3.5 w-3.5 text-violet-300" />, label: 'Safer recovery' },
              { icon: <Timer className="h-3.5 w-3.5 text-sky-300" />, label: 'Less coordination' },
            ].map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-black/30 px-3 py-1 text-xs text-neutral-200"
              >
                {chip.icon}
                <span>{chip.label}</span>
              </span>
            ))}
          </div>
        </div>

        <Link
          to="/pricing"
          className={cn(
            'inline-flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium',
            'border-neutral-800 bg-black/30 text-white hover:border-neutral-700 hover:bg-black/40',
          )}
        >
          Pricing <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
