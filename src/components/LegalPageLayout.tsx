import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronUp, Menu } from "lucide-react";
import Header from "@/components/Header.tsx";
import Footer from "@/components/Footer.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet.tsx";

interface Section {
  id: string;
  title: string;
  subsections?: { id: string; title: string }[];
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: Section[];
  children: ReactNode;
}

const LegalPageLayout = ({ title, lastUpdated, sections, children }: LegalPageLayoutProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button
      setShowBackToTop(window.scrollY > 400);

      // Update active section
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      }));

      const scrollPosition = window.scrollY + 150;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.element && section.element.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const TableOfContents = () => (
    <nav className="space-y-1" aria-label="Table of contents">
      {sections.map((section) => (
        <div key={section.id}>
          <a
            href={`#${section.id}`}
            className={`block py-2 px-4 text-sm rounded-md transition-colors ${
              activeSection === section.id
                ? "bg-primary/10 text-primary font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            {section.title}
          </a>
          {section.subsections && (
            <div className="ml-4 space-y-1">
              {section.subsections.map((sub) => (
                <a
                  key={sub.id}
                  href={`#${sub.id}`}
                  className="block py-1 px-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {sub.title}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-12 lg:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
                  {title}
                </h1>
                <p className="text-sm md:text-base text-muted-foreground inline-flex items-center gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                  Last Updated: <time dateTime={lastUpdated}>{lastUpdated}</time>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Desktop Table of Contents */}
              <aside className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h2 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
                      Table of Contents
                    </h2>
                    <TableOfContents />
                  </div>
                  
                  <div className="pt-6 border-t border-border">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Related Policies</h3>
                    <div className="space-y-2">
                      <Link
                        to="/privacy-policy"
                        className="block text-sm text-primary hover:text-primary-hover transition-colors"
                      >
                        Privacy Policy
                      </Link>
                      <Link
                        to="/cookies-policy"
                        className="block text-sm text-primary hover:text-primary-hover transition-colors"
                      >
                        Cookies Policy
                      </Link>
                      <Link
                        to="/terms-of-service"
                        className="block text-sm text-primary hover:text-primary-hover transition-colors"
                      >
                        Terms of Service
                      </Link>
                    </div>
                  </div>
                </div>
              </aside>

              {/* Mobile Table of Contents */}
              <div className="lg:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="w-full mb-6">
                      <Menu className="w-4 h-4 mr-2" />
                      Table of Contents
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-[300px] overflow-y-auto">
                    <div className="mt-6">
                      <h2 className="text-sm font-semibold mb-4 uppercase tracking-wider">
                        Table of Contents
                      </h2>
                      <TableOfContents />
                      
                      <div className="pt-6 mt-6 border-t border-border">
                        <h3 className="text-sm font-semibold mb-3">Related Policies</h3>
                        <div className="space-y-2">
                          <Link
                            to="/privacy-policy"
                            className="block text-sm text-primary hover:text-primary-hover transition-colors"
                          >
                            Privacy Policy
                          </Link>
                          <Link
                            to="/cookies-policy"
                            className="block text-sm text-primary hover:text-primary-hover transition-colors"
                          >
                            Cookies Policy
                          </Link>
                          <Link
                            to="/terms-of-service"
                            className="block text-sm text-primary hover:text-primary-hover transition-colors"
                          >
                            Terms of Service
                          </Link>
                        </div>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              {/* Main Content */}
              <article className="lg:col-span-9">
                <div className="prose prose-lg max-w-none
                  prose-headings:font-montserrat prose-headings:font-semibold
                  prose-h2:text-3xl prose-h2:text-foreground prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-border
                  prose-h3:text-xl prose-h3:text-foreground prose-h3:mt-8 prose-h3:mb-4
                  prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-4
                  prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-hover prose-a:transition-colors
                  prose-strong:text-foreground prose-strong:font-semibold
                  prose-ul:my-6 prose-ul:space-y-2
                  prose-ol:my-6 prose-ol:space-y-2
                  prose-li:text-muted-foreground prose-li:leading-relaxed
                  prose-hr:border-border prose-hr:my-8
                  dark:prose-invert
                ">
                  {children}
                </div>

                {/* Contact Section */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="bg-muted/50 rounded-lg p-6 md:p-8">
                    <h2 className="text-xl font-semibold text-foreground mb-4">
                      Questions or Concerns?
                    </h2>
                    <p className="text-muted-foreground mb-4">
                      If you have any questions about this document or our practices, 
                      please don't hesitate to contact us.
                    </p>
                    <a
                      href="mailto:support@localdriveapp.com"
                      className="inline-flex items-center text-primary hover:text-primary-hover font-medium transition-colors"
                    >
                      support@localdriveapp.com
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-brand-lg hover:bg-primary-hover transition-all duration-300 hover:scale-110 z-40"
            aria-label="Back to top"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default LegalPageLayout;