import { Home, Heart, Grid3x3, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation, Link } from "wouter";

export function BottomNavigation() {
  const [location] = useLocation();
  
  const navItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Heart, label: "Favorites", path: "/favorites" },
    { icon: Grid3x3, label: "Categories", path: "/categories" },
    { icon: ShoppingCart, label: "Cart", path: "/cart" },
    { icon: User, label: "Profile", path: "/user" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 mb-2.5 ml-2.5 mr-2.5 md:mb-0 md:ml-0 md:mr-0 md:left-1/2 md:transform md:-translate-x-1/2 md:w-full md:max-w-sm md:max-w-md lg:max-w-lg backdrop-blur-sm bg-background/95 border rounded-2xl md:rounded-t-2xl md:rounded-b-none border-t shadow-lg">
      <div className="flex items-center justify-around py-3 px-4 md:py-4 md:px-6">
        {navItems.map(({ icon: Icon, label, path }) => (
          <Button
            key={path}
            variant="ghost"
            size="icon"
            asChild
            className={`flex flex-col items-center gap-1 p-2 md:p-3 h-auto transition-colors hover:bg-transparent ${
              location === path
                ? "text-orange-700 hover:text-orange-700/80"
                : "text-black dark:text-white hover:text-black/80 dark:hover:text-white/80"
            }`}
            data-testid={`button-nav-${path.slice(1) || 'home'}`}
          >
            <Link href={path}>
              <div className="flex flex-col items-center">
                <Icon className="w-5 h-5 md:w-6 md:h-6" />
                <span className="hidden md:block text-xs lg:text-sm font-medium">{label}</span>
              </div>
            </Link>
          </Button>
        ))}
      </div>
    </nav>
  );
}
