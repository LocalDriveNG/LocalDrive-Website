import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstructorCTASection from "@/components/InstructorCTASection";
import FutureVisionSection from "@/components/FutureVisionSection";
import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <InstructorCTASection />
      <FutureVisionSection />
      <FinalCTASection />
      <Footer />
    </div>
  );
};

export default Index;
