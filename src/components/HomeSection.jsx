import { useState, useContext, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { MusicContext } from "./MusicContext";
import { useLocation } from "react-router-dom";

export const HomeSection = () => {
  const SKIP_MUSIC_POPUP = true; // Set to true to skip the music popup, false to enable it
  const [isMusicPopupOpen, setIsMusicPopupOpen] = useState(false);
  const { setIsMusicOn } = useContext(MusicContext);
  const location = useLocation();

  useEffect(() => {
    if (SKIP_MUSIC_POPUP) return; // Skip popup if flag is true

    // Skip popup if navigating from an internal page
    const referrer = document.referrer;
    const isInternalNavigation = referrer && new URL(referrer).origin === window.location.origin;
    if (isInternalNavigation && location.state?.fromInternal) {
      return;
    }

    // Skip popup if previously shown (for external first-time visits)
    if (localStorage.getItem('musicPromptShown')) {
      return;
    }

    // Wait for loading screen and animations
    const timer = setTimeout(() => {
      const isLoadingComplete = !document.querySelector('.loading');
      if (isLoadingComplete) {
        setIsMusicPopupOpen(true);
      } else {
        const poll = setInterval(() => {
          if (!document.querySelector('.loading')) {
            setIsMusicPopupOpen(true);
            clearInterval(poll);
          }
        }, 100);
        return () => clearInterval(poll);
      }
    }, );

    return () => clearTimeout(timer);
  }, [location]);

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
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron italic tracking-tight overflow-visible">
            <span 
              className="w-full px-6 text-primary opacity-0 animate-fade-in-delay-1 neon-glow block relative" 
              style={{ paddingBottom: '20px' }}
            >
              <span 
                className="glitch-text relative inline-block" 
                data-text="Atlas Digital Ventures"
                style={{ 
                  paddingBottom: '20px'
                }}
              >
                Atlas Digital Ventures
              </span>
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            Helping you navigate the digital world.
          </p>
        </div>
      </div>
      <div className="hidden md:flex flex-col items-center justify-center absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce bg-primary/50 backdrop-blur-md rounded-full p-2 border-1 border-primary glow-border">
        <ArrowDown className="h-5 w-5 text-foreground"/>
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
                className="cosmic-button"
              >
                Yes
              </button>
              <button
                onClick={handleNoMusic}
                className="cosmic-button"
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