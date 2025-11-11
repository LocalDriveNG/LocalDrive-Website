import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Mail, CheckCircle } from "lucide-react";
import { Helmet } from "react-helmet";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState(searchParams.get("email") || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('unsubscribe-newsletter', {
        body: { email: email.toLowerCase() }
      });

      if (error) throw error;

      if (data.success) {
        setIsUnsubscribed(true);
        toast.success("You've been successfully unsubscribed");
      } else {
        toast.error(data.error || "Failed to unsubscribe. Please try again.");
      }
    } catch (error: any) {
      console.error("Unsubscribe error:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Unsubscribe from Newsletter - LocalDrive</title>
        <meta name="description" content="Unsubscribe from LocalDrive newsletter updates" />
      </Helmet>
      
      <div className="min-h-screen bg-background flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
            {!isUnsubscribed ? (
              <>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                    <Mail className="h-8 w-8 text-primary" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Unsubscribe from Newsletter
                  </h1>
                  <p className="text-muted-foreground">
                    We're sad to see you go. Enter your email address to unsubscribe from our newsletter.
                  </p>
                </div>

                <form onSubmit={handleUnsubscribe} className="space-y-4">
                  <div>
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full"
                  >
                    {isLoading ? "Unsubscribing..." : "Unsubscribe"}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/" className="text-sm text-primary hover:underline">
                    Return to homepage
                  </Link>
                </div>
              </>
            ) : (
              <>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Successfully Unsubscribed
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    You've been removed from our newsletter. You won't receive any more emails from us.
                  </p>
                  <p className="text-sm text-muted-foreground mb-6">
                    Changed your mind? You can always subscribe again from our homepage.
                  </p>
                  <Link to="/">
                    <Button className="w-full">
                      Return to Homepage
                    </Button>
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Unsubscribe;
