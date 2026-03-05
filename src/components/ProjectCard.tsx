import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, User, Briefcase } from "lucide-react";

interface ProjectCardProps {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  type: "personal" | "team";
  span?: 1 | 2 | 3;
  // Team-only extras
  myTitle?: string;
  teamSize?: number;
  peopleManaged?: number;
  role?: string;
}

const ProjectCard = ({ id, title, subtitle, tags, type, span = 1, myTitle, teamSize, peopleManaged, role }: ProjectCardProps) => {
  const isWide = span > 1;
  const isTeam = type === "team";

  return (
    <div className="h-full">
      <Link to={`/${type}-projects/${id}`}>
        <motion.div
          whileHover={{ y: -4, scale: 1.01 }}
          transition={{ duration: 0.2 }}
          className="glow-border rounded-xl p-6 bg-card/60 backdrop-blur-sm cursor-pointer group h-full"
        >
          {/* Image placeholder */}
          <div
            className={`w-full rounded-lg bg-muted/50 mb-4 overflow-hidden flex items-center justify-center ${
              isWide ? "h-52" : "h-40"
            }`}
          >
            <span className="text-4xl opacity-30 group-hover:opacity-60 transition-opacity">🚀</span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors mb-1">
            {title}
          </h3>

          {/* Team metadata row */}
          {isTeam && (myTitle || teamSize !== undefined || peopleManaged !== undefined) && (
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-2">
              {myTitle && (
                <span className="flex items-center gap-1 text-xs font-semibold text-primary">
                  <Briefcase className="w-3 h-3" />
                  {myTitle}
                </span>
              )}
              {teamSize !== undefined && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Users className="w-3 h-3" />
                  Team of {teamSize}
                </span>
              )}
              {peopleManaged !== undefined && (
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="w-3 h-3" />
                  Managed {peopleManaged}
                </span>
              )}
            </div>
          )}

          {/* Role / subtitle */}
          {isTeam && role ? (
            <p className="text-xs text-muted-foreground/80 italic mb-3">{role}</p>
          ) : (
            <p className="text-sm text-muted-foreground mt-1 mb-3">{subtitle}</p>
          )}

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProjectCard;

