import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import Seo from "@/components/Seo";
import { buildBreadcrumbStructuredData } from "@/lib/site";

const Timeline = lazy(() => import("@/components/Timeline"));
const SkillsMarquee = lazy(() => import("@/components/SkillsMarquee"));

const About = () => {
  return (
    <div className="min-h-screen bg-background star-field pt-24">
      <Seo
        title="About Nikhil Patel | Electrical Engineering Portfolio"
        description="Learn more about Nikhil Patel, an electrical engineering student at the University of Saskatchewan focused on rocketry, embedded systems, and robotics."
        path="/about"
        structuredData={buildBreadcrumbStructuredData([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />

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

      <Suspense fallback={null}>
        <Timeline />
        <SkillsMarquee />
      </Suspense>
    </div>
  );
};

export default About;
