import { Heart, Star, StarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@shared/schema";
import { Link } from "wouter";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleFavoriteMutation = useMutation({
    mutationFn: async (productId: string) => {
      const response = await apiRequest("PATCH", `/api/products/${productId}/favorite`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/products"] });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to toggle favorite",
        variant: "destructive",
      });
    },
  });

  const handleToggleFavorite = () => {
    toggleFavoriteMutation.mutate(product.id);
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
            className="favorite-btn absolute top-3 right-3 w-8 h-8 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background"
            onClick={e => { e.preventDefault(); handleToggleFavorite(); }}
            disabled={toggleFavoriteMutation.isPending}
            data-testid={`button-favorite-${product.id}`}
          >
            <Heart
              className={`w-4 h-4 ${
                product.isFavorite
                  ? "fill-red-500 text-red-500"
                  : "text-muted-foreground"
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
