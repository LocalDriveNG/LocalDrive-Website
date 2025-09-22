import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";
import { GraduationCap, Clock, TrendingUp } from "lucide-react";

const InstructorCTASection = () => {
  return (
    <section id="instructors" className="py-16 lg:py-24 bg-gradient-to-br from-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Are You a Certified Driving Instructor?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Join our platform to grow your business, manage your schedule effortlessly, 
              and get paid on time. Reach more students in your local area.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Expand Your Reach</h3>
              <p className="text-sm opacity-80">Connect with more students</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Flexible Schedule</h3>
              <p className="text-sm opacity-80">Work when it suits you</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Grow Your Income</h3>
              <p className="text-sm opacity-80">Reliable, timely payments</p>
            </div>
          </div>
          
          <HashLink to="/#downloads">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-white text-secondary hover:bg-neutral-100 text-lg px-8 py-6 shadow-lg"
            >
              Teach with LocalDrive
            </Button>
          </HashLink>
        </div>
      </div>
    </section>
  );
};

export default InstructorCTASection;