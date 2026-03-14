import { getProducts } from "@/actions/products/get-products";
import AboutUs from "@/components/AboutUs";
import CallToAction from "@/components/CallToActions";
import DigitalDispensary from "@/components/DigitalDispensary";
import DigitalStrategy from "@/components/DigitalStrategy";
import FeaturedProducts from "@/components/FeaturedProducts";
import HeroSection from "@/components/HeroSection";
import SeedBank from "@/components/SeedBank";

export default async function Home() {
  const { products } = await getProducts()
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Banco de semillas de cáñamo y cannabis integrado a la Milpa"
        subtitle="Producción agrícola sustentable, conservación genética y trazabilidad jurídica desde el campo mexicano"
        ctaLink="https://www.facebook.com/QuetzalSeeds420"
        ctaText="Únete a nuestra comunidad"
        desktopImage="/imgs/hero-background.webp"
        mobileImage="/imgs/hero-background-mobile.webp"
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
