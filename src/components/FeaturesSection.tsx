import { Shield, Package, TrendingUp, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Certified Local Instructors",
    description: "Vetted professionals who know your area's roads and test routes."
  },
  {
    icon: Package,
    title: "Flexible Packages",
    description: "Pay for different packages that suit your pace and budget."
  },
  {
    icon: TrendingUp,
    title: "Digital Progress Tracking",
    description: "See your skills improve with every lesson. Track milestones and get ready for the road."
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "No cash hassles. Pay easily and securely with your card or digital wallet through our seamless payment system."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
            Why Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a modern, efficient driving education experience.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              className="bg-white dark:bg-neutral-800 p-6 md:p-8 rounded-2xl shadow-sm hover:shadow-brand-lg border border-transparent hover:border-primary/20 dark:hover:border-primary/30 transition-all duration-500 group cursor-pointer hover:translate-y-[-8px]"
            >
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 group-hover:shadow-lg">
                  <feature.icon className="w-8 h-8 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-white group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground dark:group-hover:text-neutral-300 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;