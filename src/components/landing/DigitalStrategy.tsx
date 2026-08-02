"use client"

import { motion } from "framer-motion"
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function DigitalStrategy() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Estrategia Digital y Expansión
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">Enfoque en SEO y Redes Sociales</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Optimizamos nuestra presencia en línea para llegar a más personas interesadas en el cáñamo y sus
              beneficios.
            </p>
            <div className="flex space-x-4 mb-6">
              <a href="https://www.instagram.com/casaquetzalcannabisseeds/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Casa Quetzal">
                <FaInstagram className="text-3xl text-pink-600 hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.tiktok.com/@quetzalseeds420" target="_blank" rel="noopener noreferrer" aria-label="TikTok de Casa Quetzal">
                <FaTiktok className="text-3xl text-black hover:scale-110 transition-transform" />
              </a>
              <a href="https://www.facebook.com/QuetzalSeeds420" target="_blank" rel="noopener noreferrer" aria-label="Facebook de Casa Quetzal">
                <FaFacebookF className="text-3xl text-blue-600 hover:scale-110 transition-transform" />
              </a>
              <a href="https://youtube.com/@quetzalseeds420" target="_blank" rel="noopener noreferrer" aria-label="YouTube de Casa Quetzal">
                <FaYoutube className="text-3xl text-red-600 hover:scale-110 transition-transform" />
              </a>
              <a href="https://x.com/QuetzalSeeds420" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter) de Casa Quetzal">
                <FaXTwitter className="text-3xl text-black hover:scale-110 transition-transform" />
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">Contenido Educativo</h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Creamos videos educativos y contenido informativo para educar a nuestra comunidad sobre los beneficios y
              usos del cáñamo.
            </p>
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">Optimización de Procesos</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              Mejoramos constantemente nuestros procesos de membresía y trazabilidad para ofrecer la mejor experiencia a
              nuestros clientes.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

