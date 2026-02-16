import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { personalProjects } from "@/data/projects";

const PersonalProjectDetail = () => {
  const { id } = useParams();
  const project = personalProjects.find((p) => p.id === id);

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
          to="/personal-projects"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Personal Projects
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="w-full h-56 rounded-xl bg-muted/30 glow-border flex items-center justify-center mb-8">
            <span className="text-6xl opacity-30">🚀</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{project.title}</h1>
          <p className="text-muted-foreground leading-relaxed mb-8">{project.description}</p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glow-border rounded-xl p-5 bg-card/50">
              <h3 className="text-sm font-semibold text-primary mb-3">Relevant Skills</h3>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((s) => (
                  <span key={s} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="glow-border rounded-xl p-5 bg-card/50">
              <h3 className="text-sm font-semibold text-secondary mb-3">Learning Experiences</h3>
              <ul className="space-y-2">
                {project.learnings.map((l) => (
                  <li key={l} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-secondary mt-0.5">•</span> {l}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalProjectDetail;
