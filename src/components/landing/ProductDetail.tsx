"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Product } from "@/interfaces/product.interface"
import { useNewCartStore } from "@/store/new-cart-store"
import { mapProductToCartItem } from "@/lib/cart-adapters"
import { toast } from "sonner"

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const { addToCart } = useNewCartStore()

  const handleAddToCart = () => {
    try {
      const cartItem = mapProductToCartItem(product)
      addToCart(cartItem)
      toast.success(`${product.name} agregado al carrito`, {
        position: 'bottom-right'
      })
    } catch (e) {
      console.error('[ProductDetail]', e)
      toast.error('No se pudo agregar el producto al carrito')
    }
  }

  return (
    <section className="pt-10 pb-20 bg-secondary-foreground">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <Button
            variant="ghost"
            asChild
            className="group text-slate-600 hover:text-slate-900 transition-colors p-0 hover:bg-transparent"
          >
            <Link href="/products" className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span className="font-medium text-lg">Regresar</span>
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative rounded-xl shadow-xl overflow-hidden group"
          >
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
              priority
            />
            {!product.isAvailable && (
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div
                  className="bg-slate-900/90 text-white text-sm font-bold py-2 px-12 transform rotate-[-42deg] shadow-2xl border-y border-white/20 whitespace-nowrap text-center"
                  style={{ width: '150%' }}
                >
                  NO DISPONIBLE
                </div>
              </div>
            )}
          </motion.div>

          {/* Product information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-xl text-gray-700 leading-relaxed">{product.shortDescription}</p>
            {
              product.price > 0 ? (
                <p className="text-3xl font-bold text-emerald-900">${product.price} MXN</p>
              ) : (
                null
              )
            }

            {product.isExclusive ? (
              <Button
                asChild
                className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700"
              >
                <Link href="/platform/dispensary">
                  Ir al Dispensario
                </Link>
              </Button>
            ) : (
              <Button
                className="w-full md:w-auto bg-emerald-900 hover:bg-emerald-800"
                onClick={handleAddToCart}
                disabled={!product.isAvailable}
              >
                {product.isAvailable ? "Agregar al carrito" : "No Disponible"}
              </Button>
            )}
          </motion.div>
        </div>

        {/* Additional Details */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12"
        >

          <Card className="p-6 dark:bg-primary/10">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Descripción</h2>
            <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
          </Card>

          <Card className="p-6 dark:bg-primary/10">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Beneficios</h2>
            <ul className="list-disc list-inside space-y-2">
              {product.benefits.map((benefit, index) => (
                <li key={index} className="text-gray-700 leading-relaxed">
                  {benefit}
                </li>
              ))}

            </ul>
          </Card>

          {product.ingredients && (
            <Card className="p-6 dark:bg-primary/10">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Ingredientes</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {ingredient}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {product.usage && (
            <Card className="p-6 dark:bg-primary/10">
              <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Modo de Uso</h2>
              <ul className="list-disc list-inside space-y-2">
                {product.usage.map((instruction, index) => (
                  <li key={index} className="text-gray-700 leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ul>
            </Card>
          )}

          <Card className="p-6 dark:bg-primary/10">
            <h2 className="text-2xl font-semibold mb-4 text-emerald-900">Origen y Trazabilidad</h2>
            <p className="text-gray-700 leading-relaxed">{product.origin}</p>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
