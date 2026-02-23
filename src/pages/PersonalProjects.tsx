import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import { personalProjects } from "@/data/projects";

const PersonalProjects = () => {
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalProjects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={
                project.span === 3
                  ? "col-span-1 md:col-span-2 lg:col-span-3"
                  : project.span === 2
                  ? "col-span-1 md:col-span-2"
                  : "col-span-1"
              }
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                subtitle={project.description}
                tags={project.skills}
                type="personal"
                span={project.span}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalProjects;
