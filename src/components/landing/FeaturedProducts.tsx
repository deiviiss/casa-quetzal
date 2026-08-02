"use client"

import { Product } from "@/interfaces/product.interface"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const router = useRouter()
  const [currentProduct, setCurrentProduct] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentProduct((prev) => (prev + 1) % products.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [products.length])

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Productos Destacados
        </motion.h2>
        <div className="flex flex-col lg:flex-row items-center gap-12 md:gap-20">
          <div className="lg:w-1/2 w-full overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={products[currentProduct].image || "/placeholder.svg"}
                  alt={products[currentProduct].name}
                  width={600}
                  height={400}
                  className="rounded-xl shadow-xl h-80 w-full object-cover hover:cursor-pointer"
                  onClick={() => router.push(`/products/${products[currentProduct].id}`)}
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="lg:w-1/2 w-full min-h-[220px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentProduct}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h3
                  className="text-2xl font-semibold mb-4 text-emerald-900"
                  dangerouslySetInnerHTML={{
                    __html: products[currentProduct].name.replace("K’aax Ik’", "<u>K’aax Ik’</u>")
                  }}
                />

                <p className="text-lg text-gray-700 leading-relaxed mb-6">{products[currentProduct].shortDescription}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex space-x-4">
              {products.map((_, index) => (
                <button
                  key={index}
                  aria-label={`Ver producto destacado ${index + 1}`}
                  className={`w-3 h-3 rounded-full transition-colors ${index === currentProduct ? "bg-emerald-900" : "bg-gray-300"}`}
                  onClick={() => setCurrentProduct(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

