import type { ChangelogCategory as Category } from '@/lib/changelog/types';
import { cn } from '@/lib/utils';
import { Code, Globe, Package, Rocket, Shield, Zap, type LucideIcon } from 'lucide-react';

const CATEGORIES: Record<Category, { label: string; icon: LucideIcon }> = {
  feature: { label: 'Feature', icon: Rocket },
  performance: { label: 'Performance', icon: Zap },
  integration: { label: 'Integration', icon: Package },
  security: { label: 'Security', icon: Shield },
  platform: { label: 'Platform', icon: Globe },
  dx: { label: 'Developer experience', icon: Code },
};

/** Category as structure, not decoration: steel icon, sentence-case label. */
export function ChangelogCategoryLabel({
  category,
  className,
}: {
  category: Category | undefined;
  className?: string;
}) {
  if (!category) return null;

  const meta = CATEGORIES[category];
  const Icon = meta?.icon;

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      {Icon ? <Icon className="size-3.5 text-deployed" aria-hidden /> : null}
      {meta?.label ?? category}
    </span>
  );
}
