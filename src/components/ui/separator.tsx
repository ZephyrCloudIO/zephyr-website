import { cn } from '@/lib/utils';

export default function Separator({ className }: { className?: string }) {
  return <div className={cn('h-[0.2px]', className)} />;
}
