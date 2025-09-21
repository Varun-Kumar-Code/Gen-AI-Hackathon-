import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  ChevronLeft,
  ChevronRight,
  Calendar,
  Users,
  Star,
  ArrowRight,
  Mic
} from "lucide-react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ChatBotButton } from "@/components/chat-bot-button";
import { useLocation } from "wouter";

const popularDestinations = [
  { name: "Eiffel Tower", location: "Paris", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=80" },
  { name: "Machu Picchu", location: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=300&q=80" },
  { name: "Great Wall", location: "China", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?auto=format&fit=crop&w=300&q=80" },
  { name: "Statue of Liberty", location: "New York", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=300&q=80" },
  { name: "Taj Mahal", location: "India", image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=300&q=80" },
  { name: "Mount Fuji", location: "Japan", image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&w=300&q=80" },
  { name: "Colosseum", location: "Rome", image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=300&q=80" },
  { name: "Grand Canyon", location: "Arizona", image: "https://images.unsplash.com/photo-1474044159687-1ee9f3a51722?auto=format&fit=crop&w=300&q=80" },
  { name: "Eiffel Tower", location: "Paris", image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&w=300&q=80" },
  { name: "Machu Picchu", location: "Peru", image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?auto=format&fit=crop&w=300&q=80" }
];

const recommendedActivities = [
  {
    title: "Adventure Activities",
    subtitle: "Mountain Hiking, Tropical Zip-lining, Coastal Windsurfing, Rafting Excursions",
    image: "https://imgs.search.brave.com/hmpJzWFgJfU6AvOxEZEYkRP6R-APa4bsu78d1Rpq3E8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9ibG9n/LnNseWZvb2RzLmNv/bS93cC1jb250ZW50/L3VwbG9hZHMvMjAy/NC8xMi8yMC03Njh4/NDgyLndlYnA"
  },
  {
    title: "Wildlife Experiences",
    subtitle: "Educational Hiking, Tropical Zip-lining, Coastal Windsurfing, Rafting Excursions",
    image: "https://ik.imgkit.net/3vlqs5axxjf/TAW/ik-seo/uploadedImages/Content-Travel_Types/Adventure_Travel/Features/wildlifeindiaasiaticlion/wildlifeindiatours.jpg?tr=w-1008%2Ch-567%2Cfo-auto"
  },
  {
    title: "Cultural Exploration",
    subtitle: "Mountain Hiking, Tropical Zip-lining, Coastal Windsurfing, Rafting Excursions",
    image: "https://www.shikhar.com/images/tours/rajasthan-cultural-tour-intro.jpg"
  }
];

const categories = [
  {
    title: "Personalized Trip Plans",
    subtitle: "AI friendly, SIM local flights and 24/7 support for travel",
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80",
    buttonColor: "bg-yellow-500"
  },
  {
    title: "Market Community",
    subtitle: "500+ locals, 550 listings flights and 24/7 support for travel",
    image: "https://images.unsplash.com/photo-1533900298318-6b8da08a523e?auto=format&fit=crop&w=400&q=80",
    buttonColor: "bg-yellow-500"
  },
  {
    title: "Hotel Rooms",
    subtitle: "500 hotels, 550 local flights and 24/7 support for travel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80",
    buttonColor: "bg-yellow-500"
  },
  {
    title: "Events & Festivals",
    subtitle: "500+ events, 550 local flights and 24/7 support for all your memories",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=400&q=80",
    buttonColor: "bg-yellow-500"
  },
  {
    title: "Eco-Tourism",
    subtitle: "500+ hotels, 550 local flights and 24/7 support for all your memories",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=400&q=80",
    buttonColor: "bg-yellow-500"
  }
];

const newsArticles = [
  {
    title: "Uncovering Your Personal Style: 10 Tips for a Seamless Journey",
    category: "Style",
    readTime: "7 mins",
    date: "15 Feb 2024",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Top 10 Travel Hacks for Budget-Conscious Adventurers",
    category: "Travel",
    readTime: "5 mins", 
    date: "12 Feb 2024",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=300&q=80"
  },
  {
    title: "Discovering Hidden Gems: Your Off-the-Beaten-Path Travel Tips",
    category: "Discovery",
    readTime: "8 mins",
    date: "10 Feb 2024", 
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
  }
];

export default function Explore() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const handleMicClick = () => {
    setIsRecording(!isRecording);
    console.log("Voice search:", !isRecording);
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4 md:py-6 bg-background">
          {/* User Avatar */}
          <img
            src="https://imgs.search.brave.com/6sZRHCMMvfkvvYz9DA2pEU6KiPUo_ujBE-3bx41bjxo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci8yMDAv/MTAxMC9IRC13YWxs/cGFwZXItc3VzaGFu/dC1pcy1sZWFuaW5n/LWJhY2stb24td2Fs/bC13ZWFyaW5nLWJs/YWNrLW92ZXJjb2F0/LXN1c2hhbnQtc2lu/Z2gtcmFqcHV0LXRo/dW1ibmFpbC5qcGc"
            alt="User profile"
            className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full object-cover ring-2 ring-accent"
            data-testid="img-user-avatar"
          />

          {/* App Title - Hidden on mobile, shown on tablet+ */}
          <h1 className="hidden md:block text-xl lg:text-2xl font-bold text-foreground">
            Jhar Yatra
          </h1>

          {/* Map Button - Opens Jharkhand Monuments */}
          <Button
            variant="outline"
            className="flex items-center gap-2 px-4 py-2 border-2 border-accent hover:bg-accent/10"
            onClick={() => {
              setLocation('/jharkhand-monuments');
            }}
          >
            <MapPin className="w-5 h-5 text-primary" />
            <span className="hidden md:inline font-medium">Map</span>
          </Button>
        </header>

        {/* Search Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex gap-2 md:gap-3 max-w-2xl md:mx-auto">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search products..."
                className="pl-10 md:pl-12 pr-12 md:pr-14 py-3 md:py-4 bg-input border border-border rounded-lg md:rounded-xl text-sm md:text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search"
              />
              {/* Microphone Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={handleMicClick}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 md:w-9 md:h-9 rounded-lg transition-colors ${
                  isRecording 
                    ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground"
                }`}
                data-testid="button-mic"
              >
                <Mic className={`w-4 h-4 md:w-5 md:h-5 ${isRecording ? "animate-pulse" : ""}`} />
              </Button>
            </div>

            {/* Filter Button */}
            <Button
              className="px-4 py-3 md:px-6 md:py-4 bg-primary text-primary-foreground rounded-lg md:rounded-xl hover:bg-primary/90"
              data-testid="button-filter"
            >
              <SlidersHorizontal className="w-4 h-4 md:w-5 md:h-5" />
            </Button>
          </div>
        </div>

        {/* Popular Destinations */}
        <section className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Popular Destinations</h2>
            <p className="text-muted-foreground">Navigate the places with Confidence</p>
          </div>
          
          <div className="relative">
            <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
              {popularDestinations.map((destination, index) => (
                <div key={index} className="flex-shrink-0 text-center">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full overflow-hidden mb-3 mx-auto ring-2 ring-border">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-sm text-foreground">{destination.name}</h3>
                  <p className="text-xs text-muted-foreground">{destination.location}</p>
                </div>
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-background/80 backdrop-blur-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
          </div>
        </section>

        {/* Recommended For You */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Recommended For You</h2>
            <Button variant="ghost" size="icon">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedActivities.map((activity, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border">
                <div className="relative h-48">
                  <img 
                    src={activity.image} 
                    alt={activity.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="font-semibold text-lg mb-2">{activity.title}</h3>
                    <p className="text-sm opacity-90">{activity.subtitle}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Categories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-64">
                  <img 
                    src={category.image} 
                    alt={category.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="font-bold text-xl mb-2">{category.title}</h3>
                    <p className="text-sm opacity-90 mb-4">{category.subtitle}</p>
                    <Button className={`${category.buttonColor} text-black hover:opacity-90 font-semibold`}>
                      Explore
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            
            {/* Special Quote Card */}
            <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center text-center p-8">
              <div>
                <h3 className="text-xl font-bold mb-2">Don't just watch</h3>
                <h3 className="text-xl font-bold mb-2">be part in</h3>
                <h3 className="text-xl font-bold">experiencing it.</h3>
              </div>
            </Card>
          </div>
        </section>

        {/* News, Tips & Guides */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">News, Tips & Guides</h2>
              <p className="text-muted-foreground">Lorem ipsum dolor sit amet, consectetur adipiscing</p>
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              View More
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsArticles.map((article, index) => (
              <Card key={index} className="overflow-hidden bg-card border-border group hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <img 
                    src={article.image} 
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                    {article.category}
                  </Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-foreground mb-3 line-clamp-2">{article.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{article.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>📖</span>
                      <span>{article.readTime}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👁️</span>
                      <span>63 Views</span>
                    </div>
                  </div>
                </CardContent>
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