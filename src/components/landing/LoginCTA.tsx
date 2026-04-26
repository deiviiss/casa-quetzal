"use client"

import { motion } from "framer-motion"
import Link from "next/link"

interface LoginCTAProps {
  isLoggedIn: boolean
}

export default function LoginCTA({ isLoggedIn }: LoginCTAProps) {
  if (isLoggedIn) return null

  return (
    <section className="py-12 bg-slate-900 overflow-hidden relative">
      {/* Abstract background shape */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-emerald-500/10 skew-x-12 transform origin-right pointer-events-none" />
      
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
          <div className="text-center md:text-left space-y-3">
            <h3 className="text-2xl md:text-3xl font-bold text-white">
              ¿Ya eres miembro?
            </h3>
            <p className="text-slate-400 max-w-md">
              Inicia sesión para acceder a tu perfil personalizado, historial de trazabilidad y beneficios exclusivos de la comunidad CQCS.
            </p>
          </div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all"
            >
              <span>Iniciar Sesión</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
