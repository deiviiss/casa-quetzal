"use client"

import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { FaWhatsapp } from "react-icons/fa"
import { ChevronUp } from "lucide-react"

export default function FloatingWhatsAppButton() {
  const whatsappMessage = encodeURIComponent("Hola, me gustaría obtener más información sobre los productos.")
  const whatsappLink = `https://wa.me/529999688834?text=${whatsappMessage}`

  const [isVisible, setIsVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // Control visibility based on scroll progress (0 to 1)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const isAtStart = latest < 0.02
    const isAtEnd = latest > 0.98
    setIsVisible(!isAtStart && !isAtEnd)
  })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-4 right-6 z-40 flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {/* Scroll to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Volver arriba"
            className="flex flex-col items-center group cursor-pointer border-none bg-transparent"
          >
            <span
              className="hidden sm:block text-[10px] font-bold tracking-[0.2em] text-gray-800 mb-3"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              VOLVER ARRIBA
            </span>
            <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] border border-gray-100 group-hover:bg-gray-50 transition-colors">
              <ChevronUp className="w-5 h-5 text-gray-800 stroke-[1.5]" />
            </div>
          </button>

          {/* WhatsApp button */}
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-[0_4px_10px_rgba(0,0,0,0.15)] hover:bg-[#1DA851] focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
            aria-label="Contactarnos por WhatsApp"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FaWhatsapp className="w-7 h-7" />
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

