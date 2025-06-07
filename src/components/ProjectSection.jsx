import { useState } from "react";
import { Link } from "react-router-dom";
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const projects = [
  {
    id: 1,
    title: "Project One",
    description: "This is a description of project one. It is a website for a client.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    category: "backend"
  },
  {
    id: 2,
    title: "Project Two",
    description: "This is a description of project Two.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    category: "data-analytics"
  },
  {
    id: 3,
    title: "Project Three",
    description: "This is a description of project Three.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    category: "backend"
  },
  {
    id: 4,
    title: "Project Four",
    description: "This is a description of project Four.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    category: "frontend"
  },
  {
    id: 5,
    title: "Project Six",
    description: "This is a description of project six.",
    image: "/projects/f22.jpg",
    tags: ["React", "JavaScript", "CSS"],
    demoUrl: "#",
    githubUrl: "#",
    category: "frontend"
  }
];

const categories = ["all", "frontend", "backend", "data-analytics"];

export const ProjectSection = () => {
    const [activeCategory, setActiveCategory] = useState("all");
    const filteredProjects = projects.filter(
        (project) => activeCategory === "all" || project.category === activeCategory
    );

    return (
        <section id="projects" className="py-24 px-4 relative">
            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
                <span>Featured</span>
                <span 
                    className="w-full px-6 text-primary opacity-0 animate-fade-in-delay-1 neon-glow inline-block relative" 
                    style={{ paddingBottom: '40px'}}
                >
                    <span 
                    className="glitch-text relative inline-block" 
                    data-text="Projects"
                    style={{ paddingBottom: '20px', paddingRight: '0px' }}
                    >
                    Projects
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
                            className={`px-5 py-2 rounded-full transition-colors duration-300 capitalize ${
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
                    {filteredProjects.map((project, index) => (
                        <div
                            key={project.id}
                            className={
                                "group bg-card rounded-lg overflow-hidden shadow-xs card-hover" +
                                (index >= 3 ? " hidden md:block" : "") +
                                (index >= 4 ? " md:hidden lg:block" : "")
                            }
                        >
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 text-xs font-medium rounded-full border bg-primary/20 text-secondary-foreground"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="text-xl font-semibold">{project.title}</h3>
                                    <div className="flex space-x-3">
                                        <a
                                            href={project.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <GitHubIcon fontSize="small" />
                                        </a>
                                        <a
                                            href={project.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-foreground/80 hover:text-primary transition-colors duration-300"
                                        >
                                            <OpenInNewIcon fontSize="small" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="text-center mt-12 p-16">
                    <Link
                        to="/all-projects"
                        className="cosmic-button"
                    >
                        More Projects <ArrowForwardIcon fontSize="small" />
                    </Link>
                </div>
            </div>
        </section>
    );
};