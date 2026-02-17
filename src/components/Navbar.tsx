import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Me" },
  { path: "/personal-projects", label: "Personal Projects" },
  { path: "/team-projects", label: "Team Projects" },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70"
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold gradient-text">
          NP
        </Link>
        <div className="flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                location.pathname === item.path
                  ? "text-primary glow-text"
                  : "text-muted-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a href="/resume.pdf" download>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Resume
            </Button>
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
