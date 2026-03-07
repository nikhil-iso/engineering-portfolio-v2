import { useState } from "react";
import { Play } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import type { GalleryItem } from "@/data/projects";

interface GalleryMediaProps {
  item: GalleryItem;
  index: number;
  projectTitle: string;
  onImageClick: (index: number) => void;
}

const GalleryMedia = ({ item, index, projectTitle, onImageClick }: GalleryMediaProps) => {
  const [playing, setPlaying] = useState(false);

  if (item.type === "video") {
    return (
      <div className="glow-border rounded-xl overflow-hidden bg-card/50 group">
        <AspectRatio ratio={16 / 9}>
          {!playing ? (
            <button
              onClick={() => setPlaying(true)}
              className="relative w-full h-full"
              aria-label={`Play video ${index + 1}`}
            >
              {item.poster ? (
                <img
                  src={item.poster}
                  alt={`${projectTitle} video ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">Video</span>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                <div className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center shadow-lg">
                  <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                </div>
              </div>
            </button>
          ) : (
            <video
              src={item.src}
              controls
              autoPlay
              className="w-full h-full object-contain bg-black"
            />
          )}
        </AspectRatio>
      </div>
    );
  }

  return (
    <div
      className="glow-border rounded-xl overflow-hidden bg-card/50 cursor-pointer group"
      onClick={() => onImageClick(index)}
    >
      <AspectRatio ratio={16 / 9}>
        <img
          src={item.src}
          alt={`${projectTitle} image ${index + 1}`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </AspectRatio>
    </div>
  );
};

export default GalleryMedia;
