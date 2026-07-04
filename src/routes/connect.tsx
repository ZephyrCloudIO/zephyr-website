import linkedinQr from '@/images/connect/linkedin.svg';
import theAiPlatformQr from '@/images/connect/theaiplatform.svg';
import xAiPlatformQr from '@/images/connect/x-aiplatform.svg';
import xZephyrQr from '@/images/connect/x-zephyr.svg';
import zephyrCloudQr from '@/images/connect/zephyr-cloud.svg';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Globe, Linkedin, ScanLine, Sparkles, type LucideIcon } from 'lucide-react';
import { useState, type ComponentType } from 'react';

export const Route = createFileRoute('/connect')({
  component: ConnectPage,
});

type IconComponent = LucideIcon | ComponentType<{ className?: string }>;

type QrLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
  qr: string;
  icon: IconComponent;
  accent: string;
};

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const links: QrLink[] = [
  {
    id: 'zephyr-cloud',
    label: 'Zephyr Cloud',
    handle: 'zephyr-cloud.io',
    href: 'https://zephyr-cloud.io',
    qr: zephyrCloudQr,
    icon: Globe,
    accent: 'text-violet-300',
  },
  {
    id: 'the-ai-platform',
    label: 'The AI Platform',
    handle: 'theaiplatform.app',
    href: 'https://theaiplatform.app',
    qr: theAiPlatformQr,
    icon: Sparkles,
    accent: 'text-emerald-300',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/company/zephyr-cloud',
    href: 'https://www.linkedin.com/company/zephyr-cloud/',
    qr: linkedinQr,
    icon: Linkedin,
    accent: 'text-sky-300',
  },
  {
    id: 'x-zephyr',
    label: 'Zephyr Cloud on X',
    handle: '@ZephyrCloudIO',
    href: 'https://x.com/ZephyrCloudIO',
    qr: xZephyrQr,
    icon: XIcon,
    accent: 'text-neutral-200',
  },
  {
    id: 'x-ai-platform',
    label: 'The AI Platform on X',
    handle: '@_TheAIPlatform',
    href: 'https://x.com/_TheAIPlatform',
    qr: xAiPlatformQr,
    icon: XIcon,
    accent: 'text-neutral-200',
  },
];

function QrCard({ link, active, onToggle }: { link: QrLink; active: boolean; onToggle: () => void }) {
  const Icon = link.icon;

  return (
    <article
      className={cn(
        'group relative flex w-full max-w-[300px] flex-col overflow-hidden rounded-3xl border bg-white/5 p-5 backdrop-blur transition-all duration-300 sm:w-[300px]',
        active
          ? 'border-violet-400/40 shadow-2xl shadow-violet-950/40 ring-1 ring-violet-400/30'
          : 'border-white/10 hover:border-white/20',
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={active}
        aria-label={active ? `Hide ${link.label} QR code` : `Reveal ${link.label} QR code`}
        className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white outline-none focus-visible:ring-2 focus-visible:ring-violet-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
      >
        <img
          src={link.qr}
          alt={active ? `QR code linking to ${link.href}` : ''}
          className={cn(
            'h-full w-full object-contain p-4 transition-all duration-500 ease-out',
            active ? 'scale-100 blur-0' : 'scale-105 blur-[10px]',
          )}
          draggable={false}
        />

        <div
          aria-hidden={active}
          className={cn(
            'absolute inset-0 flex flex-col items-center justify-center gap-2 bg-neutral-950/45 text-white transition-opacity duration-300',
            active ? 'pointer-events-none opacity-0' : 'opacity-100',
          )}
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 backdrop-blur">
            <ScanLine className="h-6 w-6" />
          </span>
          <span className="text-sm font-medium tracking-wide">Tap to reveal</span>
        </div>
      </button>

      <div className="mt-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <Icon className={cn('h-4 w-4 shrink-0', link.accent)} />
            <h2 className="text-base font-semibold leading-tight text-white">{link.label}</h2>
          </div>
          <p className="mt-1 text-sm break-words text-neutral-400">{link.handle}</p>
        </div>

        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(event) => event.stopPropagation()}
          aria-label={`Open ${link.label} in a new tab`}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-neutral-300 transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

function ConnectPage() {
  const [revealed, setRevealed] = useState<Set<string>>(() => new Set());

  const toggle = (id: string) => {
    setRevealed((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,0.22),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_85%,rgba(59,130,246,0.18),transparent_42%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-4 py-16 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200">
            <ScanLine className="h-4 w-4" />
            Scan to connect
          </span>
          <h1 className="mt-6 text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
            Connect with Zephyr
          </h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-300 sm:text-lg">Tap any code to reveal it.</p>
        </header>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          {links.map((link) => (
            <QrCard key={link.id} link={link} active={revealed.has(link.id)} onToggle={() => toggle(link.id)} />
          ))}
        </div>
      </div>
    </div>
  );
}
