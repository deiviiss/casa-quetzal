import { getProducts } from "@/actions/products/get-products";
import AboutUs from "@/components/landing/AboutUs";
import CallToAction from "@/components/landing/CallToActions";
import DigitalDispensary from "@/components/landing/DigitalDispensary";
import DigitalStrategy from "@/components/landing/DigitalStrategy";
import FeaturedProducts from "@/components/landing/FeaturedProducts";
import HeroSection from "@/components/landing/HeroSection";
import SeedBank from "@/components/landing/SeedBank";

export default async function Home() {
  const { products } = await getProducts()
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Banco de semillas de cáñamo y cannabis integrado a la Milpa"
        subtitle="Producción agrícola sustentable, conservación genética y trazabilidad jurídica desde el campo mexicano"
        ctaLink="https://www.facebook.com/QuetzalSeeds420"
        ctaText="Únete a nuestra comunidad"
        desktopImage="/imgs/desktop.webp"
        mobileImage="/imgs/mobile.webp"
        imageAlt="Cultivos regenerativos de cáñamo"
      />
      <>
        <AboutUs />
        <SeedBank />
        <DigitalDispensary />
        <FeaturedProducts products={products} />
        <DigitalStrategy />
        <CallToAction />
      </>
    </main>
  )
}
