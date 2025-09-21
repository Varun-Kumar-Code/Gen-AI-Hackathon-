import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ChatBotButton } from "@/components/chat-bot-button";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Star, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "wouter";

// Category data with products
const categoryData = [
  {
    title: "Featured Products",
    subtitle: "Best selling items across all categories",
    products: [
      {
        id: 1,
        name: "Executive Office Chair",
        price: 15999,
        originalPrice: 19999,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
        rating: 4.8,
        discount: "20% OFF",
        featured: true
      },
      {
        id: 2,
        name: "Dining Table Set",
        price: 24999,
        originalPrice: 32999,
        image: "https://mywakeup.in/cdn/shop/files/set_main_website_1680_x_1680_cd1d4cf3-96ec-44cd-a0d9-97d998eac976.png?v=1748580984&width=1214",
        rating: 4.6,
        discount: "25% OFF"
      },
      {
        id: 3,
        name: "Cement Bags (50kg)",
        price: 399,
        originalPrice: 450,
        image: "https://firsthammer.co.in/wp-content/uploads/2023/09/ultratech-super-cement-1000x1000-2.webp",
        rating: 4.5,
        discount: "11% OFF"
      },
      {
        id: 4,
        name: "Modern Sofa Set",
        price: 45999,
        originalPrice: 55999,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80",
        rating: 4.9,
        discount: "18% OFF"
      },
      {
        id: 5,
        name: "Steel Rods (12mm)",
        price: 4599,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80",
        rating: 4.4,
        discount: "8% OFF"
      }
    ]
  },
  {
    title: "Office Furniture",
    subtitle: "Professional furniture for modern workspaces",
    products: [
      {
        id: 6,
        name: "Ergonomic Office Chair",
        price: 12999,
        originalPrice: 15999,
        image: "https://images.unsplash.com/photo-1541558869434-2840d308329a?auto=format&fit=crop&w=400&q=80",
        rating: 4.7
      },
      {
        id: 7,
        name: "Executive Desk",
        price: 18999,
        originalPrice: 22999,
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
        rating: 4.5
      },
      {
        id: 8,
        name: "Filing Cabinet",
        price: 7999,
        originalPrice: 9999,
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=400&q=80",
        rating: 4.3
      },
      {
        id: 9,
        name: "Conference Table",
        price: 35999,
        originalPrice: 42999,
        image: "https://www.northern-interiors.ca/cdn/shop/files/Conference_table-transformed.jpg?v=1706243841",
        rating: 4.8
      },
      {
        id: 10,
        name: "Office Bookshelf",
        price: 9999,
        originalPrice: 12999,
        image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&w=400&q=80",
        rating: 4.4
      }
    ]
  },
  {
    title: "Home Furniture",
    subtitle: "Comfortable and stylish furniture for your home",
    products: [
      {
        id: 11,
        name: "King Size Bed",
        price: 29999,
        originalPrice: 39999,
        image: "https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&w=400&q=80",
        rating: 4.9
      },
      {
        id: 12,
        name: "Dining Table (6 Seater)",
        price: 22999,
        originalPrice: 28999,
        image: "https://media-uk.landmarkshops.in/cdn-cgi/image/h=750,w=750,q=85,fit=cover/homecentre/1000012978245-1000012978245-0719_01-2100.jpg",
        rating: 4.6
      },
      {
        id: 13,
        name: "L-Shape Sofa",
        price: 42999,
        originalPrice: 52999,
        image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=80",
        rating: 4.8
      },
      {
        id: 14,
        name: "Wardrobe (3 Door)",
        price: 19999,
        originalPrice: 24999,
        image: "https://www.nilkamalfurniture.com/cdn/shop/files/MWILLY3DWBWOMNWG_06.webp?v=1753176572",
        rating: 4.5
      },
      {
        id: 15,
        name: "Coffee Table",
        price: 8999,
        originalPrice: 11999,
        image: "https://ik.imagekit.io/2xkwa8s1i/img/coffee-tables/java-coffee-table/1.jpg?tr=w-3840",
        rating: 4.7
      }
    ]
  },
  {
    title: "Construction Materials",
    subtitle: "High-quality materials for construction projects",
    products: [
      {
        id: 16,
        name: "Red Bricks (1000 pcs)",
        price: 4999,
        originalPrice: 5499,
        image: "https://t3.ftcdn.net/jpg/05/61/69/58/360_F_561695885_nsjqnCQs0O9vkg78kPY0Pj2r3j5tBwXa.jpg",
        rating: 4.3
      },
      {
        id: 17,
        name: "Portland Cement (50kg)",
        price: 389,
        originalPrice: 420,
        image: "https://youmats-media.s3.me-central-1.amazonaws.com/Y4EF02ILZ/conversions/saudicement1-cropper.webp",
        rating: 4.6
      },
      {
        id: 18,
        name: "Steel TMT Bars (12mm)",
        price: 4599,
        originalPrice: 4999,
        image: "https://images.jdmagicbox.com/quickquotes/images_main/ars-steel-tmt-bar-12-mm-grade-fe-550-d-2220066938-drsgzvcs.jpg",
        rating: 4.7
      },
      {
        id: 19,
        name: "River Sand (1 Ton)",
        price: 1299,
        originalPrice: 1499,
        image: "https://images.jdmagicbox.com/quickquotes/images_main/construction-river-sand-1-ton-2217481392-7f53a3e0.jpg",
        rating: 4.2
      },
      {
        id: 20,
        name: "Concrete Blocks",
        price: 35,
        originalPrice: 40,
        image: "https://www.jkcement.com/wp-content/uploads/2023/08/production-building-blocks-composition-foam-blocks-blocks-construction-isolate-1024x683.webp",
        rating: 4.4
      }
    ]
  },
  {
    title: "Hardware & Tools",
    subtitle: "Essential tools and hardware for construction",
    products: [
      {
        id: 21,
        name: "Power Drill Set",
        price: 3999,
        originalPrice: 4999,
        image: "https://m.media-amazon.com/images/I/71k2eqGU-RL.jpg",
        rating: 4.5
      },
      {
        id: 22,
        name: "Hammer Set (3 pcs)",
        price: 899,
        originalPrice: 1199,
        image: "https://m.media-amazon.com/images/I/61Tvik9--uL._UF1000,1000_QL80_.jpg",
        rating: 4.3
      },
      {
        id: 23,
        name: "Measuring Tape (50m)",
        price: 599,
        originalPrice: 799,
        image: "https://microless.com/cdn/products/afc8b0e94bb03e3fdd03fcc13381ba0c-md.jpg",
        rating: 4.6
      },
      {
        id: 24,
        name: "Spirit Level",
        price: 799,
        originalPrice: 999,
        image: "https://shop.hpalloy.in/wp-content/uploads/2024/05/piritlevel_0.5mm_withoutmagnet_big.jpg",
        rating: 4.4
      },
      {
        id: 25,
        name: "Tool Box (Metal)",
        price: 1999,
        originalPrice: 2499,
        image: "https://m.media-amazon.com/images/I/716cj+SCoVL.jpg",
        rating: 4.7
      }
    ]
  }
];

export default function Categories() {
  const [, setLocation] = useLocation();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [scrollPositions, setScrollPositions] = useState<{ [key: string]: number }>({});

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const scrollCategory = (categoryTitle: string, direction: 'left' | 'right') => {
    const container = document.getElementById(`category-${categoryTitle.replace(/\s+/g, '-').toLowerCase()}`);
    if (!container) return;

    const cardWidth = 288; // Approximate card width including gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
  };

  const ProductCard = ({ product, isFeatured = false }: { product: any, isFeatured?: boolean }) => (
    <Card className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
      isFeatured ? 'w-80 md:w-96' : 'w-64 md:w-72'
    } flex-shrink-0`}>
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className={`w-full ${isFeatured ? 'h-48 md:h-56' : 'h-40 md:h-48'} object-cover rounded-t-lg`}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 rounded-t-lg" />
        
        {/* Discount Badge */}
        {product.discount && (
          <Badge className="absolute top-2 left-2 bg-red-500 hover:bg-red-500 text-white">
            {product.discount}
          </Badge>
        )}
        
        {/* Featured Badge */}
        {product.featured && (
          <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-500 text-white">
            Featured
          </Badge>
        )}
        
        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product.id);
            }}
          >
            <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="w-8 h-8 rounded-full bg-white/90 hover:bg-white"
            onClick={(e) => {
              e.stopPropagation();
              setLocation('/cart');
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <CardContent className="p-3 md:p-4">
        <h3 className="font-semibold text-sm md:text-base text-foreground line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <Star className="w-3 h-3 md:w-4 md:h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-xs md:text-sm font-medium">{product.rating}</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg md:text-xl font-bold text-primary">₹{product.price}</span>
          {product.originalPrice && (
            <span className="text-xs md:text-sm text-muted-foreground line-through">
              ₹{product.originalPrice}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const CategorySection = ({ category, index }: { category: any, index: number }) => {
    const categoryId = `category-${category.title.replace(/\s+/g, '-').toLowerCase()}`;
    
    return (
      <section className="mb-8 md:mb-12">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">{category.title}</h2>
            <p className="text-sm md:text-base text-muted-foreground mt-1">{category.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8 md:w-10 md:h-10"
              onClick={() => scrollCategory(category.title, 'left')}
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className="w-8 h-8 md:w-10 md:h-10"
              onClick={() => scrollCategory(category.title, 'right')}
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <div 
          id={categoryId}
          className="flex gap-4 md:gap-6 overflow-x-auto overflow-y-hidden pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {category.products.map((product: any) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              isFeatured={index === 0}
            />
          ))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/50 pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="py-4 md:py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">Categories</h1>
              <p className="text-sm md:text-base text-muted-foreground mt-1">
                Discover furniture and construction materials
              </p>
            </div>
            <Button 
              variant="outline"
              className="text-xs md:text-sm"
              onClick={() => setLocation('/favorites')}
            >
              View Favorites
            </Button>
          </div>
        </header>

        {/* Categories Sections */}
        <div className="space-y-8 md:space-y-12">
          {categoryData.map((category, index) => (
            <CategorySection key={category.title} category={category} index={index} />
          ))}
        </div>

        {/* Quick Access Categories */}
        <section className="mt-12 md:mt-16">
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "Office Furniture", icon: "🪑", count: "50+ items" },
              { name: "Home Furniture", icon: "🛏️", count: "80+ items" },
              { name: "Construction", icon: "🧱", count: "120+ items" },
              { name: "Tools & Hardware", icon: "🔨", count: "200+ items" }
            ].map((item) => (
              <Card key={item.name} className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer">
                <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
                <h3 className="font-semibold text-sm md:text-base">{item.name}</h3>
                <p className="text-xs md:text-sm text-muted-foreground">{item.count}</p>
              </Card>
            ))}
          </div>
        </section>
      </div>
      
      <BottomNavigation />
      <ChatBotButton />
    </div>
  );
}
