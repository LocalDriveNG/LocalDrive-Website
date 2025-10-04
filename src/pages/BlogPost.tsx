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
                url: "https://localdriveapp.com/localdrive-logo.png",
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
        <div className="bg-muted/30 border-b border-border py-4">
          <div className="container max-w-4xl mx-auto px-4">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-foreground transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link to="/blog" className="hover:text-foreground transition-colors">
                Blog
              </Link>
              <span>/</span>
              <span className="text-foreground">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Article */}
        <article className="py-12 md:py-20">
          <div className="container max-w-4xl mx-auto px-4">
            {/* Back Button */}
            <Link to="/blog" className="inline-block mb-8">
              <Button variant="ghost" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>

            {/* Article Header */}
            <header className="mb-12">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-foreground leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.published_at || undefined}>
                    {post.published_at && new Date(post.published_at).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{calculateReadTime(post.content)} min read</span>
                </div>
                <span>•</span>
                <span>By {post.author}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {post.keywords?.map((keyword) => (
                  <Badge key={keyword} variant="secondary">
                    {keyword}
                  </Badge>
                ))}
              </div>

              <Button
                onClick={handleShare}
                variant="outline"
                className="gap-2"
              >
                <Share2 className="h-4 w-4" />
                Share Article
              </Button>

              <Separator className="mt-8" />
            </header>

            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                prose-li:text-muted-foreground prose-li:mb-2
                prose-lead:text-xl prose-lead:text-foreground prose-lead:font-medium prose-lead:mb-8"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            <Separator className="my-12" />

            {/* Call to Action */}
            <div className="bg-primary/5 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">
                Ready to Start Your Driving Journey?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Connect with certified driving instructors and begin learning with LocalDrive today.
              </p>
              <Link to="/">
                <Button size="lg" className="hero-gradient">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
};

export default BlogPost;
