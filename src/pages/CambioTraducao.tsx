import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCardIcon, LanguagesIcon, ArrowRightLeftIcon, RefreshCwIcon, VolumeXIcon } from "lucide-react";

const CambioTraducao = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Câmbio & Tradutor
          </h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Conversor de moedas */}
            <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCardIcon className="w-5 h-5 text-primary" />
                  Conversor de moedas
                </CardTitle>
                <CardDescription>
                  Converta valores entre diferentes moedas com taxas atualizadas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    De
                  </label>
                  <Select defaultValue="BRL">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">🇧🇷 Real Brasileiro (BRL)</SelectItem>
                      <SelectItem value="USD">🇺🇸 Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">🇪🇺 Euro (EUR)</SelectItem>
                      <SelectItem value="GBP">🇬🇧 Libra Esterlina (GBP)</SelectItem>
                      <SelectItem value="JPY">🇯🇵 Iene Japonês (JPY)</SelectItem>
                      <SelectItem value="CAD">🇨🇦 Dólar Canadense (CAD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-center">
                  <Button variant="outline" size="icon" className="rounded-full">
                    <ArrowRightLeftIcon className="w-4 h-4" />
                  </Button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Para
                  </label>
                  <Select defaultValue="USD">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">🇺🇸 Dólar Americano (USD)</SelectItem>
                      <SelectItem value="EUR">🇪🇺 Euro (EUR)</SelectItem>
                      <SelectItem value="BRL">🇧🇷 Real Brasileiro (BRL)</SelectItem>
                      <SelectItem value="GBP">🇬🇧 Libra Esterlina (GBP)</SelectItem>
                      <SelectItem value="JPY">🇯🇵 Iene Japonês (JPY)</SelectItem>
                      <SelectItem value="CAD">🇨🇦 Dólar Canadense (CAD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Valor
                  </label>
                  <Input 
                    type="number" 
                    defaultValue="100" 
                    placeholder="Digite o valor"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="travel" className="flex-1">
                    <CreditCardIcon className="w-4 h-4" />
                    Converter
                  </Button>
                  <Button variant="outline">
                    <RefreshCwIcon className="w-4 h-4" />
                    Atualizar taxas
                  </Button>
                </div>

                {/* Resultado */}
                <div className="bg-gradient-card p-4 rounded-lg border">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">R$ 100,00 equivale a</p>
                    <p className="text-2xl font-bold text-travel-blue">$ 19.45</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Taxa: 1 BRL = 0.1945 USD
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Atualizado há 5 min
                    </p>
                  </div>
                </div>

                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
                  💡 As taxas são indicativas. Consulte sua instituição financeira para valores exatos.
                </div>
              </CardContent>
            </Card>

            {/* Frases úteis */}
            <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LanguagesIcon className="w-5 h-5 text-primary" />
                  Frases úteis
                </CardTitle>
                <CardDescription>
                  Traduções essenciais para sua viagem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Idioma
                  </label>
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">🇺🇸 Inglês</SelectItem>
                      <SelectItem value="es">🇪🇸 Espanhol</SelectItem>
                      <SelectItem value="fr">🇫🇷 Francês</SelectItem>
                      <SelectItem value="de">🇩🇪 Alemão</SelectItem>
                      <SelectItem value="it">🇮🇹 Italiano</SelectItem>
                      <SelectItem value="pt">🇵🇹 Português</SelectItem>
                      <SelectItem value="ja">🇯🇵 Japonês</SelectItem>
                      <SelectItem value="ko">🇰🇷 Coreano</SelectItem>
                      <SelectItem value="zh">🇨🇳 Chinês</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button variant="outline" className="w-full">
                  <LanguagesIcon className="w-4 h-4" />
                  Mostrar frases
                </Button>

                {/* Lista de frases */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-sm">Frases essenciais:</h3>
                  
                  {[
                    { pt: "Olá", en: "Hello", audio: true },
                    { pt: "Por favor", en: "Please", audio: true },
                    { pt: "Obrigado(a)", en: "Thank you", audio: true },
                    { pt: "Desculpe", en: "Excuse me", audio: true },
                    { pt: "Onde fica...?", en: "Where is...?", audio: true },
                    { pt: "Quanto custa?", en: "How much does it cost?", audio: true },
                    { pt: "Eu não falo inglês", en: "I don't speak English", audio: true },
                    { pt: "Você pode me ajudar?", en: "Can you help me?", audio: true },
                    { pt: "Onde é o banheiro?", en: "Where is the bathroom?", audio: true },
                    { pt: "A conta, por favor", en: "The bill, please", audio: true }
                  ].map((phrase, index) => (
                    <div key={index} className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="text-sm font-medium">{phrase.pt}</p>
                          <p className="text-xs text-muted-foreground">{phrase.en}</p>
                        </div>
                        <Button variant="ghost" size="icon" className="w-8 h-8">
                          <VolumeXIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded">
                  🔊 Clique no ícone de som para ouvir a pronúncia
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

export default CambioTraducao;