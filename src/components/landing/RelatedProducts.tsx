"use client"

import { Product } from "@/types/product.interface"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RelatedProductsProps {
  relatedProducts: Product[]
}

export default function RelatedProducts({ relatedProducts }: RelatedProductsProps) {

  if (relatedProducts.length === 0) {
    return null
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          className="text-3xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Productos Relacionados
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {relatedProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <Link href={`/products/${product.id}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">

                  <>
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />

                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                    </CardHeader>
                  </>

                  <CardContent className="pb-0 flex-1 ">
                    <p className="text-gray-600 mb-4">{product.shortDescription}</p>
                  </CardContent>

                  <CardContent>
                    <p className="text-xl font-bold text-slate-600 text-end">${product.price} MXN</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section >
  )
}

