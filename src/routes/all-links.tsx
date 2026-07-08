import discordQr from '@/images/all-links/discord.svg';
import githubQr from '@/images/all-links/github.svg';
import instagramQr from '@/images/all-links/instagram.svg';
import linkedinQr from '@/images/all-links/linkedin.svg';
import theAiPlatformQr from '@/images/all-links/theaiplatform.svg';
import xAiPlatformQr from '@/images/all-links/x-aiplatform.svg';
import xZephyrQr from '@/images/all-links/x-zephyr.svg';
import youtubeQr from '@/images/all-links/youtube.svg';
import zephyrCloudQr from '@/images/all-links/zephyr-cloud.svg';
import ZephyrWordmark from '@/images/wordmark-light.svg';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import {
  ArrowUpRight,
  Github,
  Globe,
  Instagram,
  Linkedin,
  ScanLine,
  Sparkles,
  Youtube,
  type LucideIcon,
} from 'lucide-react';
import { useState, type ComponentType } from 'react';

export const Route = createFileRoute('/all-links')({
  component: AllLinksPage,
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

function DiscordIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.317 4.369a19.79 19.79 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.865-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.74 19.74 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.1 13.1 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.009c.12.099.246.198.373.292a.077.077 0 0 1-.006.127 12.3 12.3 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.84 19.84 0 0 0 6.002-3.03.077.077 0 0 0 .032-.056c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028ZM8.02 15.331c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.955 2.419-2.157 2.419Zm7.975 0c-1.183 0-2.157-1.086-2.157-2.42 0-1.333.955-2.419 2.157-2.419 1.211 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419Z" />
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
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/ZephyrCloudIO',
    href: 'https://github.com/ZephyrCloudIO',
    qr: githubQr,
    icon: Github,
    accent: 'text-neutral-200',
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
    id: 'discord',
    label: 'Discord',
    handle: 'discord.gg/zephyrcloud',
    href: 'https://discord.gg/zephyrcloud',
    qr: discordQr,
    icon: DiscordIcon,
    accent: 'text-indigo-300',
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
  {
    id: 'youtube',
    label: 'YouTube',
    handle: 'youtube.com/@ZephyrCloud',
    href: 'https://www.youtube.com/@ZephyrCloud',
    qr: youtubeQr,
    icon: Youtube,
    accent: 'text-red-400',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: 'instagram.com/zephyrcloudio',
    href: 'https://www.instagram.com/zephyrcloudio',
    qr: instagramQr,
    icon: Instagram,
    accent: 'text-pink-400',
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

function AllLinksPage() {
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
          <a href="/" aria-label="Zephyr Cloud home" className="mx-auto mb-8 flex w-fit">
            <img src={ZephyrWordmark} alt="Zephyr" className="h-8 w-auto" />
          </a>
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
