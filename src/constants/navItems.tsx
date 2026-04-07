import { Calendar, Cloud, FileText, History, Newspaper, Sparkles, Users } from 'lucide-react';

const PRODUCTS = [
  {
    title: 'Zephyr Cloud',
    description: 'The modern development platform for web applications',
    icon: () => <Cloud className="h-4 w-4" />,
    href: '/',
  },
  {
    title: 'Zephyr AI',
    description: 'Where humans and AI agents do real work',
    icon: () => <Sparkles className="h-4 w-4" />,
    href: '/products/ai',
  },
];

const RESOURCES = [
  {
    title: 'Blog',
    description: 'Latest news and insights',
    icon: () => <FileText className="h-4 w-4" />,
    href: '/blog',
  },
  {
    title: 'Changelog',
    description: 'Product updates and releases',
    icon: () => <History className="h-4 w-4" />,
    href: '/changelog',
  },
  {
    title: 'Press',
    description: 'Media kit and press releases',
    icon: () => <Newspaper className="h-4 w-4" />,
    href: '/press',
  },
  {
    title: 'Events',
    description: 'Upcoming conferences and meetups',
    icon: () => <Calendar className="h-4 w-4" />,
    href: '/events',
  },
  {
    title: 'Partners',
    description: 'Partner programs and integrations',
    icon: () => <Users className="h-4 w-4" />,
    href: '/partners',
  },
];

export { PRODUCTS, RESOURCES };
