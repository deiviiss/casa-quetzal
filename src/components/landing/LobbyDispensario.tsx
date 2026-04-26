"use client"

import { motion } from "framer-motion"

export default function LobbyDispensario() {
  return (
    <section className="relative py-16 md:py-24 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div className="text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-xs font-bold uppercase tracking-widest shadow-lg">
              <span className="mr-2">🛡️</span>
              Protocolo de Seguridad
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent uppercase tracking-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            DISPENSARIO DIGITAL
          </motion.h2>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-xl md:text-2xl font-bold text-slate-800 leading-tight">
              Acceso regulado, trazabilidad y participación dentro del ecosistema CQCS.
            </p>
            
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-teal-600 mx-auto rounded-full" />

            <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
              Nuestra plataforma digital no es un <span className="text-slate-800 font-semibold italic">marketplace abierto</span>. Es un <span className="text-emerald-600 font-bold">sistema de acceso controlado</span> a productos, genética y procesos desarrollados bajo trazabilidad, protocolos técnicos y un marco jurídico en construcción.
            </p>
          </motion.div>

          {/* Feature Grid for extra "premium" feel */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {[
              { icon: "📝", label: "Protocolos Técnicos" },
              { icon: "🔍", label: "Trazabilidad Total" },
              { icon: "⚖️", label: "Marco Jurídico" }
            ].map((item, i) => (
              <div key={i} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-slate-100 flex flex-col items-center gap-2 shadow-sm">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
