"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function SeedBank() {
  return (
    <section className="py-16 relative overflow-hidden mx-auto">
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50" />

      {/* Responsive background image - desktop only */}
      <div
        className="hidden md:block absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: "url('/imgs/background.webp')" }}
      />

      {/* Mobile image */}
      <div className="md:hidden absolute inset-0 opacity-20 pointer-events-none">
        <Image
          src="/imgs/background.webp"
          alt="Semillas de cáñamo"
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Logo Milpa - Posicionado con Tailwind relative y absolute */}
      <div className="absolute -bottom-1 right-2 w-48 h-28 sm:w-48 sm:h-32 md:w-56 md:h-36 md:bottom-5 md:left-20 z-20 pointer-events-none opacity-90 drop-shadow-md">
        <div className="relative w-full h-full">
          <Image
            src="/logo_milpa.webp"
            alt="Logo Milpa"
            fill
            sizes="(max-width: 768px) 224px, 224px"
            className="object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Banco de Semillas y Genética
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">Mejora Genética y Estabilidad Fenotípica</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Nuestro enfoque en la mejora genética nos permite ofrecer semillas de cáñamo con características
              superiores y una estabilidad fenotípica excepcional.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">Producción Sin Fertilizantes Sintéticos</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Cultivamos nuestras plantas sin el uso de fertilizantes sintéticos, lo que resulta en productos más puros
              y respetuosos con el medio ambiente.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">Genética CQCS</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Xbalanqué (exterior) y Hunapú (interior) son nuestras primeras líneas genéticas propias.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Forman parte de un programa de conservación y desarrollo varietal enfocado en adaptación local, estabilidad y trazabilidad, con nuevas genéticas en desarrollo.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-xl font-semibold mb-2 text-emerald-900">Comparativa con Fedora 17</h4>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-6">
                <li>Mayor resistencia a plagas y enfermedades</li>
                <li>Rendimiento superior en condiciones climáticas variadas</li>
                <li>Perfil de cannabinoides optimizado</li>
                <li>Mejor adaptación a las condiciones locales de México</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

