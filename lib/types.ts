export interface CartItem {
  productSku: string
  productName: string
  quantity: number
  unitPrice: number
}

export interface StoreTransactionInput {
  customerName: string
  customerPhone: string
  customerEmail: string
  items: CartItem[]
  total: number
  tax: number
  grandTotal: number
}
