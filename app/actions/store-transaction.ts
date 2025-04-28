"use server";

import { StoreTransactionInput } from "@/lib/types";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

// const prisma = new PrismaClient();


export async function storeTransaction({
  customerName,
  customerPhone,
  customerEmail,
  items,
  total,
  tax,
  grandTotal,
}: StoreTransactionInput) {
  try {
    // 1. Find or create customer
    let customer = await prisma.customer.findFirst({
      where: {
        phone: customerPhone,
      },
    })

    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          name: customerName,
          phone: customerPhone || null,
          email: customerEmail || null,
        },
      })
    }

    // 2. Create order
    const order = await prisma.order.create({
      data: {
        customerId: customer.id,
        totalAmount: grandTotal,
        paymentMethod: 'Cash',
        status: 'Completed',
        orderItems: {
          create: items.map((item) => ({
            productId: item.productSku,
            quantity: item.quantity,
            price: item.unitPrice,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    })

    return { success: true, order }
  } catch (error) {
    console.error('Transaction failed:', error)
    throw new Error('Failed to store transaction')
  }
}
