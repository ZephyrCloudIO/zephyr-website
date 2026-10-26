import discordQr from '@/images/all-links/discord.svg';
import githubQr from '@/images/all-links/github.svg';
import instagramQr from '@/images/all-links/instagram.svg';
import linkedinQr from '@/images/all-links/linkedin.svg';
import theAiPlatformQr from '@/images/all-links/theaiplatform.svg';
import xAiPlatformQr from '@/images/all-links/x-aiplatform.svg';
import xZephyrQr from '@/images/all-links/x-zephyr.svg';
import youtubeQr from '@/images/all-links/youtube.svg';
import zephyrCloudQr from '@/images/all-links/zephyr-cloud.svg';
import { createFileRoute } from '@tanstack/react-router';
import { ArrowUpRight, Github, Globe, Instagram, Linkedin, Sparkles, Youtube, type LucideIcon } from 'lucide-react';
import { type ComponentType, type CSSProperties } from 'react';

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
  },
  {
    id: 'the-ai-platform',
    label: 'The AI Platform',
    handle: 'theaiplatform.app',
    href: 'https://theaiplatform.app',
    qr: theAiPlatformQr,
    icon: Sparkles,
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'github.com/ZephyrCloudIO',
    href: 'https://github.com/ZephyrCloudIO',
    qr: githubQr,
    icon: Github,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'linkedin.com/company/zephyr-cloud',
    href: 'https://www.linkedin.com/company/zephyr-cloud/',
    qr: linkedinQr,
    icon: Linkedin,
  },
  {
    id: 'discord',
    label: 'Discord',
    handle: 'discord.gg/zephyrcloud',
    href: 'https://discord.gg/zephyrcloud',
    qr: discordQr,
    icon: DiscordIcon,
  },
  {
    id: 'x-zephyr',
    label: 'Zephyr Cloud on X',
    handle: '@ZephyrCloudIO',
    href: 'https://x.com/ZephyrCloudIO',
    qr: xZephyrQr,
    icon: XIcon,
  },
  {
    id: 'x-ai-platform',
    label: 'The AI Platform on X',
    handle: '@_TheAIPlatform',
    href: 'https://x.com/_TheAIPlatform',
    qr: xAiPlatformQr,
    icon: XIcon,
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: 'youtube.com/@ZephyrCloud',
    href: 'https://www.youtube.com/@ZephyrCloud',
    qr: youtubeQr,
    icon: Youtube,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: 'instagram.com/zephyrcloudio',
    href: 'https://www.instagram.com/zephyrcloudio',
    qr: instagramQr,
    icon: Instagram,
  },
];

function QrCard({ link }: { link: QrLink }) {
  const Icon = link.icon;

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener"
      aria-label={`Open ${link.label} (${link.handle})`}
      className="group flex h-full flex-col rounded-2xl border border-line bg-surface/70 p-2.5 transition-colors hover:border-line-strong sm:p-3"
    >
      {/* QR codes need a light quiet zone to scan reliably. */}
      <span className="block aspect-square overflow-hidden rounded-xl bg-white">
        <img
          src={link.qr}
          alt={`QR code for ${link.label}`}
          className="h-full w-full object-contain p-2 sm:p-3"
          draggable={false}
        />
      </span>

      <span className="flex items-start justify-between gap-2 px-1.5 pt-3 pb-1 sm:px-2 sm:pt-4">
        <span className="min-w-0">
          <span className="flex items-start gap-2">
            <Icon className="mt-0.5 size-4 shrink-0 text-ink-faint transition-colors group-hover:text-ink" />
            <span className="text-sm leading-snug font-medium text-ink sm:text-[0.9375rem]">{link.label}</span>
          </span>
          <span className="text-ident mt-1 hidden text-ink-faint [overflow-wrap:anywhere] sm:block">{link.handle}</span>
        </span>
        <ArrowUpRight
          className="mt-0.5 hidden size-4 shrink-0 text-ink-faint transition-colors group-hover:text-ink sm:block"
          aria-hidden
        />
      </span>
    </a>
  );
}

function AllLinksPage() {
  return (
    <section className="pt-16 pb-24 lg:pt-24 lg:pb-32">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-10">
        <header className="mx-auto max-w-2xl text-center">
          <p className="mb-6 text-sm text-ink-faint">All links</p>
          <h1 className="text-display m-0 text-ink">Connect with Zephyr</h1>
          <p className="text-lead mx-auto mt-6 mb-0 max-w-[30rem] text-ink-muted">
            Scan a QR code to connect with Zephyr Cloud and The AI Platform across the web and social.
          </p>
        </header>

        <ul className="m-0 mx-auto mt-12 grid max-w-[54rem] list-none grid-cols-2 gap-3 p-0 sm:grid-cols-3 sm:gap-4 lg:mt-14">
          {links.map((link, i) => (
            <li key={link.id} className="reveal" style={{ '--reveal-delay': `${(i % 3) * 70}ms` } as CSSProperties}>
              <QrCard link={link} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
