import { cn } from '@/lib/utils';
import './assets/button.css';

export default function TopRightGlowButton({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="button-rectangle group">
        <div
          className={cn('top-layer', {
            hidden: children === 'Get Started',
          })}
        />
        {children !== 'Get Started' && <div className="light-glow" />}
        <div
          className={cn('button-children', {
            'border border-zinc-100/50': children === 'Get Started',
          })}
        >
          {' '}
          <p className="font-outfit-light antialiased font-thin md:text-sm text-xs tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-zinc-300 via-zinc-200 to-zinc-100">
            {children}
          </p>
        </div>{' '}
      </div>
    </div>
  );
}
