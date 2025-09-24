import { Sparkles, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const FutureVisionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50 dark:bg-neutral-900 section-future">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Sparkles className="w-8 h-8 text-primary" />
              </motion.div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold dark:text-white">
                The Future of Driver Licensing is Coming
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Soon, LocalDrive will be your complete digital partner for getting on the road. 
              We're integrating driver's license application processing to make your journey 
              from learner to licensed driver completely seamless.
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              type: "spring",
              stiffness: 100
            }}
            className="relative"
          >
            <div className="bg-white dark:bg-neutral-800 p-8 rounded-2xl shadow-brand inline-block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-neutral-800 dark:text-white">
                    Complete Digital Journey
                  </h3>
                  <p className="text-muted-foreground">
                    From first lesson to full license, all in one place
                  </p>
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.6,
                delay: 0.8,
                type: "spring",
                stiffness: 200
              }}
              className="absolute -top-3 -right-3 bg-gradient-to-r from-primary to-secondary text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg animate-pulse"
            >
              🚀 Coming Soon
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FutureVisionSection;