import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UsersIcon, CameraIcon, SendIcon, ImageIcon, HeartIcon, MessageCircleIcon, ShareIcon } from "lucide-react";

const Comunidade = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Comunidade & dicas
          </h1>

          <div className="grid gap-8">
            {/* Formulário de nova dica */}
            <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UsersIcon className="w-5 h-5 text-primary" />
                  Compartilhe sua experiência
                </CardTitle>
                <CardDescription>
                  Ajude outros viajantes compartilhando suas dicas e descobertas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Seu nome (opcional)
                  </label>
                  <Input 
                    placeholder="Ex: Ana" 
                    className="max-w-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Sua dica
                  </label>
                  <Textarea 
                    placeholder="Escreva sua dica de viagem..."
                    className="h-32 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Foto (opcional)
                  </label>
                  <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Clique para escolher uma foto ou arraste aqui
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      PNG, JPG até 5MB
                    </p>
                  </div>
                </div>

                <Button variant="travel" size="lg" className="w-full">
                  <SendIcon className="w-5 h-5" />
                  Publicar
                </Button>
              </CardContent>
            </Card>

            {/* Feed de dicas */}
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle>Feed</CardTitle>
                <CardDescription>
                  Dicas compartilhadas pela comunidade
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Post 1 */}
                  <div className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center text-white font-semibold">
                        M
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">Maria</h4>
                          <span className="text-xs text-muted-foreground">há 2 horas</span>
                        </div>
                        <p className="text-sm text-foreground mb-3">
                          Descobri um café incrível escondido no centro histórico! O cappuccino é perfeito e os pastéis de nata são os melhores que já provei. Fica na Rua das Flores, 123. Super recomendo! ☕️
                        </p>
                        <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-orange-200 rounded-lg flex items-center justify-center mb-3">
                          <CameraIcon className="w-8 h-8 text-amber-600" />
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <HeartIcon className="w-4 h-4" />
                            <span>12</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>3</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <ShareIcon className="w-4 h-4" />
                            <span>Compartilhar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post 2 */}
                  <div className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-travel-blue to-travel-blue-light rounded-full flex items-center justify-center text-white font-semibold">
                        J
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">João</h4>
                          <span className="text-xs text-muted-foreground">há 5 horas</span>
                        </div>
                        <p className="text-sm text-foreground mb-3">
                          Dica importante: evitem o transporte público entre 17h-19h. O trânsito fica caótico! Melhor explorar a pé ou esperar passar o rush. A cidade é linda para caminhar mesmo! 🚶‍♂️
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <HeartIcon className="w-4 h-4" />
                            <span>24</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>8</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <ShareIcon className="w-4 h-4" />
                            <span>Compartilhar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post 3 */}
                  <div className="border-b border-border pb-6 last:border-b-0">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-travel-accent to-yellow-400 rounded-full flex items-center justify-center text-white font-semibold">
                        A
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">Ana</h4>
                          <span className="text-xs text-muted-foreground">ontem</span>
                        </div>
                        <p className="text-sm text-foreground mb-3">
                          Encontrei um mirante secreto com vista incrível! 📍 Coordenadas: -23.5505, -46.6333. Vale muito a pena a subida de 20 minutos. Melhor horário é no pôr do sol! 🌅
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <HeartIcon className="w-4 h-4" />
                            <span>67</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <MessageCircleIcon className="w-4 h-4" />
                            <span>15</span>
                          </button>
                          <button className="flex items-center gap-1 hover:text-travel-blue transition-colors">
                            <ShareIcon className="w-4 h-4" />
                            <span>Compartilhar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center pt-6">
                  <Button variant="outline">
                    Carregar mais dicas
                  </Button>
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

export default Comunidade;