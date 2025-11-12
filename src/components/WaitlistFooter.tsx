import { Instagram, Linkedin } from "lucide-react";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
import logoIcon from "@/assets/localdrive-icon.png";

const WaitlistFooter = () => {
  return (
    <footer className="bg-neutral-800 dark:bg-transparent text-white dark:text-white py-16">
      <div className="container mx-auto px-4">
        <div className="border-t border-neutral-700 pt-8">
          <div className="flex flex-col justify-between items-center gap-4">            
            <div className="flex gap-4">
            <div className="space-y-2 flex items-center gap-3 pb-1.5">
              <img 
                src={logoIcon} 
                alt="LocalDrive Icon" 
                className="h-10 w-auto"
              />
              <div className="flex flex-col justify-center">
                <h3 className="text-2xl font-bold text-gradient leading-none">LocalDrive</h3>
                <p className="text-neutral-300 dark:text-neutral-300 text-sm mt-1">Your Journey to Confident Driving Start Here.</p>
              </div>
            </div>
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

export default WaitlistFooter;