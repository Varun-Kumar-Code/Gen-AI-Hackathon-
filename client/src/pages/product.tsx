import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Mic, ImagePlus, Send, ArrowLeft, Star, Plus, Minus, Share, ShoppingCart, Truck, Shield, RotateCcw, Play } from "lucide-react";
import { useLocation } from "wouter";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ChatBotButton } from "@/components/chat-bot-button";

export default function Product() {
  const [, setLocation] = useLocation();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Sample product data
  const product = {
    id: 1,
    name: "Furniliving Modern Accent Chair, Sherpa Upholstered Living Room Chair Arm Chairs with Solid Metal Legs, Tufted-Button Design Reading Chair, Sofa Chair for Bedroom, Living Room, Office, IvoryWhite",
    brand: "Furniliving",
    price: 11499,
    originalPrice: 24999,
    discount: 54,
    rating: 5.0,
    reviewCount: 4,
    inStock: 2,
    deliveryDate: "Friday, 26 September",
    images: [
      "https://m.media-amazon.com/images/I/717l3p4P4DL._SX679_.jpg",
      "https://www.shutterstock.com/shutterstock/videos/3748091039/preview/stock-footage-minimalist-office-lounge-with-warm-tones-and-modern-decor-elegant-business-lounge-with-designer.webm",
      "https://m.media-amazon.com/images/I/71wwSSJ1G3L._SX679_.jpg",
      "https://m.media-amazon.com/images/I/71ZF5k90fcL._SX679_.jpg"
    ],

    features: [
      "Brand	Furniliving",
      "Colour	Ivorywhite-sherpa",
      "Material	sherpa",
      "Product Dimensions	48.3D x 62W x 97.8H Centimeters",
      "Size	Large",
      "Back Style	Tufted Back"
    ],

    offers: [
      {
        type: "Cashback",
        description: "Upto ₹27.00 cashback as Amazon Pay Balance"
      },
      {
        type: "Partner Offers",
        description: "Buy 2 or more and get 10% off on Qualifying Items"
      }
    ]
  };

  const thumbnailImages = product.images.slice(0, 4);

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center gap-4 py-4 md:py-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setLocation("/")}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <nav className="hidden lg:flex items-center gap-2 text-sm text-muted-foreground">
            <span className="cursor-pointer hover:text-primary" onClick={() => setLocation("/")}>Home</span>
            <span>/</span>
            <span className="cursor-pointer hover:text-primary" onClick={() => setLocation("/categories")}>Categories</span>
            <span>/</span>
            <span className="text-foreground">Product</span>
          </nav>
        </header>

        {/* Main Product Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Left Side - Product Images */}
          <div className="lg:col-span-5">
            <div className="space-y-4">
              {/* Main Image/Video */}
              <div className="relative">
                {product.images[selectedImage].endsWith('.webm') || product.images[selectedImage].endsWith('.mp4') ? (
                  <video
                    src={product.images[selectedImage]}
                    className="w-full h-80 md:h-96 lg:h-[500px] object-contain bg-gray-50 rounded-lg border"
                    controls
                    autoPlay
                    muted
                    loop
                  />
                ) : (
                  <img
                    src={product.images[selectedImage]}
                    alt={product.name}
                    className="w-full h-80 md:h-96 lg:h-[500px] object-contain bg-gray-50 rounded-lg border"
                  />
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white"
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute top-4 left-4 bg-white/90 hover:bg-white"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>

              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto">
                {thumbnailImages.map((image, index) => (
                  <div
                    key={index}
                    className={`relative w-16 h-16 md:w-20 md:h-20 cursor-pointer flex-shrink-0 ${
                      selectedImage === index ? 'ring-2 ring-primary' : ''
                    } rounded`}
                    onClick={() => setSelectedImage(index)}
                  >
                    {index === 1 || image.endsWith('.webm') || image.endsWith('.mp4') ? (
                      <>
                        <video
                          src={image}
                          className="w-full h-full object-contain bg-gray-50 rounded border"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded">
                          <Play className="w-4 h-4 md:w-6 md:h-6 text-white fill-white" />
                        </div>
                      </>
                    ) : (
                      <img
                        src={image}
                        alt={`Product ${index + 1}`}
                        className="w-full h-full object-contain bg-gray-50 rounded border"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Product Details */}
          <div className="lg:col-span-7">
            <div className="space-y-6">
              {/* Product Title and Brand */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Brand: <span className="text-primary">{product.brand}</span></p>
                <h1 className="text-xl md:text-2xl lg:text-3xl font-semibold text-foreground leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-lg font-semibold">{product.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
                <span className="text-sm text-muted-foreground">{product.reviewCount} ratings</span>
              </div>

              {/* Discount Badge */}
              <div className="flex items-center gap-2">
                <Badge className="bg-red-500 hover:bg-red-500 text-white px-2 py-1">
                  Limited time deal
                </Badge>
              </div>

              {/* Price Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-red-600 font-medium">-{product.discount}%</span>
                  <span className="text-3xl md:text-4xl font-bold text-foreground">₹{product.price}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">M.R.P.:</span>
                  <span className="text-sm text-muted-foreground line-through">₹{product.originalPrice}</span>
                </div>
                <p className="text-sm text-muted-foreground">Inclusive of all taxes</p>
              </div>

              {/* Offers */}
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-orange-600 text-xs">%</span>
                    </div>
                    <span className="font-medium">Offers</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.offers.map((offer, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium text-sm">{offer.type}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{offer.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-t border-b">
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-blue-600 mb-2" />
                  <span className="text-xs font-medium">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <RotateCcw className="w-6 h-6 text-green-600 mb-2" />
                  <span className="text-xs font-medium">10 days Replacement</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Truck className="w-6 h-6 text-purple-600 mb-2" />
                  <span className="text-xs font-medium">Amazon Delivered</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <Shield className="w-6 h-6 text-gray-600 mb-2" />
                  <span className="text-xs font-medium">Secure transaction</span>
                </div>
              </div>

              {/* Stock and Quantity */}
              <div className="space-y-4">
                <div className="bg-green-50 text-green-800 text-sm p-3 rounded-lg">
                  <span className="font-medium">Only {product.inStock} left in stock.</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">Quantity:</span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black text-lg py-3 rounded-full">
                  Add to Cart
                </Button>
                <Button 
                  className="w-full bg-orange-400 hover:bg-orange-500 text-white text-lg py-3 rounded-full"
                  onClick={() => setLocation("/payment")}
                >
                  Buy Now
                </Button>
                <Button variant="outline" className="w-full py-3 rounded-full">
                  Add to Wish List
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm">
                  <span className="font-medium">FREE delivery</span> <span className="font-bold">{product.deliveryDate}</span>
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Delivering to Chennai 600040 - <span className="text-blue-600 cursor-pointer">Update location</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Features */}
        <div className="mt-8 lg:mt-12">
          <h3 className="text-xl font-semibold mb-4">Product Features</h3>
          <ul className="space-y-2">
            {product.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm md:text-base">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Reviews Section */}
        <div className="mt-8 lg:mt-12 border-t pt-8">
          <h3 className="text-xl md:text-2xl font-semibold mb-6">Customer Reviews</h3>
          
          {/* Reviews Summary */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">{product.rating}</span>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">out of 5</span>
                </div>
                <p className="text-sm text-muted-foreground">{product.reviewCount} global ratings</p>
              </div>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="flex items-center gap-2">
                    <span className="text-sm w-8">{stars} star</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full" 
                        style={{ width: `${stars === 5 ? 75 : stars === 4 ? 25 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">{stars === 5 ? '75%' : stars === 4 ? '25%' : '0%'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Reviews List */}
          <div className="space-y-6 mb-8">
            {/* Review 1 */}
            <div className="border-b pb-6">
              <div className="flex gap-4">
                <img 
                  src="https://randomuser.me/api/portraits/men/32.jpg" 
                  alt="Reviewer" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Rahul Sharma</h4>
                    <span className="text-sm text-muted-foreground">2 days ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm md:text-base text-foreground mb-2">
                    <span className="font-medium">Excellent quality and fast delivery!</span>
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    This product exceeded my expectations! The quality is outstanding and it arrived earlier than expected. The metal construction feels premium and the details are amazing. Would definitely recommend to anyone looking for a high-quality toy car.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="text-xs">Helpful</Button>
                    <Button variant="ghost" size="sm" className="text-xs">Report</Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="border-b pb-6">
              <div className="flex gap-4">
                <img 
                  src="https://randomuser.me/api/portraits/women/44.jpg" 
                  alt="Reviewer" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium">Priya Verma</h4>
                    <span className="text-sm text-muted-foreground">1 week ago</span>
                  </div>
                  <div className="flex items-center gap-1 text-yellow-500 mb-2">
                    {[...Array(4)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                    <Star className="w-4 h-4 text-gray-300" />
                  </div>
                  <p className="text-sm md:text-base text-foreground mb-2">
                    <span className="font-medium">Great value for money</span>
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground">
                    Beautiful design and great value for money. The finishing is perfect and my kids love it. The sound effects are really cool. Only minor issue is that the doors could be a bit smoother to open.
                  </p>
                  <div className="flex items-center gap-4 mt-3">
                    <Button variant="ghost" size="sm" className="text-xs">Helpful (2)</Button>
                    <Button variant="ghost" size="sm" className="text-xs">Report</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add Review Section */}
          <div className="bg-gray-50 dark:bg-gray-900 p-4 md:p-6 rounded-lg">
            <h4 className="font-medium text-lg mb-4">Write a Review</h4>
            <div className="space-y-4">
              {/* Rating Selection */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} className="p-1">
                      <Star className="w-6 h-6 text-gray-300 hover:text-yellow-400 transition-colors" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text */}
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <div className="border rounded-lg p-4 bg-background">
                  <div className="flex items-start gap-3 mb-4">
                    <img 
                      src="https://imgs.search.brave.com/6sZRHCMMvfkvvYz9DA2pEU6KiPUo_ujBE-3bx41bjxo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci8yMDAv/MTAxMC9IRC13YWxs/cGFwZXItc3VzaGFu/dC1pcy1sZWFuaW5n/LWJhY2stb24td2Fs/bC13ZWFyaW5nLWJs/YWNrLW92ZXJjb2F0/LXN1c2hhbnQtc2lu/Z2gtcmFqcHV0LXRo/dW1ibmFpbC5qcGc" 
                      alt="Your profile" 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <textarea
                        placeholder="Share your experience with this product..."
                        className="w-full min-h-[100px] px-4 py-3 rounded-lg border bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <ImagePlus className="w-4 h-4" />
                        <span className="text-sm">Add Photos</span>
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Mic className="w-4 h-4" />
                        <span className="text-sm">Voice Note</span>
                      </Button>
                    </div>
                    <Button className="flex items-center gap-2">
                      <Send className="w-4 h-4" />
                      <span className="text-sm">Submit Review</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
      <ChatBotButton />
    </div>
  );
}
