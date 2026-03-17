"use client"

import { motion } from "framer-motion"
import { FaWhatsapp } from "react-icons/fa"

export default function FloatingWhatsAppButton() {
  const whatsappMessage = encodeURIComponent("Hola, me gustaría obtener más información sobre los productos.")
  const whatsappLink = `https://wa.me/529999688834?text=${whatsappMessage}`

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1DA851] focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
      aria-label="Contactarnos por WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <FaWhatsapp className="w-8 h-8" />
    </motion.a>
  )
}
