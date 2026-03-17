import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectGrid from "@/components/ProjectGrid";
import { personalProjects } from "@/data/projects";
import Seo from "@/components/Seo";
import { buildCollectionStructuredData } from "@/lib/site";

const PersonalProjects = () => {
  const gridItems = personalProjects.map((project) => ({
    id: project.id,
    colSpan: project.span ?? 1,
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
      <Seo
        title="Personal Projects | Nikhil Patel"
        description="Browse Nikhil Patel's personal engineering projects in embedded systems, hardware design, open-source devices, and computer vision."
        path="/personal-projects"
        structuredData={buildCollectionStructuredData(
          "Personal Projects | Nikhil Patel",
          "Personal engineering projects in embedded systems, hardware design, and computer vision.",
          "/personal-projects",
          personalProjects.map((project) => ({
            name: project.title,
            path: `/personal-projects/${project.id}`,
          })),
        )}
      />

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Personal Projects</h1>
          <p className="text-muted-foreground">Solo builds and experiments</p>
        </motion.div>

        <ProjectGrid items={gridItems} />
      </div>
    </div>
  );
};

export default PersonalProjects;
