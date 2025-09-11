import { Button } from "@/components/ui/button";
import { 
  MapIcon, 
  RouteIcon, 
  ClockIcon, 
  BookIcon, 
  UsersIcon, 
  CreditCardIcon, 
  CheckSquareIcon, 
  CarIcon, 
  WifiOffIcon,
  MenuIcon
} from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Início", icon: null, active: true, path: "/" },
    { label: "Mapa", icon: MapIcon, path: "/mapa" },
    { label: "Roteiros", icon: RouteIcon, path: "/roteiros" },
    { label: "Tempo Real", icon: ClockIcon, path: "/tempo-real" },
    { label: "Guia Local", icon: BookIcon, path: "/guia-local" },
    { label: "Comunidade", icon: UsersIcon, path: "/comunidade" },
    { label: "Câmbio & Tradução", icon: CreditCardIcon, path: "/cambio-traducao" },
    { label: "Checklist", icon: CheckSquareIcon, path: "/checklist" },
    { label: "Transporte", icon: CarIcon, path: "/transporte" },
    { label: "Modo Offline", icon: WifiOffIcon, path: "/modo-offline" },
  ];

  return (
    <header className="bg-gradient-hero shadow-elevated sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <MapIcon className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">ViajeAqui</h1>
          </div>

          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Button
                  key={index}
                  variant={isActive ? "accent" : "ghost"}
                  size="sm"
                  className={`
                    ${isActive 
                      ? "bg-white/20 text-white hover:bg-white/30" 
                      : "text-white/80 hover:text-white hover:bg-white/10"
                    }
                    transition-all duration-200
                  `}
                  asChild
                >
                  <Link to={item.path}>
                    {Icon && <Icon className="w-4 h-4" />}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <MenuIcon className="w-5 h-5" />
          </Button>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/20">
            <nav className="grid grid-cols-2 gap-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Button
                    key={index}
                    variant={isActive ? "accent" : "ghost"}
                    size="sm"
                    className={`
                      ${isActive 
                        ? "bg-white/20 text-white" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                      }
                      justify-start
                    `}
                    asChild
                  >
                    <Link to={item.path}>
                      {Icon && <Icon className="w-4 h-4" />}
                      {item.label}
                    </Link>
                  </Button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;