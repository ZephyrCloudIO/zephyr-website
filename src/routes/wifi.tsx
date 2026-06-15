import vikaImage from '@/images/vika.jpg';
import { createFileRoute } from '@tanstack/react-router';
import { Wifi } from 'lucide-react';

export const Route = createFileRoute('/wifi')({
  component: WifiPage,
});

function WifiPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.25),transparent_42%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(59,130,246,0.18),transparent_38%)]" />
      </div>

      <div className="relative flex min-h-screen items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl shadow-violet-950/30 backdrop-blur">
          <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
            <div className="border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-12">
              <img
                src={vikaImage}
                alt="Vika Siours Rex"
                className="h-full min-h-[320px] w-full rounded-[1.5rem] object-cover"
              />
            </div>

            <div className="flex items-center p-6 sm:p-8 lg:p-12">
              <div className="max-w-xl">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/10 px-4 py-2 text-sm font-medium text-violet-200">
                  <Wifi className="h-4 w-4" />
                  Conference Wi-Fi
                </div>

                <h1 className="text-4xl font-medium leading-tight text-white sm:text-5xl lg:text-6xl">
                  Wifi Provided by Zephyr Cloud and Vika Siours Rex
                </h1>

                <p className="mt-6 max-w-lg text-base leading-relaxed text-neutral-300 sm:text-lg">
                  You&apos;re connected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
