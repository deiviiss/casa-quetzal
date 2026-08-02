"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"

export interface FaqItem {
  q: string
  a: string
}

interface FaqAccordionProps {
  faqs: FaqItem[]
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  return (
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
  )
}
