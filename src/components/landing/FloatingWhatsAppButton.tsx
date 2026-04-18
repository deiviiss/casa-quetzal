"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { FaWhatsapp } from "react-icons/fa"

export default function FloatingWhatsAppButton() {
  const whatsappMessage = encodeURIComponent("Hola, me gustaría obtener más información sobre los productos.")
  const whatsappLink = `https://wa.me/529999688834?text=${whatsappMessage}`

  const [isVisible, setIsVisible] = useState(false)
  const fixedScrollThreshold = 2 // 2% scroll threshold

  const handleScroll = () => {
    // calculate the vertical scroll percentage
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    setIsVisible(scrolled > fixedScrollThreshold) // show the button if the percentage is greater than the fixed value
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll) // add the event listener for the scroll

    return () => {
      window.removeEventListener('scroll', handleScroll) // delete the event listener when the component is unmounted
    }
  }, [])


  return (
    <div className={`${isVisible ? 'fade-in pointer-events-auto' : 'opacity-0  pointer-events-none'}`}>

      <motion.a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-6 z-50 flex items-center justify-center w-12 h-12 bg-[#25D366] text-white rounded-full shadow-lg hover:bg-[#1DA851] focus:outline-none focus:ring-4 focus:ring-[#25D366]/50"
        aria-label="Contactarnos por WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <FaWhatsapp className="w-8 h-8" />
      </motion.a>
    </div>
  )
}
