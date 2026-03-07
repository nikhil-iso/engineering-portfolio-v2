import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";
import ProjectGrid from "@/components/ProjectGrid";
import { teamProjects } from "@/data/projects";

const TeamProjects = () => {
  const gridItems = teamProjects.map((project) => ({
    id: project.id,
    colSpan: project.span ?? 1,
    node: (
      <ProjectCard
        id={project.id}
        title={project.title}
        subtitle={project.objective}
        tags={project.technologies}
        type="team"
        span={project.span}
        image={project.cardImage ?? project.images?.[0]}
        myTitle={project.myTitle}
        teamSize={project.teamSize}
        peopleManaged={project.peopleManaged}
        role={project.role}
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
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Team Projects</h1>
          <p className="text-muted-foreground">Collaborative engineering work</p>
        </motion.div>

        <ProjectGrid items={gridItems} />
      </div>
    </div>
  );
};

export default TeamProjects;
