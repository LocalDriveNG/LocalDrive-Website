import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Menu, X } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import { Button } from "./ui/button";

export interface LegalSection {
  id: string;
  title: string;
  level?: 1 | 2 | 3;
}

interface LegalPageLayoutProps {
  title: string;
  lastUpdated: string;
  sections: LegalSection[];
  children: ReactNode;
}

const LegalPageLayout = ({
  title,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) => {
  const [activeSection, setActiveSection] = useState<string>("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button after scrolling 400px
      setShowBackToTop(window.scrollY > 400);

      // Update active section based on scroll position
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      );

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(sections[i].id);
            break;
          }
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

  const handleSectionClick = (id: string) => {
    setTocOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="relative">
        {/* Hero Section */}
        <section className="py-12 lg:py-16 bg-gradient-to-br from-primary/5 to-secondary/5 border-b border-border">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                {title}
              </h1>
              <p className="text-sm text-muted-foreground">
                <strong>Last Updated:</strong> {lastUpdated}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content with TOC */}
        <div className="container mx-auto px-4 py-12 lg:py-16">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Mobile TOC Toggle */}
            <div className="lg:hidden">
              <Button
                variant="outline"
                className="w-full justify-start gap-2"
                onClick={() => setTocOpen(!tocOpen)}
              >
                {tocOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                {tocOpen ? "Close" : "Table of Contents"}
              </Button>

              {/* Mobile TOC Dropdown */}
              {tocOpen && (
                <nav 
                  className="mt-4 p-4 bg-card border border-border rounded-lg shadow-lg"
                  aria-label="Table of contents"
                >
                  <h2 className="text-sm font-semibold text-foreground mb-3">
                    Contents
                  </h2>
                  <ul className="space-y-2">
                    {sections.map((section) => (
                      <li 
                        key={section.id}
                        style={{ paddingLeft: `${(section.level || 1) * 0.75}rem` }}
                      >
                        <button
                          onClick={() => handleSectionClick(section.id)}
                          className={`text-sm text-left w-full transition-colors hover:text-primary ${
                            activeSection === section.id
                              ? "text-primary font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {section.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* Desktop Sticky TOC */}
            <aside className="hidden lg:block w-64 flex-shrink-0">
              <nav 
                className="sticky top-24 bg-card border border-border rounded-lg p-6 shadow-sm"
                aria-label="Table of contents"
              >
                <h2 className="text-sm font-semibold text-foreground mb-4">
                  Table of Contents
                </h2>
                <ul className="space-y-2">
                  {sections.map((section) => (
                    <li 
                      key={section.id}
                      style={{ paddingLeft: `${((section.level || 1) - 1) * 0.75}rem` }}
                    >
                      <button
                        onClick={() => handleSectionClick(section.id)}
                        className={`text-sm text-left transition-colors hover:text-primary ${
                          activeSection === section.id
                            ? "text-primary font-semibold"
                            : "text-muted-foreground"
                        }`}
                      >
                        {section.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Content */}
            <article className="flex-1 max-w-3xl">
              <div className="prose prose-lg max-w-none
                prose-headings:font-montserrat prose-headings:font-semibold
                prose-h2:text-3xl prose-h2:text-foreground prose-h2:mt-12 prose-h2:mb-4 prose-h2:scroll-mt-24
                prose-h3:text-2xl prose-h3:text-foreground prose-h3:mt-8 prose-h3:mb-3 prose-h3:scroll-mt-24
                prose-h4:text-xl prose-h4:text-foreground prose-h4:mt-6 prose-h4:mb-2
                prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-strong:text-foreground prose-strong:font-semibold
                prose-ul:text-foreground prose-ul:my-4
                prose-ol:text-foreground prose-ol:my-4
                prose-li:text-foreground prose-li:mb-2
                prose-a:text-primary prose-a:no-underline hover:prose-a:text-primary-hover
                prose-a:transition-colors prose-a:font-medium
                dark:prose-headings:text-foreground
                dark:prose-p:text-foreground
                dark:prose-strong:text-foreground
                dark:prose-li:text-foreground
                dark:prose-a:text-primary dark:hover:prose-a:text-primary-hover"
              >
                {children}
              </div>

              {/* Contact Section */}
              <div className="mt-12 pt-8 border-t border-border">
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Contact Us
                </h2>
                <p className="text-foreground mb-4">
                  For questions or issues regarding this document, please contact us:
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/contact">
                    <Button variant="default" size="lg">
                      Contact Support
                    </Button>
                  </Link>
                  <a href="mailto:support@localdriveapp.com">
                    <Button variant="outline" size="lg">
                      Email Us
                    </Button>
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-primary hover:bg-primary-hover text-primary-foreground p-3 rounded-full shadow-brand-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LegalPageLayout;
