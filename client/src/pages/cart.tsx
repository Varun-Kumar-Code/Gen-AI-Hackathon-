import { useState } from "react";
import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Plus, Minus, Check } from "lucide-react";
import { useLocation } from "wouter";

// Sample cart data - in a real app, this would come from state management
const initialCartItems = [
  {
    id: 1,
    name: "Porem ipsum",
    price: 1200,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    selected: true
  },
  {
    id: 2,
    name: "Dorem ipsum",
    price: 1450,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    selected: true
  },
  {
    id: 3,
    name: "Horem ipsum",
    price: 980,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    selected: true
  },
  {
    id: 4,
    name: "Forem ipsum",
    price: 2999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300",
    selected: true
  }
];

export default function Cart() {
  const [, setLocation] = useLocation();
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  const handleSelectAll = (checked: boolean) => {
    setCartItems(items => items.map(item => ({ ...item, selected: checked })));
  };

  const handleItemSelect = (id: number, checked: boolean) => {
    setCartItems(items => items.map(item => 
      item.id === id ? { ...item, selected: checked } : item
    ));
  };

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems(items => items.map(item => {
      if (item.id === id) {
        const newQuantity = increment ? item.quantity + 1 : Math.max(1, item.quantity - 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const handleApplyCoupon = () => {
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  const selectedItems = cartItems.filter(item => item.selected);
  const allSelected = cartItems.length > 0 && selectedItems.length === cartItems.length;
  const subtotal = selectedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = 490;
  const discountPercent = couponApplied ? 20 : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const total = subtotal + deliveryFee - discountAmount;

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex items-center justify-between py-4 md:py-6">
          <Button
            variant="ghost"
            size="icon"
            className="flex items-center gap-2 p-2 md:p-3"
            onClick={() => setLocation("/")}
          >
            <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
            <span className="hidden sm:inline text-sm md:text-base font-medium">Back</span>
          </Button>
          
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">Cart</h1>
          
          <img
            src="https://imgs.search.brave.com/6sZRHCMMvfkvvYz9DA2pEU6KiPUo_ujBE-3bx41bjxo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93MC5w/ZWFrcHguY29tL3dh/bGxwYXBlci8yMDAv/MTAxMC9IRC13YWxs/cGFwZXItc3VzaGFu/dC1pcy1sZWFuaW5n/LWJhY2stb24td2Fs/bC13ZWFyaW5nLWJs/YWNrLW92ZXJjb2F0/LXN1c2hhbnQtc2lu/Z2gtcmFqcHV0LXRo/dW1ibmFpbC5qcGc"
            alt="User profile"
            className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-full object-cover ring-2 ring-accent"
          />
        </header>

        {/* Cart Items Card */}
        <Card className="mb-6 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            {/* Select All */}
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <Checkbox
                checked={allSelected}
                onCheckedChange={handleSelectAll}
                className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
              />
              <span className="text-sm md:text-base font-medium text-foreground">Select all</span>
            </div>

            {/* Cart Items */}
            <div className="space-y-4 md:space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 md:gap-4">
                  <Checkbox
                    checked={item.selected}
                    onCheckedChange={(checked) => handleItemSelect(item.id, !!checked)}
                    className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                  />
                  
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-sm md:text-base text-foreground truncate">
                      {item.name}
                    </h3>
                    <p className="text-sm md:text-base font-semibold text-foreground mt-1">
                      ₹{item.price}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 md:gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2"
                      onClick={() => handleQuantityChange(item.id, false)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                    
                    <span className="w-8 md:w-10 text-center text-sm md:text-base font-medium">
                      {item.quantity}
                    </span>
                    
                    <Button
                      variant="outline"
                      size="icon"
                      className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2"
                      onClick={() => handleQuantityChange(item.id, true)}
                    >
                      <Plus className="w-3 h-3 md:w-4 md:h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coupon Code Section */}
        <Card className="mb-6 bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-900/20 dark:to-orange-900/20 border-0 shadow-lg">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <Input
                  placeholder="coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="bg-background/50 border-0 text-sm md:text-base"
                  disabled={couponApplied}
                />
              </div>
              <div className="flex items-center gap-2">
                {couponApplied ? (
                  <div className="flex items-center gap-2 text-green-600 font-medium text-sm md:text-base">
                    <Check className="w-4 h-4" />
                    <span>Promo code applied</span>
                  </div>
                ) : (
                  <Button
                    onClick={handleApplyCoupon}
                    className="bg-amber-600 hover:bg-amber-700 text-white px-4 md:px-6 text-sm md:text-base"
                    disabled={!couponCode.trim()}
                  >
                    Apply
                  </Button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-4 md:mt-6 space-y-2 md:space-y-3">
              <div className="flex justify-between text-sm md:text-base">
                <span>Subtotal:</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm md:text-base">
                <span>Delivery Fee:</span>
                <span>₹{deliveryFee}</span>
              </div>
              {couponApplied && (
                <div className="flex justify-between text-sm md:text-base text-green-600">
                  <span>Discount:</span>
                  <span>{discountPercent}%</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Total and Checkout */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-2xl md:text-3xl font-bold text-foreground">₹{total.toFixed(0)}</p>
          </div>
          
          <Button
            className="bg-amber-900 hover:bg-amber-800 text-white px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl w-full sm:w-auto"
            disabled={selectedItems.length === 0}
          >
            Checkout
          </Button>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
}
