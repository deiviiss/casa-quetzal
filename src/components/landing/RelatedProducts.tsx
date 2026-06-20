"use client"

import { Product } from "@/interfaces/product.interface"
import { motion } from "framer-motion"
import { ProductCard } from "./ProductCards"

interface RelatedProductsProps {
  relatedProducts: Product[]
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Productos Relacionados
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {relatedProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section >
  )
}

