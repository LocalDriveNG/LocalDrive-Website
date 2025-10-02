import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Types for cookie consent
type ConsentStatus = 'accepted' | 'rejected' | null;

// Properly typed gtag function
type GtagParams = 
  | ['consent', 'default' | 'update', ConsentParams]
  | ['config', string, ConfigParams?]
  | ['js', Date]
  | ['event', string, EventParams?];

interface ConsentParams {
  analytics_storage: 'granted' | 'denied';
}

interface ConfigParams {
  page_title?: string;
  page_location?: string;
}

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (...args: GtagParams) => void;
    dataLayer: unknown[];
  }
}

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Initialize consent status and check existing preference
  useEffect(() => {
    const savedConsent = localStorage.getItem("cookieConsent") as ConsentStatus;
    
    if (!savedConsent) {
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    } else {
      // If consent already exists, initialize analytics based on preference
      initializeAnalytics(savedConsent);
    }
  }, []);

  // Google Analytics initialization and tracking
  const initializeAnalytics = (status: ConsentStatus) => {
    if (status === 'accepted') {
      // Enable Google Analytics tracking
      if (typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'granted'
        });
        console.log('Google Analytics enabled: User accepted cookies');
        
        // Track the page view with granted consent
        window.gtag('config', 'G-9NTXFF6XF7', {
          'page_title': document.title,
          'page_location': window.location.href
        });
      }
    } else if (status === 'rejected') {
      // Disable Google Analytics
      if (typeof window.gtag !== 'undefined') {
        window.gtag('consent', 'update', {
          'analytics_storage': 'denied'
        });
        console.log('Google Analytics disabled: User rejected cookies');
      }
    }
  };

  // Track consent decision in Google Analytics
  const trackConsentDecision = (decision: 'accepted' | 'rejected') => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'cookie_consent', {
        'event_category': 'privacy',
        'event_label': decision,
        'value': 1
      });
    }
  };

  const handleAccept = () => {
    const decision: ConsentStatus = 'accepted';
    localStorage.setItem("cookieConsent", decision);
    setIsVisible(false);
    
    // Initialize analytics and track decision
    initializeAnalytics(decision);
    trackConsentDecision(decision);
    
    console.log('Cookies accepted - preferences saved');
  };

  const handleReject = () => {
    const decision: ConsentStatus = 'rejected';
    localStorage.setItem("cookieConsent", decision);
    setIsVisible(false);
    
    // Disable analytics and track decision
    initializeAnalytics(decision);
    trackConsentDecision(decision);
    
    console.log('Cookies rejected - preferences saved');
  };

  if (!isVisible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 z-40 bg-card border border-border rounded-lg shadow-brand-lg p-4 sm:p-6 animate-fade-in"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
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
            className="absolute top-2 right-2 p-2 rounded-full hover:bg-muted transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
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