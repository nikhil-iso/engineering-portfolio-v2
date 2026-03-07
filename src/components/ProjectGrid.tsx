import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProjectGridProps {
  items: { id: string; colSpan?: number; node: ReactNode }[];
}

const ProjectGrid = ({ items }: ProjectGridProps) => (
  <div
    className="grid gap-6"
    style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
  >
    {items.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        style={{ gridColumn: `span ${item.colSpan ?? 1}` }}
      >
        {item.node}
      </motion.div>
    ))}
  </div>
);

export default ProjectGrid;
