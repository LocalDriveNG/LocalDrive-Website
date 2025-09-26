import { MapPin, Calendar, Car, Package } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: MapPin,
    title: "Find & Match",
    description: "Enter your location and instantly see available, top-rated instructors near you."
  },
    {
    icon: Package,
    title: "Select & Pay", 
    description: "Choose a package that fits your schedule and pay securely online."
  },
  {
    icon: Calendar,
    title: "Book & Schedule", 
    description: "Book a suitable time and schedule your lessons."
  },
  {
    icon: Car,
    title: "Learn & Track",
    description: "Take your lesson and monitor your progress through our easy-to-use app."
  }
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-white dark:bg-neutral-800">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
            Learn to Drive, Your Way
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our simple four-step process gets you behind the wheel quickly and confidently.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              className="text-center space-y-6 group"
            >
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center shadow-brand group-hover:scale-110 transition-transform duration-300">
                <step.icon className="w-10 h-10 text-white" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl md:text-2xl font-semibold text-neutral-800 dark:text-white">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30 transform translate-x-1/2" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;