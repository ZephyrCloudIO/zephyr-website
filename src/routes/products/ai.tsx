import { AppScreenshot } from '@/components/AppScreenshot';
import { SignupForm } from '@/components/SignupForm';
import { UnicornBackground } from '@/components/UnicornBackground';
import ZephyrLogo from '@/images/zephyr-logo.svg';
import { cn } from '@/lib/utils';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/products/ai')({
  component: AIPage,
});

function AIPage() {
  const [shaderReady, setShaderReady] = useState(false);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      setShaderReady(true);
    }, 1800);

    return () => {
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Scoped animations — only affect this page. The intro and screenshot wait for the shader, but only once
          JS runs (html[data-motion='on']), so crawlers and no-JS visitors always see them. */}
      <style>{`
        @keyframes ai-shake {
          0%, 100% { transform: translateX(0); }
          10%, 50%, 90% { transform: translateX(-4px); }
          30%, 70% { transform: translateX(4px); }
        }
        @keyframes ai-tilt-in {
          from { transform: perspective(1200px) rotateX(8deg) translateY(40px); }
          to { transform: perspective(1200px) rotateX(0deg) translateY(0); }
        }
        @keyframes ai-shimmer {
          from { mask-position: 150%; }
          to { mask-position: -50%; }
        }
        .animate-shake { animation: ai-shake 0.5s ease-in-out; }
        [data-motion='on'] .ai-intro {
          opacity: 0;
          transform: translateY(10px);
        }
        [data-motion='on'] .ai-intro.is-ready {
          opacity: 1;
          transform: none;
          transition: opacity 0.8s var(--ease-out-soft), transform 0.8s var(--ease-out-soft);
        }
        [data-motion='on'] .ai-shot {
          opacity: 0;
        }
        [data-motion='on'] .ai-shot.is-ready {
          opacity: 1;
          transform-origin: center top;
          transition: opacity 0.6s ease-out 0.15s;
          animation: ai-tilt-in 2.4s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both;
        }
        .shimmer-text {
          color: var(--ze-ink-muted);
          mask-image: linear-gradient(-60deg, rgba(0,0,0,0.6) 40%, rgb(0,0,0) 50%, rgba(0,0,0,0.6) 60%);
          mask-size: 300%;
          -webkit-mask-image: linear-gradient(-60deg, rgba(0,0,0,0.6) 40%, rgb(0,0,0) 50%, rgba(0,0,0,0.6) 60%);
          -webkit-mask-size: 300%;
          animation: ai-shimmer 3s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-shake, .shimmer-text { animation: none; }
          [data-motion='on'] .ai-intro,
          [data-motion='on'] .ai-shot {
            opacity: 1;
            transform: none;
            transition: none;
            animation: none;
          }
        }
      `}</style>

      {/* Background WebGL scene — positioned relative to this container, not viewport */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full">
        <UnicornBackground onLoad={() => setShaderReady(true)} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1320px] flex-col items-center gap-2 px-5 pt-10 pb-28 sm:px-8 md:pt-6 lg:px-10">
        {/* Header row */}
        <div
          className={cn(
            'ai-intro flex w-full flex-col gap-6 md:flex-row md:items-center md:justify-between',
            shaderReady && 'is-ready',
          )}
        >
          {/* Left: Logo + text */}
          <div className="flex items-center gap-4">
            <img src={ZephyrLogo} alt="Zephyr" width={49} height={49} className="shrink-0 rounded-[10px]" />
            <div className="flex flex-col gap-1.5">
              <h1 className="m-0 text-[0.9375rem] leading-[22px] font-semibold text-ink">Zephyr is the AI Super App</h1>
              <p className="m-0 text-sm leading-[22px] text-ink-muted">This is where humans and AI do real work.</p>
            </div>
          </div>

          {/* Right: Early access signup */}
          <SignupForm />
        </div>

        {/* App mockup screenshot */}
        <AppScreenshot shaderReady={shaderReady} />
      </div>
    </div>
  );
}
