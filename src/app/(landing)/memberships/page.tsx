import CallToAction from "@/components/landing/CallToActionMemberships"
import HeroSection from "@/components/landing/HeroSection"
import MembershipCards from "@/components/landing/MembershipCards"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Membresías - Casa Quetzal Cannabis Seeds",
  description:
    "Explora nuestras membresías exclusivas y elige la que mejor se adapte a tus necesidades. Accede a productos premium, descuentos y contenido exclusivo.",
}

export default function MembershipPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Sistema RTQ"
        subtitle="Agricultura tradicional aplicada con lógica de conservación y producción sustentable"
        desktopImage="/imgs/desktop3.png"
        mobileImage="/imgs/mobile.png"
        imageAlt="Comunidad CQCS y beneficios de membresía"
      />
      <MembershipCards />
      <CallToAction
        title="Forma parte de la comunidad CQCS y accede a beneficios exclusivos"
        buttonText="Elige tu Membresía"
        buttonLink="#membership-cards"
      />
    </main>
  )
}

