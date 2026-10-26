import { ArrowRight } from 'lucide-react';

type StartCtaProps = {
  mode?: 'compact' | 'hero';
};

export function StartCta({ mode = 'compact' }: StartCtaProps) {
  const isHero = mode === 'hero';

  return (
    <div className={isHero ? 'w-full' : 'w-full px-4 py-4 md:px-6'}>
      <a
        href="https://app.zephyr-cloud.io/"
        target="_blank"
        rel="noopener"
        className={`group inline-flex w-full shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#7c3aed] bg-[#7c3aed] font-medium text-white shadow-[0_10px_24px_rgba(124,58,237,0.26)] transition hover:bg-[#8b5cf6] ${isHero ? 'h-12 px-5 text-[15px]' : 'h-10 px-3.5 text-sm'}`}
      >
        <span>Start now</span>
        <ArrowRight
          className={`transition group-hover:translate-x-0.5 ${isHero ? 'h-4 w-4' : 'h-3.5 w-3.5'}`}
          aria-hidden="true"
        />
      </a>
    </div>
  );
}
