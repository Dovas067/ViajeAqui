import { Button } from "@/components/ui/button";
import { MapPinIcon, BellIcon } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-hero py-12 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <div className="animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Bem-vindo(a) 👋
          </h2>
          <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
            Permita a localização para recomendações por perto e um mapa centrado em você.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button 
              variant="accent" 
              size="lg"
              className="min-w-[200px] animate-scale-in"
              style={{ animationDelay: "0.2s" }}
            >
              <MapPinIcon className="w-5 h-5" />
              Ativar localização
            </Button>
            <Button 
              variant="ghost" 
              size="lg"
              className="min-w-[200px] text-white border-white/30 hover:bg-white/10 animate-scale-in"
              style={{ animationDelay: "0.4s" }}
            >
              <BellIcon className="w-5 h-5" />
              Ativar notificações
            </Button>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-white/80 text-sm animate-slide-up" style={{ animationDelay: "0.6s" }}>
            💡 <strong>Dica:</strong> adicione este site à tela inicial para usar como app (PWA).
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;