import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProjectGridProps {
  items: { id: string; colSpan?: number; node: ReactNode }[];
}

const ProjectGrid = ({ items }: ProjectGridProps) => (
  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    {items.map((item, i) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: i * 0.05 }}
        className={
          item.colSpan && item.colSpan > 1
            ? `sm:col-span-2 ${item.colSpan >= 3 ? "lg:col-span-3" : "lg:col-span-2"}`
            : ""
        }
      >
        {item.node}
      </motion.div>
    ))}
  </div>
);

export default ProjectGrid;
