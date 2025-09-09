import { formatCapability, formatPartnerType, partners } from '@/data/partners';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/partners')({
  component: PartnersPage,
});

function PartnersPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl font-bold mb-4">Partners</h1>
          <p className="text-xl text-neutral-400">
            Everything is better with friends. Check out these Zephyr Cloud partners for the best experience when
            building.
          </p>
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block bg-neutral-900 rounded-lg p-8 transition-all hover:bg-neutral-800 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Logo */}
              <div className="h-48 flex items-center justify-center mb-6">
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity"
                />
              </div>

              {/* Partner Types */}
              <div className="mb-3">
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Type</p>
                <div className="flex flex-wrap gap-2">
                  {partner.types.map((type) => (
                    <span
                      key={type}
                      className="inline-block px-3 py-1 bg-emerald-900/30 text-emerald-400 text-sm rounded-full"
                    >
                      {formatPartnerType(type)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Capabilities */}
              <div>
                <p className="text-xs uppercase tracking-wider text-neutral-500 mb-2">Capabilities</p>
                <div className="flex flex-wrap gap-2">
                  {partner.capabilities.map((capability) => (
                    <span
                      key={capability}
                      className="inline-block px-3 py-1 bg-neutral-800 text-neutral-300 text-sm rounded-full group-hover:bg-neutral-700"
                    >
                      {formatCapability(capability)}
                    </span>
                  ))}
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center bg-neutral-900 rounded-lg p-12">
          <h2 className="text-3xl font-bold mb-4">Become a Partner</h2>
          <p className="text-lg text-neutral-400 mb-8 max-w-2xl mx-auto">
            Join our partner ecosystem and help organizations build the future on Zephyr Cloud
          </p>
          <a
            href="mailto:inbound@zephyr-cloud.io?subject=partners"
            className="inline-flex items-center px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
