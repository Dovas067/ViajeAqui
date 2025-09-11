import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RouteIcon, CalendarIcon, DollarSignIcon, UserIcon, DownloadIcon } from "lucide-react";

const Roteiros = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Roteiros personalizados
          </h1>

          <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RouteIcon className="w-5 h-5 text-primary" />
                Criar seu roteiro ideal
              </CardTitle>
              <CardDescription>
                Personalize sua viagem com base nos seus interesses e orçamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Quantos dias */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <CalendarIcon className="w-4 h-4 inline mr-1" />
                  Quantos dias?
                </label>
                <Input 
                  type="number" 
                  defaultValue="3" 
                  min="1" 
                  max="30"
                  className="max-w-xs"
                />
              </div>

              {/* Interesses */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Interesses
                </label>
                <Textarea 
                  placeholder="natureza&#10;cultura&#10;gastronomia&#10;esportes"
                  className="h-32 resize-none"
                  defaultValue="natureza&#10;cultura&#10;gastronomia&#10;esportes"
                />
              </div>

              {/* Orçamento */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <DollarSignIcon className="w-4 h-4 inline mr-1" />
                  Orçamento (por dia, em moeda local)
                </label>
                <Input 
                  type="number" 
                  placeholder="Ex: 300" 
                  className="max-w-xs"
                />
              </div>

              {/* Estilo de viagem */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <UserIcon className="w-4 h-4 inline mr-1" />
                  Estilo de viagem
                </label>
                <Select defaultValue="calmo">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione seu estilo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="calmo">Calmo</SelectItem>
                    <SelectItem value="aventureiro">Aventureiro</SelectItem>
                    <SelectItem value="cultural">Cultural</SelectItem>
                    <SelectItem value="gastronomico">Gastronômico</SelectItem>
                    <SelectItem value="economico">Econômico</SelectItem>
                    <SelectItem value="luxo">Luxo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Botões */}
              <div className="space-y-3 pt-4">
                <Button variant="travel" size="lg" className="w-full">
                  <RouteIcon className="w-5 h-5" />
                  Gerar roteiro
                </Button>
                <Button variant="outline" size="lg" className="w-full">
                  <DownloadIcon className="w-5 h-5" />
                  Baixar roteiro (.txt)
                </Button>
              </div>

              {/* Resultado */}
              <Card className="mt-8 bg-muted/30">
                <CardHeader>
                  <CardTitle className="text-lg">Seu roteiro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-8">
                    Preencha o formulário para gerar.
                  </p>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Roteiros;