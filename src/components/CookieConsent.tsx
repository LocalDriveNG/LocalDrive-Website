import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X, Cookie } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Delay showing the banner slightly for better UX
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    closeBanner();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    closeBanner();
  };

  const closeBanner = () => {
    setIsClosing(true);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 transition-all duration-300 ${
        isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        <div className="bg-background/95 backdrop-blur-lg border-2 border-primary/20 rounded-2xl shadow-brand-lg p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Cookie className="w-6 h-6 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-lg md:text-xl font-bold text-foreground">
                We Value Your Privacy
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. 
                Learn more in our{" "}
                <Link 
                  to="/cookies-policy" 
                  className="text-primary hover:text-primary-hover font-medium underline underline-offset-2 transition-colors"
                  onClick={() => setIsVisible(false)}
                >
                  Cookies Policy
                </Link>
                {" "}and{" "}
                <Link 
                  to="/privacy-policy" 
                  className="text-primary hover:text-primary-hover font-medium underline underline-offset-2 transition-colors"
                  onClick={() => setIsVisible(false)}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={handleReject}
                variant="outline"
                className="border-border hover:bg-muted w-full sm:w-auto"
              >
                Reject All
              </Button>
              <Button
                onClick={handleAccept}
                className="hero-gradient hover:opacity-90 transition-opacity w-full sm:w-auto"
              >
                Accept All
              </Button>
            </div>

            <button
              onClick={closeBanner}
              className="absolute top-4 right-4 md:relative md:top-0 md:right-0 p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Close cookie consent"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
