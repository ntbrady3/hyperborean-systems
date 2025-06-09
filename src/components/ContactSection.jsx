import { Mail, Phone, LocationPin, Facebook, X, LinkedIn, Instagram, Send } from "@mui/icons-material";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import emailjs from '@emailjs/browser';

export const ContactSection = () => {
  const form = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check browser-native validation (required fields)
    if (!form.current.checkValidity()) {
      form.current.reportValidity(); // Show validation errors
      return;
    }

    setIsSubmitting(true);

    // Send email via EmailJS
    emailjs
      .sendForm('service_ijcurg3', 'template_5ihp00o', form.current, {
        publicKey: 'OQDl2R6Ek-QxbkSa1',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          form.current.reset(); // Reset form on success
          setIsSubmitting(false);
        },
        (error) => {
          console.log('FAILED...', error.text);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <section id="contact" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
          <span>Get In&nbsp;</span>
          <span 
            className="text-primary opacity-0 animate-fade-in-delay-1 neon-glow inline-block relative" 
            style={{ paddingBottom: '20px' }}
          >
            <span 
              className="glitch-text relative inline-block" 
              data-text="Touch."
              style={{ paddingBottom: '20px', paddingRight: '0px' }}
            >
              Touch.
            </span>
          </span>
        </h1>
        <p className="text-center text-muted-foreground mb-6 max-w-2xl mx-auto">
          Have a project in mind or want to collaborate? I'm always open to new opportunities and ideas. Feel free to reach out to me through the form below or connect with me on social media.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
            <h3 className="text-2xl font-semibold mb-6 text-center text-tertiary font-electrolize">Contact Information</h3>
            <div className="space-y-6 flex flex-col items-center">
              <a
                href="mailto:ntbrady3@gmail.com"
                className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="p-3 rounded-full bg-primary/10 flex items-center justify-center mb-1">
                  <Mail sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                ntbrady3@gmail.com
              </a>
              <a
                href="tel:+11234567890"
                className="flex flex-col items-center space-y-2 text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                <div className="p-3 rounded-full bg-primary/10 mb-1 flex items-center justify-center">
                  <Phone sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                +1 (123) 456-7890
              </a>
              <div className="flex flex-col items-center space-y-2">
                <div className="p-3 rounded-full bg-primary/10 mb-1 flex items-center justify-center">
                  <LocationPin sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                <span className="text-muted-foreground">
                  Rockford, IL, USA
                </span>
              </div>
            </div>
            <div className="pt-8 flex flex-col items-center">
              <h4 className="font-medium mb-4 text-center">Connect With Us!</h4>
              <div className="flex space-x-4 justify-center">
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  <LinkedIn sx={{ fontSize: 36 }} />
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  <Facebook sx={{ fontSize: 36 }} />
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  <X sx={{ fontSize: 36 }} />
                </a>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  <Instagram sx={{ fontSize: 36 }} />
                </a>
              </div>
            </div>
          </div>
          <div className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
            <h3 className="text-2xl font-semibold mb-6 font-electrolize text-tertiary">Send a Message</h3>
            <form className="space-y-6" ref={form} onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-md border border-white bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-foreground/60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-md border border-white bg-background focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-foreground/60"
                  placeholder="name@name.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="w-full h-32 px-4 py-3 rounded-md border border-white bg-background focus:outline-none focus:ring-1 focus:ring-primary resize-none placeholder:text-foreground/60"
                  placeholder="Hello I'd like to talk about..."
                />
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn("cosmic-button flex items-center justify-center gap-2")}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send sx={{ fontSize: 15 }} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};