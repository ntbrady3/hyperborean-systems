import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BuildIcon from '@mui/icons-material/Build';
import WorkIcon from '@mui/icons-material/Work';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navItems = [
    { name: 'HOME', href: '#home', icon: HomeIcon },
    { name: 'ABOUT', href: '#about', icon: InfoIcon },
    { name: 'SERVICES', href: '#services', icon: BuildIcon },
    { name: 'PROJECTS', href: '#projects', icon: WorkIcon },
    { name: 'CONTACT', href: '#contact', icon: ContactPageIcon }
];

export const Navbar = () => {
    const [activeSection, setActiveSection] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        let timeout;
        const debounceSetActiveSection = (section) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                setActiveSection(section);
                window.history.pushState(null, '', section);
            }, 100);
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
                        debounceSetActiveSection(`#${entry.target.id}`);
                    }
                });
            },
            {
                root: null,
                rootMargin: '-10% 0px -10% 0px',
                threshold: [0.3, 0.5, 0.7]
            }
        );

        navItems.forEach((item) => {
            const section = document.querySelector(item.href);
            if (section) {
                observer.observe(section);
            }
        });

        if (!activeSection && window.scrollY < 100) {
            setActiveSection('#home');
            window.history.pushState(null, '', '#home');
        }

        return () => {
            clearTimeout(timeout);
            navItems.forEach((item) => {
                const section = document.querySelector(item.href);
                if (section) {
                    observer.unobserve(section);
                }
            });
        };
    }, [activeSection]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            {/* SVG Filter Definition */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="neon-glow-filter">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur1" />
                        <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur2" />
                        <feFlood flood-color="#28947b" flood-opacity="0.6" result="color1" />
                        <feFlood flood-color="#28947b" flood-opacity="0.4" result="color2" />
                        <feComposite in="color1" in2="blur1" operator="in" result="glow1" />
                        <feComposite in="color2" in2="blur2" operator="in" result="glow2" />
                        <feMerge>
                            <feMergeNode in="glow2" />
                            <feMergeNode in="glow1" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
            </svg>

            {/* Desktop Navbar (Top) */}
            <nav className={cn(
                "hidden md:block fixed w-full z-40 transition-all duration-300 py-4 bg-background/80 "
            )}>
                <div className="container max-w-[85%] rounded-md flex items-center justify-center">
                    <div className="flex space-x-6 md:space-x-6 lg:space-x-8">
                        {navItems.map((item, key) => (
                            <a
                                key={key}
                                href={item.href}
                                className={cn(
                                    "px-12 font-electrolize neon-glow text-xl md:text-xl lg:text-2xl transition-colors duration-300 text-center min-w-20 md:min-w-20 lg:min-w-28",
                                    activeSection === item.href
                                        ? "text-primary"
                                        : "text-foreground/80 hover:text-primary"
                                )}
                            >
                                <span
                                    data-text={item.name}
                                    className={cn(
                                        "inline-block",
                                        activeSection === item.href && "glitch-effect"
                                    )}
                                >
                                    {item.name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Mobile Navbar (Menu Button) */}
            <div className={cn(
                "md:hidden fixed bottom-4 right-4 z-50"
            )}>
                <button
                    onClick={toggleMenu}
                    className={cn(
                        "p-3 rounded-full bg-primary text-primary-foreground cosmic-button w-10 h-10 flex items-center justify-center"
                    )}
                >
                    {isMenuOpen ? (
                        <CloseIcon sx={{ fontSize: 20 }} />
                    ) : (
                        <MenuIcon sx={{ fontSize: 20 }} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Popup */}
            <div className={cn(
                "md:hidden fixed inset-0 z-40 transition-all duration-300",
                isMenuOpen ? "visible opacity-100" : "invisible opacity-0"
            )}>
                <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={toggleMenu}></div>
                <nav className={cn(
                    "fixed bottom-16 right-4 w-3/4 max-w-xs bg-background/95 rounded-md p-4 shadow-lg",
                    "transition-all duration-300",
                    isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                )}>
                    <div className="flex flex-col space-y-4">
                        {navItems.map((item, key) => {
                            const Icon = item.icon;
                            return (
                                <a
                                    key={key}
                                    href={item.href}
                                    onClick={toggleMenu}
                                    className={cn(
                                        "flex items-center space-x-3 p-3 rounded-md transition-all duration-300",
                                        activeSection === item.href
                                            ? "text-primary"
                                            : "text-foreground/80 hover:text-primary"
                                    )}
                                >
                                    <div className={cn(
                                        "relative",
                                        activeSection === item.href && "glitch-effect"
                                    )}>
                                        <Icon
                                            className={cn(
                                                "transition-transform duration-300",
                                                activeSection === item.href && "transform -translate-y-1"
                                            )}
                                            sx={{
                                                fontSize: 24,
                                                filter: activeSection === item.href ? 'url(#neon-glow-filter)' : 'none'
                                            }}
                                        />
                                        {activeSection === item.href && (
                                            <>
                                                <Icon
                                                    className="absolute top-0 left-0"
                                                    sx={{
                                                        fontSize: 24,
                                                        color: 'rgba(255, 0, 255, 0.7)',
                                                        filter: 'url(#neon-glow-filter)'
                                                    }}
                                                    style={{ animation: 'var(--animate-glitch-1)' }}
                                                />
                                                <Icon
                                                    className="absolute top-0 left-0"
                                                    sx={{
                                                        fontSize: 24,
                                                        color: 'rgba(0, 255, 255, 0.7)',
                                                        filter: 'url(#neon-glow-filter)'
                                                    }}
                                                    style={{ animation: 'var(--animate-glitch-2)' }}
                                                />
                                            </>
                                        )}
                                    </div>
                                    <span
                                        data-text={item.name}
                                        className={cn(
                                            "font-electrolize text-lg",
                                            activeSection === item.href && "glitch-effect neon-glow"
                                        )}
                                    >
                                        {item.name}
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </nav>
            </div>
        </>
    );
};