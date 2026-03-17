"use client"

import { motion } from "framer-motion"
import { FaInstagram, FaTiktok, FaFacebookF } from "react-icons/fa"

export default function DigitalStrategy() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Estrategia Digital y Expansión
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4">Enfoque en SEO y Redes Sociales</h3>
            <p className="text-lg mb-4">
              Optimizamos nuestra presencia en línea para llegar a más personas interesadas en el cáñamo y sus
              beneficios.
            </p>
            <div className="flex space-x-4 mb-6">
              <FaInstagram className="text-3xl text-pink-600" />
              <FaTiktok className="text-3xl text-black" />
              <FaFacebookF className="text-3xl text-blue-600" />
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4">Contenido Educativo</h3>
            <p className="text-lg mb-4">
              Creamos videos educativos y contenido informativo para educar a nuestra comunidad sobre los beneficios y
              usos del cáñamo.
            </p>
            <h3 className="text-2xl font-semibold mb-4">Optimización de Procesos</h3>
            <p className="text-lg">
              Mejoramos constantemente nuestros procesos de membresía y trazabilidad para ofrecer la mejor experiencia a
              nuestros clientes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

