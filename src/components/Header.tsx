import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { Button } from "@/components/ui/button";
import { Menu, X, Sun, Moon } from "lucide-react";
import logoFull from "@/assets/localdrive-logo.png";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center" aria-label="LocalDrive Home">
              <img 
                src={logoFull} 
                alt="LocalDrive - Your local driving way, reimagined"
                className="h-20 w-auto max-w-[320px] font-bold filter contrast-125 hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <HashLink 
              to="/#how-it-works"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              For Learners
            </HashLink>
            <HashLink 
              to="/#features"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Why Us?
            </HashLink>
            <HashLink 
              to="/#instructors"
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              For Instructors
            </HashLink>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              About Us
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Contact Us
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-3">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
            <HashLink to="/#downloads">
              <Button className="hero-gradient hover:opacity-90 transition-opacity">
                Download App
              </Button>
            </HashLink>
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
            <HashLink
              to="/#how-it-works"
              className="block px-3 py-2 text-base font-medium text-foreground hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              For Learners
            </HashLink>
            <HashLink
              to="/#features"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Why Us?
            </HashLink>
            <HashLink
              to="/#instructors"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              For Instructors
            </HashLink>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
            <div className="pt-4 pb-2 border-t border-border mt-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between mb-2">
                  {/* <span className="text-sm font-medium text-foreground">Theme</span> */}
                  <button
                    onClick={toggleDarkMode}
                    className="p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
                    aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {isDarkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <HashLink to="/#downloads" onClick={() => setIsMenuOpen(false)}>
                  <Button className="hero-gradient hover:opacity-90 transition-opacity w-full">
                    Download App
                  </Button>
                </HashLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;