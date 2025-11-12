import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import WaitlistHeader from "@/components/Header";
import WaitlistFooter from "@/components/WaitlistFooter";

const Waitlist = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Insert into waitlist_subscribers table
      const { error: insertError } = await supabase
        .from("waitlist_subscribers")
        .insert([
          {
            first_name: firstName.trim(),
            last_name: lastName.trim(),
            email: email.trim().toLowerCase(),
          },
        ]);

      if (insertError) {
        if (insertError.code === "23505") {
          toast({
            title: "Already on the waitlist",
            description: "This email is already registered on our waitlist.",
            variant: "destructive",
          });
        } else {
          throw insertError;
        }
        return;
      }

      // Send confirmation email
      const { error: emailError } = await supabase.functions.invoke(
        "send-waitlist-confirmation",
        {
          body: {
            firstName: firstName.trim(),
            lastName: lastName.trim(),
            email: email.trim().toLowerCase(),
          },
        }
      );

      if (emailError) {
        console.error("Error sending confirmation email:", emailError);
        // Don't fail the whole process if email fails
      }

      toast({
        title: "Welcome to the waitlist! 🎉",
        description: "Check your email for a confirmation message.",
      });

      // Reset form
      setFirstName("");
      setLastName("");
      setEmail("");
      } catch (error: unknown) {
      console.error("Error joining waitlist:", error);
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Join the LocalDrive Waitlist - Be First to Drive with Us</title>
        <meta
          name="description"
          content="Join the LocalDrive waitlist and be among the first to experience our revolutionary driving education platform in Nigeria. Get early access and exclusive updates."
        />
        <meta
          name="keywords"
          content="LocalDrive waitlist, driving lessons waitlist, early access driving school, Nigerian driving education"
        />
        <link rel="canonical" href="https://localdriveapp.com/waitlist" />
        <meta property="og:title" content="Join the LocalDrive Waitlist" />
        <meta
          property="og:description"
          content="Be among the first to experience LocalDrive's revolutionary driving education platform in Nigeria."
        />
        <meta property="og:url" content="https://localdriveapp.com/waitlist" />
        <meta property="og:type" content="website" />
      </Helmet>

      <WaitlistHeader />

      <main className="min-h-screen bg-gradient-to-b from-background to-secondary/10">
        <section className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Join the LocalDrive Waitlist
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Be among the first to experience the future of driving education
                in Nigeria. Get early access, exclusive updates, and special
                offers.
              </p>
            </div>

            <div className="bg-card p-8 rounded-lg shadow-lg border border-border">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      maxLength={100}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    maxLength={255}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Joining Waitlist...
                    </>
                  ) : (
                    "Join the Waitlist"
                  )}
                </Button>
              </form>

              <div className="mt-8 pt-6 border-t border-border">
                <h2 className="text-lg font-semibold mb-4">
                  What you'll get:
                </h2>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Early access to the platform before public launch</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Exclusive updates on our progress and features</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Special launch offers and discounts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Priority access to certified driving instructors</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <WaitlistFooter />
    </>
  );
};

export default Waitlist;
