
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CityPage from "./pages/CityPage";
import VideoFeed from "./pages/VideoFeed";
import Panorama360Page from "./pages/Panorama360Page";
import MyItinerary from "./pages/MyItinerary";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cidade/:cityId" element={<CityPage />} />
          <Route path="/cidade/:cityId/categoria/:categorySlug" element={<VideoFeed />} />
          <Route path="/cidade/:cityId/360/:categorySlug" element={<Panorama360Page />} />
          <Route path="/itinerary" element={<MyItinerary />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
