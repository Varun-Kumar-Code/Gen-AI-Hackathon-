import { Heart, Star, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types/types";
import { Link } from "wouter";
import { productService } from "@/services/productService";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const favoriteToggle = useMutation({
    mutationFn: async (productId: string) => {
      const result = await productService.toggleFavorite(productId);
      if (!result) {
        throw new Error("Failed to toggle favorite");
      }
      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      const isFavorited = !product.isFavorite;
      toast({
        title: isFavorited ? "Added to Favorites!" : "Removed from Favorites",
        description: isFavorited 
          ? `${product.name} has been added to your favorites.` 
          : `${product.name} has been removed from your favorites.`,
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update favorite status",
        variant: "destructive",
      });
    },
  });

  const handleToggleFavorite = () => {
    favoriteToggle.mutate(product.id);
  };

  const formatPrice = (price: number) => {
    return `₹${price}`;
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <StarIcon
        key={index}
        className={`w-3 h-3 ${
          index < rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <Link href={`/product/${product.id}`} className="block">
      <Card className="product-card bg-card rounded-xl overflow-hidden shadow-sm cursor-pointer hover:shadow-md transition-shadow">
        <div className="relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-40 object-cover"
            data-testid={`img-product-${product.id}`}
          />
          <Button
            variant="ghost"
            size="icon"
            className={`favorite-btn absolute top-3 right-3 w-8 h-8 backdrop-blur-sm rounded-full transition-all duration-200 ${
              product.isFavorite
                ? "bg-red-500/20 hover:bg-red-500/30 border border-red-500/30"
                : "bg-background/80 hover:bg-background border border-border/50"
            }`}
            onClick={e => { e.preventDefault(); handleToggleFavorite(); }}
            disabled={favoriteToggle.isPending}
            data-testid={`button-favorite-${product.id}`}
          >
            <Heart
              className={`w-4 h-4 transition-colors duration-200 ${
                product.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground hover:text-red-400"
              }`}
            />
          </Button>
        </div>
        <CardContent className="p-3">
          <div className="flex items-center gap-1 mb-2">
            <div className="flex" data-testid={`rating-${product.id}`}>
              {renderStars(product.rating)}
            </div>
          </div>
          <h3 
            className="font-medium text-sm text-foreground mb-1"
            data-testid={`text-name-${product.id}`}
          >
            {product.name}
          </h3>
          <p 
            className="text-xs text-muted-foreground mb-2"
            data-testid={`text-description-${product.id}`}
          >
            {product.description}
          </p>
          <p 
            className="text-sm font-semibold text-foreground"
            data-testid={`text-price-${product.id}`}
          >
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
