import { useParams, Navigate } from "react-router-dom";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Seo from "@/components/Seo";

const DOCUMENTS: Record<string, { title: string; file: string; downloadName: string }> = {
  resume: {
    title: "Resume – Nikhil Patel",
    file: "/docs/rs-np-4e9f1c.pdf",
    downloadName: "nikhil-patel-resume.pdf",
  },
  portfolio: {
    title: "Portfolio – Nikhil Patel",
    file: "/docs/pf-np-7b2d5a.pdf",
    downloadName: "nikhil-patel-portfolio.pdf",
  },
  cv: {
    title: "Curriculum Vitae – Nikhil Patel",
    file: "/docs/cv-np-a3d7b2.pdf",
    downloadName: "nikhil-patel-cv.pdf",
  },
};

const DocumentViewer = () => {
  const { docType } = useParams<{ docType: string }>();
  const doc = docType ? DOCUMENTS[docType] : undefined;

  if (!doc) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background pt-20 pb-8 px-4">
      <Seo title={doc.title} description={`View and download ${doc.title}`} path={`/documents/${docType}`} />
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground">{doc.title}</h1>
          <a href={doc.file} download={doc.downloadName}>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Download
            </Button>
          </a>
        </div>
        <div className="rounded-xl border border-border/50 overflow-hidden bg-card/30" style={{ height: "calc(100vh - 160px)" }}>
          <iframe
            src={`${doc.file}#toolbar=1&navpanes=0`}
            title={doc.title}
            className="w-full h-full"
            style={{ border: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentViewer;
