import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  WifiOffIcon, 
  DownloadIcon, 
  SmartphoneIcon, 
  MapIcon, 
  SaveIcon,
  CheckCircleIcon,
  InfoIcon
} from "lucide-react";

const ModoOffline = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Modo Offline
          </h1>

          <div className="grid gap-8">
            {/* Informações sobre PWA */}
            <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <WifiOffIcon className="w-5 h-5 text-primary" />
                  Funcionalidade Offline
                </CardTitle>
                <CardDescription>
                  Este app funciona offline (PWA). Abra as seções que deseja usar sem internet para armazená-las em cache. 
                  O mapa tenta guardar os últimos blocos vistos.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-gradient-to-r from-travel-blue/10 to-travel-blue-light/10 p-6 rounded-lg border border-travel-blue/20">
                  <h3 className="font-semibold text-travel-blue-dark mb-4 flex items-center gap-2">
                    <SmartphoneIcon className="w-5 h-5" />
                    Progressive Web App (PWA)
                  </h3>
                  <p className="text-sm text-travel-blue-dark mb-4">
                    O ViajeAqui é um Progressive Web App que pode ser instalado em seu dispositivo 
                    e funcionar mesmo sem conexão com a internet.
                  </p>
                  
                  <Button variant="travel" size="lg" className="w-full">
                    <DownloadIcon className="w-5 h-5" />
                    Instalar app
                  </Button>
                </div>

                {/* Como funciona */}
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <InfoIcon className="w-5 h-5 text-primary" />
                    Como funciona o modo offline
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      {
                        icon: MapIcon,
                        title: "Mapas em cache",
                        description: "Áreas visualizadas ficam salvas automaticamente"
                      },
                      {
                        icon: SaveIcon,
                        title: "Dados locais",
                        description: "Informações importantes são armazenadas no dispositivo"
                      },
                      {
                        icon: CheckCircleIcon,
                        title: "Funcionalidades básicas",
                        description: "Checklist, roteiros e conversor funcionam offline"
                      },
                      {
                        icon: WifiOffIcon,
                        title: "Sem internet necessária",
                        description: "Use suas ferramentas favoritas em qualquer lugar"
                      }
                    ].map((feature, index) => {
                      const Icon = feature.icon;
                      return (
                        <div key={index} className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Instruções de instalação */}
                <div>
                  <h3 className="font-semibold mb-4">📱 Como instalar</h3>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🤖 Android (Chrome)</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Toque no menu (⋮) do navegador</li>
                        <li>Selecione "Adicionar à tela inicial"</li>
                        <li>Confirme a instalação</li>
                        <li>O app aparecerá como ícone na tela inicial</li>
                      </ol>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🍎 iOS (Safari)</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Toque no botão de compartilhar (□↗)</li>
                        <li>Role para baixo e toque em "Adicionar à Tela de Início"</li>
                        <li>Confirme o nome do app</li>
                        <li>Toque em "Adicionar"</li>
                      </ol>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold text-sm mb-2">🖥️ Desktop (Chrome/Edge)</h4>
                      <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
                        <li>Procure pelo ícone de instalação na barra de endereço</li>
                        <li>Clique em "Instalar ViajeAqui"</li>
                        <li>O app será adicionado como programa instalado</li>
                      </ol>
                    </div>
                  </div>
                </div>

                {/* Status offline */}
                <div className="bg-travel-success/10 border border-travel-success/20 p-4 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="w-6 h-6 text-travel-success" />
                    <div>
                      <h4 className="font-semibold text-travel-success">App pronto para uso offline</h4>
                      <p className="text-sm text-travel-success/80">
                        Recursos básicos estão disponíveis mesmo sem internet
                      </p>
                    </div>
                  </div>
                </div>

                {/* Limitações */}
                <div className="bg-travel-warning/10 border border-travel-warning/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-travel-warning mb-2">⚠️ Limitações do modo offline</h4>
                  <ul className="text-sm text-travel-warning/80 space-y-1 list-disc list-inside">
                    <li>Informações de clima precisam de internet</li>
                    <li>Conversão de moedas usa taxas em cache</li>
                    <li>Mapas mostram apenas áreas já visualizadas</li>
                    <li>Comunidade e alertas não funcionam offline</li>
                  </ul>
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

export default ModoOffline;