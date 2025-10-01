import Header from "@/components/Header.tsx";
import HeroSection from "@/components/HeroSection.tsx";
import HowItWorksSection from "@/components/HowItWorksSection.tsx";
import FeaturesSection from "@/components/FeaturesSection.tsx";
import TestimonialsSection from "@/components/TestimonialsSection.tsx";
import InstructorCTASection from "@/components/InstructorCTASection.tsx";
import FutureVisionSection from "@/components/FutureVisionSection.tsx";
import FAQSection from "@/components/FAQSection.tsx";
import NewsletterSection from "@/components/NewsletterSection.tsx";
// import FinalCTASection from "@/components/FinalCTASection";
import Footer from "@/components/Footer.tsx";

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
