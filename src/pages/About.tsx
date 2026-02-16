import { motion } from "framer-motion";
import Timeline from "@/components/Timeline";
import SkillsMarquee from "@/components/SkillsMarquee";

const About = () => {
  return (
    <div className="min-h-screen bg-background star-field pt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto px-6 text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">About Me</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          I'm Nikhil Patel, an Electrical Engineering student at the University of Saskatchewan.
          I'm passionate about rocketry, embedded systems, and designing things that push boundaries.
        </p>
      </motion.div>

      <Timeline />
      <SkillsMarquee />
    </div>
  );
};

export default About;
