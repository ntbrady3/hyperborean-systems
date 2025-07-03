import { Code, Person, Work } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-4 relative">
      <div className="container max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-orbitron italic tracking-tight overflow-visible inline-flex items-baseline">
          <span>About&nbsp;</span>
          <span 
            className="text-primary opacity-0 animate-fade-in-delay-1 neon-glow inline-block relative" 
            style={{ paddingBottom: '20px' }}
          >
            <span 
              className="glitch-text relative inline-block" 
              data-text="Our Company."
              style={{ paddingBottom: '20px', paddingRight: '0px' }}
            >
              Our Company.
            </span>
          </span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-12 items-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold font-orbitron text-tertiary">Innovative Tech Solutions</h3>
            <p className="text-muted-foreground">
              We are a dedicated team of technology experts committed to delivering cutting-edge solutions that drive business success. Our mission is to transform industries through innovation and excellence.
            </p>
            <p className="text-muted-foreground">
              With a focus on collaboration and creativity, we empower our clients by building scalable, user-centric systems that solve complex challenges and create lasting value.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
              <Link
                to="#contact"
                className="cosmic-button"
              >
                Contact Us <ArrowForwardIcon fontSize="small" />
              </Link>
            </div>
          </div>
          {/* <div className="grid grid-cols-1 gap-6">
            <div className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <Code sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold font-electrolize text-tertiary">Custom Software Development</h4>
                  <p className="text-muted-foreground">
                    Our team specializes in crafting robust, scalable software tailored to your business needs, leveraging the latest technologies and best practices.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <Person sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold font-electrolize text-tertiary">User-Centric Design</h4>
                  <p className="text-muted-foreground">
                    We prioritize intuitive and engaging user experiences, designing interfaces that are both visually stunning and highly functional.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-zinc-950/40 backdrop-blur-md rounded-lg border-2 border-primary/50">
              <div className="flex items-start gap-4 ">
                <div className="p-3 rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center">
                  <Work sx={{ fontSize: 24 }} className="text-primary" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold font-electrolize text-tertiary">Proven Expertise</h4>
                  <p className="text-muted-foreground">
                    With years of experience across diverse industries, we deliver reliable solutions that help our clients achieve their strategic goals.
                  </p>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};