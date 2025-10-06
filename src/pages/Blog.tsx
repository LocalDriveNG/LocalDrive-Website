import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  published_at: string | null;
  keywords: string[] | null;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("slug, title, description, author, published_at, keywords")
        .order("published_at", { ascending: false });

      if (error) {
        console.error("Error fetching blog posts:", error);
      } else {
        setPosts(data || []);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  return (
    <>
      <Helmet>
        <title>Blog - Driving Tips & Road Safety | LocalDrive</title>
        <meta
          name="description"
          content="Expert driving tips, road safety guides, and insights for Nigerian drivers. Learn from certified instructors on the LocalDrive blog."
        />
        <meta name="keywords" content="driving tips, road safety, Nigerian drivers, driving blog, LocalDrive blog" />
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-background py-20 md:py-32">
          {/* Decorative elements */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.03)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block mb-6 animate-fade-in">
                <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
                  Expert Insights & Tips
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient animate-fade-in">
                LocalDrive Blog
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed animate-fade-in">
                Master the road with expert driving tips, road safety guides, and insights tailored for Nigerian drivers
              </p>
              
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto animate-fade-in">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-base border-2 hover:border-primary/50 focus:border-primary transition-colors shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            {loading ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                  <Card key={i} className="overflow-hidden">
                    <Skeleton className="h-48 w-full" />
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full" />
                    </CardHeader>
                  </Card>
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">
                  {searchQuery ? "No articles found matching your search." : "No blog posts available yet."}
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Link
                    key={post.slug}
                    to={`/blog/${post.slug}`}
                    className="group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Card className="h-full overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-brand-lg hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                      {/* Decorative gradient bar */}
                      <div className="h-1.5 hero-gradient" />
                      
                      <CardHeader className="space-y-4 pb-4">
                        <div className="flex items-start justify-between gap-2">
                          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                            {post.title}
                          </CardTitle>
                        </div>
                        
                        <CardDescription className="line-clamp-3 text-base leading-relaxed">
                          {post.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4">
                        {/* Keywords */}
                        <div className="flex flex-wrap gap-2">
                          {post.keywords?.slice(0, 3).map((keyword) => (
                            <Badge 
                              key={keyword} 
                              variant="secondary" 
                              className="text-xs font-medium px-3 py-1 bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                            >
                              {keyword}
                            </Badge>
                          ))}
                        </div>
                        
                        {/* Meta info */}
                        <div className="flex items-center justify-between text-sm text-muted-foreground pt-2 border-t border-border/50">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                              {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="h-4 w-4 text-primary" />
                            <span className="font-medium">{calculateReadTime(post.description)} min</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Blog;
