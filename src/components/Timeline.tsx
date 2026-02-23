import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const timelineItems = [
  {
    year: "2021",
    title: "Started at USask",
    description: "Began Electrical Engineering studies at the University of Saskatchewan.",
    projects: [
      { label: "Custom PCB Design", path: "/personal-projects/custom-pcb" },
    ],
  },
  {
    year: "2023",
    title: "FRC Drivetrain Lead",
    description: "Led drivetrain development and optimization for FRC Team 4627.",
    projects: [
      { label: "FRC 4627 Manning Robotics - Drivetrain Development", path: "/team-projects/frc-4627-manning" },
    ],
  },
  {
    year: "2023",
    title: "Provincial Podium",
    description: "Competed at Skills Alberta with a coordinated multi-robot system.",
    projects: [
      { label: "Skills Alberta Robotics Competition 2023", path: "/team-projects/skills-alberta-2023" },
    ],
  },
  {
    year: "2024",
    title: "NASA Space Apps",
    description: "Built ExoSpace to visualize open NASA datasets in a 48-hour hackathon.",
    projects: [
      { label: "NASA Space Apps Challenge 2024 - ExoSpace", path: "/team-projects/nasa-space-apps-2024" },
      { label: "Home Automation System", path: "/personal-projects/home-automation" },
    ],
  },
  {
    year: "2025",
    title: "Launch Canada",
    description: "Led propulsion integration for an M-class high-power rocket campaign.",
    projects: [
      { label: "Project \"UP\" - USST Rocketry", path: "/team-projects/usst-rocketry" },
    ],
  },
];

const Timeline = () => {
  return (
    <section className="py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold gradient-text text-center mb-12">My Journey</h2>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-secondary/40 to-transparent" />

          {timelineItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className={`w-1/2 ${index % 2 === 0 ? "pr-10 text-right" : "pl-10"}`}>
                <div className="glow-border rounded-xl p-5 bg-card/80">
                  <span className="text-sm font-mono text-primary">{item.year}</span>
                  <h3 className="text-lg font-semibold text-foreground mt-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  {item.projects && item.projects.length > 0 && (
                    <div className="mt-3 space-y-1">
                      {item.projects.map((project) => (
                        <Link
                          key={project.path}
                          to={project.path}
                          className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 transition-colors group"
                        >
                          <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                          {project.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {/* Center dot */}
              <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-box" />
              <div className="w-1/2" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
