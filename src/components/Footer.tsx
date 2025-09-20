import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
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
              <li><a href="#" className="hover:text-primary transition-colors">Find Instructors</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">How It Works</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Support</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">For Instructors</h4>
            <ul className="space-y-2 text-neutral-300">
              <li><a href="#" className="hover:text-primary transition-colors">Join LocalDrive</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instructor Resources</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Getting Started</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Instructor Support</a></li>
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
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="text-center text-sm text-neutral-400 mt-8">
            © 2024 LocalDrive. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;