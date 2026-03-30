import { Button } from '@/components/ui/button';
import { formatDateLong } from '@/date';
import { mdxToChangelogEntry, type MDXChangelogEntry } from '@/lib/changelog/loader';
import { ArrowLeft, Calendar, Clock, Code, Globe, Package, Rocket, Shield, Zap } from 'lucide-react';
import type { ReactNode } from 'react';

interface ChangelogArticlePageProps {
  slug: string;
  metadata: MDXChangelogEntry['metadata'];
  children: ReactNode;
}

export function ChangelogArticlePage({ slug, metadata, children }: ChangelogArticlePageProps) {
  const entry = mdxToChangelogEntry(
    {
      metadata,
      default: () => null,
    },
    slug,
  );

  const getCategoryIcon = () => {
    switch (entry.category) {
      case 'performance':
        return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'feature':
        return <Rocket className="w-5 h-5 text-emerald-500" />;
      case 'integration':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'security':
        return <Shield className="w-5 h-5 text-red-500" />;
      case 'platform':
        return <Globe className="w-5 h-5 text-purple-500" />;
      case 'dx':
        return <Code className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <article className="bg-black text-white">
      <div className="relative bg-gradient-to-b from-emerald-900/20 to-black">
        <div className="relative container mx-auto pt-10 px-4 flex flex-col justify-end max-w-4xl">
          <a href="/changelog" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Changelog
          </a>

          {entry.image && (
            <img src={entry.image} alt={entry.title} className="w-full max-w-3xl mx-auto mb-6 rounded-lg" />
          )}

          <div className="flex items-center gap-3 mb-4">
            {getCategoryIcon()}
            <span className="text-sm text-neutral-400 uppercase tracking-wider">{entry.category}</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">{entry.title}</h1>

          <div className="flex items-center gap-6 text-neutral-300 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={entry.date.toISOString()}>{formatDateLong(entry.date)}</time>
            </div>

            {entry.readingTime && (
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{entry.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mdx-content">{children}</div>

        <div className="mt-12 pt-8 border-t border-neutral-800">
          <a href="/changelog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Changelog
            </Button>
          </a>
        </div>
      </div>
    </article>
  );
}
