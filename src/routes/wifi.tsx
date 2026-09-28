import vikaImage from '@/images/vika.jpg';
import WordmarkLight from '@/images/wordmark-light.svg';
import { createFileRoute } from '@tanstack/react-router';
import { Wifi } from 'lucide-react';

export const Route = createFileRoute('/wifi')({
  component: WifiPage,
});

// Conference Wi-Fi landing page (rendered without site chrome): the page people see once they're online.
function WifiPage() {
  return (
    <div className="flex min-h-svh items-center">
      <div className="mx-auto w-full max-w-[1320px] px-5 py-12 sm:px-8 lg:px-10 lg:py-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20">
          <div>
            <a href="/" className="inline-flex rounded-md" aria-label="Zephyr Cloud home">
              <img src={WordmarkLight} alt="" width={124} height={22} />
            </a>
            <p className="mt-12 mb-6 flex items-center gap-2 text-sm text-ink-faint lg:mt-16">
              <Wifi className="size-4" aria-hidden />
              Conference Wi-Fi
            </p>
            <h1 className="text-display m-0 text-ink">Wi-Fi provided by Zephyr Cloud and Vika Siours Rex</h1>
            <p className="text-lead mt-7 mb-0 flex items-center gap-2.5 text-ink-muted">
              <span className="size-2 shrink-0 rounded-full bg-live" aria-hidden />
              You&apos;re connected.
            </p>
          </div>

          <img
            src={vikaImage}
            alt="Vika Siours Rex"
            width={960}
            height={1280}
            className="aspect-[3/4] w-full max-w-sm rounded-2xl border border-line object-cover sm:max-w-md lg:order-first lg:max-w-none"
          />
        </div>
      </div>
    </div>
  );
}
