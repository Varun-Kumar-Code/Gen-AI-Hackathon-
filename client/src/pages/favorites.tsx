import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Heart, 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Search,
  Filter,
  Grid3x3,
  List,
  ShoppingCart,
  Share,
  Trash2
} from "lucide-react";
import { ChatBotButton } from "@/components/chat-bot-button";

const favoriteProducts = [
  {
    id: 1,
    name: "Luxury Paris Tour",
    location: "Paris, France",
    price: 1299,
    originalPrice: 1599,
    rating: 4.8,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=400&q=80",
    category: "Tours",
    duration: "5 Days",
    groupSize: "12 People",
    discount: 19,
    isOnSale: true,
    description: "Experience the romance of Paris with guided tours of iconic landmarks"
  },
  {
    id: 2,
    name: "Mountain Adventure Backpack",
    location: "Outdoor Gear",
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=400&q=80",
    category: "Gear",
    duration: "Premium Quality",
    groupSize: "Solo Travel",
    discount: 25,
    isOnSale: true,
    description: "Professional hiking backpack with weather-resistant materials"
  },
  {
    id: 3,
    name: "Tropical Beach Resort",
    location: "Bali, Indonesia",
    price: 89,
    originalPrice: 129,
    rating: 4.9,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=400&q=80",
    category: "Hotels",
    duration: "Per Night",
    groupSize: "2 Guests",
    discount: 31,
    isOnSale: true,
    description: "Luxury beachfront resort with stunning ocean views and spa"
  },
  {
    id: 4,
    name: "Northern Lights Expedition",
    location: "Iceland",
    price: 899,
    originalPrice: 999,
    rating: 4.7,
    reviews: 167,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=400&q=80",
    category: "Tours",
    duration: "3 Days",
    groupSize: "8 People",
    discount: 10,
    isOnSale: false,
    description: "Chase the magical Northern Lights in Iceland's pristine wilderness"
  },
  {
    id: 5,
    name: "Professional Camera Kit",
    location: "Photography",
    price: 549,
    originalPrice: 699,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=400&q=80",
    category: "Gear",
    duration: "Complete Set",
    groupSize: "Travel Ready",
    discount: 21,
    isOnSale: true,
    description: "Complete travel photography kit with camera, lenses, and accessories"
  },
  {
    id: 6,
    name: "Safari Adventure Kenya",
    location: "Nairobi, Kenya",
    price: 1799,
    originalPrice: 2199,
    rating: 4.9,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&w=400&q=80",
    category: "Tours",
    duration: "7 Days",
    groupSize: "6 People",
    discount: 18,
    isOnSale: true,
    description: "Ultimate African safari experience with luxury accommodations"
  }
];

const categories = ["All", "Tours", "Hotels", "Gear", "Flights"];

export default function Favorites() {
  const [favorites, setFavorites] = useState(favoriteProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("name");

  const removeFavorite = (id: number) => {
    setFavorites(favorites.filter(item => item.id !== id));
  };

  const filteredFavorites = favorites
    .filter(item => 
      (selectedCategory === "All" || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "price": return a.price - b.price;
        case "rating": return b.rating - a.rating;
        case "name": return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">My Favorites</h1>
              <p className="text-muted-foreground mt-1">{favorites.length} items saved</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid3x3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search favorites..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 border rounded-md bg-background text-foreground"
              >
                <option value="name">Sort by Name</option>
                <option value="price">Sort by Price</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>

          {/* Favorites Grid/List */}
          {filteredFavorites.length === 0 ? (
            <div className="text-center py-16">
              <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No favorites found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "All" 
                  ? "Try adjusting your search or filters" 
                  : "Start adding items to your favorites"}
              </p>
            </div>
          ) : (
            <div className={viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-4"
            }>
              {filteredFavorites.map((item) => (
                <Card 
                  key={item.id} 
                  className={`overflow-hidden hover:shadow-lg transition-shadow group ${
                    viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-full sm:w-48 flex-shrink-0 h-40 sm:h-auto" : "h-48"}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.isOnSale && (
                      <Badge className="absolute top-2 left-2 bg-destructive text-destructive-foreground">
                        -{item.discount}% OFF
                      </Badge>
                    )}
                    <Badge className="absolute top-2 right-2 bg-primary/20 text-primary">
                      {item.category}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute bottom-2 right-2 bg-background/80 hover:bg-background text-destructive hover:text-destructive"
                      onClick={() => removeFavorite(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <CardContent className="p-4 flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground line-clamp-1 flex-1 min-w-0">{item.name}</h3>
                      <Button variant="ghost" size="icon" className="text-muted-foreground flex-shrink-0 ml-2">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-1 text-muted-foreground text-sm mb-2">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {item.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{item.groupSize}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 flex-shrink-0" />
                        <span className="font-medium">{item.rating}</span>
                        <span className="text-muted-foreground">({item.reviews})</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">${item.price}</span>
                        {item.originalPrice > item.price && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                      <Button className="bg-primary hover:bg-primary/90 flex-shrink-0 w-full sm:w-auto">
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        <span className="hidden sm:inline">Add to Cart</span>
                        <span className="sm:hidden">Cart</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
      <ChatBotButton />
    </div>
  );
}
