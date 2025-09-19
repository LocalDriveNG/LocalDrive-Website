import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoFull from "@/assets/localdrive-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="flex items-center" aria-label="LocalDrive Home">
              <img 
                src={logoFull} 
                alt="LocalDrive - Your local driving school, reimagined"
                className="h-8 w-auto"
              />
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a 
              href="#how-it-works" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a 
              href="#features" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a 
              href="#testimonials" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Reviews
            </a>
            <a 
              href="#instructors" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              For Instructors
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <Button variant="ghost" className="hover:bg-muted">
              Sign In
            </Button>
            <Button className="hero-gradient hover:opacity-90 transition-opacity">
              Get Started
            </Button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={toggleMenu}
          >
            {isMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div 
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
          id="mobile-menu"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
            <a
              href="#how-it-works"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#features"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#testimonials"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Reviews
            </a>
            <a
              href="#instructors"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              For Instructors
            </a>
            <div className="pt-4 pb-2 border-t border-border mt-4">
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Button>
                <Button className="hero-gradient hover:opacity-90 transition-opacity" onClick={() => setIsMenuOpen(false)}>
                  Get Started
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;