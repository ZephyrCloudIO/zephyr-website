import { Link } from '@modern-js/runtime/router';
import GlowingLinkButton from '@/components/ui/link.glowing-button';
import ZephyrLogo from '@/images/zephyr-logo.svg';
import LinkedIn from '@/images/platforms/linkedin.svg';
import X from '@/images/platforms/x.svg';
import Youtube from '@/images/platforms/youtube.svg';
import Discord from '@/images/platforms/Discord.svg';

const integrations = [
  {
    name: 'Cloudflare',
    link: 'https://docs.zephyr-cloud.io/cloud/cloudflare',
    alt: "Learn about Zephyr Cloud's Cloudflare integration and deployment options",
  },
  {
    name: 'Netlify',
    link: 'https://docs.zephyr-cloud.io/cloud/netlify',
    alt: 'Deploy your applications with Zephyr Cloud on Netlify',
  },
  {
    name: 'Fastly',
    link: 'https://docs.zephyr-cloud.io/cloud/fastly',
    alt: 'Accelerate your applications with Zephyr Cloud and Fastly integration',
  },
  { name: 'AWS', description: 'Amazon Web Services integration coming soon' },
  { name: 'Vercel', description: 'Vercel deployment support coming soon' },
  {
    name: 'Supabase',
    description: 'Supabase database integration coming soon',
  },
  { name: 'Azure', description: 'Microsoft Azure integration coming soon' },
];

const companyLinks = [
  { name: 'Home', to: '/', description: 'Return to Zephyr Cloud homepage' },
  {
    name: 'Pricing',
    to: '/pricing',
    description: 'View Zephyr Cloud pricing plans and packages',
  },
  {
    name: 'Documents',
    to: 'https://docs.zephyr-cloud.io',
    description: 'Access comprehensive Zephyr Cloud documentation',
  },
  {
    name: 'Blog',
    to: '/blog',
    description: 'Read latest updates and insights from Zephyr Cloud',
  },
  {
    name: 'Enterprise',
    to: '/enterprise',
    description: 'Learn about Zephyr Cloud enterprise solutions',
  },
  {
    name: 'Privacy Policy',
    to: '/privacy',
    description: 'Read our privacy policy',
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-[#0A0A0A] pt-20 pb-8 px-6 md:px-8 mt-24"
      role="contentinfo"
      itemScope
      itemType="http://schema.org/WPFooter"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-8">
          <div
            className="md:col-span-4"
            itemScope
            itemType="http://schema.org/Organization"
          >
            <meta itemProp="name" content="Zephyr Cloud" />
            <p
              className="text-gray-400 text-sm leading-relaxed"
              itemProp="description"
            >
              Zephyr Cloud is a cloud-agnostic, framework-agnostic platform
              enabling lightning-fast deployment with first-class support for
              federated applications. Build, deploy, and scale your applications
              with ease.
            </p>
            <Link to="/" aria-label="Return to Zephyr Cloud homepage">
              <img
                src={ZephyrLogo}
                alt="Zephyr Cloud - Modern Cloud Development Platform"
                className="h-8 mt-6"
              />
            </Link>
          </div>

          <nav
            className="md:col-span-2 md:col-start-6"
            aria-label="Company links"
            itemScope
            itemType="http://schema.org/SiteNavigationElement"
          >
            <h3 className="text-white font-medium mb-4">Company</h3>
            <ul
              className="space-y-3"
              itemScope
              itemType="http://schema.org/BreadcrumbList"
            >
              {companyLinks.map(({ name, to, description }, index) => (
                <li
                  key={name}
                  itemProp="itemListElement"
                  itemScope
                  itemType="http://schema.org/ListItem"
                >
                  <meta itemProp="position" content={String(index + 1)} />
                  {to.startsWith('http') ? (
                    <a
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white text-sm"
                      aria-label={description}
                    >
                      {name}
                    </a>
                  ) : (
                    <Link
                      to={to}
                      className="text-gray-400 hover:text-white text-sm"
                      aria-label={description}
                    >
                      {name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <nav className="md:col-span-2" aria-label="Integration links">
            <h3 className="text-white font-medium mb-4">Integrations</h3>
            <ul className="space-y-3">
              {integrations.map((integration) => (
                <li key={integration.name}>
                  {integration.link ? (
                    <a
                      href={integration.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white text-sm"
                      aria-label={integration.alt}
                      itemProp="sameAs"
                    >
                      {integration.name}
                    </a>
                  ) : (
                    <span
                      className="text-gray-400 text-sm"
                      aria-label={integration.description}
                    >
                      {integration.name} - Coming Soon
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <GlowingLinkButton
              to="https://docs.zephyr-cloud.io/"
              className="w-52"
              external={true}
              aria-label="Access Zephyr Cloud documentation to get started"
            >
              How to Get Started
            </GlowingLinkButton>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <nav
              className="flex space-x-6 mb-4 md:mb-0"
              aria-label="Social media links"
            >
              <a
                href="https://www.linkedin.com/company/zephyr-cloud/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Follow Zephyr Cloud on LinkedIn"
              >
                <span className="sr-only">Follow us on LinkedIn</span>
                <img src={LinkedIn} alt="LinkedIn" className="w-16 h-16" />
              </a>
              <a
                href="https://zephyr-cloud.io/twitter"
                className="text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Follow Zephyr Cloud on X (formerly Twitter)"
              >
                <span className="sr-only">
                  Follow us on X (formerly Twitter)
                </span>
                <img src={X} alt="X (formerly Twitter)" className="w-16 h-16" />
              </a>
              <a
                href="https://discord.gg/pSxWRVayEu"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Join Zephyr Cloud Discord community"
              >
                <span className="sr-only">Join our Discord community</span>
                <img src={Discord} alt="Discord" className="w-16 h-16" />
              </a>
              <a
                href="https://www.youtube.com/@ZephyrCloud"
                className="text-gray-400 hover:text-white transition-all duration-200"
                aria-label="Subscribe to Zephyr Cloud YouTube channel"
              >
                <span className="sr-only">
                  Subscribe to our YouTube channel
                </span>
                <img src={Youtube} alt="YouTube" className="w-16 h-16" />
              </a>
            </nav>
            <p className="text-gray-400 text-sm">
              Copyright © {new Date().getFullYear()} Zephyr Cloud. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
