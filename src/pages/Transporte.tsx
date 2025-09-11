import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CarIcon, 
  BusIcon, 
  TrainIcon, 
  BikeIcon, 
  PlaneIcon, 
  MapPinIcon,
  SearchIcon,
  CalendarIcon,
  ClockIcon
} from "lucide-react";

const Transporte = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Transporte
          </h1>

          <div className="grid gap-8">
            {/* Opções por perto */}
            <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-primary" />
                  Opções por perto
                </CardTitle>
                <CardDescription>
                  Veja ônibus, metrô, táxis, caronas, bikes e patinetes. Use o mapa para rotas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                  {[
                    { icon: BusIcon, name: "Ônibus", count: "12 linhas", color: "text-blue-600" },
                    { icon: TrainIcon, name: "Metrô", count: "3 estações", color: "text-green-600" },
                    { icon: CarIcon, name: "Táxi/Uber", count: "Disponível", color: "text-yellow-600" },
                    { icon: BikeIcon, name: "Bike/Patinete", count: "8 pontos", color: "text-orange-600" },
                    { icon: PlaneIcon, name: "Aeroporto", count: "25km", color: "text-purple-600" }
                  ].map((transport, index) => {
                    const Icon = transport.icon;
                    return (
                      <Card key={index} className="hover:shadow-card transition-all cursor-pointer group">
                        <CardContent className="p-4 text-center">
                          <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/10 transition-colors">
                            <Icon className={`w-6 h-6 ${transport.color} group-hover:text-primary`} />
                          </div>
                          <h3 className="font-semibold text-sm">{transport.name}</h3>
                          <p className="text-xs text-muted-foreground">{transport.count}</p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>

                <div className="bg-travel-blue/5 border border-travel-blue/20 p-4 rounded-lg">
                  <p className="text-sm text-travel-blue-dark">
                    🗺️ <strong>Dica:</strong> Toque no mapa para ver rotas detalhadas e tempos de chegada em tempo real
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Aluguel de veículos */}
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CarIcon className="w-5 h-5 text-primary" />
                  Aluguéis
                </CardTitle>
                <CardDescription>
                  Encontre e compare preços de carros, motos e bicicletas para alugar
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Tipo
                    </label>
                    <Select defaultValue="bike">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="car">🚗 Carro</SelectItem>
                        <SelectItem value="motorcycle">🏍️ Moto</SelectItem>
                        <SelectItem value="bike">🚲 Bicicleta</SelectItem>
                        <SelectItem value="scooter">🛴 Patinete elétrico</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      <CalendarIcon className="w-4 h-4 inline mr-1" />
                      Dias
                    </label>
                    <Input 
                      type="number" 
                      defaultValue="1" 
                      min="1" 
                      placeholder="Quantos dias?"
                    />
                  </div>
                </div>

                <Button variant="travel" size="lg" className="w-full">
                  <SearchIcon className="w-5 h-5" />
                  Pesquisar
                </Button>

                {/* Resultados simulados */}
                <div className="space-y-4">
                  <h3 className="font-semibold">Opções disponíveis:</h3>
                  
                  {[
                    {
                      name: "Bike Express",
                      type: "Bicicleta urbana",
                      price: "R$ 15/dia",
                      rating: 4.8,
                      distance: "200m",
                      features: ["Capacete incluso", "GPS integrado", "Seguro básico"]
                    },
                    {
                      name: "City Wheels",
                      type: "Bike elétrica",
                      price: "R$ 35/dia",
                      rating: 4.9,
                      distance: "350m",
                      features: ["Autonomia 50km", "Carregador portátil", "App de rastreamento"]
                    },
                    {
                      name: "Eco Ride",
                      type: "Patinete elétrico",
                      price: "R$ 25/dia",
                      rating: 4.6,
                      distance: "180m",
                      features: ["Dobrável", "Autonomia 25km", "Peso máx 100kg"]
                    }
                  ].map((rental, index) => (
                    <Card key={index} className="shadow-card hover:shadow-elevated transition-all">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold">{rental.name}</h4>
                            <p className="text-sm text-muted-foreground">{rental.type}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-travel-blue">{rental.price}</p>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <span>⭐ {rental.rating}</span>
                              <span>• {rental.distance}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-3">
                          {rental.features.map((feature, featureIndex) => (
                            <span 
                              key={featureIndex}
                              className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button variant="travel" size="sm" className="flex-1">
                            Reservar
                          </Button>
                          <Button variant="outline" size="sm">
                            Ver detalhes
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Informações adicionais */}
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <ClockIcon className="w-4 h-4" />
                      Horários
                    </h4>
                    <div className="text-sm space-y-1">
                      <p>🚌 Ônibus: 05:00 - 00:30</p>
                      <p>🚇 Metrô: 04:40 - 00:15</p>
                      <p>🚲 Bikes: 24h disponível</p>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">💳 Pagamento</h4>
                    <div className="text-sm space-y-1">
                      <p>• Cartão de transporte</p>
                      <p>• PIX e cartão</p>
                      <p>• Apps móveis</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Transporte;