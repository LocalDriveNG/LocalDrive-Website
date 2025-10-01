import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const { data, error } = await supabase
          .from('faqs')
          .select('question, answer')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error fetching FAQs:', error);
          // Fallback to default FAQs
          setFaqs([
            {
              question: "How do I book my first driving lesson?",
              answer: "Booking your first lesson is easy! Simply enter your location on our platform, browse available certified instructors, select a time that works for you, and pay securely online. You'll receive instant confirmation and your instructor's contact details."
            },
            {
              question: "Are all LocalDrive instructors certified?",
              answer: "Yes, absolutely! All our instructors are fully qualified, certified driving instructors who have passed rigorous background checks. They're also familiar with local roads and test routes in your area."
            },
            {
              question: "Can I change or cancel my lesson?",
              answer: "Yes, you can reschedule or cancel lessons through our app or website. We require at least 24 hours notice for changes to avoid cancellation fees. Same-day changes may be subject to charges."
            },
            {
              question: "What payment methods do you accept?",
              answer: "We accept all major credit and debit cards, as well as digital wallets like Apple Pay and Google Pay. All payments are processed securely, and you'll receive an instant receipt."
            },
            {
              question: "Do you offer lesson packages or discounts?",
              answer: "Yes! We offer flexible lesson packages that provide better value than individual lessons. The more lessons you book, the more you save. We also offer student discounts and seasonal promotions."
            }
          ]);
        } else {
          setFaqs(data || []);
        }
      } catch (error) {
        console.error('Error fetching FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-muted-foreground">
              Find answers to common questions about LocalDrive and our services.
            </p>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Loading FAQs...</p>
              </div>
            ) : (
              faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-neutral-50 transition-colors duration-200"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-neutral-800 pr-4">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${
                      openIndex === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`px-6 transition-all duration-200 ease-in-out ${
                    openIndex === index
                      ? "pb-6 opacity-100 max-h-96"
                      : "pb-0 opacity-0 max-h-0 overflow-hidden"
                  }`}
                >
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
              ))
            )}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <a
              href="mailto:support@localdriveapp.com"
              className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors duration-200"
            >
              Contact our support team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;