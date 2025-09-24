<<<<<<< HEAD
import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";
import { GraduationCap, Clock, TrendingUp } from "lucide-react";

const InstructorCTASection = () => {
  return (
    <section id="instructors" className="py-16 lg:py-24 bg-gradient-to-br from-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Are You a Certified Driving Instructor?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Join our platform to grow your business, manage your schedule effortlessly, 
              and get paid on time. Reach more students in your local area.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 my-12">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Expand Your Reach</h3>
              <p className="text-sm opacity-80">Connect with more students</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Flexible Schedule</h3>
              <p className="text-sm opacity-80">Work when it suits you</p>
            </div>
            
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="font-semibold">Grow Your Income</h3>
              <p className="text-sm opacity-80">Reliable, timely payments</p>
            </div>
          </div>
          
          <div className="mt-10">
            <HashLink to="/#downloads">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-secondary hover:bg-neutral-100 text-lg px-8 py-6 shadow-lg"
              >
                Teach with LocalDrive
              </Button>
            </HashLink>
          </div>
        </div>
      </div>
    </section>
  );
};

=======
import { Button } from "@/components/ui/button";
import { HashLink } from "react-router-hash-link";
import { GraduationCap, Clock, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

const InstructorCTASection = () => {
  return (
    <section id="instructors" className="py-16 lg:py-24 bg-gradient-to-br from-secondary to-accent">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
              Are You a Certified Driving Instructor?
            </h2>
            <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
              Join our platform to grow your business, manage your schedule effortlessly, 
              and get paid on time. Reach more students in your local area.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8 my-12">
            {[
              { icon: GraduationCap, title: "Expand Your Reach", desc: "Connect with more students" },
              { icon: Clock, title: "Flexible Schedule", desc: "Work when it suits you" },
              { icon: TrendingUp, title: "Grow Your Income", desc: "Reliable, timely payments" }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.15,
                  ease: "easeOut"
                }}
                className="flex flex-col items-center space-y-3"
              >
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8" />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm opacity-80">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16"
          >
            <HashLink to="/#downloads">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-secondary hover:bg-neutral-100 text-lg px-8 py-6 shadow-lg hover:scale-105 transition-all duration-200"
              >
                Teach with LocalDrive
              </Button>
            </HashLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

>>>>>>> 784f2bf7ba1d8f7b5216fb6e8c3dccb5fb0abbcb
export default InstructorCTASection;