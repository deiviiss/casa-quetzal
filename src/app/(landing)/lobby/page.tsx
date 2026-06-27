import { auth } from "@/auth"
import CallToAction from "@/components/landing/CallToActionMemberships"
import HeroSection from "@/components/landing/HeroSection"
import LobbyDispensario from "@/components/landing/LobbyDispensario"
import LoginCTA from "@/components/landing/LoginCTA"
import { Carousel, CarouselImage } from "@/components/ui/carousel"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Lobby - Casa Quetzal Cannabis Seeds",
  description:
    "Descubre nuestros productos premium de cáñamo: semillas certificadas, pre-rolados, cremas CBD y más. Calidad y trazabilidad garantizadas.",
}

const carouselItems: CarouselImage[] = [
  {
    url: "/carrousel/c1.jpg",
    alt: "Instalaciones de cultivo CQCS",
    title: "Infraestructura de Invernadero",
    description: "Cultivos de interior y exterior en un entorno controlado con los estándares técnicos más estrictos.",
  },
  {
    url: "/carrousel/c2.jpg",
    alt: "Plantas en floración",
    title: "Flores de Interior y Exterior",
    description: "Variedades seleccionadas bajo un estricto protocolo de investigación y trazabilidad integral.",
  },
  {
    url: "/carrousel/c3.jpg",
    alt: "Genéticas exclusivas",
    title: "Semillas Certificadas",
    description: "Conservación de acahuales y desarrollo genético enfocado en la estabilidad y calidad.",
  },
  {
    url: "/carrousel/c4.jpg",
    alt: "Control de calidad",
    title: "Ecosistema Trazable CQCS",
    description: "Acceso regulado y participación comunitaria dentro de un marco jurídico en desarrollo.",
  },
  {
    url: "/carrousel/c5.jpg",
    alt: "Cuidado orgánico y biológico",
    title: "Cuidado Orgánico y Biológico",
    description: "Aplicamos biofertilizantes y métodos de control biológico respetuosos con el medio ambiente.",
  },
  {
    url: "/carrousel/c6.jpg",
    alt: "Cosecha y maduración de tricomas",
    title: "Cosecha en el Punto Justo",
    description: "Nuestros cultivadores determinan el punto exacto de madurez de los tricomas para cosechar.",
  },
  {
    url: "/carrousel/c7.jpg",
    alt: "Secado y curado en condiciones controladas",
    title: "Secado y Curado Controlado",
    description: "Procesamos las flores en condiciones de temperatura y humedad reguladas para preservar los terpenos.",
  }
]

export default async function LobbyPage() {
  const session = await auth()

  return (
    <main className="min-h-screen">
      <HeroSection
        title="Acceso exclusivo a flores"
        subtitle="De interior y exterior"
        desktopImage="/imgs/desktop4.png"
        mobileImage="/imgs/mobile4.png"
        imageAlt="Variedad de productos de cáñamo de CQCS"
        ctaLink={session?.user ? "/platform/dispensary" : "/auth/login"}
        ctaText={session?.user ? "Ir al Dispensario" : "Iniciar sesión"}
      />
      <LobbyDispensario />

      {/* Sección de Galería de Procesos */}
      <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full mb-3 inline-block">
              Galería de Procesos
            </span>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-900 bg-clip-text text-transparent uppercase tracking-tight mb-4">
              Nuestro Ecosistema en Acción
            </h2>
            <p className="text-slate-600 text-base md:text-lg max-w-2xl mx-auto">
              Explora las instalaciones, los procesos y el desarrollo técnico detrás de nuestras genéticas seleccionadas.
            </p>
          </div>
          <Carousel
            items={carouselItems}
            autoplayDelay={4500}
            aspectRatio="aspect-[16/9] md:aspect-[21/9]"
            showProgress={true}
          />
        </div>
      </section>

      <LoginCTA isLoggedIn={!!session?.user} />
      <CallToAction
        title="¿Tienes dudas? Escríbenos y te asesoramos en tu compra"
        buttonText="Chatear con un Asesor"
        buttonLink={`https://wa.me/529999688834?text=Hola%2C%20me%20gustar%C3%ADa%20hablar%20con%20un%20asesor%20para%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20los%20productos.`}
      />
    </main>
  )
}

