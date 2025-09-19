import { Sparkles, CheckCircle } from "lucide-react";

const FutureVisionSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-primary" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
                The Future of Driver Licensing is Coming
              </h2>
            </div>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Soon, LocalDrive will be your complete digital partner for getting on the road. 
              We're integrating driver's license application processing to make your journey 
              from learner to licensed driver completely seamless.
            </p>
          </div>
          
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-brand inline-block">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-neutral-800">
                    Complete Digital Journey
                  </h3>
                  <p className="text-muted-foreground">
                    From first lesson to full license, all in one place
                  </p>
                </div>
              </div>
            </div>
            
            <div className="absolute -top-2 -right-2 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FutureVisionSection;