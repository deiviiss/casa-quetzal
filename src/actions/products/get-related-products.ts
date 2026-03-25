'use server'

import { Product } from "@/interfaces/product.interface"
import { getProducts } from "./get-products"

// import prisma from '@/lib/prisma'

interface RelatedProductsProps {
  product: Product
}

export const getRelatedProducts = async ({ product }: RelatedProductsProps) => {
  const { products } = await getProducts()
  const relatedProducts = products.filter(p => p.id !== product.id)

  if (!relatedProducts || !products) {
    return {
      ok: false,
      message: 'Products not found'
    }
  }

  return {
    ok: true,
    relatedProducts
  }
}
