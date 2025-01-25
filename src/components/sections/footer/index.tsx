import GlowingLinkButton from '@/components/ui/link.glowing-button';
import { Link } from '@modern-js/runtime/router';
import ZephyrLogo from '@/images/zephyr-logo.svg';
import LinkedIn from '@/images/platforms/linkedin.svg';
import X from '@/images/platforms/x.svg';
import Youtube from '@/images/platforms/youtube.svg';
import Discord from '@/images/platforms/Discord.svg';

const integrations = [
    { name: 'Cloudflare', link: 'https://docs.zephyr-cloud.io/cloud/cloudflare' },
    { name: 'Netlify', link: 'https://docs.zephyr-cloud.io/cloud/netlify' },
    { name: 'Fastly', link: 'https://docs.zephyr-cloud.io/cloud/fastly'},
    { name: 'AWS' },
    { name: 'Vercel' },
    { name: 'Supabase' },
    { name: 'Azure' },
];

const companyLinks = [
    { name: 'Home', to: '/' },
    { name: 'Pricing', to: '/pricing' },
    { name: 'Documents', to: 'https://docs.zephyr-cloud.io' },
    { name: 'Blog', to: '/blog' },
    { name: 'Enterprise', to: '/enterprise' },
    { name: 'Privacy Policy', to: '/privacy' }
];

const Footer = () => {
    return (
        <footer className="bg-[#0A0A0A] pt-20 pb-8 px-6 md:px-8 mt-24">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16">
                    <div className="md:col-span-4">
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Cloud-agnostic, framework-agnostic platform for lightning fast deployment with first-class support in federated applications.
                        </p>
                        <img src={ZephyrLogo} alt="Zephyr Cloud" className="h-8 mt-6" />
                    </div>

                    <div className="md:col-span-2 md:col-start-6">
                        <h3 className="text-white font-medium mb-4">Company</h3>
                        <ul className="space-y-3">
                            {companyLinks.map(({ name, to }) => (
                                <li key={name}>
                                    {to.startsWith('http') ? (
                                        <a
                                            href={to}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-gray-400 hover:text-white text-sm"
                                        >
                                            {name}
                                        </a>
                                    ) : (
                                        <Link
                                            to={to}
                                            className="text-gray-400 hover:text-white text-sm"
                                        >
                                            {name}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-2">
                        <h3 className="text-white font-medium mb-4">Integrations</h3>
                        <ul className="space-y-3">
                            {integrations.map((integration) => (
                                <li key={integration.name}>
                                    {integration.link ? (
                                        <a href={integration.link} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">
                                            {integration.name}
                                        </a>
                                    ) : (
                                        <span className="text-gray-400 text-sm">
                                            {integration.name} - Coming Soon
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="md:col-span-3">
                        <GlowingLinkButton to="https://docs.zephyr-cloud.io/" className="w-52" external={true}>
                            How to Get Started
                        </GlowingLinkButton>
                    </div>
                </div>

                <div className="flex space-x-4 mb-4 md:mb-0">
                    <a
                        href="https://www.linkedin.com/company/zephyr-cloud/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    >
                        <span className="sr-only">LinkedIn</span>
                        <img src={LinkedIn} alt="LinkedIn" />
                    </a>
                    <a
                        href="https://zephyr-cloud.io/twitter"
                        className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    >
                        <span className="sr-only">X</span>
                        <img src={X} alt="X" />
                    </a>
                    <a
                        href="https://discord.gg/pSxWRVayEu"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    >
                        <span className="sr-only">Discord</span>
                        <img src={Discord} alt="Discord" />
                    </a>
                    <a
                        href="https://www.youtube.com/@ZephyrCloud"
                        className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110"
                    >
                        <span className="sr-only">YouTube</span>
                        <img src={Youtube} alt="YouTube" />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
