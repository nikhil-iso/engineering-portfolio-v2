import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Github, Linkedin, Mail, ChevronDown, Rocket, User, Send, Loader2, MapPin, Download, Briefcase } from "lucide-react";
import ColorBends from "@/components/ColorBends";
import TypewriterEffect from "@/components/TypewriterEffect";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const WEB3FORMS_KEY = "01879a1a-0cc7-4c25-be4f-2d4b4338ff31";

const Index = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", WEB3FORMS_KEY);
    const formEl = e.currentTarget;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (data.success) {
        toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
        formEl.reset();
      } else {
        throw new Error(data.message || "Submission failed");
      }
    } catch (err: any) {
      toast({
        title: "Failed to send",
        description: err?.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background star-field">
      {/* Hero */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-8 md:px-16 relative overflow-hidden">
        {/* ColorBends background */}
        <div className="absolute inset-0 pointer-events-none">
          <ColorBends
            rotation={270}
            speed={0.2}
            colors={["#5227FF", "#7e47eb", "#306ee8", "#7e47eb"]}
            transparent
            autoRotate={0}
            scale={1.2}
            frequency={1}
            warpStrength={1}
            mouseInfluence={0.3}
            parallax={0.5}
            noise={0.05}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="z-10 flex flex-col md:flex-row items-center gap-6 md:gap-16 max-w-5xl w-full"
        >
          {/* Text content */}
          <div className="flex-1 text-left bg-background/50 backdrop-blur-md rounded-2xl p-5 sm:p-8 border border-border/40" style={{ boxShadow: "0 8px 32px hsl(230 25% 4% / 0.6), inset 0 1px 0 hsl(220 20% 90% / 0.05)" }}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3 leading-tight">
              <span
                className="text-foreground"
                style={{ textShadow: "0 2px 24px hsl(260 80% 60% / 0.25), 0 1px 0 hsl(220 20% 90% / 0.8)" }}
              >
                Nikhil Patel
              </span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold mb-3 gradient-text">
              Engineering Student &amp; Designer
            </p>
            <div className="h-8 mb-8">
              <TypewriterEffect />
            </div>

            {/* Social buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <a
                href="https://github.com/nikhil-iso"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/80 backdrop-blur-sm text-foreground hover:text-primary hover:border-primary/60 transition-all duration-300 text-sm font-semibold"
              >
                <Github className="w-4 h-4" /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/nikhil-patel-ba1581281/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/80 backdrop-blur-sm text-foreground hover:text-secondary hover:border-secondary/60 transition-all duration-300 text-sm font-semibold"
              >
                <Linkedin className="w-4 h-4" /> LinkedIn
              </a>
              <a
                href="mailto:nikhil.patel@usask.ca"
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg glow-border bg-card/80 backdrop-blur-sm text-foreground hover:text-accent hover:border-accent/60 transition-all duration-300 text-sm font-semibold"
              >
                <Mail className="w-4 h-4" /> Email
              </a>
            </div>
          </div>

          {/* Profile photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="shrink-0"
          >
            <div
              className="w-52 h-52 md:w-64 md:h-64 rounded-full glow-border bg-card/60 backdrop-blur-sm relative overflow-hidden"
              style={{ boxShadow: "0 0 40px hsl(260 80% 60% / 0.3), 0 0 80px hsl(220 80% 55% / 0.15)" }}
            >
              {/* Gradient background inside circle */}
              <div className="absolute inset-0 rounded-full" style={{ background: "radial-gradient(circle at 60% 35%, hsl(260 80% 60% / 0.18), hsl(220 80% 55% / 0.1) 60%, transparent)" }} />
              <img
                src="/profile-photo.JPG"
                alt="Portrait of Nikhil Patel"
                className="relative z-10 h-full w-full object-cover"
                loading="eager"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg";
                }}
              />
            </div>
          </motion.div>
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

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glow-border rounded-xl p-8 bg-card/50 backdrop-blur-sm space-y-5"
            >
              <h3 className="text-xl font-semibold gradient-text">Send Me a Message</h3>
              <p className="text-sm text-muted-foreground">Whether you have a project idea, or are reaching out about a job opportunity!</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" placeholder="Peter" required maxLength={100} disabled={isSubmitting} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" name="lastName" placeholder="Parker" required maxLength={100} disabled={isSubmitting} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="not.spiderman@example.com" required maxLength={255} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" placeholder="Project Collaboration Opportunity" required maxLength={200} disabled={isSubmitting} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" placeholder="Tell me about your project or opportunity..." required maxLength={1000} rows={4} disabled={isSubmitting} />
              </div>
              <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </motion.form>

            {/* Right side - Get In Touch + Open to Opportunities */}
            <div className="flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="glow-border rounded-xl p-8 bg-gradient-to-br from-primary/30 via-secondary/20 to-accent/30 backdrop-blur-sm space-y-6"
              >
                <h3 className="text-xl font-semibold gradient-text">Get In Touch</h3>
                <p className="text-sm text-muted-foreground">Ready to start a conversation? Here are the best ways to reach me.</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Email</p>
                    <a href="mailto:nikhil.patel@usask.ca" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      nikhil.patel@usask.ca
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Location</p>
                    <p className="text-sm text-muted-foreground">University of Saskatchewan, Saskatoon, SK</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="glow-border rounded-xl p-8 bg-card/50 backdrop-blur-sm space-y-4"
              >
                <h3 className="text-lg font-semibold text-foreground">Open to Opportunities</h3>
                <p className="text-sm text-muted-foreground">
                  Currently seeking internships, co-op positions, and collaborative projects in Electrical engineering and Mechatronics technology.
                </p>
                <a href="/website_resume.pdf" download>
                  <Button variant="outline" className="w-full gap-2 border-primary/50 hover:bg-primary/10">
                    <Download className="w-4 h-4" />
                    Download Resume
                  </Button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
