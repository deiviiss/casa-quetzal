"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart, Leaf, Droplets, Sparkles, Wind } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { useCartStore } from "@/store"
import type { DispensaryProduct as Product, DispensaryProductVariant as ProductVariant } from "@/interfaces/product.interface"

interface ProductCardProps {
  product: Product
  className?: string
}

const dominanceConfig: Record<string, { label: string; className: string }> = {
  Sativa: {
    label: "Sativa",
    className: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  },
  Índica: {
    label: "Índica",
    className: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  Indica: {
    label: "Indica",
    className: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  },
  Híbrida: {
    label: "Híbrida",
    className: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  },
}

const terpeneIcons: Record<string, React.ReactNode> = {
  mirceno: <Leaf className="size-3" />,
  limoneno: <Sparkles className="size-3" />,
  ocimeno: <Wind className="size-3" />,
  cariofileno: <Droplets className="size-3" />,
  humuleno: <Leaf className="size-3" />,
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 0,
  }).format(price)
}

function getStockStatus(stock: number): { label: string; className: string } {
  if (stock === 0) {
    return { label: "Agotado", className: "text-red-400" }
  }
  if (stock <= 5) {
    return { label: `${stock} disponibles`, className: "text-amber-400" }
  }
  return { label: "En stock", className: "text-emerald-400" }
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addToCart } = useCartStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const hasVariants = product.variants && product.variants.length > 0
  // const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddToCart = () => {
    if (!selectedVariant) return

    setIsSubmitting(true)

    setTimeout(() => {
      const productWithSelectedVariant = {
        ...product,
        variants: [selectedVariant]
      }

      addToCart(productWithSelectedVariant)

      setIsSubmitting(false)

      toast.success(`${productWithSelectedVariant.name} ${selectedVariant?.name} agregado al carrito`, {
        position: 'bottom-right'
      })
    }, 300)
  }
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product.variants?.[0] || null
  )
  const [isHovered, setIsHovered] = useState(false)

  const hasImage = product.images && product.images.length > 0
  const dominance = product.dominance
    ? dominanceConfig[product.dominance]
    : null
  const currentPrice = selectedVariant?.price || 0
  const currentStock = selectedVariant?.stock || 0
  const stockStatus = getStockStatus(currentStock)

  return (
    <>
      <article
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-2xl",
          "bg-gradient-to-b from-card/80 to-card/40",
          "border border-border/50",
          "backdrop-blur-xl",
          "transition-all duration-500 ease-out",
          "hover:border-emerald-500/30",
          "hover:shadow-[0_0_40px_-12px_rgba(16,185,129,0.25)]",
          "hover:-translate-y-1",
          className
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated gradient border effect */}
        <div
          className={cn(
            "absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500",
            "bg-gradient-to-r from-emerald-500/20 via-transparent to-emerald-500/20",
            "group-hover:opacity-100"
          )}
          style={{
            background: isHovered
              ? "linear-gradient(135deg, rgba(16,185,129,0.1) 0%, transparent 50%, rgba(16,185,129,0.1) 100%)"
              : "transparent",
          }}
        />

        {/* Image Section */}
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-muted/30 to-muted/10">
          {hasImage ? (
            <Image
              src={product.images![0].url}
              alt={product.images![0].alt || product.name}
              fill
              className={cn(
                "object-cover transition-transform duration-700 ease-out",
                "group-hover:scale-110"
              )}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative">
                <Leaf className="size-16 text-emerald-500/20" />
                <div className="absolute inset-0 animate-pulse">
                  <Leaf className="size-16 text-emerald-500/10" />
                </div>
              </div>
            </div>
          )}

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

          {/* Floating Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2">
            {product.classification && (
              <Badge
                className={cn(
                  "border border-emerald-500/30 bg-emerald-950/80 text-emerald-300",
                  "backdrop-blur-md shadow-lg",
                  "px-3 py-1 text-xs font-medium uppercase tracking-wider"
                )}
              >
                {product.classification}
              </Badge>
            )}
          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2">
            {dominance && (
              <Badge
                className={cn(
                  "border backdrop-blur-md shadow-lg",
                  "px-2.5 py-1 text-xs font-medium",
                  dominance.className
                )}
              >
                {dominance.label}
              </Badge>
            )}
            {product.thcEstimated && (
              <Badge
                className={cn(
                  "border border-amber-500/30 bg-amber-950/80 text-amber-300",
                  "backdrop-blur-md shadow-lg",
                  "px-2.5 py-1 text-xs font-medium"
                )}
              >
                THC {product.thcEstimated}
              </Badge>
            )}
          </div>

          {/* Cultivation badge */}
          {product.cultivationLine && (
            <div className="absolute bottom-3 left-3">
              <Badge
                variant="outline"
                className={cn(
                  "border-border/50 bg-card/80 text-muted-foreground",
                  "backdrop-blur-md",
                  "px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                )}
              >
                {product.cultivationLine}
              </Badge>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="relative flex flex-1 flex-col gap-4 p-5">
          {/* Header */}
          <div className="space-y-2">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {product.name}
            </h3>
            {product.shortDescription && (
              <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                {product.shortDescription}
              </p>
            )}
          </div>

          {/* Organoleptic Profile */}
          {product.organolepticProfile && (
            <div className="space-y-1.5">
              <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                Perfil
              </span>
              <p className="text-sm text-foreground/80">
                {product.organolepticProfile}
              </p>
            </div>
          )}

          {/* Aroma & Flavor */}
          {(product.aroma || product.flavor) && (
            <div className="grid grid-cols-2 gap-3">
              {product.aroma && (
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                    Aroma
                  </span>
                  <p className="text-xs text-foreground/70 line-clamp-2">
                    {product.aroma}
                  </p>
                </div>
              )}
              {product.flavor && (
                <div className="space-y-1">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                    Sabor
                  </span>
                  <p className="text-xs text-foreground/70 line-clamp-2">
                    {product.flavor}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Technical Highlights */}
          <div className="space-y-3">
            {/* Terpenes */}
            {product.technicalData?.terpenes &&
              product.technicalData.terpenes.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                    Terpenos
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.technicalData.terpenes.map((terpene) => (
                      <Badge
                        key={terpene}
                        variant="outline"
                        className={cn(
                          "border-emerald-500/20 bg-emerald-500/5 text-emerald-300/80",
                          "px-2 py-0.5 text-[10px] font-medium capitalize",
                          "transition-colors hover:bg-emerald-500/10"
                        )}
                      >
                        {terpeneIcons[terpene] || <Leaf className="size-3" />}
                        <span>{terpene}</span>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

            {/* Effects */}
            {product.technicalData?.effects &&
              product.technicalData.effects.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground/70">
                    Efectos
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {product.technicalData.effects.map((effect) => (
                      <Badge
                        key={effect}
                        variant="outline"
                        className={cn(
                          "border-violet-500/20 bg-violet-500/5 text-violet-300/80",
                          "px-2 py-0.5 text-[10px] font-medium capitalize",
                          "transition-colors hover:bg-violet-500/10"
                        )}
                      >
                        {effect}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
          </div>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Bottom Section - Price & Actions */}
          {hasVariants && (
            <div className="space-y-4 border-t border-border/30 pt-4">
              {/* Price & Stock */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-2xl font-bold tracking-tight text-foreground">
                    {formatPrice(currentPrice)}
                  </span>
                  <p className={cn("text-xs font-medium", stockStatus.className)}>
                    {stockStatus.label}
                  </p>
                </div>

                {/* Variant Selector */}
                {product.variants && product.variants.length > 1 && (
                  <Select
                    value={selectedVariant?.id.toString()}
                    onValueChange={(value) => {
                      const variant = product.variants?.find(
                        (v) => v.id.toString() === value
                      )
                      if (variant) setSelectedVariant(variant)
                    }}
                  >
                    <SelectTrigger className="w-24 border-border/50 bg-muted/30 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {product.variants.map((variant) => (
                        <SelectItem
                          key={variant.id}
                          value={variant.id.toString()}
                        >
                          {variant.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* Add to Cart Button */}
              <Button
                onClick={handleAddToCart}
                disabled={isSubmitting}
                className={cn(
                  "w-full gap-2",
                  "bg-emerald-600 text-white",
                  "hover:bg-emerald-500",
                  "transition-all duration-300",
                  "hover:shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)]",
                  "disabled:bg-muted disabled:text-muted-foreground"
                )}
              >
                <ShoppingCart className="size-4" />
                <span>{currentStock === 0 ? "Agotado" : "Agregar al carrito"}</span>
              </Button>
            </div>
          )}

          {/* No variants state */}
          {!hasVariants && (
            <div className="border-t border-border/30 pt-4">
              <Badge
                variant="outline"
                className="w-full justify-center border-amber-500/30 bg-amber-500/5 py-2 text-amber-300/80"
              >
                Próximamente disponible
              </Badge>
            </div>
          )}
        </div>
      </article>

    </>
  )
}
