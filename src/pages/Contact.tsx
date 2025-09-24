import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  const formData = new FormData(e.currentTarget);
  const contactData = {
    first_name: formData.get('firstName') as string,
    last_name: formData.get('lastName') as string,
    email: formData.get('email') as string,
    phone: formData.get('phone') as string || null,
    subject: formData.get('subject') as string,
    message: formData.get('message') as string,
  };

  try {
    const { error } = await supabase
      .from('contact_submissions')
      .insert(contactData);

    // Only throw error if it actually exists
    if (error) {
      throw error;
    }

    toast({
      title: "Message sent successfully!",
      description: "Thank you for contacting us. We'll get back to you soon.",
    });
    
    // Reset form
    e.currentTarget.reset();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    toast({
      title: "Error sending message",
      description: "Please try again later or email us directly at contact@localdriveapp.com",
      variant: "destructive",
    });
  } finally {
    setIsSubmitting(false);
  }
};
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800">
                Get in <span className="text-gradient">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto contact-hero-description">
                Have questions about LocalDrive? We're here to help. Reach out to us 
                and we'll respond as soon as possible.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              {/* Contact Form */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-neutral-800">
                      Send Us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input 
                            id="firstName" 
                            name="firstName"
                            type="text" 
                            required 
                            placeholder="Enter your first name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input 
                            id="lastName" 
                            name="lastName"
                            type="text" 
                            required 
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email" 
                          required 
                          placeholder="Enter your email address"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone"
                          type="tel" 
                          placeholder="Enter your phone number"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Input 
                          id="subject" 
                          name="subject"
                          type="text" 
                          required 
                          placeholder="What is this regarding?"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea 
                          id="message" 
                          name="message"
                          required 
                          placeholder="Tell us how we can help you..."
                          rows={6}
                        />
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full hero-gradient hover:opacity-90 transition-opacity"
                        size="lg"
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-neutral-800 mb-6">
                    Contact Information
                  </h2>
                  <p className="text-lg text-muted-foreground mb-8">
                    We're here to assist you with any questions about LocalDrive, 
                    whether you're a learner looking for an instructor or an instructor 
                    wanting to join our platform.
                  </p>
                </div>

                <div className="space-y-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-neutral-800 mb-2">Address</h3>
                          <p className="text-muted-foreground">
                            Lagos, Nigeria<br />
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-neutral-800 mb-2">Phone</h3>
                          <p className="text-muted-foreground">
                            +234 (0) 808 992 5040<br />
                            {/* +234 (0) 987 654 3210 */}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-neutral-800 mb-2">Email</h3>
                          <p className="text-muted-foreground">
                            support@localdriveapp.com<br />
                            info@localdriveapp.com
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Clock className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-neutral-800 mb-2">Business Hours</h3>
                          <p className="text-muted-foreground">
                            Monday - Friday: 8:00 AM - 6:00 PM<br />
                            Saturday: 9:00 AM - 4:00 PM<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ CTA */}
        <section className="py-16 lg:py-20 bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-800">
                Frequently Asked Questions
              </h2>
              <p className="text-lg text-muted-foreground">
                Before reaching out, check our FAQ section for quick answers to common questions.
              </p>
              <div className="mt-16">
                <HashLink to="/#faq">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground hover:scale-105 transition-all duration-200"
                  >
                    View FAQ
                  </Button>
                </HashLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;