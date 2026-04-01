import CallToAction from "@/components/landing/CallToActionMemberships"
import HeroSection from "@/components/landing/HeroSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lobby - Casa Quetzal Cannabis Seeds",
  description:
    "Descubre nuestros productos premium de cáñamo: semillas certificadas, pre-rolados, cremas CBD y más. Calidad y trazabilidad garantizadas.",
}

export default async function LobbyPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Acceso exclusivo a flores"
        subtitle="De interior y exterior"
        desktopImage="/imgs/desktop4.png"
        mobileImage="/imgs/mobile4.png"
        imageAlt="Variedad de productos de cáñamo de CQCS"
        ctaLink="/auth/login"
        ctaText="Iniciar sesión"
      />
      <CallToAction
        title="¿Tienes dudas? Escríbenos y te asesoramos en tu compra"
        buttonText="Chatear con un Asesor"
        buttonLink={`https://wa.me/529999688834?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20con%20un%20asesor%20para%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos.`}
      />
    </main>
  )
}

