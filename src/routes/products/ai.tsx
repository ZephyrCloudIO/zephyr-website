import { AppScreenshot } from '@/components/AppScreenshot';
import { SignupForm } from '@/components/SignupForm';
import { UnicornBackground } from '@/components/UnicornBackground';
import ZephyrLogo from '@/images/zephyr-logo.svg';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/products/ai')({
  component: AIPage,
});

function AIPage() {
  const [shaderReady, setShaderReady] = useState(false);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Scoped animations — only affect this page */}
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
        .tilt-in {
          transform-origin: center top;
          animation: ai-tilt-in 2.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .shimmer-text {
          color: rgba(255, 255, 255, 0.75);
          mask-image: linear-gradient(-60deg, rgba(0,0,0,0.6) 40%, rgb(0,0,0) 50%, rgba(0,0,0,0.6) 60%);
          mask-size: 300%;
          -webkit-mask-image: linear-gradient(-60deg, rgba(0,0,0,0.6) 40%, rgb(0,0,0) 50%, rgba(0,0,0,0.6) 60%);
          -webkit-mask-size: 300%;
          animation: ai-shimmer 3s ease-in-out infinite;
        }
      `}</style>

      {/* Background WebGL scene — positioned relative to this container, not viewport */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full">
        <UnicornBackground onLoad={() => setShaderReady(true)} />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center gap-5 px-6 pt-20 pb-32 md:pt-16">
        {/* Header row */}
        <div
          className="flex w-full flex-col gap-6 px-0 md:flex-row md:items-center md:justify-between"
          style={{
            opacity: shaderReady ? 1 : 0,
            transform: shaderReady ? 'translateY(0)' : 'translateY(10px)',
            ...(shaderReady && {
              transition: 'opacity 0.8s ease-out, transform 0.8s ease-out',
            }),
          }}
        >
          {/* Left: Logo + text */}
          <div className="flex items-center gap-4">
            <img src={ZephyrLogo} alt="Zephyr" width={49} height={49} className="shrink-0 rounded-[10px]" />
            <div className="flex flex-col gap-1.5 text-white">
              <p className="text-[15px] font-bold leading-[22px]">Zephyr is the AI Super App</p>
              <p className="text-sm font-normal leading-[22px]">This is where humans and AI do real work.</p>
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
