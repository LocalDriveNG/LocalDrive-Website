import { Shield, Package, TrendingUp, CreditCard } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Certified Local Instructors",
    description: "Vetted professionals who know your area's roads and test routes."
  },
  {
    icon: Package,
    title: "Flexible Packages",
    description: "Buy single lessons or discounted bundles that suit your pace and budget."
  },
  {
    icon: TrendingUp,
    title: "Digital Progress Tracking",
    description: "See your skills improve with every lesson. Track milestones and get ready for your test."
  },
  {
    icon: CreditCard,
    title: "Secure Payment",
    description: "No cash hassles. Pay easily and securely with your card or digital wallet."
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
            Why Us?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a modern, efficient driving education experience.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-brand transition-shadow duration-300 group">
              <div className="space-y-6">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;