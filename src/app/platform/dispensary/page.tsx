import { ProductGrid } from "@/components/platform/dispensary/ProductGrid"
import { products } from "@/data/products"
import { Leaf } from "lucide-react"
import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <header className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-card/50 to-transparent">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="flex flex-col items-center text-center">
            {/* Logo / Brand */}
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Leaf className="size-10 text-emerald-500" />
                <div className="absolute inset-0 animate-pulse">
                  <Leaf className="size-10 text-emerald-500/50" />
                </div>
              </div>
              <span className="text-2xl font-bold tracking-wider text-foreground">
                CQCS
              </span>
            </div>

            <h1 className="max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Genéticas Premium de{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Cannabis
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Selección artesanal de las mejores variedades. Calidad, pureza y
              excelencia en cada producto.
            </p>

            {/* Stats */}
            <div className="mt-10 flex items-center gap-8 text-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">3+</span>
                <span className="text-muted-foreground">Genéticas</span>
              </div>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">100%</span>
                <span className="text-muted-foreground">Artesanal</span>
              </div>
              <div className="h-8 w-px bg-border/50" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">Premium</span>
                <span className="text-muted-foreground">Calidad</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Products Section */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Catálogo
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Explora nuestra colección de genéticas y productos
            </p>
          </div>
          <div className="hidden items-center gap-2 text-xs text-muted-foreground sm:flex">
            <span className="flex size-2 rounded-full bg-emerald-500" />
            <span>{products.length} productos disponibles</span>
          </div>
        </div>

        <ProductGrid products={products} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border/30 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.webp"
                alt="Casa Quetzal"
                width={50}
                height={50}
                className="opacity-50"
              />
              <span>MOTA (Mejores Oportunidades de Trabajo Agricola)</span>
            </div>
            <p className="text-xs">
              Producto exclusivo para adultos mayores de 18 años
            </p>
          </div>
        </div>

        <div className="mt-0 pt-8 border-t border-gray-800 text-center text-xs text-gray-400 tracking-wider">
          <p className='font-light text-gray-400'>
            Casa Quetzal Cannabis Seeds® es una marca registrada conforme a las disposiciones aplicables en materia de propiedad industrial.
          </p>

          <p className='font-light text-gray-400'>
            El uso, reproducción o distribución no autorizada constituye una infracción susceptible de acciones legales.
            Proyecto piloto autorizado en el marco de Producción Primaria con Cannabis psicoactivo y no psicoactivo, en cumplimiento del Protocolo de Investigación registrado bajo el expediente EXP. 354/2022-VI-B.
          </p>
          <p className='font-light text-gray-400'>
            Las flores exhibidas provienen exclusivamente de productores formalmente vinculados al citado protocolo, en observancia de la normatividad vigente.
          </p>
        </div>
      </footer>
    </main>
  )
}
