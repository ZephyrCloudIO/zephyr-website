import { CircuitBackground } from '@/components/CircuitBackground';
import { CodeBlock } from '@/components/CodeBlock';
import { getFeaturedEvent } from '@/data/events';
import { ArrowRight, CalendarDays, Check, Copy } from 'lucide-react';
import React, { useState } from 'react';

export const HeroSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const featuredEvent = getFeaturedEvent();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('npx create-zephyr-apps@latest');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <section className="hero relative -mt-16 pt-36 md:pt-48 pb-20 md:pb-32 text-center overflow-hidden">
      {/* Circuit board background - hero only */}
      <CircuitBackground />
      {/* Subtle radial white glow behind hero content */}
      <div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 50% 45%, rgba(255, 255, 255, 0.04) 0%, transparent 70%),
            radial-gradient(ellipse 40% 35% at 50% 40%, rgba(16, 185, 129, 0.06) 0%, transparent 60%)
          `,
        }}
      />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent calc(100% / 20 - 1px),
              rgb(38, 38, 38) calc(100% / 20 - 1px),
              rgb(38, 38, 38) calc(100% / 20)
            ),
            repeating-linear-gradient(
              90deg,
              transparent,
              transparent calc(100% / 20 - 1px),
              rgb(38, 38, 38) calc(100% / 20 - 1px),
              rgb(38, 38, 38) calc(100% / 20)
            )
          `,
        }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Featured Event Pill */}
        {featuredEvent && featuredEvent.link && (
          <div className="flex justify-center mb-8">
            <a
              href={featuredEvent.link}
              target="_blank"
              rel="noopener"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-900/20 to-emerald-800/20 border border-emerald-700/30 hover:border-emerald-600/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <CalendarDays size={16} className="text-emerald-400" />
              <span className="text-sm text-neutral-300">
                <span className="font-medium text-emerald-400">{featuredEvent.title}</span>
                <span className="mx-2 text-neutral-500">•</span>
                <span>{featuredEvent.date}</span>
                <span className="mx-2 text-neutral-500">•</span>
                <span>{featuredEvent.location}</span>
              </span>
              <ArrowRight size={14} className="text-emerald-400 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        )}

        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight uppercase">
          The fastest way to go from
          <br />
          <span className="bg-gradient-to-b from-green-300 via-emerald-500 to-emerald-800 bg-clip-text text-transparent drop-shadow-[0_0_24px_rgba(16,185,129,0.3)]">
            Idea to Production
          </span>
        </h1>
        <p className="mt-6 text-lg md:text-xl max-w-2xl mx-auto">
          From the team that brought you{' '}
          <a href="https://module-federation.io/" target="_blank" className="text-emerald-700 hover:underline">
            Module Federation
          </a>
          ;
          <br />
          go from code to globally available in under a second.
        </p>

        <div className="mt-10 relative max-w-xl mx-auto">
          <div className="relative group cursor-pointer" onClick={handleCopy}>
            <CodeBlock className="text-left !bg-neutral-900/70 !border-neutral-700/70 backdrop-blur-sm transition-all group-hover:!bg-neutral-900/80">
              <span className="text-emerald-700">$</span> npx create-zephyr-apps@latest
              <br />
              <span className="text-neutral-500 text-xs flex items-center gap-1 mt-1">
                {copied ? (
                  <>
                    <Check className="w-3 h-3" />
                    copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    press to copy
                  </>
                )}
              </span>
            </CodeBlock>
          </div>

          {/* Dotted lines SVG */}
          <div className="absolute top-1/2 left-1/2 w-full h-full -z-10 hidden lg:block">
            <svg width="100%" height="100%" viewBox="0 0 800 400" className="absolute inset-0 opacity-30">
              <path
                d="M150 100 C 250 100, 250 200, 400 200"
                stroke="gray"
                strokeWidth="1"
                fill="transparent"
                strokeDasharray="5,5"
              />
              <path
                d="M650 100 C 550 100, 550 200, 400 200"
                stroke="gray"
                strokeWidth="1"
                fill="transparent"
                strokeDasharray="5,5"
              />
              <path
                d="M180 300 C 280 300, 280 200, 400 200"
                stroke="gray"
                strokeWidth="1"
                fill="transparent"
                strokeDasharray="5,5"
              />
              <path
                d="M620 300 C 520 300, 520 200, 400 200"
                stroke="gray"
                strokeWidth="1"
                fill="transparent"
                strokeDasharray="5,5"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
