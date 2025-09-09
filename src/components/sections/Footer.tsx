import SOC2Logo from '@/images/soc2-logo.webp';
import ZephyrWordmark from '@/images/zephyr-wordmark.svg';
import { Link } from '@tanstack/react-router';
import { Activity } from 'lucide-react';
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-16 bg-neutral-950 border-t border-neutral-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img src={ZephyrWordmark} alt="Zephyr Logo" width={128} />
            </Link>
            <img src={SOC2Logo} alt="SOC2 Compliant" className="h-12 mb-4" />
            <p className="text-xs text-neutral-500">&copy; {new Date().getFullYear()} Zephyr Cloud, Inc.</p>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Developers</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://docs.zephyr-cloud.io/" target="_blank" className="text-neutral-400 hover:text-white">
                  Docs
                </a>
              </li>
              <li>
                <Link to="./llms.txt" target="_blank" className="text-neutral-400 hover:text-white">
                  llms.txt
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Company</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://github.com/ZephyrCloudIO"
                  target="_blank"
                  className="text-neutral-400 hover:text-white"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/96615966"
                  target="_blank"
                  className="text-neutral-400 hover:text-white"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://discord.gg/pSxWRVayEu" target="_blank" className="text-neutral-400 hover:text-white">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://x.com/ZephyrCloudIO" target="_blank" className="text-neutral-400 hover:text-white">
                  X
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@ZephyrCloud"
                  target="_blank"
                  className="text-neutral-400 hover:text-white"
                >
                  YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/zephyrcloudio"
                  target="_blank"
                  className="text-neutral-400 hover:text-white"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold text-white mb-3">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-neutral-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Status Widget */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <div className="flex items-center justify-center">
            <a
              href="https://status.zephyr-cloud.io/"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors group"
            >
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </div>
              <span className="text-sm text-neutral-400 group-hover:text-neutral-300">All systems operational</span>
              <Activity size={14} className="text-neutral-500 group-hover:text-neutral-400" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
