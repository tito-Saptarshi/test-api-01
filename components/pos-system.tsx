"use client";

import type React from "react";

import { useState } from "react";
import { Plus, Trash2, ShoppingCart } from "lucide-react";
import { storeTransaction } from "@/app/actions/store-transaction";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartItem {
  id: string;
  productSku: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
}

export function POSSystem() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutAttempts, setCheckoutAttempts] = useState(0);
  const [x, setX] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // Product form state
  const [productSku, setProductSku] = useState("");
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  // Customer form state
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  const showToastMessage = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const addToCart = (e: React.FormEvent) => {
    e.preventDefault();

    const newItem: CartItem = {
      id: Date.now().toString(),
      productSku,
      productName,
      quantity,
      unitPrice,
      subtotal: quantity * unitPrice,
    };

    setCart((prevCart) => [...prevCart, newItem]);

    showToastMessage(`${productName} added to cart`);

    // Reset form
    setProductSku("");
    setProductName("");
    setQuantity(1);
    setUnitPrice(0);
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    showToastMessage("Item removed from cart");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    // Increment checkout attempts
    setCheckoutAttempts((prev) => prev + 1);

    showToastMessage(`Checkout attempt: ${checkoutAttempts + 1}`);

    // Only process checkout if this is the first attempt
    if (checkoutAttempts === 0) {
      if (cart.length === 0) {
        showToastMessage(
          "Your cart is empty. Please add items before checkout."
        );
        return;
      }

      setIsCheckingOut(true);

      try {
        // Call the server action
        await storeTransaction({
          customerName,
          customerPhone,
          items: cart,
          total: calculateTotal(),
          tax: calculateTotal() * 0.08,
          grandTotal: calculateTotal() * 1.08,
        });

        showToastMessage(`Order placed successfully for ${customerName}!`);
        setCheckoutComplete(true);
      } catch (error) {
        showToastMessage("Error processing transaction");
        console.error(error);
      } finally {
        setIsCheckingOut(false);
      }
    } else {
      showToastMessage("Duplicate checkout attempt blocked.");
    }
  };


  // const handleCheckout = async (e: React.FormEvent) => {
  //   e.preventDefault();
  
  //   setX((prevX) => {
  //     const newX = prevX + 1;
  
  //     // Only run server call when newX is exactly 1
  //     if (newX === 1) {
  //       if (cart.length === 0) {
  //         showToastMessage("Your cart is empty. Please add items before checkout.");
  //         return newX;
  //       }
  
  //       setIsCheckingOut(true);
  
  //       (async () => {
  //         try {
  //           await storeTransaction({
  //             customerName,
  //             customerPhone,
  //             items: cart,
  //             total: calculateTotal(),
  //             tax: calculateTotal() * 0.08,
  //             grandTotal: calculateTotal() * 1.08,
  //           });
  
  //           showToastMessage(`Order placed successfully for ${customerName}!`);
  //           setCheckoutComplete(true);
  //         } catch (error) {
  //           showToastMessage("Error processing transaction");
  //           console.error(error);
  //         } finally {
  //           setIsCheckingOut(false);
  //         }
  //       })();
  //     } else {
  //       showToastMessage(`Duplicate checkout attempt blocked. (Attempt: ${newX})`);
  //     }
  
  //     return newX;
  //   });
  // };


  
  
  const startNewTransaction = () => {
    setCart([]);
    setCheckoutComplete(false);
    setCheckoutAttempts(0);
    setCustomerName("");
    setCustomerPhone("");
    setProductSku("");
    setProductName("");
    setQuantity(1);
    setUnitPrice(0);
  };

  // Mock product data for quick add (simulating barcode scan)
  const quickAddProducts = [
    { sku: "PRD001", name: 'LED TV 55"', price: 499.99 },
    { sku: "PRD002", name: "Wireless Headphones", price: 89.99 },
    { sku: "PRD003", name: "Coffee Maker", price: 59.99 },
    { sku: "PRD004", name: "Drill Machine", price: 129.99 },
  ];

  const quickAddProduct = (product: {
    sku: string;
    name: string;
    price: number;
  }) => {
    setProductSku(product.sku);
    setProductName(product.name);
    setUnitPrice(product.price);
    setQuantity(1);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Simple Toast */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-md p-4 max-w-md">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <header className="bg-blue-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TCS Omnistore POS</h1>
          <div className="text-sm">Cashier: John Doe | Terminal: T-001</div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 container mx-auto p-4 flex flex-col lg:flex-row gap-4">
        {/* Left Panel - Product Entry and Quick Add */}
        <div className="w-full lg:w-1/2 space-y-4">
          <Card>
            <CardHeader className="bg-blue-700 text-white">
              <CardTitle>Add Products</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={addToCart} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="productSku" className="block mb-2">
                      Product SKU
                    </label>
                    <Input
                      id="productSku"
                      placeholder="Enter SKU"
                      value={productSku}
                      onChange={(e) => setProductSku(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="productName" className="block mb-2">
                      Product Name
                    </label>
                    <Input
                      id="productName"
                      placeholder="Enter product name"
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="quantity" className="block mb-2">
                      Quantity
                    </label>
                    <Input
                      id="quantity"
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label htmlFor="unitPrice" className="block mb-2">
                      Unit Price
                    </label>
                    <Input
                      id="unitPrice"
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={unitPrice}
                      onChange={(e) => setUnitPrice(Number(e.target.value))}
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={checkoutComplete}
                >
                  <Plus className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="bg-blue-700 text-white">
              <CardTitle>Quick Add Products</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-2 gap-2">
                {quickAddProducts.map((product) => (
                  <Button
                    key={product.sku}
                    variant="outline"
                    className="h-auto py-3 justify-start"
                    onClick={() => quickAddProduct(product)}
                    disabled={checkoutComplete}
                  >
                    <div className="text-left">
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {product.sku} - ${product.price.toFixed(2)}
                      </div>
                    </div>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader className="bg-blue-700 text-white">
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <form
                id="customer-form"
                onSubmit={handleCheckout}
                className="space-y-4"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="customerName" className="block mb-2">
                      Customer Name
                    </label>
                    <Input
                      id="customerName"
                      placeholder="Enter customer name"
                      disabled={checkoutComplete}
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="customerPhone" className="block mb-2">
                      Phone (Optional)
                    </label>
                    <Input
                      id="customerPhone"
                      placeholder="Enter phone number"
                      disabled={checkoutComplete}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Cart and Checkout */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <Card className="flex-1 flex flex-col">
            <CardHeader className="bg-blue-700 text-white">
              <CardTitle className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Shopping Cart ({cart.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] w-full">
                {cart.length > 0 ? (
                  <Table>
                    <TableHeader className="sticky top-0 bg-white">
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead className="text-right">Qty</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="text-right">Subtotal</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cart.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div>
                              <div className="font-medium">
                                {item.productName}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {item.productSku}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-right">
                            ${item.unitPrice.toFixed(2)}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            ${item.subtotal.toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeFromCart(item.id)}
                              disabled={checkoutComplete}
                            >
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="flex items-center justify-center h-full p-8 text-center text-muted-foreground">
                    {checkoutComplete
                      ? "Transaction complete. Start a new transaction to add items."
                      : "Your cart is empty. Add products to get started."}
                  </div>
                )}
              </ScrollArea>
            </CardContent>
            <CardFooter className="flex-col border-t p-6">
              <div className="w-full space-y-2">
                <div className="flex justify-between text-lg">
                  <span>Subtotal:</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg">
                  <span>Tax (8%):</span>
                  <span>${(calculateTotal() * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  <span>${(calculateTotal() * 1.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg bg-yellow-100 p-2 rounded-md">
                  <span>Checkout Attempts:</span>
                  <span className="font-bold">{checkoutAttempts}</span>
                </div>
              </div>

              <div className="w-full pt-6 space-y-2">
                {checkoutComplete ? (
                  <Button
                    className="w-full h-16 text-xl bg-green-600 hover:bg-green-700"
                    onClick={startNewTransaction}
                  >
                    Start New Transaction
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    form="customer-form"
                    className="w-full h-16 text-xl"
                    disabled={cart.length === 0 && checkoutAttempts === 0}
                  >
                    Checkout
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 p-2 text-center text-sm text-gray-600">
        TCS Omnistore POS System v1.0 | © {new Date().getFullYear()} TCS
      </footer>
    </div>
  );
}
