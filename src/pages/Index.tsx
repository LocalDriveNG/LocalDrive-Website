import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/FeaturesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import InstructorCTASection from "@/components/InstructorCTASection";
import FutureVisionSection from "@/components/FutureVisionSection";
import FAQSection from "@/components/FAQSection";
import NewsletterSection from "@/components/NewsletterSection";
// import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <InstructorCTASection />
      <FutureVisionSection />
      <FAQSection />
      <NewsletterSection />
      {/* <FinalCTASection /> */}
      <Footer />
    </div>
  );
};

export default Index;
