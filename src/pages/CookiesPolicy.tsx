import Header from "@/components/Header";
import Footer from "@/components/Footer";

const CookiesPolicy = () => {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-800">
                Cookies Policy
              </h1>
              <div className="prose prose-lg mx-auto">
                <p className="text-lg text-muted-foreground">
                  This page is under construction. Please check back later.
                </p>
                <p className="text-sm text-muted-foreground mt-8">
                  For immediate cookie-related inquiries, please contact us at privacy@localdrive.com
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default CookiesPolicy;