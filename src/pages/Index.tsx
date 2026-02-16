import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ChevronDown, Rocket, User } from "lucide-react";
import TypewriterEffect from "@/components/TypewriterEffect";

const Index = () => {
  return (
    <div className="min-h-screen bg-background star-field">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* Nebula glow layers */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full opacity-30"
            style={{ background: "radial-gradient(circle, hsl(260 80% 40% / 0.6) 0%, hsl(220 80% 30% / 0.3) 40%, transparent 70%)" }} />
          <div className="absolute top-[40%] left-[45%] -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-25 blur-[40px]"
            style={{ background: "radial-gradient(circle, hsl(220 80% 55% / 0.5) 0%, hsl(260 60% 40% / 0.2) 50%, transparent 70%)" }} />
          <div className="absolute top-[55%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-20 blur-[60px]"
            style={{ background: "radial-gradient(circle, hsl(280 70% 50% / 0.4) 0%, transparent 60%)" }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            <span className="text-foreground">Nikhil Patel</span>
          </h1>
          <p className="text-2xl md:text-3xl font-light text-muted-foreground mb-2">
            Engineering Student <span className="gradient-text">&</span> Designer
          </p>
          <div className="h-8 mt-4">
            <TypewriterEffect />
          </div>

          {/* Social buttons */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/60 text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 text-sm font-medium"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/60 text-foreground hover:text-secondary hover:border-secondary/50 transition-all duration-300 text-sm font-medium"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="mailto:nikhil@example.com"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/60 text-foreground hover:text-accent hover:border-accent/50 transition-all duration-300 text-sm font-medium"
            >
              <Mail className="w-4 h-4" /> Email
            </a>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10"
        >
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </motion.div>
      </section>

      {/* Explore Projects */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold gradient-text mb-12"
          >
            Explore My Projects
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/personal-projects">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glow-border rounded-xl p-8 bg-card/50 backdrop-blur-sm group cursor-pointer"
              >
                <User className="w-10 h-10 text-primary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                  Personal Projects
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Solo builds, experiments, and passion projects
                </p>
              </motion.div>
            </Link>

            <Link to="/team-projects">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glow-border rounded-xl p-8 bg-card/50 backdrop-blur-sm group cursor-pointer"
              >
                <Rocket className="w-10 h-10 text-secondary mb-4 mx-auto group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-foreground group-hover:text-secondary transition-colors">
                  Team Projects
                </h3>
                <p className="text-muted-foreground text-sm mt-2">
                  Collaborative engineering and competition work
                </p>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
