import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ChevronDown, Rocket, User, Send } from "lucide-react";
import ColorBends from "@/components/ColorBends";
import TypewriterEffect from "@/components/TypewriterEffect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="min-h-screen bg-background star-field">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
        {/* ColorBends background */}
        <div className="absolute inset-0 pointer-events-none">
          <ColorBends
            rotation={90}
            speed={0.2}
            colors={["#5227FF", "#7e47eb", "#306ee8", "#7e47eb"]}
            transparent
            autoRotate={0}
            scale={0.8}
            frequency={1}
            warpStrength={1}
            mouseInfluence={0.3}
            parallax={0.5}
            noise={0}
          />
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
              href="https://github.com/nikhil-iso"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/60 text-foreground hover:text-primary hover:border-primary/50 transition-all duration-300 text-sm font-medium"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/nikhil-patel-ba1581281/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/60 text-foreground hover:text-secondary hover:border-secondary/50 transition-all duration-300 text-sm font-medium"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
            <a
              href="mailto:nikhil.patel@usask.ca"
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

      {/* Let's Connect */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold gradient-text text-center mb-12"
          >
            Let's Connect
          </motion.h2>

          <div className="max-w-3xl mx-auto">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glow-border rounded-xl p-8 bg-card/50 backdrop-blur-sm space-y-5"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="Peter" required maxLength={100} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Parker" required maxLength={100} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="notspiderman@oscorp.com" required maxLength={255} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="What's this about?" required maxLength={200} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Your message..." required maxLength={1000} rows={4} />
              </div>
              <Button type="submit" className="w-full gap-2">
                <Send className="w-4 h-4" /> Send Message
              </Button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
