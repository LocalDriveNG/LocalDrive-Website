import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
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
    <div className="fixed bottom-4 left-4 right-4 z-40 bg-white border border-gray-300 rounded-lg shadow-lg p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 relative">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            We value your privacy
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By clicking "Accept", you consent to our use of cookies.{" "}
            <Link 
              to="/privacy-policy" 
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            {" and "}
            <Link 
              to="/cookies-policy" 
              className="text-blue-600 hover:text-blue-700 underline underline-offset-2"
            >
              Cookies Policy
            </Link>
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={handleReject}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Reject cookies"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Accept cookies"
          >
            Accept
          </button>
        </div>

        <button
          onClick={handleReject}
          className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          aria-label="Close cookie banner"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;