import productScreenshot from '@/images/products/zephyr-ai-landing.png';
import { createFileRoute } from '@tanstack/react-router';
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
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        <div className="text-center mb-6">
          <h1 className="text-5xl font-bold mb-6">Zephyr AI - Superapp</h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">Where humans and AI agents do real work.</p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2">
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900">
              <img src={productScreenshot} alt="Zephyr AI Super App Interface" className="w-full h-auto" />
            </div>
          </div>
          <div className="bg-neutral-900 rounded-xl border border-neutral-700 p-6">
            <h2 className="text-2xl font-bold mb-2 text-white pb-6">Get Early Access</h2>
            <div id="hubspot-form-container" />
          </div>
        </div>
      </div>
    </div>
  );
}
