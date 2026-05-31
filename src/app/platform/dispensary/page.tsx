import { ProductGrid } from "@/components/platform/dispensary/products/ProductGrid"
import { products } from "@/data/products"
import Image from "next/image"

export default function Home() {
  const mobileImage = '/imgs/hero-dispensary-mobile.png'
  const desktopImage = '/imgs/hero-dispensary.png'
  const imageAlt = 'Cultivos regenerativos de cáñamo'

  return (
    <main className="min-h-screen">
      <header className="relative overflow-hidden border-b border-border/30 bg-gradient-to-b from-card/50 to-transparent">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 2px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/10 blur-3xl" />
        <div
          className="absolute inset-0 w-full h-full"
        >
          {/* mobile */}
          <Image
            src={mobileImage}
            alt={imageAlt}
            fill
            className="object-cover sm:hidden"
            quality={100}
            priority
          />

          {/* desktop */}
          <Image
            src={desktopImage}
            alt={imageAlt}
            fill
            className="object-cover hidden sm:block"
            quality={100}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

          <div className="flex flex-col items-center text-center">
            {/* Logo / Brand */}
            <div className="mb-6 flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/logo.webp"
                  alt="logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  priority
                />
              </div>
            </div>

            <h1 className="dark max-w-3xl text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Genéticas Premium de{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                Cannabis
              </span>
            </h1>

            <p className="dark mt-6 max-w-xl text-pretty text-lg leading-relaxed text-secondary-foreground/70">
              Selección artesanal de las mejores variedades. Calidad, pureza y
              excelencia en cada producto.
            </p>

            {/* Stats */}
            <div className="dark mt-10 flex items-center gap-8 text-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">3+</span>
                <span className="text-secondary-foreground">Genéticas</span>
              </div>
              <div className="h-8 w-px bg-secondary-foreground" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">100%</span>
                <span className="text-secondary-foreground">Artesanal</span>
              </div>
              <div className="h-8 w-px bg-secondary-foreground" />
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl font-bold text-emerald-400">Premium</span>
                <span className="text-secondary-foreground">Calidad</span>
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
    </main>
  )
}
