import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookIcon, BedIcon, UtensilsIcon, ShoppingBagIcon, MapPinIcon } from "lucide-react";

const GuiaLocal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Guia local de serviços
          </h1>

          <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookIcon className="w-5 h-5 text-primary" />
                Hospedagens & Essenciais
              </CardTitle>
              <CardDescription>
                Veja avaliações, comentários e serviços essenciais próximos.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                {/* Categorias de serviços */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    {
                      icon: BedIcon,
                      title: "Hospedagem",
                      description: "Hotéis, pousadas e hostels",
                      count: "127 locais"
                    },
                    {
                      icon: UtensilsIcon,
                      title: "Restaurantes",
                      description: "Culinária local e internacional",
                      count: "89 locais"
                    },
                    {
                      icon: ShoppingBagIcon,
                      title: "Compras",
                      description: "Mercados, shopping e lojas",
                      count: "56 locais"
                    },
                    {
                      icon: MapPinIcon,
                      title: "Serviços",
                      description: "Farmácias, bancos e mais",
                      count: "134 locais"
                    }
                  ].map((category, index) => {
                    const Icon = category.icon;
                    return (
                      <Card 
                        key={index} 
                        className="hover:shadow-card transition-all duration-200 cursor-pointer group border-travel-blue/10 hover:border-travel-blue/30"
                      >
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-travel-blue/10 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-travel-blue/20 transition-colors">
                            <Icon className="w-6 h-6 text-travel-blue" />
                          </div>
                          <h3 className="font-semibold text-sm">{category.title}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{category.description}</p>
                          <p className="text-xs text-travel-blue font-medium mt-2">{category.count}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                {/* Lista de recomendações */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Recomendações próximas</h3>
                  
                  {[
                    {
                      name: "Hotel Centro Plaza",
                      category: "Hospedagem",
                      rating: 4.5,
                      distance: "200m",
                      price: "R$ 180/noite",
                      description: "Hotel moderno no centro histórico com café da manhã incluso."
                    },
                    {
                      name: "Restaurante Sabor Local",
                      category: "Gastronomia",
                      rating: 4.8,
                      distance: "150m",
                      price: "R$ 45/pessoa",
                      description: "Especialidades regionais com ingredientes frescos locais."
                    },
                    {
                      name: "Farmácia 24h",
                      category: "Serviços",
                      rating: 4.2,
                      distance: "300m",
                      price: "Aberto 24h",
                      description: "Farmácia com atendimento 24 horas e entrega."
                    }
                  ].map((place, index) => (
                    <Card key={index} className="shadow-card hover:shadow-elevated transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold">{place.name}</h4>
                              <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">
                                {place.category}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span>⭐ {place.rating}</span>
                              <span>📍 {place.distance}</span>
                              <span className="font-medium text-travel-blue">{place.price}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{place.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Dica */}
                <div className="bg-travel-blue/5 border border-travel-blue/20 p-4 rounded-lg">
                  <p className="text-sm text-travel-blue-dark">
                    💡 <strong>Dica:</strong> Use filtros por avaliação, distância e preço para encontrar exatamente o que procura.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GuiaLocal;