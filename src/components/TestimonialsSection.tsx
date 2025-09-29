import { Star } from "lucide-react";
import { motion } from "framer-motion";
import sarahImage from "@/assets/testimonial-sarah.jpg";
import jamesImage from "@/assets/testimonial-james.jpg";
import emilyImage from "@/assets/testimonial-emily.jpg";

const testimonials = [
  {
    name: "Sarah T.",
    location: "Lekki, Lagos",
    content: "I was so nervous to start driving, but my instructor from LocalDrive was incredibly patient and made me feel at ease. Booking lessons around my school schedule was a breeze!",
    rating: 5,
    image: sarahImage
  },
  {
    name: "James M.",
    location: "Ikeja, Lagos", 
    content: "Passed my test first time thanks to LocalDrive! The progress tracking helped me focus on areas I needed to improve. Highly recommend!",
    rating: 5,
    image: jamesImage
  },
  {
    name: "Emily R.",
    location: "Maryland, Lagos",
    content: "The flexibility to book lessons when it suited me was perfect. My instructor knew all the local test routes which gave me so much confidence.",
    rating: 5,
    image: emilyImage
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800 dark:text-white">
            Hear From Our Drivers
          </h2>
          <div className="flex items-center justify-center gap-2 text-trust">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current text-red-500" />
              ))}
            </div>
            <span className="text-muted-foreground ml-2">
              Rated 4.9/5 from over 2,000 lessons
            </span>
          </div>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
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
              className="bg-neutral-50 dark:bg-neutral-800 p-6 md:p-8 rounded-2xl hover:shadow-brand transition-all duration-300 group"
            >
              <div className="space-y-6">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current text-trust text-red-500" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden group-hover:scale-110 transition-transform duration-300">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} profile picture`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800 dark:text-black">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;