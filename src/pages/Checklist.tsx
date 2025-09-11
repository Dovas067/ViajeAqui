import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckSquareIcon, PlusIcon, CalendarIcon, TrashIcon, CheckIcon } from "lucide-react";
import { useState } from "react";

const Checklist = () => {
  const [items, setItems] = useState([
    { id: 1, text: "Passaporte válido", checked: true, deadline: "2025-01-15" },
    { id: 2, text: "Visto (se necessário)", checked: false, deadline: "2025-01-10" },
    { id: 3, text: "Seguro viagem", checked: false, deadline: "2025-01-12" },
    { id: 4, text: "Reserva do hotel", checked: true, deadline: "2025-01-08" },
    { id: 5, text: "Passagens aéreas", checked: true, deadline: "2025-01-05" },
  ]);

  const [newItem, setNewItem] = useState("");
  const [newDeadline, setNewDeadline] = useState("");

  const addItem = () => {
    if (newItem.trim()) {
      setItems([...items, {
        id: Date.now(),
        text: newItem,
        checked: false,
        deadline: newDeadline
      }]);
      setNewItem("");
      setNewDeadline("");
    }
  };

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const clearCompleted = () => {
    setItems(items.filter(item => !item.checked));
  };

  const completedCount = items.filter(item => item.checked).length;
  const totalCount = items.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-8 animate-fade-in">
            Checklist de viagem
          </h1>

          <div className="grid gap-8">
            {/* Estatísticas */}
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                      <CheckSquareIcon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">{completedCount}/{totalCount}</h3>
                      <p className="text-muted-foreground">Itens concluídos</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-20 h-20 relative">
                      <div className="w-full h-full bg-muted rounded-full"></div>
                      <div 
                        className="absolute inset-0 bg-primary rounded-full"
                        style={{
                          clipPath: `inset(0 ${100 - (completedCount / totalCount) * 100}% 0 0)`
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-sm font-bold">
                          {totalCount ? Math.round((completedCount / totalCount) * 100) : 0}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Adicionar novo item */}
            <Card className="shadow-elevated animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PlusIcon className="w-5 h-5 text-primary" />
                  Novo item
                </CardTitle>
                <CardDescription>
                  Adicione itens importantes para sua viagem
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Input 
                    placeholder="Passaporte, carregador, seguro, vacina..."
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addItem()}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <CalendarIcon className="w-4 h-4 inline mr-1" />
                    Data limite
                  </label>
                  <Input 
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="max-w-xs"
                  />
                </div>

                <div className="flex gap-3">
                  <Button variant="travel" onClick={addItem} className="flex-1">
                    <PlusIcon className="w-4 h-4" />
                    Adicionar
                  </Button>
                  <Button variant="outline" onClick={clearCompleted}>
                    <TrashIcon className="w-4 h-4" />
                    Limpar todos
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Lista de itens */}
            <Card className="shadow-card animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <CardHeader>
                <CardTitle>Sua lista</CardTitle>
                <CardDescription>
                  Organize e acompanhe o progresso dos preparativos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {items.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckSquareIcon className="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>Nenhum item na lista</p>
                      <p className="text-sm">Adicione itens importantes para sua viagem</p>
                    </div>
                  ) : (
                    items.map((item) => (
                      <div 
                        key={item.id}
                        className={`flex items-center gap-4 p-3 rounded-lg border transition-all ${
                          item.checked 
                            ? 'bg-travel-success/5 border-travel-success/20' 
                            : 'bg-card border-border hover:shadow-card'
                        }`}
                      >
                        <Checkbox 
                          checked={item.checked}
                          onCheckedChange={() => toggleItem(item.id)}
                          className="data-[state=checked]:bg-travel-success data-[state=checked]:border-travel-success"
                        />
                        
                        <div className="flex-1">
                          <p className={`font-medium ${
                            item.checked 
                              ? 'text-muted-foreground line-through' 
                              : 'text-foreground'
                          }`}>
                            {item.text}
                          </p>
                          {item.deadline && (
                            <p className="text-xs text-muted-foreground">
                              <CalendarIcon className="w-3 h-3 inline mr-1" />
                              {new Date(item.deadline).toLocaleDateString('pt-BR')}
                            </p>
                          )}
                        </div>

                        {item.checked && (
                          <div className="flex items-center gap-2 text-travel-success">
                            <CheckIcon className="w-4 h-4" />
                            <span className="text-xs font-medium">Concluído</span>
                          </div>
                        )}

                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>

                {/* Dicas */}
                {items.length > 0 && (
                  <div className="mt-6 bg-travel-blue/5 border border-travel-blue/20 p-4 rounded-lg">
                    <h4 className="font-semibold text-travel-blue-dark mb-2">💡 Dicas importantes:</h4>
                    <ul className="text-sm text-travel-blue-dark space-y-1">
                      <li>• Verifique a validade do passaporte (mínimo 6 meses)</li>
                      <li>• Confirme se precisa de visto para o destino</li>
                      <li>• Contrate seguro viagem com cobertura adequada</li>
                      <li>• Faça cópias digitais dos documentos importantes</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Checklist;