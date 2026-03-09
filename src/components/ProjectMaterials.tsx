import { ExternalLink, FolderOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProjectMaterial } from "@/data/projects";

interface ProjectMaterialsProps {
  materials?: ProjectMaterial[];
}

const ProjectMaterials = ({ materials }: ProjectMaterialsProps) => {
  return (
    <div className="glow-border rounded-xl p-5 bg-card/50 flex items-start gap-3">
      <FolderOpen className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
      <div className="w-full">
        <h3 className="text-sm font-semibold text-primary mb-2">Project Materials</h3>

        {materials && materials.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {materials.map((material) => (
              <Button
                key={`${material.label}-${material.url}`}
                asChild
                size="sm"
                variant="outline"
                className="bg-background/40"
              >
                <a href={material.url} target="_blank" rel="noopener noreferrer">
                  {material.label}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </Button>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No materials linked yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectMaterials;
