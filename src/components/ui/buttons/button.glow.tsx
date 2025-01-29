import { cn } from '@/lib/utils';
import type React from 'react';

interface ButtonGlowProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

const ButtonGlow: React.FC<ButtonGlowProps> = ({
  children,
  className,
  icon,
  ...props
}) => {
  return (
    <button
      className={cn(
        'w-full group relative z-10 px-8 items-center md:h-[44px] h-[40px] rounded-full justify-center transition-all flex overflow-hidden gap-2',
        'bg-black/30 backdrop-blur-sm',
        'border border-white/10 hover:border-white/20',
        'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-white/10 before:-z-10',
        'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-white/10 after:-z-10',
        'before:animate-glow-slow after:animate-glow-slow-reverse',
        'hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.3)]',
        'transition-all duration-300',
        className,
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">
        {icon && (
          <span className="w-5 h-5 flex items-center justify-center">
            {icon}
          </span>
        )}
        {children}
      </span>
    </button>
  );
};

export default ButtonGlow;
