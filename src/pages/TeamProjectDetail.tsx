import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Target, UserCheck, Wrench, BarChart3, Briefcase, ImageIcon } from "lucide-react";
import { teamProjects } from "@/data/projects";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import ImageLightbox from "@/components/ImageLightbox";

const TeamProjectDetail = () => {
  const { id } = useParams();
  const project = teamProjects.find((p) => p.id === id);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-1">{project.title}</h1>
          <p className="text-sm text-muted-foreground mb-1">{project.myTitle} · Team of {project.teamSize}{project.peopleManaged ? ` · Managed ${project.peopleManaged}` : ""}</p>
          <p className="text-muted-foreground leading-relaxed mb-8">{project.description}</p>

          <div className="space-y-6">
            {/* Problem / Goal */}
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <Target className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
              <h3 className="text-sm font-semibold text-primary mb-2">Problem / Goal</h3>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  {project.problemGoal.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* My Role & Process */}
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <UserCheck className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
              <h3 className="text-sm font-semibold text-secondary mb-2">My Role &amp; Process</h3>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  {project.roleAndProcess.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* My Focus Area */}
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <Briefcase className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
              <h3 className="text-sm font-semibold text-primary mb-2">My Focus Area</h3>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  {project.myFocus.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>

            {/* Tools Used */}
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <Wrench className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-primary mb-1">Tools Used</h3>
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.toolsUsed.map((t) => (
                    <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantifiable Outcome */}
            <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
              <div>
              <h3 className="text-sm font-semibold text-secondary mb-2">Outcome</h3>
                <div className="text-sm text-muted-foreground space-y-3 leading-relaxed">
                  {project.outcome.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
                </div>
              </div>
            </div>
          </div>

          {/* Project Images */}
          {project.images && project.images.length > 0 && (
            <div className="mt-10">
              <div className="flex items-center gap-2 mb-4">
                <ImageIcon className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Project Gallery</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images.map((src, i) => (
                  <div
                    key={i}
                    className="glow-border rounded-xl overflow-hidden bg-card/50 cursor-pointer group"
                    onClick={() => setLightboxIndex(i)}
                  >
                    <AspectRatio ratio={16 / 9}>
                      <img
                        src={src}
                        alt={`${project.title} image ${i + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </AspectRatio>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && project.images && (
              <ImageLightbox
                images={project.images}
                initialIndex={lightboxIndex}
                alt={project.title}
                onClose={() => setLightboxIndex(null)}
              />
            )}
          </AnimatePresence>

          {/* Technologies */}
          <div className="mt-8">
            <h3 className="text-sm font-semibold text-foreground mb-3">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TeamProjectDetail;
