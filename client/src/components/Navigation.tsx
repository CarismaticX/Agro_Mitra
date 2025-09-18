import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MessageSquare, Camera, CloudSun, TrendingUp, Home, Menu } from "lucide-react";
import { useState } from "react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'advisory', label: 'AI Advisory', icon: MessageSquare },
    { id: 'pest-detection', label: 'Pest Detection', icon: Camera },
    { id: 'weather', label: 'Weather', icon: CloudSun },
    { id: 'market', label: 'Market Prices', icon: TrendingUp },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-card border-b">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-xl font-bold text-primary">Krishi Ratna</h1>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
        
        {isMenuOpen && (
          <Card className="mx-4 mb-4 p-2">
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? "default" : "ghost"}
                    className="flex items-center gap-2 justify-start"
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </Button>
                );
              })}
            </div>
          </Card>
        )}
      </div>

      {/* Desktop Navigation */}
      <Card className="hidden md:block fixed left-4 top-4 bottom-4 w-64 p-6 z-40">
        <h1 className="text-2xl font-bold text-primary mb-8">Krishi Ratna</h1>
        
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? "default" : "ghost"}
                className="w-full justify-start gap-3 h-12"
                onClick={() => onPageChange(item.id)}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Button>
            );
          })}
        </nav>
      </Card>
    </>
  );
}