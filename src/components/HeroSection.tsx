import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-nigerian-driving-lesson.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-neutral-50 to-white">
      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-neutral-800">
                Your Journey to{" "}
                <span className="text-gradient">Confident Driving</span>{" "}
                Starts Here
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
                LocalDrive connects you with certified instructors in your neighborhood 
                for a seamless, modern learning experience. Get on the road faster, 
                smarter, and safer.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="hero-gradient hover:opacity-90 transition-opacity shadow-brand text-lg px-8 py-6"
                onClick={() => document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Find Your Instructor
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8 py-6"
                onClick={() => document.getElementById('downloads')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Become an Instructor
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-brand-lg">
              <img 
                src={heroImage} 
                alt="Nigerian driving instructor and student during a driving lesson in Lagos"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-trust text-white px-6 py-3 rounded-full shadow-lg">
              <span className="text-sm font-semibold">4.9/5 ⭐ Rating</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;