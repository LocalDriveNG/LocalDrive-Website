import { Instagram, Linkedin } from "lucide-react";

// X (Twitter) icon component
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const SocialFollow = () => {
  const socialLinks = [
    {
      name: "X",
      icon: XIcon,
      url: "https://x.com/getlocaldrive",
      color: "hover:text-[#1DA1F2]",
    },

    {
      name: "Instagram",
      icon: Instagram,
      url: "https://www.instagram.com/getlocaldrive/",
      color: "hover:text-[#E4405F]",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://linkedin.com/company/localdriveapp",
      color: "hover:text-[#0A66C2]",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-primary/5 via-secondary/5 to-primary/5 rounded-2xl p-8 border border-border/50">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground">
        Follow Us
      </h2>
      <p className="text-muted-foreground mb-6 leading-relaxed">
        Stay connected for the latest driving tips, road safety updates, and LocalDrive news.
      </p>
      <div className="flex gap-4">
        {socialLinks.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group flex items-center justify-center w-12 h-12 rounded-full bg-background border-2 border-border hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
            aria-label={`Follow us on ${social.name}`}
          >
            <social.icon className="h-5 w-5 text-foreground group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
};

export default SocialFollow;
