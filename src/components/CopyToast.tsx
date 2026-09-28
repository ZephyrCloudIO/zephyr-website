import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

/** Bottom-center confirmation, clear of the Intercom launcher in the bottom-right corner. */
export function CopyToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'fixed bottom-6 left-1/2 z-[2147483647] flex -translate-x-1/2 items-center gap-2.5 rounded-xl border border-line-strong bg-surface-2 px-4 py-3 text-sm whitespace-nowrap text-ink shadow-lg transition-[opacity,translate] duration-300',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      )}
    >
      <Check className="size-4 shrink-0 text-live" aria-hidden />
      <span>{message}</span>
    </div>
  );
}
