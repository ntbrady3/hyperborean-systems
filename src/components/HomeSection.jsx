import { useState, useContext, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MusicContext } from "./MusicContext";

export const HomeSection = () => {
  const [isMusicPopupOpen, setIsMusicPopupOpen] = useState(false);
  const { setIsMusicOn } = useContext(MusicContext);

  // Check if popup should show after loading and animations
  useEffect(() => {
    // Only show popup if not previously shown
    if (localStorage.getItem('musicPromptShown')) {
      return;
    }

    // Wait for loading screen and animations
    const timer = setTimeout(() => {
      const isLoadingComplete = !document.querySelector('.loading'); // Check if loading screen is gone
      if (isLoadingComplete) {
        setIsMusicPopupOpen(true);
      } else {
        // Poll until loading screen is gone
        const poll = setInterval(() => {
          if (!document.querySelector('.loading')) {
            setIsMusicPopupOpen(true);
            clearInterval(poll);
          }
        }, 100);
        return () => clearInterval(poll);
      }
    }, 2000); // Delay for HomeSection animations (adjust if needed)

    return () => clearTimeout(timer);
  }, []);

  const handlePlayMusic = () => {
    setIsMusicOn(true);
    setIsMusicPopupOpen(false);
    localStorage.setItem('musicPromptShown', 'true');
  };

  const handleNoMusic = () => {
    setIsMusicOn(false);
    setIsMusicPopupOpen(false);
    localStorage.setItem('musicPromptShown', 'true');
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center px-4">
      <div className="container max-w-6xl mx-auto text-center px-4 sm:px-10">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron italic tracking-tight overflow-visible">
            <span 
              className="w-full px-6 text-primary opacity-0 animate-fade-in-delay-1 neon-glow block relative" 
              style={{ paddingBottom: '40px' }}
            >
              <span 
                className="glitch-text relative inline-block" 
                data-text="Hyperborean Systems"
                style={{ 
                  paddingBottom: '20px'
                }}
              >
                Hyperborean Systems
              </span>
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Building innovative solutions for a better tomorrow.
          </p>
          <div className="opacity-0 animate-fade-in-delay-4 pt-4">
            <a 
              href="/projects" 
              className="inline-block px-8 py-3 text-primary-foreground font-medium font-orbitron transition-all duration-300 bg-primary/50 hover:bg-primary/80 border-2 rounded-md border-primary glow-border"
            >
              View Our Work
            </a>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <span className="text-sm text-muted-foreground mb-2">Scroll</span>
        <ArrowDown className="h-5 w-5 text-primary"/>
      </div>
      {/* Music Prompt Popup */}
      {isMusicPopupOpen && (
        <div className={cn(
          'fixed inset-0 z-[70] flex items-center justify-center transition-all duration-300 bg-background/80 backdrop-blur-sm'
        )}>
          <div className="bg-background/95 rounded-md p-6 shadow-lg max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold mb-4 text-center font-electrolize">
              Would you like to play background music?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={handlePlayMusic}
                className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:bg-primary/90"
              >
                Yes
              </button>
              <button
                onClick={handleNoMusic}
                className="px-4 py-2 rounded-full bg-card text-foreground font-medium transition-all duration-300 hover:bg-card/80"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};