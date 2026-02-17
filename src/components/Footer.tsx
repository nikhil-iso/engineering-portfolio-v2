import { Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 bg-card/30 backdrop-blur-sm">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm font-semibold text-foreground">Get In Touch</p>
        <div className="flex items-center gap-3">
          <Mail className="w-4 h-4 text-primary" />
          <a href="mailto:nikhil.patel@usask.ca" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            nikhil.patel@usask.ca
          </a>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-secondary" />
          <p className="text-sm text-muted-foreground">Saskatoon, SK, Canada</p>
        </div>
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Nikhil Patel</p>
      </div>
    </footer>
  );
};

export default Footer;
