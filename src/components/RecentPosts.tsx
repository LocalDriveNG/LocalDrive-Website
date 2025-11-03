import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Calendar } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  slug: string;
  title: string;
  published_at: string | null;
  featured_image?: string | null;
}

interface RecentPostsProps {
  currentSlug?: string;
  limit?: number;
}

const RecentPosts = ({ currentSlug, limit = 4 }: RecentPostsProps) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      let query = supabase
        .from("blog_posts")
        .select("slug, title, published_at, featured_image")
        .order("published_at", { ascending: false })
        .limit(limit + 1); // Fetch one extra to filter out current post

      const { data, error } = await query;

      if (error) {
        console.error("Error fetching recent posts:", error);
      } else {
        // Filter out current post and limit results
        const filteredPosts = (data || [])
          .filter((post) => post.slug !== currentSlug)
          .slice(0, limit);
        setPosts(filteredPosts);
      }
      setLoading(false);
    };

    fetchRecentPosts();
  }, [currentSlug, limit]);

  if (loading) {
    return (
      <div className="bg-background rounded-2xl p-8 border border-border/50">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
          Recent Posts
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-24" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return null;
  }

  return (
    <div className="bg-background rounded-2xl p-8 border border-border/50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
        Recent Posts
      </h2>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group block"
          >
            <div className="flex gap-4 items-start">
              {post.featured_image && (
                <div className="flex-shrink-0 w-20 h-20 overflow-hidden rounded-lg border border-border">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2 leading-tight">
                  {post.title}
                </h3>
                {post.published_at && (
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    <time dateTime={post.published_at}>
                      {new Date(post.published_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
