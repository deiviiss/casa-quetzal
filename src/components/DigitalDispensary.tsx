"use client"

import { motion } from "framer-motion"

export default function DigitalDispensary() {
  return (
    <section className="py-16 bg-gray-50 w-full">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Dispensario Digital y Membresías
        </motion.h2>
        <motion.p
          className="text-lg mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Nuestra plataforma digital ofrece una experiencia única con trazabilidad certificada para todos nuestros
          productos.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "Consumer", price: "$139/mes", firstTime: "$69.50", description: "Acceso a productos con THC" },
            { title: "Productores", description: "Acceso a semillas certificadas y asistencia técnica" },
            { title: "Distribuidores", description: "Precios preferenciales y lotes exclusivos" },
            { title: "Socios", description: "Participación en decisiones estratégicas" },
          ].map((membership, index) => (
            <motion.div
              key={membership.title}
              className="bg-white p-6 rounded-lg shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <h3 className="text-xl font-semibold mb-2">{membership.title}</h3>
              {membership.price && <p className="text-lg font-bold mb-2">{membership.price}</p>}
              {membership.firstTime && <p className="text-sm mb-2">Primera vez: {membership.firstTime}</p>}
              <p className="text-gray-600">{membership.description}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="memberships"
            className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
          >
            Explora las Membresías
          </a>
        </motion.div>
      </div>
    </section>
  )
}

