import { Button } from '@/components/ui/button';
import { createFileRoute } from '@tanstack/react-router';
import { Lock, Network, Server } from 'lucide-react';
import { useEffect } from 'react';

// Declare HubSpot types for TypeScript
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: { portalId: string; formId: string; region: string; target: string }) => void;
      };
    };
  }
}

export const Route = createFileRoute('/products/ai')({
  component: AIPage,
});

function AIPage() {
  useEffect(() => {
    // Load HubSpot Forms API
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.async = true;

    script.onload = () => {
      // Create form after script loads
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: '46982563',
          formId: 'f1595bbd-95a2-4ee1-b7db-c8071152dc5b',
          region: 'na1',
          target: '#hubspot-form-container',
        });
      }
    };

    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-6">Zephyr AI - Super App</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">Where humans and AI agents do real work.</p>
        </div>

        {/* Key Features Banner */}
        <div className="bg-gradient-to-r from-emerald-900/20 to-emerald-700/20 border border-emerald-700/30 rounded-lg p-6 mb-16">
          <div className="flex flex-wrap items-center justify-center gap-8 text-base">
            <div className="flex items-center gap-2">
              <Server className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">Your systems</span>
            </div>
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">Shared context</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-emerald-400" />
              <span className="font-medium">Full control</span>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {/* What You'll See */}
          <div className="relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 text-white">What You'll See</h2>
              <ul className="space-y-3 text-sm text-neutral-300">
                <li className="flex gap-3">
                  <span className="text-emerald-400 text-base">✓</span>
                  <span>Humans + agents, same threads</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 text-base">✓</span>
                  <span>Real code. Real UI. No demos.</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 text-base">✓</span>
                  <span>Inspectable execution steps</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-emerald-400 text-base">✓</span>
                  <span>Full process visibility</span>
                </li>
              </ul>
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <p className="text-neutral-500 text-xs font-mono uppercase tracking-wider">No black boxes.</p>
              </div>
            </div>
          </div>

          {/* The Problem */}
          <div className="relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 text-white">The Problem</h2>
              <div className="space-y-4 text-sm text-neutral-300">
                <div>
                  <p className="font-medium text-white">AI tools made output cheap</p>
                  <p className="text-neutral-400 mt-1">Everyone can generate. Few can verify.</p>
                </div>
                <div>
                  <p className="font-medium text-white">Trust became expensive</p>
                  <p className="text-neutral-400 mt-1">Coordination costs skyrocketed.</p>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800">
                <p className="text-white font-semibold">We fix coordination.</p>
              </div>
            </div>
          </div>

          {/* What You Can Do */}
          <div className="relative overflow-hidden rounded-xl p-8 bg-gradient-to-br from-neutral-900 to-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-6 text-white">What You Can Do</h2>
              <ul className="space-y-3 text-sm text-neutral-300">
                <li className="flex gap-3">
                  <span className="text-blue-400 text-base">→</span>
                  <span>Spin up live sessions</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 text-base">→</span>
                  <span>Pull agents into production work</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 text-base">→</span>
                  <span>Audit every decision</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-400 text-base">→</span>
                  <span>Experiment fearlessly</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="rounded-2xl bg-neutral-900 p-8 lg:p-10 border border-neutral-700">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Get Started</h2>

            {/* Early Access Disclaimer */}
            <div className="text-center mb-6">
              <p className="text-sm text-neutral-400">
                <span className="text-yellow-500 font-semibold">Early Access</span> — This is early. Edges are sharp.
                That's the point.
              </p>
            </div>

            <div className="flex flex-col items-center gap-5 mb-6">
              <a href="https://agency.zephyr-cloud.io" target="_blank">
                <Button size="lg" className="text-base px-10 py-5 bg-emerald-600 hover:bg-emerald-500 text-white">
                  Enter Super App
                </Button>
              </a>

              <div className="flex items-center gap-4 w-full max-w-sm">
                <div className="flex-1 border-t border-neutral-700" />
                <span className="text-neutral-500 text-xs">or</span>
                <div className="flex-1 border-t border-neutral-700" />
              </div>
            </div>

            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold mb-4 text-center text-neutral-300">Request Access</h3>
              <div id="hubspot-form-container" />
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pt-12 pb-8 text-center border-t border-neutral-800 mt-12">
          <p className="text-xs text-neutral-500 font-medium tracking-wider uppercase">Maximizing Human Potential</p>
        </footer>
      </div>
    </div>
  );
}
