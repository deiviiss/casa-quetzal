"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface Membership {
  id: string
  title: string
  icon: string
  price?: string
  period?: string
  benefits: string[]
  buttonText: string
  gradient: string
  description: string
}

interface MembershipCardProps {
  membership: Membership
  index: number
  onOpenRTQ?: () => void
}

const memberships: Membership[] = [
  {
    id: "consumer",
    title: "Consumer",
    icon: "/imgs/icon-consumers.png",
    price: "$8,499 MXN",
    period: "anual",
    description: "Acceso al protocolo de investigación CQCS",
    gradient: "from-emerald-500 to-teal-600",
    benefits: [
      "1 onza mensual de genética de interior seleccionada",
      "3.5 g mensuales de genética en desarrollo",
      "Acceso anticipado a nuevas variedades",
      "Descuentos exclusivos en productos y experiencias CQCS",
      "Credencial de miembro con trazabilidad individual",
    ],
    buttonText: "Únete al Protocolo",
  },
  {
    id: "productores",
    title: "Productores",
    icon: "/imgs/icon-productores.png",
    description: "Acceso a semillas certificadas y acompañamiento técnico",
    gradient: "from-amber-500 to-orange-600",
    benefits: [
      "Material genético CQCS certificado",
      "Asistencia agronómica especializada",
      "Integración a esquemas de trazabilidad",
      "Participación en economía circular",
      "Protocolos productivos establecidos",
    ],
    buttonText: "Ser Productor",
  },
  {
    id: "distribuidores",
    title: "Distribuidores",
    icon: "/imgs/icon-distribuidor.svg",
    description: "Acceso preferencial a productos y lotes específicos",
    gradient: "from-blue-500 to-indigo-600",
    benefits: [
      "Precios diferenciados por volumen",
      "Lotes exclusivos con trazabilidad completa",
      "Relación directa con origen productivo",
      "Acceso a productos de edición limitada",
      "Soporte comercial y técnico",
    ],
    buttonText: "Ser Distribuidor",
  },
  {
    id: "socios",
    title: "Socios",
    icon: "/imgs/icon-socios.png",
    description: "Participación estratégica dentro del ecosistema CQCS",
    gradient: "from-purple-500 to-pink-600",
    benefits: [
      "Acceso a información estratégica del proyecto",
      "Participación en decisiones clave",
      "Vinculación con desarrollo genético",
      "Participación en expansión del modelo",
      "Red de networking exclusiva",
    ],
    buttonText: "Forma Parte",
  },
]

export default function MembershipCards() {
  const [isRTQModalOpen, setIsRTQModalOpen] = useState(false)

  return (
    <section id="membership-cards" className="relative py-20 md:py-28 w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-sm font-semibold shadow-lg">
              <span className="mr-2">🔒</span>
              Acceso Controlado
            </span>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold pb-6 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-900 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            Membresías CQCS
          </motion.h2>

          <motion.div
            className="space-y-4 text-slate-600 leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <p className="text-lg md:text-xl">
              <span className="font-semibold text-slate-800">Acceso regulado, trazabilidad y participación</span> dentro del ecosistema CQCS.
            </p>
            <p className="text-base md:text-lg max-w-3xl mx-auto">
              Nuestra plataforma digital no es un marketplace abierto. Es un{" "}
              <span className="font-semibold text-emerald-600">sistema de acceso controlado</span>{" "}
              a productos, genética y procesos desarrollados bajo trazabilidad, protocolos técnicos y un marco jurídico en construcción.
            </p>
          </motion.div>
        </div>

        {/* Membership Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 max-w-6xl mx-auto">
          {memberships.map((membership, index) => (
            <MembershipCard
              key={membership.id}
              membership={membership}
              index={index}
              onOpenRTQ={membership.title === "Productores" ? () => setIsRTQModalOpen(true) : undefined}
            />
          ))}
        </div>
      </div>

      <RTQModal isOpen={isRTQModalOpen} onClose={() => setIsRTQModalOpen(false)} />
    </section>
  )
}

function MembershipCard({ membership, index, onOpenRTQ }: MembershipCardProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const isConsumer = membership.id === "consumer"

  const currentMembership = (isConsumer && billingCycle === "monthly") ? {
    ...membership,
    price: "$99 MXN",
    period: "mensual",
    description: "Ecosistema flexible con beneficios comerciales",
    benefits: [
      "Acceso al Entorno Digital CQCS",
      "Tarifas y Descuentos Preferenciales",
      "Servicio de Envío a Domicilio Directo",
      "Logística Simplificada y Eficiente",
      "Cobertura en zonas con operación activa",
    ],
  } : membership

  return (
    <motion.div
      className="group relative h-full"
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
    >
      {/* Card */}
      <div className="relative h-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-200/50 overflow-hidden flex flex-col">
        {/* Gradient accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${currentMembership.gradient}`} />

        {/* Icon */}
        <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300 flex justify-center">
          <div className="relative w-20 h-20">
            <Image
              src={currentMembership.icon}
              alt={`${currentMembership.title} icon`}
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold mb-2 text-slate-800">
          {currentMembership.title}
        </h3>

        {/* Billing Toggle (Only for Consumer) */}
        {isConsumer && (
          <div className="mb-6">
            <div className="flex items-center gap-3 bg-slate-50 p-1.5 rounded-lg border border-slate-100 w-fit">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${billingCycle === "monthly" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                MENSUAL
              </button>
              <button
                onClick={() => setBillingCycle("annual")}
                className={`text-[10px] px-2.5 py-1 rounded-md font-bold transition-all ${billingCycle === "annual" ? "bg-emerald-500 text-white shadow-sm" : "text-slate-400 hover:text-slate-600"}`}
              >
                ANUAL
              </button>
            </div>
          </div>
        )}

        {/* Description & Price AnimatePresence */}
        <div className="min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentMembership.id}-${billingCycle}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.3 }}
            >
              <p className="text-sm text-slate-500 mb-4 italic">
                {currentMembership.description}
              </p>

              {currentMembership.price && (
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className={`text-3xl font-bold bg-gradient-to-r ${currentMembership.gradient} bg-clip-text text-transparent`}>
                      {currentMembership.price}
                    </span>
                    {currentMembership.period && (
                      <span className="text-slate-500 text-sm">/{currentMembership.period}</span>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Benefits AnimatePresence */}
        <div className="flex-grow">
          <AnimatePresence mode="wait">
            <motion.ul
              key={`${currentMembership.id}-${billingCycle}`}
              className="space-y-3"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              {currentMembership.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start text-sm text-slate-600">
                  <svg
                    className="w-5 h-5 mr-2 text-emerald-500 flex-shrink-0 mt-0.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="leading-snug">{benefit}</span>
                </li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Buttons */}
        <div className="space-y-3 mt-8">
          {onOpenRTQ && (
            <button
              onClick={onOpenRTQ}
              className={`w-full inline-flex items-center justify-center gap-2 bg-white border-2 border-amber-500 text-amber-600 hover:bg-amber-50 font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              <span>Conoce RTQ</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}

          <Link
            href={`https://wa.me/529999688834?text=Hola%2C%20deseo%20m%C3%A1s%20informaci%C3%B3n%20acerca%20de%20la%20membres%C3%ADa%20${currentMembership.title}%20(${currentMembership.period || 'anual'})`}
            target="_blank"
            className={`group/btn w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r ${currentMembership.gradient} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-xl`}
          >
            <span>{currentMembership.buttonText}</span>
            <svg
              className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Hover effect gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${currentMembership.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl pointer-events-none`} />
      </div>
    </motion.div>
  )
}

function RTQModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity"
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 right-0 p-4 bg-white/80 backdrop-blur-md z-10 flex justify-end border-b border-slate-100">
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="p-8 md:p-12 space-y-8">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                    Roza, Tumba y Quema con lógica de conservación
                  </h3>
                  <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                    El sistema RTQ es una práctica agrícola mesoamericana documentada desde el siglo XVI, utilizada históricamente para el manejo sostenible del territorio.
                  </p>
                </div>

                <div className="space-y-8 text-slate-700 leading-relaxed">
                  <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
                    <h4 className="text-xl font-bold text-amber-800 mb-3 flex items-center gap-2">
                      <span className="text-2xl">🌱</span>
                      Lógica Original
                    </h4>
                    <p>
                      Lejos de ser un método extractivo, su lógica original se basa en la <strong>rotación del uso del suelo</strong>, la regeneración natural de los acahuales y el mantenimiento de la fertilidad a largo plazo.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-4">RTQ en la tradición mesoamericana</h4>
                    <p className="mb-4">
                      Fray Bernardino de Sahagún, en la <em>Historia General de las Cosas de Nueva España</em>, documenta que los pueblos indígenas no explotaban el suelo de manera permanente, sino que alternaban periodos de cultivo con descanso del terreno.
                    </p>
                    <p className="pl-4 border-l-4 border-amber-500 italic text-slate-600">
                      &quot;La quema controlada tenía una función clara: reciclar nutrientes, controlar plagas y preparar el suelo sin romper su estructura viva.&quot;
                    </p>
                    <p className="mt-4">
                      Este sistema estaba integrado a la <strong>Milpa</strong>, donde maíz, frijol, calabaza y otras especies convivían con arvenses y vegetación secundaria, generando resiliencia ecológica y alimentaria.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-2xl font-bold text-slate-800 mb-4">La lectura agronómica moderna</h4>
                    <p className="mb-4">Investigaciones contemporáneas, como las documentadas por Lambert, muestran que el RTQ bien manejado:</p>
                    <ul className="grid md:grid-cols-2 gap-4">
                      {[
                        "No degrada el suelo cuando se respetan los tiempos de descanso",
                        "Favorece la actividad microbiana y la estructura edáfica",
                        "Permite la regeneración de biodiversidad en los acahuales",
                        "Reduce la dependencia de fertilizantes y agroquímicos externos"
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3 bg-slate-50 p-4 rounded-xl">
                          <svg className="w-5 h-5 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-center font-medium text-slate-600">
                      El problema no es el sistema, sino su descontextualización cuando se aplica sin rotación, sin descanso y sin conocimiento del territorio.
                    </p>
                  </div>

                  <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                    <h4 className="text-2xl font-bold mb-6 relative z-10">RTQ aplicado por CQCS</h4>
                    <p className="mb-6 text-slate-300 relative z-10">
                      En Casa Quetzal Cannabis Seeds, el RTQ se implementa como un <strong>sistema agrícola de conservación</strong>, no como una práctica de quema indiscriminada. Nuestro modelo integra:
                    </p>
                    <div className="grid md:grid-cols-2 gap-6 relative z-10">
                      {[
                        { title: "Milpa Maya", desc: "Como base productiva" },
                        { title: "Periodos Definidos", desc: "Uso y descanso del suelo" },
                        { title: "Conservación Activa", desc: "De acahuales y monte" },
                        { title: "Integración del Cáñamo", desc: "Cultivo estructurante y restaurador" }
                      ].map((item, i) => (
                        <div key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm">
                          <h5 className="font-bold text-amber-400">{item.title}</h5>
                          <p className="text-sm text-slate-400">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                    <p className="mt-6 text-center text-slate-300 italic border-t border-white/10 pt-6">
                      &quot;El objetivo no es maximizar ciclos, sino preservar la capacidad productiva del territorio y asegurar estabilidad a largo plazo.&quot;
                    </p>
                  </div>

                  <div className="text-center pt-8 border-t border-slate-200">
                    <h4 className="text-xl font-bold text-slate-800 mb-2">RTQ hoy</h4>
                    <p className="text-slate-600">
                      El Sistema RTQ demuestra que la agricultura tradicional, correctamente aplicada, es una solución vigente frente a la degradación del suelo. CQCS retoma este conocimiento, lo articula con criterios técnicos modernos y lo integra a un modelo productivo trazable, responsable y adaptado al contexto mexicano actual.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
