import { BlogCard } from '@/components/BlogCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getAllBlogPosts } from '@/lib/blog/loader';
import { BlogTags, tagLabels, type BlogTag } from '@/lib/blog/tags';
import type { BlogPost } from '@/lib/blog/types';
import { createFileRoute } from '@tanstack/react-router';
import { Filter, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

export const Route = createFileRoute('/blog/')({
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<BlogTag | 'all'>('all');

  useEffect(() => {
    getAllBlogPosts().then((blogPosts) => {
      setPosts(blogPosts);
      setLoading(false);
    });
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesSearch =
        searchQuery === '' ||
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === 'all' || post.tags?.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [searchQuery, selectedTag, posts]);

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-16 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r pb-2 from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-neutral-400">Insights, updates, and tutorials from the Zephyr team</p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
          </div>
        )}

        {/* Search and Filter */}
        {!loading && (
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-neutral-900/50 border-neutral-800 text-white placeholder:text-neutral-500"
              />
            </div>
            <Select value={selectedTag} onValueChange={(value) => setSelectedTag(value as BlogTag | 'all')}>
              <SelectTrigger className="w-full sm:w-[200px] bg-neutral-900/50 border-neutral-800">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-900 border-neutral-800">
                <SelectItem value="all" className="text-white">
                  All Topics
                </SelectItem>
                {Object.entries(BlogTags).map(([key, value]) => (
                  <SelectItem key={value} value={value} className="text-white">
                    {tagLabels[value]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-400 text-lg">No posts found matching your criteria.</p>
            <Button
              onClick={() => {
                setSearchQuery('');
                setSelectedTag('all');
              }}
              className="mt-4"
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-semibold mb-6">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredPosts.map((post) => (
                <BlogCard key={post.slug} post={post} featured />
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts */}
        {regularPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6">{featuredPosts.length > 0 ? 'Latest Posts' : 'All Posts'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularPosts.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
