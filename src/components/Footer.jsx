import { ArrowUp } from "lucide-react";


export const Footer = () => {
    return (
        <footer className="py-12 px-4 bg-card relative border-t border-border mt-12 pt-8 flex flex-col items-center">
            <p className="text-sm text-muted-foreground"> 
                &copy; {new Date().getFullYear()} Hyperborean Systems. All rights reserved.
            </p>
            <a href="/home" className="mt-5 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors duration-300 text-primary animate-bounce">
                <ArrowUp size={20}/>
            </a>
        </footer>
    );
}