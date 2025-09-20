import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Newsletter subscription logic would go here
      console.log("Newsletter subscription:", email);
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-primary to-secondary">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Stay in the Driver's Seat!
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Get the latest updates, driving tips, and exclusive offers delivered straight to your inbox.
            </p>
          </div>

          {!isSubscribed ? (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/95 border-white/20 text-neutral-800 placeholder:text-neutral-500 focus:bg-white"
                />
                <Button
                  type="submit"
                  className="bg-white text-primary hover:bg-white/90 font-semibold px-8 whitespace-nowrap"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 max-w-md mx-auto">
              <p className="text-white font-medium">
                ✓ Thank you for subscribing! Check your email for confirmation.
              </p>
            </div>
          )}

          <p className="text-sm text-white/70">
            Join over 10,000 drivers who trust LocalDrive. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;