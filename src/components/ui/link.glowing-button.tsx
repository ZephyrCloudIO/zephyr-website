import React from 'react';
import { Link } from '@modern-js/runtime/router';
import { cn } from '@/lib/utils';

interface ButtonGlowProps {
  children: React.ReactNode;
  to: string;
  className?: string;
  external?: boolean;
}

const GlowingLinkButton: React.FC<ButtonGlowProps> = ({
  children,
  to,
  className,
  external,
  ...props
}) => {
  const baseClasses = cn(
    'w-full group relative z-10 px-8 items-center md:h-[44px] h-[40px] rounded-full justify-center transition-all flex overflow-hidden',
    'bg-black/30 backdrop-blur-sm',
    'border border-white/10 hover:border-white/20',
    'before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-white/10',
    'after:absolute after:inset-0 after:bg-gradient-to-r after:from-transparent after:via-white/5 after:to-white/10',
    'before:animate-glow-slow after:animate-glow-slow-reverse',
    'hover:shadow-[0_0_20px_2px_rgba(255,255,255,0.3)]',
    'transition-all duration-300',
    className,
  );

  if (external) {
    return (
      <a
        href={to}
        className={baseClasses}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={to} className={baseClasses} {...props}>
      {children}
    </Link>
  );
};

export default GlowingLinkButton;
