import { useState, useEffect, useRef } from "react";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ProjectCard } from "@/components/ProjectCard";
import { motion } from "framer-motion";
import React from 'react';

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "This is a description of project one. It is a website for a client. It includes advanced features and a responsive design tailored to the client's needs.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "backend",
    date: "2024-03-15"
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is a description of project Two.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "data-analytics",
    date: "2024-06-10"
  },
  {
    id: 3,
    title: "Project Three",
    description: "This is a description of project Three.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "backend",
    date: "2023-12-20"
  },
  {
    id: 4,
    title: "Project Four",
    description: "This is a description of project Four.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "frontend",
    date: "2024-01-05"
  },
  {
    id: 5,
    title: "Project Five",
    description: "This is a description of project five.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "frontend",
    date: "2024-04-30"
  },
  {
    id: 6,
    title: "Project Six",
    description: "This is a description of project six.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "frontend",
    date: "2024-05-15"
  },
  {
    id: 7,
    title: "Project Seven",
    description: "This is a description of project seven.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "data-analytics",
    date: "2024-07-01"
  }
];

const categories = ["all", "frontend", "backend", "data-analytics"];

// Error Boundary Component
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ color: 'red', textAlign: 'center' }}>
        Error in ProjectCard: {this.state.error?.message}
      </div>;
    }
    return this.props.children;
  }
}

export const ProjectSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupCategory, setPopupCategory] = useState("all");
  const carouselRef = useRef(null);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // Filter projects and limit to first 6 for the main section
  const filteredProjects = projects
    .filter((project) => activeCategory === "all" || project.category === activeCategory)
    .slice(0, 6);

  // Filter all projects for the popup (no limit)
  const popupFilteredProjects = projects.filter(
    (project) => popupCategory === "all" || project.category === popupCategory
  );

  // Reset and validate active project index when category or filtered projects change
  useEffect(() => {
    if (filteredProjects.length === 0) {
      setActiveProjectIndex(-1); // No valid index if no projects
      return;
    }
    // Ensure index is valid for the new filtered list
    if (activeProjectIndex < 0 || activeProjectIndex >= filteredProjects.length) {
      setActiveProjectIndex(0);
    } else {
      // Verify the project at current index is still valid
      const currentProject = filteredProjects[activeProjectIndex];
      if (!currentProject) {
        setActiveProjectIndex(0);
      }
    }
  }, [activeCategory, filteredProjects]);

  // Prevent background scrolling when popup is open
  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup on unmount or when popup closes
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPopupOpen]);

  const handleProjectChange = (index) => {
    if (filteredProjects.length === 0) return; // Do nothing if no projects
    const newIndex = (index < 0 
      ? filteredProjects.length - 1 
      : index >= filteredProjects.length 
      ? 0 
      : index);
    setActiveProjectIndex(newIndex);
  };

  // Handle touch events for swiping
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diffX = touchStartX.current - touchEndX.current;
    const threshold = 50; // Minimum swipe distance in pixels
    if (diffX > threshold) {
      // Swipe left, go to next project
      handleProjectChange(activeProjectIndex + 1);
    } else if (diffX < -threshold) {
      // Swipe right, go to previous project
      handleProjectChange(activeProjectIndex - 1);
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const openPopup = (category) => {
    setPopupCategory(category);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupCategory("all");
  };

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-[800px] flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
          <span>Featured </span>
          <span 
            className="text-primary opacity-0 animate-fade-in-delay-1 neon-glow inline-block relative" 
            style={{ paddingBottom: '40px' }}
          >
            <span 
              className="glitch-text relative inline-block" 
              data-text="Projects."
              style={{ paddingBottom: '20px', paddingRight: '0px' }}
            >
              Projects.
            </span>
          </span>
        </h1>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of our recent projects that showcase our skills and creativity. 
          Each project is a testament to our dedication to building innovative solutions.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 font-electrolize rounded-md transition-colors duration-300 capitalize ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white/70 text-black hover:bg-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="relative w-full flex flex-col items-center">
          {filteredProjects.length === 0 || activeProjectIndex < 0 ? (
            <div className="text-center text-foreground text-lg">
              No projects found for the category "{activeCategory}".
            </div>
          ) : (
            <>
              {/* Radio Inputs for Accessibility */}
              {filteredProjects.map((project, index) => (
                <input
                  key={project.id}
                  type="radio"
                  name="project-slider"
                  id={`project-item-${index}`}
                  checked={activeProjectIndex === index}
                  onChange={() => handleProjectChange(index)}
                  className="hidden"
                />
              ))}
              {/* Cards */}
                <div
                ref={carouselRef}
                className="relative w-full h-[450px] mb-6 touch-manipulation overflow-x-hidden overflow-y-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                >
                {filteredProjects.map((project, index) => {
                    const length = filteredProjects.length;
                    const position = (index - activeProjectIndex + length) % length;
                    let x, scale, zIndex;
                    if (position === 0) {
                    x = '0%';
                    scale = 1;
                    zIndex = 1;
                    } else if (position === 1) {
                    x = '50%';
                    scale = 0.85;
                    zIndex = 0;
                    } else if (position === length - 1) {
                    x = '-50%';
                    scale = 0.85;
                    zIndex = 0;
                    } else if (position < length / 2) {
                    x = '-500%';
                    scale = 0.85;
                    zIndex = -1;
                    } else {
                    x = '500%';
                    scale = 0.85;
                    zIndex = -1;
                    }
                    return (
                    <motion.label
                        key={project.id}
                        htmlFor={`project-item-${index}`}
                        className="card absolute min-w-[300px] w-[50%] h-full left-0 right-0 mx-auto cursor-pointer overflow-hidden"
                        animate={{ x, scale, zIndex }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                    >
                        <ErrorBoundary>
                        <ProjectCard project={project} />
                        </ErrorBoundary>
                    </motion.label>
                    );
                })}
                </div>
            </>
          )}
        </div>
        <div className="text-center p-16">
          <button
            onClick={() => openPopup('all')}
            className="cosmic-button"
          >
            More Projects <ArrowForwardIcon fontSize="small" />
          </button>
        </div>
      </div>
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-70 overflow-y-auto">
          <div className="relative min-h-screen w-full bg-background text-foreground">
            <button
              onClick={closePopup}
              className="fixed top-4 left-4 text-foreground/80 hover:text-primary transition-colors duration-300 z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="py-12 px-4">
              <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
                  <span>All </span>
                  <span 
                    className="text-primary opacity-0 animate-fade-in-delay-1 neon-glow inline-block relative" 
                    style={{ paddingBottom: '40px' }}
                  >
                    <span 
                      className="glitch-text relative inline-block" 
                      data-text="Projects."
                      style={{ paddingBottom: '20px', paddingRight: '0px' }}
                    >
                      Projects.
                    </span>
                  </span>
                </h1>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                  Explore our complete portfolio of projects, showcasing our expertise across various domains.
                </p>
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                  {categories.map((category, key) => (
                    <button
                      key={key}
                      onClick={() => setPopupCategory(category)}
                      className={`px-5 py-2 font-electrolize rounded-md transition-colors duration-300 capitalize ${
                        popupCategory === category
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-white/70 text-black hover:bg-white'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
                  {popupFilteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};