import akamai from '@/images/clouds/akamai_white.webp';
import aws from '@/images/clouds/aws_white.webp';
import azure from '@/images/clouds/azure_white.webp';
import cloudflare from '@/images/clouds/cloudflare_white.webp';
import fastly from '@/images/clouds/fastly_white.webp';
import vercel from '@/images/clouds/vercel_white.webp';
import rspackLogo from '@/images/platforms/rspack.webp';
import viteLogo from '@/images/platforms/vite.webp';
import webpackLogo from '@/images/platforms/webpack.svg';
import { cn } from '@/lib/utils';
import React from 'react';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] as const;
type Month = (typeof months)[number];

const heatmap: Record<Month, string[]> = {
  Jan: ['.......', '.r.....', '..v....', 'l......', '...m...', '..r....'],
  Feb: ['.......', '...r...', '.......', '..p....', '...r...', '...r...'],
  Mar: ['.......', '....r..', '..m....', '...p...', '....r..', '....r..'],
  Apr: ['.......', '..m....', '...p...', '.....l.', '..r....', '...m...'],
  May: ['.......', '...m...', '..r....', '....p..', '..r..m.', '.......'],
  Jun: ['.......', '.r..r..', '...p...', '....m..', '..p....', '...r...'],
};

function cellPaint(ch: string): { fill: string; stroke: string; filter?: string } {
  const empty = { fill: 'none', stroke: 'rgba(255,255,255,0.16)' };
  switch (ch) {
    case 'r':
      return { fill: '#ff2e63', stroke: 'rgba(0,0,0,0)' };
    case 'm':
      return { fill: '#c1123d', stroke: 'rgba(0,0,0,0)' };
    case 'p':
      return { fill: '#d946ef', stroke: 'rgba(0,0,0,0)' };
    case 'l':
      return { fill: '#fbcfe8', stroke: 'rgba(0,0,0,0)' };
    case 'v':
      return { fill: '#ddd6fe', stroke: 'rgba(0,0,0,0)' };
    default:
      return empty;
  }
}

export function CoordinationGitGraph({ className }: { className?: string }) {
  const colsPerMonth = 7;
  const rows = 6;
  const cell = 10;
  const gap = 4;
  const monthGap = 10;
  const labelH = 16;

  const monthW = colsPerMonth * cell + (colsPerMonth - 1) * gap;
  const width = months.length * monthW + (months.length - 1) * monthGap;
  const height = labelH + rows * cell + (rows - 1) * gap;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn('h-auto w-full', className)}
      role="img"
      aria-label="Coordination timeline, git graph style"
    >
      {months.map((m, mi) => {
        const x0 = mi * (monthW + monthGap);
        return (
          <g key={m} transform={`translate(${x0},0)`}>
            <text
              x={0}
              y={11}
              fill="rgba(255,255,255,0.42)"
              fontSize="11"
              fontWeight="500"
              fontFamily="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
            >
              {m}
            </text>
            {Array.from({ length: rows * colsPerMonth }).map((_, idx) => {
              const r = Math.floor(idx / colsPerMonth);
              const c = idx % colsPerMonth;
              const row = heatmap[m][r] ?? ''.padEnd(colsPerMonth, '.');
              const ch = row[c] ?? '.';
              const { fill, stroke, filter } = cellPaint(ch);
              const x = c * (cell + gap);
              const y = labelH + r * (cell + gap);

              return (
                <rect
                  key={`${m}-${idx}`}
                  x={x}
                  y={y}
                  width={cell}
                  height={cell}
                  rx={1.5}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={ch === '.' ? 1 : 0}
                  filter={filter}
                />
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function BundlerIconTile({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        'group relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/40',
        'shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-colors hover:border-neutral-700',
      )}
      aria-label={label}
      title={label}
    >
      <div className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.10),transparent_55%)]" />
      <div className="relative">{children}</div>
      <span className="sr-only">{label}</span>
    </div>
  );
}

export function BundlerIconsRow({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <BundlerIconTile label="Vite">
        <img src={viteLogo} alt="" className="h-9 w-9 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]" />
      </BundlerIconTile>
      <BundlerIconTile label="Rspack">
        <img src={rspackLogo} alt="" className="h-10 w-10 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]" />
      </BundlerIconTile>
      <BundlerIconTile label="Webpack">
        <img src={webpackLogo} alt="" className="h-10 w-10 object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.45)]" />
      </BundlerIconTile>
    </div>
  );
}

const cloudLogos = [
  { name: 'Cloudflare', logo: cloudflare, status: 'Available' },
  { name: 'Fastly', logo: fastly, status: 'Available' },
  { name: 'Akamai', logo: akamai, status: 'Available' },
  { name: 'AWS', logo: aws, status: 'Available' },
  { name: 'Vercel', logo: vercel, status: 'Coming soon' },
  { name: 'Azure', logo: azure, status: 'Coming soon' },
] as const;

export function CloudIconsGrid({ className }: { className?: string }) {
  return (
    <div className={cn('grid grid-cols-3 gap-3', className)}>
      {cloudLogos.map((p) => (
        <div
          key={p.name}
          className={cn(
            'rounded-xl border border-neutral-800 bg-black/30 px-3 py-3',
            'transition-colors hover:border-neutral-700',
          )}
        >
          <div className="flex items-center justify-center">
            <img
              src={p.logo}
              alt={`${p.name} logo`}
              className={cn('h-6 w-auto object-contain', p.status !== 'Available' && 'opacity-60 grayscale')}
              loading="lazy"
            />
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-[11px] text-neutral-500">
            <span
              className={cn(
                'inline-block h-1.5 w-1.5 rounded-full',
                p.status === 'Available' ? 'bg-emerald-500/90' : 'bg-neutral-500/70',
              )}
              aria-hidden="true"
            />
            <span>{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
