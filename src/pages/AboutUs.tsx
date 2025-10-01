import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, MapPin, Award, Target, BookOpen, Shield, TabletSmartphone, ShieldCheck, CreditCard } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-50 dark:to-neutral-100">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 dark:text-neutral-800">
                About <span className="text-gradient">LocalDrive</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
                We're revolutionizing driving education in Nigeria by connecting learners 
                with certified instructors through our modern, technology-driven platform.
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Target className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  To make quality driving education accessible to every Nigerian by connecting 
                  learners with certified, professional driving instructors in their local area. 
                  We believe everyone deserves safe, convenient, and effective driving lessons.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Award className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl font-bold text-foreground">Our Vision</h2>
                </div>
                <p className="text-lg text-muted-foreground">
                  To become Nigeria's leading platform for driving education, creating a 
                  community of confident, safe drivers while empowering certified instructors 
                  to build successful teaching businesses.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 lg:py-20 bg-neutral-50 dark:bg-neutral-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center space-y-6 mb-12">
                <div className="flex items-center justify-center gap-3">
                  <BookOpen className="h-8 w-8 text-primary" />
                  <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 dark:text-neutral-800">Our Story</h2>
                </div>
              </div>
              
              <div className="prose prose-lg mx-auto text-muted-foreground">
                <p className="text-lg leading-relaxed mb-6">
                  LocalDrive was founded with a simple observation: finding quality driving 
                  instructors in Nigeria was often challenging, time-consuming, and unreliable. 
                  Many learners struggled to find certified instructors in their area, while 
                  qualified instructors had difficulty reaching potential students.
                </p>
                
                <p className="text-lg leading-relaxed mb-6">
                  Our team recognized the opportunity to bridge this gap using technology. 
                  We developed a platform that makes it easy for learners to discover, 
                  connect with, book and schedule lessons with verified driving instructors in 
                  their neighborhood.
                </p>
                
                <p className="text-lg leading-relaxed">
                  Today, LocalDrive serves communities across Lagos, helping thousands of people begin their journey to 
                  confident, safe driving.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center space-y-6 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Why Choose LocalDrive?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We're committed to providing the best driving education experience in Nigeria
              </p>
            </div>
                        
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <TabletSmartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Innovation First</h3>
                <p className="text-muted-foreground">
                  Leveraging technology to continuously improve our platform to create a seamless learning experience.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Certified Instructors</h3>
                <p className="text-muted-foreground">
                  All our instructors are professionally certified and thoroughly vetted 
                  to ensure the highest quality instruction.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Local Convenience</h3>
                <p className="text-muted-foreground">
                  Find instructors in your neighborhood across Lagos for maximum convenience.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Seamless Payment</h3>
                <p className="text-muted-foreground">
                  Make seamsless payments through our secure platform with multiple payment options.
                </p>
              </div>

              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Safety First</h3>
                <p className="text-muted-foreground">
                  Every lesson prioritizes safety, ensuring learners develop responsible driving habits from day one.
                </p>
              </div>
              
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Community Focused</h3>
                <p className="text-muted-foreground">
                  We're building a community of confident drivers and successful 
                  instructors across Nigeria.
                </p>
              </div>
          </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 lg:py-20 bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">1000+</div>
                <div className="text-lg opacity-90">Happy Learners</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">200+</div>
                <div className="text-lg opacity-90">Certified Instructors</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">5</div>
                <div className="text-lg opacity-90">Major Cities</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold">4.9/5</div>
                <div className="text-lg opacity-90">Average Rating</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AboutUs;