import { Web, Apps, Analytics, ChevronLeft, ChevronRight } from '@mui/icons-material';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../lib/utils';

const services = [
  {
    name: 'Web Development',
    description: 'We craft responsive, high-performance websites tailored to your brand, ensuring seamless user experiences across all devices with modern frameworks and clean code.',
    icon: Web,
  },
  {
    name: 'Full-Stack App Development',
    description: 'From concept to deployment, we build robust, scalable applications with integrated front-end and back-end solutions, delivering end-to-end functionality.',
    icon: Apps,
  },
  {
    name: 'Data Analytics',
    description: 'Unlock actionable insights with our data analytics services, leveraging advanced tools to transform raw data into strategic decisions for your business.',
    icon: Analytics,
  },
];

const testimonials = [
  {
    quote: "Working with this developer was a game-changer. Their innovative solutions transformed our business processes!",
    name: "Jane Doe",
    role: "CEO, TechCorp"
  },
  {
    quote: "The attention to detail and passion for coding is unmatched. Our website is now faster and more user-friendly.",
    name: "John Smith",
    role: "Product Manager, InnovateX"
  },
  {
    quote: "Their expertise in UI/UX design made our app intuitive and engaging. Highly recommend!",
    name: "Emily Chen",
    role: "Designer, CreativeLabs"
  },
  {
    quote: "Delivered a robust system on time and exceeded expectations. A true professional!",
    name: "Michael Brown",
    role: "CTO, StartUpNow"
  }
];

export const ServicesSection = () => {
  const carouselRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Handle arrow and dot navigation
  const scrollToTestimonial = (index) => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth; // Full container width
      carouselRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  // IntersectionObserver to detect visible testimonial
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setActiveTestimonial(index);
          }
        });
      },
      {
        root: carouselRef.current,
        threshold: 0.8 // Trigger when 80% of card is visible
      }
    );

    const cards = carouselRef.current?.querySelectorAll('.testimonial-card');
    cards?.forEach((card) => observer.observe(card));

    return () => {
      cards?.forEach((card) => observer.unobserve(card));
    };
  }, []);

  return (
    <section id="services" className="py-24 px-4 relative">
      <div className="container max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
          <span>Our&nbsp;</span>
          <span 
            className="text-primary opacity-0 animate-fade-in-delay-1 neon-glow inline-block relative" 
            style={{ paddingBottom: '20px' }}
          >
            <span 
              className="glitch-text relative inline-block" 
              data-text="Services."
              style={{ paddingBottom: '20px', paddingRight: '0px' }}
            >
              Services.
            </span>
          </span>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 rounded-full bg-primary/10 mb-4">
                    <Icon sx={{ fontSize: 32 }} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 font-electrolize text-tertiary">{service.name}</h3>
                  <p className="text-muted-foreground text-sm">{service.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Testimonial Carousel */}
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center font-orbitron mb-8 text-tertiary">What Clients Say</h3>
          <div className="relative">
            <div className="flex items-center overflow-x-hidden">
              {/* Carousel */}
              <div
                ref={carouselRef}
                className="flex overflow-hidden snap-x snap-mandatory scrollbar-hide w-full"
                style={{ scrollBehavior: 'smooth' }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    data-index={index}
                    className="testimonial-card flex-none w-full px-2 snap-center"
                  >
                    <div className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
                      <p className="text-foreground text-lg italic mb-4">"{testimonial.quote}"</p>
                      <p className="text-primary font-semibold">{testimonial.name}</p>
                      <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows and Dots */}
            <div className="w-full flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => scrollToTestimonial(activeTestimonial - 1 >= 0 ? activeTestimonial - 1 : testimonials.length - 1)}
                className="w-10 h-10 flex items-center justify-center bg-primary/50 rounded-full hover:bg-primary/70 transition-colors duration-300 z-10 ml-4"
                aria-label="Previous testimonial"
              >
                <ChevronLeft sx={{ fontSize: 24 }} className="text-primary-foreground" />
              </button>
              <div className="flex justify-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToTestimonial(index)}
                    className={cn(
                      "w-3 h-3 rounded-full transition-colors duration-300",
                      activeTestimonial === index ? "bg-primary" : "bg-foreground/30 hover:bg-foreground/50"
                    )}
                    aria-label={`Go to testimonial ${index + 1}`}
                  >
                  </button>
                ))}
              </div>
              <button
                onClick={() => scrollToTestimonial(activeTestimonial + 1 < testimonials.length ? activeTestimonial + 1 : 0)}
                className="w-10 h-10 flex items-center justify-center bg-primary/50 rounded-full hover:bg-primary/70 transition-colors duration-300 z-10 mr-4"
                aria-label="Next testimonial"
              >
                <ChevronRight sx={{ fontSize: 24 }} className="text-primary-foreground" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};