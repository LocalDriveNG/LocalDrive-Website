<<<<<<< HEAD
import { Instagram, Linkedin } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

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
              <li><HashLink to="/#how-it-works" className="hover:text-primary transition-colors">How It Works</HashLink></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Instructors</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><HashLink to="/#instructors" className="hover:text-primary transition-colors">Getting Started</HashLink></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Instructor Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-neutral-400">
              <Link to="/about" className="hover:text-primary transition-colors">About Us</Link>
              <Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link to="/cookies-policy" className="hover:text-primary transition-colors">Cookies Policy</Link>
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
            © {new Date().getFullYear()} LocalDrive. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

=======
import { Instagram, Linkedin } from "lucide-react";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import logoIcon from "@/assets/localdrive-icon.png";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 dark:bg-transparent text-white dark:text-white py-16">
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
                <p className="text-neutral-300 dark:text-neutral-300 text-sm mt-1">Your local driving school, reimagined.</p>
              </div>
            </div>
            <p className="text-neutral-400 dark:text-neutral-400 max-w-md">
              Connecting learners with certified instructors for a modern, 
              efficient driving education experience.
            </p>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white dark:text-white">For Learners</h4>
            <ul className="space-y-2 text-neutral-300 dark:text-neutral-300">
              <li><HashLink to="/#how-it-works" className="text-neutral-300 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">How It Works</HashLink></li>
              <li><Link to="/contact" className="text-neutral-300 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">Support</Link></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg text-white dark:text-white">For Instructors</h4>
            <ul className="space-y-2 text-neutral-300 dark:text-neutral-300">
              <li><HashLink to="/#instructors" className="text-neutral-300 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">Getting Started</HashLink></li>
              <li><Link to="/contact" className="text-neutral-300 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">Instructor Support</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-6 text-sm text-neutral-400 dark:text-neutral-400">
              <Link to="/about" className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">About Us</Link>
              <Link to="/privacy-policy" className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">Privacy Policy</Link>
              <Link to="/terms-of-service" className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">Terms of Service</Link>
              <Link to="/cookies-policy" className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:underline transition-all duration-200">Cookies Policy</Link>
            </div>
            
            <div className="flex gap-4">
              <a 
                href="https://x.com/getlocaldrive" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:scale-110 transition-all duration-200"
                aria-label="Follow us on X"
              >
                <XIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/getlocaldrive/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:scale-110 transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://www.linkedin.com/company/localdriveapp/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neutral-400 dark:text-white hover:text-primary dark:hover:text-primary hover:scale-110 transition-all duration-200"
                aria-label="Follow us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-sm text-neutral-400 dark:text-neutral-400 mt-8">
            © {new Date().getFullYear()} LocalDrive. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

>>>>>>> 784f2bf7ba1d8f7b5216fb6e8c3dccb5fb0abbcb
export default Footer;