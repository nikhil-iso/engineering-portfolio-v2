import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Users, Target, Wrench, UserCheck } from "lucide-react";
import { teamProjects } from "@/data/projects";

const TeamProjectDetail = () => {
  const { id } = useParams();
  const project = teamProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background star-field pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        <Link
          to="/team-projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Team Projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{project.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">{project.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Objective</h3>
                <p className="text-sm text-muted-foreground">{project.objective}</p>
              </div>
            </div>
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <Users className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-secondary mb-1">Team Size</h3>
                <p className="text-sm text-muted-foreground">{project.teamSize} members</p>
              </div>
            </div>
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <Wrench className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Key Technologies</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.technologies.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-secondary mb-1">My Role</h3>
                <p className="text-sm text-muted-foreground">{project.role}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamProjectDetail;
