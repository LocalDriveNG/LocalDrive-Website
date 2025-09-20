import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Target, MapPin, Users, Smartphone, Shield, Heart, Lightbulb, Clock } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6 mb-12">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800">
                About <span className="text-gradient">LocalDrive</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Revolutionizing driver education by connecting learners with certified instructors in their local community.
              </p>
            </div>

            <div className="space-y-16">
              <section className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">Our Mission</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At LocalDrive, we believe that learning to drive should be convenient, affordable, and stress-free. 
                  Our platform connects aspiring drivers with experienced, certified instructors in their neighborhood, 
                  making quality driving education accessible to everyone across Nigeria.
                </p>
              </section>

              <section className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-xl flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">What We Do</h2>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  LocalDrive is a modern platform that streamlines the entire driving lesson experience. We carefully 
                  vet our instructors, provide digital progress tracking, and offer flexible scheduling to fit your 
                  busy lifestyle. Whether you're a complete beginner or need a refresher course, we connect you with 
                  the right instructor for your needs in Lagos and beyond.
                </p>
              </section>

              <section className="bg-white p-8 rounded-2xl shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-accent to-primary rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-neutral-800">Our Values</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-800">Safety First</h3>
                      <p className="text-muted-foreground">
                        All our instructors are fully certified and background-checked to ensure your safety and peace of mind.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-800">Local Expertise</h3>
                      <p className="text-muted-foreground">
                        Our instructors know the local roads, test routes, and driving conditions in your area.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Lightbulb className="w-4 h-4 text-accent" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-800">Modern Approach</h3>
                      <p className="text-muted-foreground">
                        We use technology to make booking, payment, and progress tracking simple and transparent.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-trust/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Clock className="w-4 h-4 text-trust" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold text-neutral-800">Flexible Learning</h3>
                      <p className="text-muted-foreground">
                        Learn at your own pace with flexible scheduling that works around your commitments.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-gradient-to-br from-primary to-secondary p-8 rounded-2xl text-white">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold">Join Our Community</h2>
                </div>
                <p className="text-lg opacity-90 leading-relaxed">
                  Thousands of confident drivers have started their journey with LocalDrive. Whether you're looking 
                  to learn or teach, we're here to support you every step of the way. Join our growing community 
                  and experience the future of driver education in Nigeria.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AboutUs;