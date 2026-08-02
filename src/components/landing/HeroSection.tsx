"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { getImageProps } from "next/image"
import Link from "next/link"
import { useRef } from "react"

interface HeroSectionProps {
  title: string
  subtitle: string
  desktopImage: string;
  mobileImage: string;
  imageAlt: string
  ctaText?: string
  ctaLink?: string
}

export default function HeroSection({ title, subtitle, desktopImage, mobileImage, imageAlt, ctaText, ctaLink }: HeroSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.5]);

  const common = { alt: imageAlt, fill: true, priority: true, sizes: "100vw", quality: 75 }
  const {
    props: { srcSet: desktopSrcSet },
  } = getImageProps({
    ...common,
    src: desktopImage,
  })
  const {
    props: { srcSet: mobileSrcSet, ...rest },
  } = getImageProps({
    ...common,
    src: mobileImage,
  })

  return (
    <section ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0 w-full h-full"
      >
        <picture className="w-full h-full">
          <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
          <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
          <img {...rest} alt={imageAlt} className="object-cover w-full h-full" />
        </picture>
      </motion.div>
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center text-white max-w-4xl px-4"
      >
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-4 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title}
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl mb-24 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {subtitle}
        </motion.p>
        {
          ctaText && ctaLink && (
            ctaLink.startsWith("/") ? (
              <Link href={ctaLink}>
                <motion.span
                  className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {ctaText}
                </motion.span>
              </Link>

            ) : (

              <motion.a
                href={ctaLink}
                target="_blank"
                className="bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {ctaText}
              </motion.a>
            )
          )
        }
      </motion.div>
    </section>
  )
}

