import { Instagram, Linkedin } from "lucide-react";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import logoIcon from "@/assets/localdrive-icon.png";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-4">
            <div className="space-y-2 flex items-center gap-3">
              <img 
                src={logoIcon} 
                alt="LocalDrive Icon" 
                className="h-10 w-auto"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gradient leading-none">LocalDrive</h3>
                <p className="text-neutral-300 text-sm mt-1">Your local driving school, reimagined.</p>
              </div>
            </div>
            <p className="text-neutral-400 max-w-md">
              Connecting learners with certified instructors for a modern, 
              efficient driving education experience.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Learners</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><a href={window.location.pathname === '/' ? "#find-instructors" : "/#find-instructors"} className="hover:text-primary transition-colors">Find Instructors</a></li>
              <li><a href={window.location.pathname === '/' ? "#for-learners" : "/#for-learners"} className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Instructors</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><a href={window.location.pathname === '/' ? "#downloads" : "/#downloads"} className="hover:text-primary transition-colors">Join LocalDrive</a></li>
              <li><a href={window.location.pathname === '/' ? "#for-instructors" : "/#for-instructors"} className="hover:text-primary transition-colors">Getting Started</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">Instructor Support</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
              <a href="/about" className="hover:text-primary transition-colors">About Us</a>
              <a href="/contact" className="hover:text-primary transition-colors">Contact</a>
              <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="/cookies-policy" className="hover:text-primary transition-colors">Cookies Policy</a>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://x.com/getlocaldrive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary transition-colors"
                aria-label="Follow us on X"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/getlocaldrive/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/localdriveapp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-primary transition-colors"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-sm text-neutral-400 mt-8">
            © 2025 LocalDrive. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;