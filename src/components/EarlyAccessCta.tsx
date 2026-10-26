import { ArrowRight } from 'lucide-react';

export function EarlyAccessCta() {
  return (
    <div className="flex w-full max-w-[560px] shrink-0 flex-col gap-2.5 md:w-auto md:max-w-none md:items-end">
      <p className="m-0 px-1 text-left text-[0.8125rem] leading-5 font-medium md:pr-3 md:text-right">
        <span className="shimmer-text">Now in early access</span>
      </p>
      <a
        href="https://app.zephyr-cloud.io/"
        target="_blank"
        rel="noopener"
        className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl bg-released px-4 text-[0.8125rem] font-medium text-white outline-none transition-[background-color,transform] hover:bg-[#8b4df5] focus-visible:ring-2 focus-visible:ring-released-ink focus-visible:ring-offset-2 focus-visible:ring-offset-night active:translate-y-px md:self-end"
      >
        Get started
        <ArrowRight className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
