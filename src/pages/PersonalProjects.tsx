import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ResizableProjectGrid from "@/components/ResizableProjectGrid";
import { personalProjects } from "@/data/projects";

const PersonalProjects = () => {
  const gridItems = personalProjects.map((project) => ({
    id: project.id,
    defaultColSpan: project.span ?? 1,
    node: (
      <ProjectCard
        id={project.id}
        title={project.title}
        subtitle={project.description}
        tags={project.skills}
        type="personal"
        span={project.span}
        image={project.cardImage}
      />
    ),
  }));

  return (
    <div className="min-h-screen bg-background star-field pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Personal Projects</h1>
          <p className="text-muted-foreground">Solo builds and experiments</p>
        </motion.div>

        <ResizableProjectGrid storageKey="personal-projects-layout" items={gridItems} />
      </div>
    </div>
  );
};

export default PersonalProjects;
