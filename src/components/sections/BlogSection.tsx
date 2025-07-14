import React, { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getLatestBlogPosts } from "@/lib/blog/loader";
import type { BlogPost } from "@/lib/blog/types";

export const BlogSection: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestBlogPosts(4).then((blogPosts) => {
      setPosts(blogPosts);
      setLoading(false);
    });
  }, []);
  return (
    <section className="py-20 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-semibold text-white mb-4">
          Keep tabs on what we're shipping
        </h2>
        <p className="text-center mb-12">
          Follow us on{" "}
          <a href="https://x.com/ZephyrCloudIO" target="_blank" rel="noopener" className="text-emerald-700 hover:underline">
            X
          </a>
          .
        </p>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {posts.map((post) => (
              <Card
                key={post.slug}
                className="bg-neutral-900 border-neutral-400 text-neutral-300 flex flex-col"
              >
                <CardHeader>
                  <CardTitle className="text-lg text-white hover:text-emerald-700 transition-colors">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-neutral-400 text-sm line-clamp-2">
                    {post.description}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="mt-auto pt-4 border-t border-neutral-500/50">
                  <div className="flex items-center gap-2 text-xs">
                    {post.authors[0] && (
                      <>
                        <Avatar className="w-6 h-6">
                          <AvatarImage src={post.authors[0].avatar} />
                          <AvatarFallback>
                            {post.authors[0].displayName.substring(0, 1)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-white block">{post.authors[0].displayName}</span>
                          <span className="text-neutral-500">
                            {post.date.toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-neutral-400">No blog posts available yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
};
