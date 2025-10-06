import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  published_at: string | null;
  keywords: string[] | null;
  meta_title?: string | null;
  meta_description?: string | null;
  og_image?: string | null;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/blog");
        return;
      }

      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (error) {
        console.error("Error fetching blog post:", error);
        toast.error("Failed to load blog post");
        navigate("/blog");
      } else if (!data) {
        toast.error("Blog post not found");
        navigate("/blog");
      } else {
        setPost(data);
      }
      setLoading(false);
    };

    fetchPost();
  }, [slug, navigate]);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const wordCount = text.split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  };

  const handleShare = async () => {
    const url = window.location.href;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.description,
          url: url,
        });
        toast.success("Shared successfully!");
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          copyToClipboard(url);
        }
      }
    } else {
      copyToClipboard(url);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Link copied to clipboard!");
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="min-h-screen bg-background pt-24 pb-16">
          <div className="container max-w-4xl mx-auto px-4">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <Skeleton className="h-6 w-1/2 mb-8" />
            <Skeleton className="h-96 w-full" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!post) return null;

  const metaTitle = post.meta_title || post.title;
  const metaDescription = post.meta_description || post.description;

  return (
    <>
      <Helmet>
        <title>{metaTitle} | LocalDrive Blog</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={post.keywords?.join(", ")} />
        <meta name="author" content={post.author} />
        
        {/* Open Graph */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        {post.og_image && <meta property="og:image" content={post.og_image} />}
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {post.og_image && <meta name="twitter:image" content={post.og_image} />}
        
        {/* Article metadata */}
        {post.published_at && <meta property="article:published_time" content={post.published_at} />}
        <meta property="article:author" content={post.author} />
        {post.keywords?.map((keyword) => (
          <meta key={keyword} property="article:tag" content={keyword} />
        ))}
        
        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.description,
            author: {
              "@type": "Organization",
              name: post.author,
            },
            datePublished: post.published_at,
            publisher: {
              "@type": "Organization",
              name: "LocalDrive",
              logo: {
                "@type": "ImageObject",
                url: "/src/assets/localdrive-logo.png",
              },
            },
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": window.location.href,
            },
          })}
        </script>
      </Helmet>
      
      <Header />
      
      <main className="min-h-screen bg-background">
        {/* Breadcrumbs */}
        <div className="bg-gradient-to-r from-primary/5 via-secondary/5 to-primary/5 border-b border-border/50 py-5">
          <div className="container max-w-4xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm font-medium" aria-label="Breadcrumb">
              <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                Home
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link to="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                Blog
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground line-clamp-1">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 md:py-20 relative">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
          
          <div className="container max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Link to="/blog" className="inline-block mb-8 animate-fade-in">
              <Button variant="outline" className="gap-2 hover:gap-3 transition-all hover:border-primary hover:text-primary">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-12 animate-fade-in">
              {/* Title with gradient accent */}
              <div className="relative mb-6">
                <div className="absolute -left-4 top-0 bottom-0 w-1.5 hero-gradient rounded-full" />
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight pl-4">
                  {post.title}
                </h1>
              </div>
              
              {/* Meta information with icons */}
              <div className="flex flex-wrap items-center gap-4 text-sm mb-8 bg-muted/30 rounded-lg p-4 border border-border/50">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <Calendar className="h-4 w-4 text-primary" />
                  <time dateTime={post.published_at || undefined}>
                    {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <Clock className="h-4 w-4 text-primary" />
                  <span>{calculateReadTime(post.content)} min read</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <span className="text-foreground font-medium">By {post.author}</span>
              </div>

              {/* Keywords with gradient style */}
              <div className="flex flex-wrap gap-2 mb-8">
                {post.keywords?.map((keyword) => (
                  <Badge 
                    key={keyword} 
                    variant="secondary"
                    className="px-4 py-1.5 bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors font-medium"
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>

              {/* Share button with enhanced style */}
              <Button
                onClick={handleShare}
                variant="outline"
                className="gap-2 border-2 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all shadow-md hover:shadow-brand"
              >
                <Share2 className="h-4 w-4" />
                Share Article
              </Button>

              <Separator className="mt-8" />
            </header>

            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none animate-fade-in
                prose-headings:font-bold prose-headings:text-foreground prose-headings:scroll-mt-20
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-primary/20
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-primary
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                prose-a:text-primary prose-a:no-underline prose-a:font-medium hover:prose-a:underline prose-a:transition-all
                prose-strong:text-foreground prose-strong:font-bold prose-strong:bg-primary/5 prose-strong:px-1 prose-strong:rounded
                prose-ul:my-6 prose-ul:space-y-2 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:space-y-2 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-muted-foreground prose-li:leading-relaxed
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:italic
                prose-code:text-primary prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-lead:text-xl prose-lead:text-foreground prose-lead:font-medium prose-lead:mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-12" />

            {/* Call to Action */}
            <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/10 rounded-2xl p-10 text-center border-2 border-primary/20 shadow-brand-lg animate-fade-in">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gradient">
                  Ready to Start Your Driving Journey?
                </h3>
                <p className="text-muted-foreground mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                  Connect with certified driving instructors and begin learning with LocalDrive today. Your journey to confident driving starts here.
                </p>
                <Link to="/">
                  <Button size="lg" className="hero-gradient hover:shadow-brand-lg transition-all hover:scale-105 text-lg px-8 py-6">
                    Get Started Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
