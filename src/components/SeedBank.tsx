"use client"

import { motion } from "framer-motion"

export default function SeedBank() {
  return (
    <section className="py-16 relative overflow-hidden max-w-7xl mx-auto">
      {/* Faded background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 pointer-events-none"
        style={{ backgroundImage: "url('/imgs/background.png')" }}
      />
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Banco de Semillas y Genética
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-3">Mejora Genética y Estabilidad Fenotípica</h3>
            <p className="text-lg mb-4">
              Nuestro enfoque en la mejora genética nos permite ofrecer semillas de cáñamo con características
              superiores y una estabilidad fenotípica excepcional.
            </p>
            <h3 className="text-2xl font-semibold mb-3">Producción Sin Fertilizantes Sintéticos</h3>
            <p className="text-lg mb-4">
              Cultivamos nuestras plantas sin el uso de fertilizantes sintéticos, lo que resulta en productos más puros
              y respetuosos con el medio ambiente.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-3">Genética CQCS</h3>
            <p className="text-lg mb-2">
              Xbalanqué (exterior) y Hunapú (interior) son nuestras primeras líneas genéticas propias.
            </p>
            <p className="text-lg mb-4">
              Forman parte de un programa de conservación y desarrollo varietal enfocado en adaptación local, estabilidad y trazabilidad, con nuevas genéticas en desarrollo.
            </p>
            <div className="bg-gray-100 p-4 rounded-lg">
              <h4 className="text-xl font-semibold mb-2">Comparativa con Fedora 17</h4>
              <ul className="list-disc list-inside">
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

