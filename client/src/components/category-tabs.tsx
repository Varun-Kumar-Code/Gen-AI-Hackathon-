import { Button } from "@/components/ui/button";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = ["All", "Pottery", "Ceramic", "Glaze"];

  return (
    <div className="mb-6 md:mb-8">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground mb-4 md:mb-6 text-center md:text-left">
        Discover products
      </h2>
      <div className="flex gap-2 md:gap-3 lg:gap-4 overflow-x-auto md:justify-center lg:justify-start [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "secondary"}
            className={`category-tab px-6 py-2 md:px-8 md:py-3 lg:px-10 lg:py-3 rounded-full text-sm md:text-base lg:text-lg font-medium whitespace-nowrap transition-all ${
              activeCategory === category
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
            onClick={() => onCategoryChange(category)}
            data-testid={`button-category-${category.toLowerCase()}`}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
