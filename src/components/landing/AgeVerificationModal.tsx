"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

type ViewType = "main" | "privacy" | "terms"

export default function AgeVerificationModal() {
  const [isVisible, setIsVisible] = useState(false)
  const [acceptedCookies, setAcceptedCookies] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [view, setView] = useState<ViewType>("main")

  useEffect(() => {
    setIsMounted(true)
    const isVerified = document.cookie.split("; ").find((row) => row.startsWith("age_verified="))
    if (!isVerified) {
      setIsVisible(true)
      document.body.style.overflow = "hidden"
    }
  }, [])

  const handleVerify = () => {
    if (!acceptedCookies) return

    const date = new Date()
    date.setTime(date.getTime() + 30 * 24 * 60 * 60 * 1000)
    document.cookie = `age_verified=true; expires=${date.toUTCString()}; path=/`

    setIsVisible(false)
    document.body.style.overflow = "auto"
  }

  const handleDecline = () => {
    window.location.href = "https://www.google.com"
  }

  if (!isMounted || !isVisible) return null

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/95 backdrop-blur-md p-4"
        >
          <motion.div
            key={view}
            initial={{ opacity: 0, x: view === "main" ? 0 : 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col border border-slate-200 relative"
          >
            {/* Header Accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 z-20" />

            {view === "main" ? (
              <MainView
                acceptedCookies={acceptedCookies}
                setAcceptedCookies={setAcceptedCookies}
                onVerify={handleVerify}
                onDecline={handleDecline}
                onSwitchView={setView}
              />
            ) : view === "privacy" ? (
              <PrivacyView onBack={() => setView("main")} />
            ) : (
              <TermsView onBack={() => setView("main")} />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function MainView({
  acceptedCookies,
  setAcceptedCookies,
  onVerify,
  onDecline,
  onSwitchView
}: {
  acceptedCookies: boolean
  setAcceptedCookies: (val: boolean) => void
  onVerify: () => void
  onDecline: () => void
  onSwitchView: (view: ViewType) => void
}) {
  return (
    <div className="p-6 md:p-8 flex flex-col items-center text-center overflow-y-auto">
      {/* Logo */}
      <div className="mb-8 flex justify-center">
        <div className="relative w-24 h-24">
          <Image
            src="/imgs/quetzal.png"
            alt="Casa Quetzal Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      <h2 className="text-3xl font-bold text-slate-800 mb-2 uppercase tracking-tight">
        Verificación de Edad
      </h2>
      <p className="text-slate-500 mb-8 font-medium">
        ¿Eres mayor de 18 años?
      </p>

      <div className="w-full space-y-6">
        {/* Checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group text-left">
          <div className="relative flex items-center mt-1">
            <input
              type="checkbox"
              className="peer appearance-none w-5 h-5 border-2 border-slate-300 rounded-md checked:bg-emerald-500 checked:border-emerald-500 transition-all cursor-pointer"
              checked={acceptedCookies}
              onChange={(e) => setAcceptedCookies(e.target.checked)}
            />
            <svg
              className="absolute w-3.5 h-3.5 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none left-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <span className="text-sm text-slate-600 leading-tight group-hover:text-slate-800 transition-colors">
            Acepto los ajustes de cookies y la{" "}
            <button
              type="button"
              onClick={() => onSwitchView("privacy")}
              className="text-emerald-600 font-bold hover:underline"
            >
              política de privacidad
            </button>
          </span>
        </label>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onVerify}
            disabled={!acceptedCookies}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${acceptedCookies
              ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:shadow-emerald-500/30 hover:scale-[1.02] active:scale-95"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
          >
            Sí, continuar
          </button>
          <button
            onClick={onDecline}
            className="w-full py-3 text-slate-500 font-semibold hover:text-slate-800 transition-colors"
          >
            No, volver
          </button>
        </div>
      </div>

      {/* Legal Footer */}
      <div className="mt-3 pt-6 border-t border-slate-100 w-full">
        <p className="text-[10px] text-slate-400 leading-relaxed uppercase tracking-widest">
          Este sitio contiene información sobre productos restringidos. Al ingresar, confirmas que cumples con los requisitos legales de tu jurisdicción.
        </p>
        <button
          type="button"
          onClick={() => onSwitchView("terms")}
          className="text-[10px] text-emerald-600 font-bold hover:underline mt-2 inline-block uppercase tracking-widest"
        >
          Ver Términos y Condiciones
        </button>
      </div>
    </div>
  )
}

function PrivacyView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Política de Privacidad</h3>
        <button
          onClick={onBack}
          className="text-emerald-600 font-bold text-xs hover:text-emerald-700 flex items-center gap-1 group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      </div>
      <div className="p-8 overflow-y-auto text-sm text-slate-600 space-y-6">
        <div>
          <h4 className="font-bold text-slate-800 mb-2">1. Identidad y Responsable</h4>
          <p>Casa Quetzal Cannabis Seeds®, Sociedad de Acciones Simplificada de Capital Variable, responsable del tratamiento conforme a la LFPDPPP.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">2. Datos Recabados</h4>
          <p>Identificación, contacto, fiscales, comerciales, técnicos y de trazabilidad productiva.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">3. Finalidades</h4>
          <p>Gestión de membresías, comercialización, cumplimiento legal y sistemas de trazabilidad.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">4. Transferencia</h4>
          <p>A autoridades competentes y socios operativos bajo esquemas de confidencialidad.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">5. Derechos ARCO</h4>
          <p>Puedes ejercer tus derechos de acceso, rectificación, cancelación u oposición mediante solicitud directa.</p>
        </div>
        <p className="text-[10px] text-slate-400 italic pt-4">Consulta la política completa una vez verifiques tu edad.</p>
      </div>
    </div>
  )
}

function TermsView({ onBack }: { onBack: () => void }) {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <h3 className="font-bold text-slate-800 uppercase tracking-tight text-sm">Términos y Condiciones</h3>
        <button
          onClick={onBack}
          className="text-emerald-600 font-bold text-xs hover:text-emerald-700 flex items-center gap-1 group"
        >
          <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver
        </button>
      </div>
      <div className="p-8 overflow-y-auto text-sm text-slate-600 space-y-6">
        <div>
          <h4 className="font-bold text-slate-800 mb-2">1. Naturaleza</h4>
          <p>Mecanismo de acceso restringido a productos y beneficios exclusivos bajo esquema privado.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">2. Aceptación</h4>
          <p>El uso implica aceptación expresa de términos, políticas internas y leyes aplicables.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">3. Obligaciones</h4>
          <p>Información veraz, uso lícito, respeto a la marca y cumplimiento de trazabilidad.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">4. Revocación</h4>
          <p>Suspensión por tráfico de drogas sintéticas, falsedad de información o actos ilícitos.</p>
        </div>
        <div>
          <h4 className="font-bold text-slate-800 mb-2">5. Jurisdicción</h4>
          <p>Sujeto a las leyes de los Estados Unidos Mexicanos y tribunales competentes.</p>
        </div>
        <p className="text-[10px] text-slate-400 italic pt-4">Consulta los términos completos una vez verifiques tu edad.</p>
      </div>
    </div>
  )
}
