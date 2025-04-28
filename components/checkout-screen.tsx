// "use client"

// import { useState } from "react"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"
// import * as z from "zod"
// import { Loader2 } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
// import { toast } from "sonner"

// // Form schema with validation
// const formSchema = z.object({
//   customerName: z.string().min(2, { message: "Customer name is required" }),
//   productSku: z.string().min(1, { message: "Product SKU is required" }),
//   quantity: z.coerce.number().positive({ message: "Quantity must be a positive number" }),
//   unitPrice: z.coerce.number().positive({ message: "Unit price must be a positive number" }),
// })

// type FormValues = z.infer<typeof formSchema>

// export function CheckoutScreen() {
//   const [checkoutAttempts, setCheckoutAttempts] = useState(0)
//   const [isLoading, setIsLoading] = useState(false)
//   const [isDisabled, setIsDisabled] = useState(false)


//   // Initialize form with react-hook-form
//   const form = useForm<FormValues>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       customerName: "",
//       productSku: "",
//       quantity: 1,
//       unitPrice: 0,
//     },
//   })

//   const handleCheckout = (data: FormValues) => {
//     // Increment checkout attempts
//     setCheckoutAttempts((prev) => prev + 1)

//     // If this is the first attempt
//     if (checkoutAttempts === 0) {
//       setIsLoading(true)
//       setIsDisabled(true)

//       // Simulate API call with 2 second delay
//       setTimeout(() => {
//         toast("Order placed successfully!")
        
//         // Reset form
//         form.reset()
//         setIsLoading(false)
//         setIsDisabled(false)
//         setCheckoutAttempts(0)
//       }, 2000)
//     } else {
//       // Block duplicate attempts
//       setIsDisabled(true)
//       toast( "Duplicate checkout attempt blocked.")
//     }
//   }

//   return (
//     <Card className="mx-auto max-w-3xl shadow-lg">
//       <CardHeader className="bg-slate-800 text-white">
//         <CardTitle className="text-2xl md:text-3xl">TCS Omnistore Checkout</CardTitle>
//         <CardDescription className="text-slate-300">Complete the transaction details below</CardDescription>
//       </CardHeader>

//       <CardContent className="pt-6">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(handleCheckout)} className="space-y-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <FormField
//                 control={form.control}
//                 name="customerName"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-lg">Customer Name</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter customer name"
//                         className="h-14 text-lg"
//                         disabled={isDisabled}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="productSku"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-lg">Product SKU</FormLabel>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter product SKU"
//                         className="h-14 text-lg"
//                         disabled={isDisabled}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="quantity"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-lg">Quantity</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         min="1"
//                         placeholder="Enter quantity"
//                         className="h-14 text-lg"
//                         disabled={isDisabled}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />

//               <FormField
//                 control={form.control}
//                 name="unitPrice"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel className="text-lg">Unit Price</FormLabel>
//                     <FormControl>
//                       <Input
//                         type="number"
//                         min="0.01"
//                         step="0.01"
//                         placeholder="Enter unit price"
//                         className="h-14 text-lg"
//                         disabled={isDisabled}
//                         {...field}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </div>

//             <div className="pt-4">
//               <Button type="submit" className="w-full h-16 text-xl font-bold" disabled={isDisabled}>
//                 {isLoading ? (
//                   <>
//                     {/* <Loader2 className="mr-2 h-6 w-6 animate-spin" /> */}
//                     Processing...
//                   </>
//                 ) : (
//                   "Checkout"
//                 )}
//               </Button>
//             </div>
//           </form>
//         </Form>
//       </CardContent>

//       <CardFooter className="flex justify-between border-t p-6">
//         <div className="text-lg font-medium">
//           Checkout Attempts: <span className="font-bold">{checkoutAttempts}</span>
//         </div>
//         <div className="text-sm text-muted-foreground">TCS Omnistore v1.0</div>
//       </CardFooter>
//     </Card>
//   )
// }
