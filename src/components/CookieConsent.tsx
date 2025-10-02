import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 animate-fade-in"
    >
      <div className="max-w-6xl mx-auto bg-card border border-border rounded-lg shadow-brand-lg p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-base sm:text-lg font-semibold text-foreground">
              We value your privacy
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
              By clicking "Accept", you consent to our use of cookies.{" "}
              <Link 
                to="/privacy-policy" 
                className="text-primary hover:text-primary-hover underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Privacy Policy
              </Link>
              {" and "}
              <Link 
                to="/cookies-policy" 
                className="text-primary hover:text-primary-hover underline underline-offset-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
              >
                Cookies Policy
              </Link>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
            <Button
              onClick={handleReject}
              variant="outline"
              className="w-full sm:w-auto min-w-[100px]"
              aria-label="Reject cookies"
            >
              Reject
            </Button>
            <Button
              onClick={handleAccept}
              className="w-full sm:w-auto min-w-[100px]"
              aria-label="Accept cookies"
            >
              Accept
            </Button>
          </div>

          <button
            onClick={handleReject}
            className="absolute top-2 right-2 sm:relative sm:top-0 sm:right-0 p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Close cookie banner"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
