import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 animate-fade-in"
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
    >
      <div className="max-w-6xl mx-auto bg-background/95 backdrop-blur-lg border border-border rounded-lg shadow-2xl">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
            <div className="flex-1 space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-lg font-semibold text-foreground">
                  We value your privacy
                </h3>
                <button
                  onClick={handleReject}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Close banner"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, personalize content, 
                and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
              </p>
              <div className="flex flex-wrap gap-2 text-sm">
                <Link
                  to="/privacy-policy"
                  className="text-primary hover:underline font-medium"
                  onClick={() => setShowBanner(false)}
                >
                  Privacy Policy
                </Link>
                <span className="text-muted-foreground">•</span>
                <Link
                  to="/cookies-policy"
                  className="text-primary hover:underline font-medium"
                  onClick={() => setShowBanner(false)}
                >
                  Cookies Policy
                </Link>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <button
                onClick={handleReject}
                className="px-6 py-2.5 border border-border rounded-lg font-medium text-foreground hover:bg-accent transition-colors"
                aria-label="Reject cookies"
              >
                Reject
              </button>
              <button
                onClick={handleAccept}
                className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors shadow-sm"
                aria-label="Accept all cookies"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
