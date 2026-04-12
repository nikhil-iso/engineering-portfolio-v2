import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const navItems = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Me" },
  { path: "/personal-projects", label: "Personal Projects" },
  { path: "/team-projects", label: "Team Projects" },
];

const Navbar = () => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 backdrop-blur-xl bg-background/70"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
        <Link to="/" className="text-lg sm:text-xl font-bold gradient-text">
          Nikhil - Eng
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
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
          <div className="flex items-center gap-2">
            <Link to="/documents/resume">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Resume
              </Button>
            </Link>
            <Link to="/documents/portfolio">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Portfolio
              </Button>
            </Link>
            <Link to="/documents/cv">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> CV
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col px-6 py-4 gap-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === item.path
                      ? "text-primary glow-text"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <Link to="/documents/resume" onClick={() => setMobileOpen(false)} className="mt-1">
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Download className="w-4 h-4" /> Resume
                </Button>
              </Link>
              <Link to="/documents/portfolio" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Download className="w-4 h-4" /> Portfolio
                </Button>
              </Link>
              <Link to="/documents/cv" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="gap-2 w-full">
                  <Download className="w-4 h-4" /> CV
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
