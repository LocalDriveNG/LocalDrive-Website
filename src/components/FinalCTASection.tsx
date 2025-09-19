import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
              Ready to Take the Wheel?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Find your perfect instructor today and start your driving journey.
            </p>
          </div>
          
          <Button 
            size="lg" 
            className="hero-gradient hover:opacity-90 transition-opacity shadow-brand-lg text-lg px-12 py-6 group"
          >
            Browse Local Instructors
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <p className="text-sm text-muted-foreground">
            Join thousands of confident drivers who started with LocalDrive
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;