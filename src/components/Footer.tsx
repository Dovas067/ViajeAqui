import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© 2025 ViajeAqui</span>
            <span></span>
            <span></span>
          </div>
          <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
            <span>Feito com</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>para viajantes</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;