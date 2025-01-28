import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ButtonHighlightProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'default' | 'wide';
  className?: string;
}

export const ButtonHighlight: React.FC<ButtonHighlightProps> = ({
  children,
  variant = 'default',
  className,
  ...props
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
  };

  const widthClass =
    variant === 'wide' ? 'md:w-[166.2px] w-[140px]' : 'w-fit px-8';

  return (
    <button
      className={cn(
        'group relative z-10 items-center md:h-[44px] h-[40px] border-2 border-zinc-500/30',
        'rounded-full hover:border-zinc-400/80 justify-center bg-zinc-900',
        'transition-all lg:hover:!opacity-100 flex lg:hover:bg-zinc-800 overflow-hidden',
        widthClass,
        className,
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={
        {
          '--mouse-x': `${mousePosition.x}px`,
          '--mouse-y': `${mousePosition.y}px`,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_var(--mouse-x)_var(--mouse-y),rgba(120,120,120,0.15),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <p className="font-outfit-light antialiased font-thin tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-zinc-600 via-zinc-400 to-zinc-100">
        {children}
      </p>
    </button>
  );
};

export default ButtonHighlight;
