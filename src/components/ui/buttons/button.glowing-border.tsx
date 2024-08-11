import { Link } from '@modern-js/runtime/router';
import { cn } from '@/lib/utils';
import './assets/button.css';

export type GlowingButtonProps = {
  className?: string;
  children?: string;
  textClassName?: string;
};
export default function GlowingButton({
  children,
  ...props
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="group">
      <div className="button-rectangle">
        <div className="top-layer"></div>
        <div className="button-children">
          {' '}
          <p className="font-outfit-light antialiased font-thin text-sm tracking-wide text-zinc-100">
            {children}
          </p>
        </div>{' '}
      </div>
    </div>
  );
}
