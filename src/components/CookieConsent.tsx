import { useState, useEffect } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    console.log("CookieConsent mounted");
    const timer = setTimeout(() => {
      console.log("Setting visible to true");
      setIsVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    console.log("Accepted");
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
      <p>We use cookies</p>
      <button onClick={handleAccept}>Accept</button>
    </div>
  );
};

export default CookieConsent;