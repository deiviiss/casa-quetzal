"use client"

import { Product } from "@/interfaces/product.interface"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const router = useRouter()
  const [currentProduct, setCurrentProduct] = useState(0)

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Productos Destacados
        </motion.h2>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src={products[currentProduct].image || "/placeholder.svg"}
              alt={products[currentProduct].name}
              width={600}
              height={400}
              className="rounded-lg shadow-lg object-cover max-h-96 hover:cursor-pointer"
              onClick={() => router.push(`/products/${products[currentProduct].id}`)}
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 md:pl-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3
              className="text-2xl font-semibold mb-4"
              dangerouslySetInnerHTML={{
                __html: products[currentProduct].name.replace("K’aax Ik’", "<u>K’aax Ik’</u>")
              }}
            />

            <p className="text-lg mb-6">{products[currentProduct].shortDescription}</p>
            <div className="flex space-x-4">
              {products.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full ${index === currentProduct ? "bg-slate-800" : "bg-gray-300"}`}
                  onClick={() => setCurrentProduct(index)}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

