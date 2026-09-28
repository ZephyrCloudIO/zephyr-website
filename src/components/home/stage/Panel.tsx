import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

/** Window chrome shared by the terminal, editor, and file views on the stage. */
export function Panel({
  title,
  aside,
  children,
  footer,
  className,
  bodyClassName,
}: {
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-2xl border border-line-strong bg-[#0a0c11] shadow-[0_30px_80px_-40px_rgb(0_0_0/0.9)]',
        className,
      )}
    >
      <div className="flex h-10 shrink-0 items-center gap-3 border-b border-line px-4">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-surface-3" />
          <span className="size-2.5 rounded-full bg-surface-3" />
          <span className="size-2.5 rounded-full bg-surface-3" />
        </span>
        <span className="min-w-0 flex-1 truncate text-ident text-ink-faint">{title}</span>
        {aside ? <span className="shrink-0 text-xs text-ink-faint">{aside}</span> : null}
      </div>
      <div className={cn('min-h-0 flex-1 px-4 py-3.5', bodyClassName)}>{children}</div>
      {footer ? <div className="shrink-0 border-t border-line">{footer}</div> : null}
    </div>
  );
}
