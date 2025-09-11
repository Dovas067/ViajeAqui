import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ClockIcon, CloudIcon, BellIcon, AlertTriangleIcon, TagIcon } from "lucide-react";

const TempoReal = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Informações em tempo real
          </h1>

          <div className="grid gap-8">
            {/* Clima */}
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CloudIcon className="w-5 h-5 text-travel-blue" />
                  Clima
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-travel-blue/10 rounded-full flex items-center justify-center">
                      <CloudIcon className="w-8 h-8 text-travel-blue" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">25°C</p>
                      <p className="text-muted-foreground">Parcialmente nublado</p>
                      <p className="text-sm text-muted-foreground">Sensação térmica: 27°C</p>
                    </div>
                  </div>
                  <Button variant="travel">
                    <ClockIcon className="w-4 h-4" />
                    Ver previsão (48h)
                  </Button>
                </div>

                {/* Previsão estendida */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { time: "Agora", temp: "25°", icon: "☁️" },
                    { time: "15:00", temp: "27°", icon: "☀️" },
                    { time: "18:00", temp: "24°", icon: "🌤️" },
                    { time: "21:00", temp: "22°", icon: "🌙" }
                  ].map((forecast, index) => (
                    <div key={index} className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-sm text-muted-foreground">{forecast.time}</p>
                      <p className="text-2xl my-1">{forecast.icon}</p>
                      <p className="font-semibold">{forecast.temp}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Alertas & Ofertas */}
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BellIcon className="w-5 h-5 text-travel-warning" />
                  Alertas & Ofertas
                </CardTitle>
                <CardDescription>
                  Use as notificações para avisar sobre fechamentos, greves e promoções próximas.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Exemplo de alerta */}
                  <div className="border border-travel-warning/20 bg-travel-warning/5 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangleIcon className="w-5 h-5 text-travel-warning mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-travel-warning">Alerta de Trânsito</h4>
                        <p className="text-sm text-muted-foreground">
                          Manifestação no centro da cidade entre 14h-18h. Evite a região.
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Há 2 horas</p>
                      </div>
                    </div>
                  </div>

                  {/* Exemplo de oferta */}
                  <div className="border border-travel-success/20 bg-travel-success/5 p-4 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TagIcon className="w-5 h-5 text-travel-success mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-travel-success">Promoção Especial</h4>
                        <p className="text-sm text-muted-foreground">
                          Restaurante XYZ: 30% de desconto até meia-noite!
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">Há 1 hora</p>
                      </div>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <BellIcon className="w-4 h-4" />
                    Enviar alerta de exemplo
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Informações adicionais */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.6s" }}>
                <CardHeader>
                  <CardTitle className="text-lg">Transporte Público</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Metrô - Linha 1</span>
                      <span className="text-xs bg-travel-success/20 text-travel-success px-2 py-1 rounded">Normal</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Ônibus - Centro</span>
                      <span className="text-xs bg-travel-warning/20 text-travel-warning px-2 py-1 rounded">Lento</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.8s" }}>
                <CardHeader>
                  <CardTitle className="text-lg">Eventos Próximos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm font-medium">Festival de Música</p>
                      <p className="text-xs text-muted-foreground">Hoje, 20h - Parque Central</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Feira de Artesanato</p>
                      <p className="text-xs text-muted-foreground">Amanhã, 9h - Praça da Sé</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TempoReal;