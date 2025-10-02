import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <p>
        We use cookies.{" "}
        <Link to="/privacy-policy">Privacy Policy</Link>
        {" and "}
        <Link to="/cookies-policy">Cookies Policy</Link>
      </p>
      <button onClick={handleReject}>Reject</button>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
};

export default CookieConsent;