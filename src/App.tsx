import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import PersonalProjects from "./pages/PersonalProjects";
import TeamProjects from "./pages/TeamProjects";
import PersonalProjectDetail from "./pages/PersonalProjectDetail";
import TeamProjectDetail from "./pages/TeamProjectDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/personal-projects" element={<PersonalProjects />} />
          <Route path="/personal-projects/:id" element={<PersonalProjectDetail />} />
          <Route path="/team-projects" element={<TeamProjects />} />
          <Route path="/team-projects/:id" element={<TeamProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
