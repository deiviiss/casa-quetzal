import { getProducts } from "@/actions/products/get-products"
import CallToAction from "@/components/landing/CallToActionMemberships"
import HeroSection from "@/components/landing/HeroSection"
import ProductCards from "@/components/landing/ProductCards"
import ProductStructuredData from "@/components/landing/ProductStructuredData"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Productos - Casa Quetzal Cannabis Seeds",
  description:
    "Descubre nuestros productos premium de cáñamo: semillas certificadas, pre-rolados, cremas CBD y más. Calidad y trazabilidad garantizadas.",
}

export default async function Products() {
  const { products } = await getProducts()

  return (
    <main className="min-h-screen">
      {/* SEO */}
      <ProductStructuredData products={products} />
      <HeroSection
        title="Descubre nuestros productos"
        subtitle="Semillas certificadas, productos derivados y más, con trazabilidad garantizada"
        desktopImage="/imgs/desktop2.png"
        mobileImage="/imgs/mobile2.png"
        imageAlt="Variedad de productos de cáñamo de CQCS"
      />
      <ProductCards products={products} />
      <CallToAction
        title="¿Tienes dudas? Escríbenos y te asesoramos en tu compra"
        buttonText="Chatear con un Asesor"
        buttonLink={`https://wa.me/529811786377?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20con%20un%20asesor%20para%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos.`}
      />
    </main>
  )
}

