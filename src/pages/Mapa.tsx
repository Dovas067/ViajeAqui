import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon, SearchIcon, PlusIcon, MinusIcon, LayersIcon } from "lucide-react";

const Mapa = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Mapa interativo
          </h1>

          {/* Mapa Placeholder */}
          <Card className="mb-8 shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-0 relative">
              <div className="h-96 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center relative overflow-hidden">
                {/* Controles do Mapa */}
                <div className="absolute top-4 left-4 z-10 space-y-2">
                  <Button variant="secondary" size="icon" className="shadow-card">
                    <PlusIcon className="w-4 h-4" />
                  </Button>
                  <Button variant="secondary" size="icon" className="shadow-card">
                    <MinusIcon className="w-4 h-4" />
                  </Button>
                </div>
                
                {/* Marcadores simulados */}
                <div className="absolute top-20 left-32 w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
                <div className="absolute top-40 right-40 w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.5s" }}></div>
                <div className="absolute bottom-32 left-20 w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "1s" }}></div>
                
                <div className="text-center">
                  <MapIcon className="w-16 h-16 text-travel-blue mb-4 mx-auto" />
                  <p className="text-travel-blue-dark font-medium">Mapa Interativo</p>
                  <p className="text-sm text-muted-foreground">Visualização do mundo com pontos de interesse</p>
                </div>
                
                {/* Créditos */}
                <div className="absolute bottom-2 right-2 text-xs text-muted-foreground bg-white/80 px-2 py-1 rounded">
                  © Leaflet | © OpenStreetMap
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Busca por categoria */}
          <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <SearchIcon className="w-5 h-5 text-primary" />
                Buscar por categoria
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Categoria
                </label>
                <Select defaultValue="pontos-turisticos">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pontos-turisticos">Pontos turísticos</SelectItem>
                    <SelectItem value="restaurantes">Restaurantes</SelectItem>
                    <SelectItem value="hoteis">Hotéis</SelectItem>
                    <SelectItem value="transportes">Transportes</SelectItem>
                    <SelectItem value="compras">Compras</SelectItem>
                    <SelectItem value="vida-noturna">Vida noturna</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button variant="travel" size="lg" className="w-full">
                <LayersIcon className="w-5 h-5" />
                Mostrar no mapa (raio 2km)
              </Button>

              <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                <strong>Fonte:</strong> OpenStreetMap (quando disponível). Respeite limites da Overpass API.
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Mapa;