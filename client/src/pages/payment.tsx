import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ChevronLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Payment() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center">
      <div className="w-full max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-2xl font-semibold">Check Out</h1>
        </div>

        {/* Add margin space */}
        <div className="mt-8" />

        {/* Progress Steps */}
        <div className="mb-6">
        <div className="flex justify-between items-center relative">
          <div className="flex-1 h-1 bg-primary"></div>
          <div className="flex-1 h-1 bg-primary"></div>
          <div className="flex-1 h-1 bg-primary"></div>
          <div className="flex-1 h-1 bg-muted"></div>
          
          {/* Step indicators */}
          <div className="absolute w-full flex justify-between -top-2">
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
              <span className="text-primary text-sm">4</span>
            </div>
          </div>
        </div>
        
        {/* Step labels */}
        <div className="flex justify-between mt-4 text-sm">
          <span className="text-muted-foreground">Cart</span>
          <span className="text-muted-foreground">Address</span>
          <span className="text-primary font-medium">Payment</span>
          <span className="text-muted-foreground">Confirm</span>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="w-full max-w-lg mx-auto">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4">PAYMENT METHOD</h2>
          
          <RadioGroup defaultValue="pod" className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="card" id="card" />
              <label htmlFor="card" className="flex-1">
                <div className="flex justify-between items-center">
                  <span>Credit or Debit Card</span>
                  <div className="flex gap-2">
                    <img src="https://cdn.brandfetch.io/idhem73aId/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1679062242416" alt="Visa" className="h-6" />
                    <img src="https://cdn.brandfetch.io/idFw8DodCr/w/800/h/495/theme/dark/symbol.png?c=1dxbfHSJFAPEGdCLU4o5B" alt="Mastercard" className="h-6" />
                    <img src="https://cdn.brandfetch.io/id9vWhnbQ4/w/400/h/400/theme/dark/icon.jpeg?c=1bxid64Mup7aczewSAYMX&t=1756309642811" alt="RuPay" className="h-6" />
                  </div>
                </div>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="upi" id="upi" />
              <label htmlFor="upi" className="flex-1">
                <div className="flex justify-between items-center">
                  <span>UPI</span>
                  <div className="flex gap-2">
                    <img src="https://cdn.brandfetch.io/idWNFFMbfp/w/400/h/400/theme/dark/icon.png?c=1bxid64Mup7aczewSAYMX&t=1753687446881" alt="Google Pay" className="h-6" />
                    <img src="https://logowik.com/content/uploads/images/331_apple_pay.jpg" alt="Apple Pay" className="h-6" />
                    <img src="https://cdn.brandfetch.io/idO-tKGZ90/w/820/h/159/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1667844274624" alt="Amazon Pay" className="h-6" />
                  </div>
                </div>
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="netbanking" id="netbanking" />
              <label htmlFor="netbanking" className="flex-1">Net Banking</label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="pod" id="pod" />
              <label htmlFor="pod" className="flex-1">Pay on Delivery</label>
            </div>
          </RadioGroup>
        </div>

        {/* Order Summary */}
        <div className="mt-6 bg-card rounded-lg p-4 shadow-sm">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Items:</span>
              <span>₹3456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery Fee:</span>
              <span>₹49</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Discount:</span>
              <span>-₹100</span>
            </div>
            <div className="flex justify-between font-semibold pt-2 border-t">
              <span>Order Total:</span>
              <span>₹3405</span>
            </div>
          </div>
        </div>

        {/* Proceed Button */}
        <Button className="w-full mt-6" size="lg">
          Proceed to Pay
        </Button>
      </div>
      </div>
    </div>
  );
}