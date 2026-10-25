import { cn } from '@/lib/utils';
import { Check, Copy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface CommandChipProps {
  command: string;
  size?: 'md' | 'sm';
  /** Let long commands wrap instead of truncating, so the whole command stays readable. */
  wrap?: boolean;
  className?: string;
}

/** A shell command you can copy with one click. */
export function CommandChip({ command, size = 'md', wrap = false, className }: CommandChipProps) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked (permissions, insecure context); the command stays selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      translate="no"
      className={cn(
        'group inline-flex max-w-full items-center rounded-xl border border-line-strong bg-surface text-left outline-none transition-colors',
        'hover:border-deployed/60 hover:bg-surface-2 focus-visible:ring-2 focus-visible:ring-released-ink',
        size === 'md' ? 'h-12 gap-3 px-4 text-ident text-[0.875rem]' : 'min-h-8 gap-2 rounded-lg px-2.5 text-ident',
        wrap && 'h-auto py-1.5',
        className,
      )}
    >
      <span aria-hidden className="text-ink-faint">
        $
      </span>
      <span className={cn('min-w-0 text-ink select-all', wrap ? 'break-all' : 'truncate')}>{command}</span>
      <span
        aria-hidden
        className={cn(
          'ml-auto flex shrink-0 items-center gap-1 pl-1 text-xs transition-colors',
          copied ? 'text-live' : 'text-ink-faint group-hover:text-ink-muted',
        )}
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        {size === 'md' ? <span className="hidden font-sans sm:inline">{copied ? 'Copied' : 'Copy'}</span> : null}
      </span>
      <span className="sr-only" aria-live="polite">
        {copied ? `Copied ${command}` : `Copy ${command}`}
      </span>
    </button>
  );
}
