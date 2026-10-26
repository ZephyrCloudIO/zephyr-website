import { Button } from '@/components/ui/button';
import { CTA } from './model';

export function ReleasePathCta() {
  return (
    <div className="mt-8 mb-5">
      <Button asChild size="lg">
        <a href={CTA.href}>{CTA.label}</a>
      </Button>
    </div>
  );
}
