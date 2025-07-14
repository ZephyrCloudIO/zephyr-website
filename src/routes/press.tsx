import { createFileRoute } from '@tanstack/react-router';
import { ExternalLink, Mail, Calendar } from 'lucide-react';

export const Route = createFileRoute('/press')({
  component: PressPage,
});

function PressPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Press
          </h1>
          <p className="text-xl text-neutral-400 mb-8">
            Latest news and announcements from Zephyr Cloud
          </p>

          {/* Contact */}
          <div className="flex items-center justify-center gap-2 text-neutral-300">
            <Mail className="w-5 h-5" />
            <span>Press inquiries:</span>
            <a
              href="mailto:press@zephyr-cloud.io"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              press@zephyr-cloud.io
            </a>
          </div>
        </div>

        {/* Press Releases */}
        <div className="space-y-8">
          <h2 className="text-3xl font-semibold mb-6">Press Releases</h2>

          {/* PR Newswire Article */}
          <article className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-colors">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Zephyr Cloud Launches New PaaS Enabling Sub-Second Frontend Code Deployment
                </h3>
                <div className="flex items-center gap-4 text-sm text-neutral-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime="2024-09-11">September 11, 2024</time>
                  </div>
                  <span>PR Newswire</span>
                </div>
                <p className="text-neutral-300 mb-4">
                  Zephyr Cloud, a new Platform-as-a-Service (PaaS) solution focused on revolutionizing frontend deployment, officially launches today. The platform addresses critical pain points in modern web development by enabling sub-second code deployments, instant rollbacks, and seamless version management across distributed applications.
                </p>
                <a
                  href="https://www.prnewswire.com/news-releases/zephyr-cloud-launches-new-paas-enabling-sub-second-frontend-code-deployment-302242806.html"
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300"
                >
                  Read full article
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </article>
        </div>

        {/* Company Information */}
        <div className="mt-16 bg-neutral-900 border border-neutral-800 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">About Zephyr Cloud</h2>
          <p className="text-neutral-300 mb-4">
            Zephyr Cloud is a cutting-edge Platform-as-a-Service (PaaS) solution that revolutionizes frontend deployment.
            Our platform enables development teams to deploy code in sub-seconds, manage versions effortlessly, and
            scale applications without infrastructure complexity.
          </p>
          <p className="text-neutral-300">
            Founded by industry veterans with deep expertise in module federation and distributed systems,
            Zephyr Cloud is backed by leading investors and serves enterprise customers across multiple industries.
          </p>
        </div>

        {/* Press Kit */}
        <div className="mt-12 text-center">
          <p className="text-neutral-400">
            For press kit, logos, and additional resources, please contact{' '}
            <a
              href="mailto:press@zephyr-cloud.io"
              className="text-emerald-400 hover:text-emerald-300 underline"
            >
              press@zephyr-cloud.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
