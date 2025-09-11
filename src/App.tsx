import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Mapa from "./pages/Mapa";
import Roteiros from "./pages/Roteiros";
import TempoReal from "./pages/TempoReal";
import GuiaLocal from "./pages/GuiaLocal";
import Comunidade from "./pages/Comunidade";
import CambioTraducao from "./pages/CambioTraducao";
import Checklist from "./pages/Checklist";
import Transporte from "./pages/Transporte";
import ModoOffline from "./pages/ModoOffline";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/roteiros" element={<Roteiros />} />
          <Route path="/tempo-real" element={<TempoReal />} />
          <Route path="/guia-local" element={<GuiaLocal />} />
          <Route path="/comunidade" element={<Comunidade />} />
          <Route path="/cambio-traducao" element={<CambioTraducao />} />
          <Route path="/checklist" element={<Checklist />} />
          <Route path="/transporte" element={<Transporte />} />
          <Route path="/modo-offline" element={<ModoOffline />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
