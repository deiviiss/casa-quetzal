"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function DigitalDispensary() {
  const memberships = [
    {
      title: "Consumer",
      price: "$8,500",
      period: "anual",
      description: "Acceso a productos con THC",
      gradient: "from-emerald-500 to-teal-600",
      icon: "/imgs/icon-consumers.png"
    },
    {
      title: "Productores",
      description: "Acceso a semillas certificadas y asistencia técnica",
      gradient: "from-amber-500 to-orange-600",
      icon: "/imgs/icon-productores.png"
    },
    {
      title: "Distribuidores",
      description: "Precios preferenciales y lotes exclusivos",
      gradient: "from-blue-500 to-indigo-600",
      icon: "/imgs/icon-distribuidor.svg"
    },
    {
      title: "Socios",
      description: "Participación en decisiones estratégicas",
      gradient: "from-purple-500 to-pink-600",
      icon: "/imgs/icon-socios.png"
    },
  ]

  return (
    <section className="relative py-20 md:py-28 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-lg">
              <span className="mr-2">✨</span>
              Plataforma Digital
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold pb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Dispensario Digital y Membresías
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Nuestra plataforma digital ofrece una experiencia única con{" "}
            <span className="font-semibold text-emerald-600">trazabilidad certificada</span>{" "}
            para todos nuestros productos.
          </motion.p>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16 max-w-6xl mx-auto">
          {memberships.map((membership, index) => (
            <motion.div
              key={membership.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <Link href="/memberships" className="block h-full cursor-pointer">
                {/* Card */}
                <div className="relative h-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden">
                  {/* Gradient accent bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${membership.gradient}`} />

                  {/* Icon */}
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
                    <div className="relative w-20 h-20">
                      <Image
                        src={membership.icon}
                        alt={`${membership.title} icon`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 text-slate-800">
                    {membership.title}
                  </h3>

                  {/* Price (if available) */}
                  {membership.price && (
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className={`text-3xl font-bold bg-gradient-to-r ${membership.gradient} bg-clip-text text-transparent`}>
                          {membership.price}
                        </span>
                        <span className="text-slate-500 text-sm">/{membership.period}</span>
                      </div>
                    </div>
                  )}

                  {/* Description */}
                  <p className="text-slate-600 leading-relaxed">
                    {membership.description}
                  </p>

                  {/* Hover effect gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${membership.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl`} />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
        >
          <Link
            href="memberships"
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-full text-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            <span>Explora las Membresías</span>
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

