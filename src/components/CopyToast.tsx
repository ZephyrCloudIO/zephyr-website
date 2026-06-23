import { Code2 } from 'lucide-react';

export function CopyToast({ message, visible }: { message: string; visible: boolean }) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-[2147483647] flex items-center gap-3 px-5 py-3.5 bg-card border border-border rounded-xl shadow-lg text-sm text-foreground transition-all duration-300 whitespace-nowrap ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}
    >
      <Code2 className="h-4 w-4 text-muted-foreground shrink-0" />
      <span>{message}</span>
    </div>
  );
}
