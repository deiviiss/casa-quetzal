"use client"

import HeroSection from "@/components/landing/HeroSection"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

const faqs = [
  {
    q: "1. ¿Qué es la membresía de CQCS?",
    a: "Es un esquema de acceso restringido que permite a los usuarios adquirir productos, acceder a un catálogo digital y participar en el ecosistema comercial de CQCS bajo condiciones de cumplimiento normativo."
  },
  {
    q: "2. ¿Quién puede ser miembro?",
    a: "Personas físicas o morales que proporcionen información veraz, acepten los términos y condiciones, y cumplan con las disposiciones legales aplicables."
  },
  {
    q: "3. ¿Qué beneficios incluye la membresía?",
    a: "Acceso a productos exclusivos, descuentos, envíos a domicilio, plataforma digital, así como participación en un modelo de trazabilidad y consumo responsable."
  },
  {
    q: "4. ¿En qué casos se puede cancelar o revocar la membresía?",
    a: "Cuando se incumplan los lineamientos internos, incluyendo conductas ilícitas, falsificación de información, uso indebido de la marca o cualquier acto que afecte a la comunidad o al marco legal aplicable."
  },
  {
    q: "5. ¿CQCS vende productos de forma abierta al público?",
    a: "No. El acceso a productos y servicios está condicionado a la membresía activa, como mecanismo de control, trazabilidad y cumplimiento."
  },
  {
    q: "6. ¿Cómo protege CQCS mis datos personales?",
    a: "Mediante medidas administrativas, técnicas y físicas conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, incluyendo sistemas de seguridad, control de acceso y protocolos de confidencialidad."
  },
  {
    q: "7. ¿Para qué se utilizan mis datos personales?",
    a: "Para gestionar la membresía, procesar compras, cumplir obligaciones legales, implementar trazabilidad en la cadena de suministro y mejorar la experiencia del usuario."
  },
  {
    q: "8. ¿CQCS comparte mis datos con terceros?",
    a: "Únicamente cuando es necesario para operación (proveedores, socios comerciales) o por requerimiento de autoridad competente, bajo esquemas de confidencialidad y cumplimiento normativo."
  },
  {
    q: "9. ¿Puedo ejercer mis derechos sobre mis datos personales?",
    a: "Sí. Puedes ejercer derechos de acceso, rectificación, cancelación u oposición (ARCO) mediante solicitud directa conforme a la legislación aplicable."
  },
  {
    q: "10. ¿Los productos tienen carácter médico?",
    a: "No. Los productos ofrecidos no constituyen medicamentos certificados, por lo que su uso es responsabilidad del titular de la membresía."
  },
  {
    q: "11. ¿Cómo garantiza CQCS la calidad y origen de sus productos?",
    a: "A través de sistemas de trazabilidad, control de producción y vinculación directa con productores dentro del modelo agrícola y tecnológico de la empresa."
  },
  {
    q: "12. ¿CQCS cumple con la regulación en México?",
    a: "CQCS opera bajo un enfoque de cumplimiento progresivo, alineando sus procesos a disposiciones administrativas, sanitarias y criterios jurisdiccionales vigentes."
  },
  {
    q: "13. ¿Se pueden modificar los términos o políticas?",
    a: "Sí. CQCS podrá actualizar sus términos, condiciones y políticas conforme a cambios regulatorios o estratégicos, notificándolo a través de su plataforma."
  }
]

export default function FAQsPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
    <main className="min-h-screen">
      <HeroSection
        title="Preguntas Frecuentes"
        subtitle="Resolvemos tus dudas sobre el ecosistema Casa Quetzal"
        desktopImage="/imgs/desktop3.webp"
        mobileImage="/imgs/mobile.webp"
        imageAlt="FAQs Casa Quetzal"
      />

      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-200 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-64 h-64 bg-teal-200 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-2xl border border-slate-200/50">
            <h2 className="text-3xl font-bold mb-10 text-slate-800 text-center uppercase tracking-wider">
              FAQs CQCS
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className={`rounded-2xl border transition-all duration-300 ${activeIndex === index ? 'border-emerald-200 bg-emerald-50/30 shadow-md' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50'}`}
                >
                  <button
                    onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                    className="w-full text-left p-5 flex justify-between items-center gap-4 group"
                  >
                    <span className={`font-bold transition-colors ${activeIndex === index ? 'text-emerald-700' : 'text-slate-800 group-hover:text-slate-900'}`}>
                      {faq.q}
                    </span>
                    <span className={`transform transition-transform duration-300 flex-shrink-0 ${activeIndex === index ? 'rotate-180 text-emerald-500' : 'text-slate-400 group-hover:text-slate-600'}`}>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-0 text-slate-600 leading-relaxed border-t border-emerald-100/30">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-slate-900 text-white text-center shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -mr-16 -mt-16" />
               <h3 className="text-xl font-bold mb-4 relative z-10">¿Aún tienes dudas?</h3>
               <p className="text-slate-400 mb-6 relative z-10">Estamos aquí para ayudarte a entender mejor nuestro modelo.</p>
               <a 
                 href="https://wa.me/529999688834" 
                 target="_blank"
                 className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-full transition-all hover:scale-105 active:scale-95 shadow-lg relative z-10"
               >
                 <span>Contactar soporte</span>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                 </svg>
               </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
