import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ThemeToggle } from "@/components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { ProjectCard } from "@/components/ProjectCard";

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
    title: "Project Six",
    description: "This is a description of project six.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    category: "frontend",
    date: "2024-04-30"
  }
];

const categories = ["all", "frontend", "backend", "data-analytics"];

export const AllProjects = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const filteredProjects = projects.filter(
    (project) => activeCategory === "all" || project.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <ThemeToggle />
      <StarBackground />
      <div className="py-24 px-4 relative">
        <Link
          to="/#projects"
          className="fixed top-4 left-4 z-50 text-foreground/80 hover:text-primary transition-colors duration-300"
        >
          <ArrowBackIcon fontSize="large" />
        </Link>
        <div className="container mx-auto max-w-5xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
            <span>All&nbsp;</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};