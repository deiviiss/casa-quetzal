// import { ProductList } from "@/components/platform/dispensary/ProductList";
// import { DispensaryProduct } from "@/interfaces/product.interface";

// const MOCK_PRODUCTS: DispensaryProduct[] = [
//   {
//     id: '1',
//     name: 'Blue Dream',
//     thc: '20%',
//     type: 'Hybrid',
//     description: 'Un híbrido de predominancia sativa conocido por su dulce aroma a bayas y una relajación de cuerpo completo con una suave vigorización cerebral.'
//   },
//   {
//     id: '2',
//     name: 'Sour Diesel',
//     thc: '22%',
//     type: 'Sativa',
//     description: 'De acción rápida y energizante, Sour Diesel tiene un aroma penetrante a diesel y efectos duraderos perfectos para el uso diurno.'
//   },
//   {
//     id: '3',
//     name: 'Granddaddy Purple',
//     thc: '19%',
//     type: 'Indica',
//     description: 'Un famoso cruce índica que hereda un complejo aroma a uva y bayas. Perfecto para el manejo del dolor y la relajación.'
//   },
//   {
//     id: '4',
//     name: 'OG Kush',
//     thc: '23%',
//     type: 'Hybrid',
//     description: 'Una cepa legendaria con un perfil de terpenos único que cuenta con un complejo aroma a combustible, mofeta y especias.'
//   }
// ];

// export default function DispensaryPage() {
//   return (
//     <div className="space-y-6">
//       <ProductList products={MOCK_PRODUCTS} />
//     </div>
//   );
// }

// import { ProductCard } from "@/components/platform/dispensary/ProductCard"
// import type { DispensaryProduct as Product } from "@/interfaces/product.interface"

// interface ProductGridProps {
//   products: Product[]
//   className?: string
// }

// export function ProductGrid({ products, className }: ProductGridProps) {
//   return (
//     <div
//       className={`grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className ?? ""}`}
//     >
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   )
// }
import { ProductGrid } from "@/components/platform/dispensary/ProductGrid"
import { products } from "@/data/products"
import { Leaf } from "lucide-react"

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
              <Leaf className="size-4 text-emerald-500/50" />
              <span>CQCS — Selección Artesanal</span>
            </div>
            <p className="text-xs">
              Producto exclusivo para adultos mayores de 18 años
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
