import { BottomNavigation } from "@/components/bottom-navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Download } from "lucide-react";

interface OrderItem {
  name: string;
  variant: string;
  sku: string;
  price: number;
  quantity: number;
  image: string;
}

interface OrderStatus {
  stage: 'new' | 'confirmed' | 'shipped' | 'delivered';
  date: string;
}

export default function Order() {
  // Example order data
  const orderNumber = "#25436";
  const orderDate = "25 Sep, 2024";
  const orderTime = "15:04";
  
  const orderItems: OrderItem[] = [
    {
      name: "T-shirt",
      variant: "Black / V-neck",
      sku: "21938059515",
      price: 5630.98,
      quantity: 9,
      image: "/t-shirt-placeholder.png" // Add a placeholder image path
    },
    {
      name: "T-shirt",
      variant: "Black / V-neck",
      sku: "21938059515",
      price: 5630.98,
      quantity: 9,
      image: "/t-shirt-placeholder.png"
    }
  ];

  const orderStatus: OrderStatus[] = [
    { stage: 'new', date: '25 Sep, 2024' },
    { stage: 'confirmed', date: '25 Sep, 2024' },
    { stage: 'shipped', date: '25 Sep, 2024' },
    { stage: 'delivered', date: 'Pending Delivery' }
  ];

  const paymentDetails = {
    products: 20000,
    shipping: 3000,
    tax: 950,
    total: 23950.32
  };

  const addressDetails = {
    delivery: "Suite 116 336 Anderson Inlet, Gdelland, PA 58640",
    billing: "Suite 116 336 Anderson Inlet, Gdelland, PA 58640"
  };

  return (
    <div className="min-h-screen pb-24 px-4 md:px-8 lg:px-16">
      <div className="container py-4 max-w-3xl mx-auto">
        {/* Order Header */}
        <div className="bg-primary rounded-lg p-4 text-primary-foreground mb-6 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-semibold">Order {orderNumber}</h1>
            <p className="text-sm opacity-90">{orderDate} {orderTime}</p>
          </div>
          <div className="flex gap-2">
            <Button size="icon" variant="ghost" className="text-primary-foreground">
              <Download className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="text-primary-foreground">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Order Status */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Status</h2>
          <div className="space-y-4">
            {orderStatus.map((status, index) => (
              <div key={status.stage} className="flex items-center gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    index < 3 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {index < 3 ? '✓' : ''}
                  </div>
                  <div>
                    <p className="font-medium capitalize">{status.stage}</p>
                    <p className="text-sm text-muted-foreground">{status.date}</p>
                  </div>
                </div>
                {index < orderStatus.length - 1 && (
                  <div className="flex-1 border-b border-dashed my-2" />
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Order Items */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="space-y-4">
            {orderItems.map((item, index) => (
              <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                <div className="w-16 h-16 bg-muted rounded-md overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.variant}</p>
                  <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">₹{item.price.toFixed(2)} TL</p>
                  <p className="text-sm text-muted-foreground">{item.quantity} Adet</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Details */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Products</span>
              <span>{paymentDetails.products.toLocaleString()} TL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{paymentDetails.shipping.toLocaleString()} TL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>{paymentDetails.tax.toLocaleString()} TL</span>
            </div>
            <div className="flex justify-between pt-2 border-t font-medium">
              <span>Total</span>
              <span>{paymentDetails.total.toLocaleString()} TL</span>
            </div>
          </div>
        </Card>

        {/* Address Details */}
        <Card className="p-4 mb-6">
          <h2 className="text-lg font-semibold mb-4">Address Details</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-1">Delivery Address</h3>
              <p className="text-sm text-muted-foreground">{addressDetails.delivery}</p>
            </div>
            <div>
              <h3 className="font-medium mb-1">Billing Address</h3>
              <p className="text-sm text-muted-foreground">{addressDetails.billing}</p>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button className="w-full" variant="default">Track Order</Button>
          <Button className="w-full" variant="outline">Refund and Other Requests</Button>
          <Button className="w-full" variant="outline">Download Receipt</Button>
        </div>
      </div>
      <BottomNavigation />
    </div>
  );
}