import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MapIcon, 
  CloudIcon, 
  StarIcon, 
  CameraIcon,
  Navigation,
  Thermometer
} from "lucide-react";

const FeatureCards = () => {
  const features = [
    {
      title: "Resumo do destino",
      description: "Use o mapa para ver atrações e trace roteiros personalizados.",
      icon: MapIcon,
      action: "Explorar mapa",
      delay: "0.2s"
    },
    {
      title: "Clima agora",
      description: "Condições meteorológicas atualizadas para o seu destino.",
      icon: CloudIcon,
      action: "Atualizar clima",
      delay: "0.4s",
      weather: true
    },
    {
      title: "Atrações próximas",
      description: "Descubra pontos turísticos e experiências únicas ao seu redor.",
      icon: StarIcon,
      action: "Ver atrações",
      delay: "0.6s"
    },
    {
      title: "Capture momentos",
      description: "Organize suas fotos de viagem e crie memórias inesquecíveis.",
      icon: CameraIcon,
      action: "Galeria",
      delay: "0.8s"
    }
  ];

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Explore com facilidade
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descubra tudo o que seu destino tem a oferecer com nossas ferramentas inteligentes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="border-0 shadow-card hover:shadow-elevated transition-all duration-300 animate-slide-up bg-gradient-card group hover:-translate-y-1"
                style={{ animationDelay: feature.delay }}
              >
                <CardHeader className="text-center pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  {feature.weather ? (
                    <div className="space-y-4">
                      <div className="bg-muted/50 rounded-lg p-3 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                          <Thermometer className="w-4 h-4 text-travel-blue" />
                          <span className="text-2xl font-bold">25°C</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Ensolarado</p>
                      </div>
                      <Button variant="travel" size="sm" className="w-full">
                        {feature.action}
                      </Button>
                    </div>
                  ) : (
                    <Button variant="travel" size="sm" className="w-full">
                      {feature.action}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;