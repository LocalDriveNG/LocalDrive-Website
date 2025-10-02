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
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'white',
      padding: '1rem',
      border: '1px solid #ccc',
      zIndex: 50
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', fontWeight: 'bold' }}>
            We value your privacy
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', color: '#666' }}>
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
            By clicking "Accept", you consent to our use of cookies.{" "}
            <Link to="/privacy-policy" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              Privacy Policy
            </Link>
            {" and "}
            <Link to="/cookies-policy" style={{ color: '#2563eb', textDecoration: 'underline' }}>
              Cookies Policy
            </Link>
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={handleReject}
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              background: 'white',
              cursor: 'pointer'
            }}
            aria-label="Reject cookies"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            style={{
              padding: '0.5rem 1rem',
              border: 'none',
              borderRadius: '0.375rem',
              background: '#2563eb',
              color: 'white',
              cursor: 'pointer'
            }}
            aria-label="Accept cookies"
          >
            Accept
          </button>
        </div>

        <button
          onClick={handleReject}
          style={{
            position: 'absolute',
            top: '-0.5rem',
            right: '-0.5rem',
            padding: '0.5rem',
            borderRadius: '50%',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer'
          }}
          aria-label="Close cookie banner"  // Added this line
          title="Close"  // Added this line for extra accessibility
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;