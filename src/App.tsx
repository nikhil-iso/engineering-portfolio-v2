import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

// Eagerly load critical pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Lazy load everything else
const About = lazy(() => import("./pages/About"));
const PersonalProjects = lazy(() => import("./pages/PersonalProjects"));
const TeamProjects = lazy(() => import("./pages/TeamProjects"));
const PersonalProjectDetail = lazy(() => import("./pages/PersonalProjectDetail"));
const TeamProjectDetail = lazy(() => import("./pages/TeamProjectDetail"));


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/personal-projects" element={<PersonalProjects />} />
            <Route path="/personal-projects/:id" element={<PersonalProjectDetail />} />
            <Route path="/team-projects" element={<TeamProjects />} />
            <Route path="/team-projects/:id" element={<TeamProjectDetail />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
