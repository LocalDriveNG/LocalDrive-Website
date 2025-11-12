import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import logoFull from "@/assets/localdrive-logo.png";

const WaitlistHeader = () => {
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
    <header className="fixed top-0 z-50 w-full bg-background/95 dark:bg-background/98 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/80 border-b border-border dark:border-neutral-700 shadow-sm dark:shadow-md">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-20" role="navigation" aria-label="Main navigation">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/waitlist" className="flex items-center" aria-label="LocalDrive Home">
              <img 
                src={logoFull} 
                alt="LocalDrive - Your local driving way, reimagined"
                className="h-20 w-auto max-w-[320px] font-bold filter contrast-125 hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            <Link 
              to="/waitlist" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-foreground hover:text-primary transition-colors duration-200 font-medium"
            >
              About Us
            </Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
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

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-muted focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-all duration-200"
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
          className={`lg:hidden transition-all duration-200 ease-in-out ${
            isMenuOpen 
              ? 'max-h-[500px] opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}
          id="mobile-menu"
        >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-background border-t border-border">
            <Link
              to="/waitlist"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-base font-medium text-foreground hover:text-primary hover:bg-muted rounded-md transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default WaitlistHeader;