import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { Navbar } from "@/components/Navbar";
import { HomeSection } from "@/components/HomeSection";
import { AboutSection } from "../components/AboutSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProjectSection } from "../components/ProjectSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";

export const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace('#', '');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Delay to ensure DOM is fully rendered
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Theme Toggle */}
      <ThemeToggle />
      {/* Background Effects */}
      <StarBackground />
      {/* Navbar */}
      <Navbar />
      {/* Main Content with bottom padding for mobile navbar */}
      <div>
        <main>
          <HomeSection />
          <AboutSection />
          <ServicesSection />
          <ProjectSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
};