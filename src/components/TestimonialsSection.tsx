import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah T.",
    location: "Leeds",
    content: "I was so nervous to start driving, but my instructor from LocalDrive was incredibly patient and made me feel at ease. Booking lessons around my uni schedule was a breeze!",
    rating: 5
  },
  {
    name: "James M.",
    location: "Manchester", 
    content: "Passed my test first time thanks to LocalDrive! The progress tracking helped me focus on areas I needed to improve. Highly recommend!",
    rating: 5
  },
  {
    name: "Emily R.",
    location: "Birmingham",
    content: "The flexibility to book lessons when it suited me was perfect. My instructor knew all the local test routes which gave me so much confidence.",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-800">
            Hear From Our Drivers
          </h2>
          <div className="flex items-center justify-center gap-2 text-trust">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-current" />
              ))}
            </div>
            <span className="text-muted-foreground ml-2">
              Rated 4.9/5 from over 2,000 lessons
            </span>
          </div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-neutral-50 p-8 rounded-2xl hover:shadow-brand transition-shadow duration-300">
              <div className="space-y-6">
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-trust text-trust" />
                  ))}
                </div>
                
                <blockquote className="text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </blockquote>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-neutral-800">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;