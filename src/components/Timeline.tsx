import { motion } from "framer-motion";

const timelineItems = [
  {
    year: "2021",
    title: "Started at USask",
    description: "Began Electrical Engineering studies at the University of Saskatchewan.",
  },
  {
    year: "2022",
    title: "Joined USST",
    description: "Became a member of the University of Saskatchewan Space Team.",
  },
  {
    year: "2023",
    title: "Propulsion Lead",
    description: "Took on the role of Propulsion Lead for USST Rocketry division.",
  },
  {
    year: "2024",
    title: "President of USST",
    description: "Elected President of the University of Saskatchewan Space Team.",
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
