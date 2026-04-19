"use client"

import { Product } from "@/interfaces/product.interface"
import { motion } from "framer-motion"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface ProductCardsProps {
  products: Product[]
}

export default function ProductCards({ products }: ProductCardsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Catálogo de productos
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <ProductCard key={product.name} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const router = useRouter()
  const whatsappMessage = encodeURIComponent(`Hola, quiero comprar el producto: ${product.name}`)
  const whatsappLink = `https://wa.me/529999688834?text=${whatsappMessage}`

  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col justify-between relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-full object-cover hover:cursor-pointer"
          onClick={() => {
            router.push(`/products/${product.id}`)
          }}
        />
        {!product.isAvailable && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div
              className="bg-slate-900/90 text-white text-xs font-bold py-1 px-12 transform rotate-[-42deg] shadow-xl border-y border-white/20 whitespace-nowrap text-center"
              style={{ width: '150%' }}
            >
              NO DISPONIBLE
            </div>
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.shortDescription}</p>
        <p className="text-2xl font-bold text-slate-600 mb-4">${product.price} MXN</p>
        <Button
          onClick={() => window.open(whatsappLink, "_blank")}
          disabled={!product.isAvailable}
          className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-2 px-4 rounded transition duration-300 text-center"
        >
          {product.isAvailable ? "Comprar en WhatsApp" : "No Disponible"}
        </Button>
      </div>
    </motion.div>
  )
}

