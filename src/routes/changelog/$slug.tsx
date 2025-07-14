import { createFileRoute, Link } from '@tanstack/react-router';
import { useState, useEffect } from 'react';
import { Calendar, Clock, ArrowLeft, Zap, Package, Shield, Rocket, Globe, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ChangelogEntry } from '@/lib/changelog/types';
import { getChangelogEntryBySlug } from '@/lib/changelog/loader';
import type { MDXChangelogEntry } from '@/lib/changelog/loader';

export const Route = createFileRoute('/changelog/$slug')({
  component: ChangelogEntryPage,
});

function ChangelogEntryPage() {
  const { slug } = Route.useParams();
  const [entry, setEntry] = useState<ChangelogEntry | null>(null);
  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEntry = async () => {
      const changelogEntry = await getChangelogEntryBySlug(slug);
      if (changelogEntry) {
        setEntry(changelogEntry);
        // Dynamically import the MDX content
        try {
          const mdxModule = await import(`@/content/changelog/${slug}.mdx`) as MDXChangelogEntry;
          setMDXContent(() => mdxModule.default);
        } catch (error) {
          console.error('Failed to load MDX content:', error);
        }
      }
      setLoading(false);
    };

    loadEntry();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  if (!entry || !MDXContent) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Entry Not Found</h1>
          <p className="text-neutral-400 mb-8">
            The changelog entry you're looking for doesn't exist.
          </p>
          <Link to="/changelog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Changelog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = () => {
    switch (entry.category) {
      case 'performance': return <Zap className="w-5 h-5 text-yellow-500" />;
      case 'feature': return <Rocket className="w-5 h-5 text-emerald-500" />;
      case 'integration': return <Package className="w-5 h-5 text-blue-500" />;
      case 'security': return <Shield className="w-5 h-5 text-red-500" />;
      case 'platform': return <Globe className="w-5 h-5 text-purple-500" />;
      case 'dx': return <Code className="w-5 h-5 text-orange-500" />;
      default: return null;
    }
  };

  return (
    <article className="bg-black text-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-emerald-900/20 to-black">
        <div className="relative container mx-auto pt-10 px-4 flex flex-col justify-end max-w-4xl">
          <Link to="/changelog" className="inline-flex items-center text-emerald-400 hover:text-emerald-300 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Changelog
          </Link>

          {entry.image && (
            <img
              src={entry.image}
              alt={entry.title}
              className="w-full max-w-3xl mx-auto mb-6 rounded-lg"
            />
          )}

          <div className="flex items-center gap-3 mb-4">
            {getCategoryIcon()}
            <span className="text-sm text-neutral-400 uppercase tracking-wider">
              {entry.category}
            </span>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {entry.title}
          </h1>

          <div className="flex items-center gap-6 text-neutral-300 mb-8">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <time dateTime={entry.date.toISOString()}>
                {entry.date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
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

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="mdx-content">
          <MDXContent />
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t border-neutral-800">
          <Link to="/changelog">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Changelog
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
}