import { createFileRoute } from '@tanstack/react-router';
import { Flag, Layers, Package2, Zap } from 'lucide-react';

export const Route = createFileRoute('/products/code-elimination-performance')({
  component: CodeEliminationPerformancePage,
});

function CodeEliminationPerformancePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-to-br from-violet-600 to-purple-600 rounded-2xl">
              <Zap className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-400 to-purple-600 bg-clip-text text-transparent">
            Enterprise Scale Code Elimination & Performance
          </h1>
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto">
            Advanced optimization techniques to reduce bundle size, eliminate dead code, and maximize application
            performance at scale.
            <br />
            Available with Enterprise custom pricing.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-12 md:gap-16">
          {/* Feature Flag Shaking */}
          <section className="relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Flag className="w-8 h-8 text-violet-500" />
                  <h2 className="text-3xl font-semibold">Feature Flag Shaking</h2>
                </div>
                <p className="text-neutral-400 mb-6">
                  Automatically eliminate unused feature flag code at build time. Our advanced tree shaking capabilities
                  removes all code paths for disabled features, resulting in smaller bundles and faster load times.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Dead code elimination for disabled features</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">
                      Build-time and Fetch-time optimization with zero runtime overhead
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Compatible with popular feature flag services</span>
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                <pre className="text-sm overflow-x-auto">
                  <code className="language-javascript">{`
/* @common:if [condition="featureFlags.enableNewFeature"] */
export function newFeature() {
  // This function references the utility functions above
  if (!validateFeature()) {
    return null;
  }

  const config = getFeatureConfig();
  const message = formatMessage(\`New feature v\${config.version} is enabled!\`);

  logFeatureUsage("newFeature");

  return {
    message,
    config,
    timestamp: new Date().toISOString()
  };
}
/* @common:endif */
                  `}</code>
                </pre>
              </div>
            </div>
          </section>

          {/* Module Federation Tree Shaking */}
          <section className="relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                  <pre className="text-sm overflow-x-auto">
                    <code className="language-javascript">{`// Shared module configuration
{
  shared: {
    react: {
      singleton: true,
      requiredVersion: '^18.0.0'
    },
    '@company/ui-kit': {
      singleton: true,
      strictVersion: true,
      // Only used components are included
      import: ['Button', 'Modal']
    }
  }
}

// Result: 87% reduction in shared deps`}</code>
                  </pre>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <Package2 className="w-8 h-8 text-violet-500" />
                  <h2 className="text-3xl font-semibold">Module Federation Tree Shaking</h2>
                </div>
                <p className="text-neutral-400 mb-6">
                  Intelligent tree shaking across federated modules ensures only the code you actually use is included
                  in your bundles. Eliminate duplicate dependencies and reduce overall application size across
                  micro-frontends.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Cross-application dependency optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Automatic shared module detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Smart chunking strategies for optimal caching</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Advanced Dictionary Compression */}
          <section className="relative">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Layers className="w-8 h-8 text-violet-500" />
                  <h2 className="text-3xl font-semibold">Advanced Dictionary Compression</h2>
                </div>
                <p className="text-neutral-400 mb-6">
                  Leverage shared dictionaries and advanced compression algorithms to achieve unprecedented reduction in
                  asset sizes. Our compression engine learns from your codebase patterns to create optimal dictionaries.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Up to 90% compression ratios for JavaScript</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Shared dictionaries across micro-frontends</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500 mt-1">✓</span>
                    <span className="text-neutral-300">Automatic dictionary optimization over time</span>
                  </li>
                </ul>
              </div>
              <div className="bg-neutral-900 rounded-lg p-6 border border-neutral-800">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Original Size</span>
                    <span className="text-white font-mono">2.4 MB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Gzip Compressed</span>
                    <span className="text-white font-mono">780 KB</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-400">Dictionary Compressed</span>
                    <span className="text-emerald-500 font-mono font-semibold">240 KB</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-neutral-700">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-300">Total Reduction</span>
                      <span className="text-emerald-500 font-semibold">90%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center">
          <div className="bg-gradient-to-r from-violet-900/20 to-purple-900/20 rounded-2xl p-12 border border-violet-900/30">
            <h3 className="text-3xl font-semibold mb-4">Ready to Optimize?</h3>
            <p className="text-neutral-300 mb-8 max-w-2xl mx-auto">
              Start eliminating unnecessary code and boost your application's performance today.
            </p>
            <div className="flex gap-4 justify-center">
              <a
                href="mailto:inbound@zephyr-cloud.io?subject=code-performance"
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
