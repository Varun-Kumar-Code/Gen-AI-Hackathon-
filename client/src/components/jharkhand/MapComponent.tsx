import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Navigation, 
  Star, 
  Hotel, 
  UtensilsCrossed,
  Store,
  Trees,
  ExternalLink
} from "lucide-react";

// Simplified data structure - you can expand this from the original data files
const jharkhandPlaces = [
  {
    id: 1,
    name: "Jagannath Temple",
    type: "MONUMENT",
    description: "Historic temple with beautiful architecture",
    rating: 4.5,
    location: { lat: 23.3441, lng: 85.3096 },
    image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 2,
    name: "Ranchi Hill",
    type: "MONUMENT",
    description: "Scenic hill station with panoramic views",
    rating: 4.3,
    location: { lat: 23.3629, lng: 85.3380 },
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 3,
    name: "Birsa Zoological Park",
    type: "MONUMENT",
    description: "Wildlife sanctuary and botanical garden",
    rating: 4.2,
    location: { lat: 23.4223, lng: 85.4467 },
    image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 4,
    name: "Local Restaurant",
    type: "RESTAURANT",
    description: "Authentic Jharkhand cuisine",
    rating: 4.0,
    location: { lat: 23.3441, lng: 85.3096 },
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 5,
    name: "Heritage Hotel",
    type: "HOTEL",
    description: "Comfortable stay with modern amenities",
    rating: 4.4,
    location: { lat: 23.3441, lng: 85.3096 },
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80"
  },
  {
    id: 6,
    name: "Tribal Art Market",
    type: "ARTISAN_MARKET",
    description: "Local handicrafts and tribal art",
    rating: 4.1,
    location: { lat: 23.3441, lng: 85.3096 },
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80"
  }
];

const categories = [
  { id: "ALL", label: "All", icon: Trees },
  { id: "MONUMENT", label: "Monuments", icon: MapPin },
  { id: "RESTAURANT", label: "Restaurants", icon: UtensilsCrossed },
  { id: "HOTEL", label: "Hotels", icon: Hotel },
  { id: "ARTISAN_MARKET", label: "Markets", icon: Store }
];

export default function JharkhandMapComponent() {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const filteredPlaces = selectedCategory === "ALL" 
    ? jharkhandPlaces 
    : jharkhandPlaces.filter(place => place.type === selectedCategory);

  const openGoogleMaps = (place: any) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${place.location.lat},${place.location.lng}`;
    window.open(url, '_blank');
  };

  const getDirections = (place: any) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.location.lat},${place.location.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => {
          const IconComponent = category.icon;
          return (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-2"
            >
              <IconComponent className="w-4 h-4" />
              {category.label}
            </Button>
          );
        })}
      </div>

      {/* Google Maps Embed */}
      <div className="w-full h-96 rounded-lg overflow-hidden border border-border">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58607.86604739551!2d85.26220397189332!3d23.364063984946095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f4e104aa5db7dd%3A0xdc09d49d2743cdf8!2sRanchi%2C%20Jharkhand!5e0!3m2!1sen!2sin!4v1694672345678!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      {/* Places Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <Card key={place.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-48">
              <img
                src={place.image}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground">
                {place.type.replace('_', ' ')}
              </Badge>
            </div>
            
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-foreground line-clamp-1">{place.name}</h3>
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">{place.rating}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {place.description}
              </p>
              
              <div className="flex gap-2">
                <Button
                  size="sm"
                  onClick={() => openGoogleMaps(place)}
                  className="flex items-center gap-2 flex-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  View
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => getDirections(place)}
                  className="flex items-center gap-2 flex-1"
                >
                  <Navigation className="w-4 h-4" />
                  Directions
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-card border border-border rounded-lg p-6 text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          Explore Jharkhand's Rich Heritage
        </h3>
        <p className="text-muted-foreground mb-4">
          Discover ancient monuments, local cuisine, and cultural treasures of Jharkhand state.
        </p>
        <Button 
          onClick={() => window.open('https://www.google.com/maps/place/Jharkhand/', '_blank')}
          className="flex items-center gap-2 mx-auto"
        >
          <MapPin className="w-4 h-4" />
          Explore on Google Maps
        </Button>
      </div>
    </div>
  );
}
