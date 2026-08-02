"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export default function AboutUs() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-16 text-center text-gray-900"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Sobre Nosotros
        </motion.h2>

        {/* Section 1: Image Right, Text Left */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 md:gap-20 md:mb-28">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-900/10 rounded-xl transform rotate-2" />
              <Image
                src="/imgs/productores.webp"
                alt="Productor local en la comunidad"
                width={600}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="relative rounded-xl shadow-xl h-80 w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">
              Conservación Genética y Sustentabilidad
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Casa Quetzal Cannabis Seeds (CQCS) es un banco de semillas de cáñamo y cannabis
              enfocado en la conservación genética, la producción agrícola sustentable y la
              trazabilidad desde el origen.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Nuestro trabajo se desarrolla en el sur de México, integrando el cáñamo a
              sistemas agrícolas tradicionales como la Milpa Maya, bajo criterios técnicos,
              ambientales y de economía circular.
            </p>
          </motion.div>
        </div>

        {/* Section 2: Image Left, Text Right */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 mb-20 md:gap-20 md:mb-28">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-900/10 rounded-xl transform -rotate-2" />
              <Image
                src="/imgs/arbenses.webp"
                alt="Productor local en la comunidad"
                width={600}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="relative rounded-xl shadow-xl h-80 w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">
              Trabajo con Comunidades Rurales
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Operamos directamente en comunidades rurales como Dzotchen, Cumpich, Hampolol
              y Tenabo, donde colaboramos con productores locales en el desarrollo de
              prácticas agrícolas, manejo de semillas y fortalecimiento productivo.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Estas relaciones se basan en trabajo en campo, acompañamiento técnico y
              esquemas donde el productor participa activamente en la cadena de valor,
              sin intermediación especulativa.
            </p>
          </motion.div>
        </div>

        {/* Section 3: Image Right, Text Left */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20 md:gap-20 md:mb-28">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-teal-900/10 rounded-xl transform rotate-1" />
              <Image
                src="/imgs/productores_2.webp"
                alt="Junta Ejidal de Tinun"
                width={600}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
                className="relative rounded-xl shadow-xl h-80 w-full object-cover"
              />
            </div>
          </motion.div>
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-emerald-900">
              Colaboración con la Junta Ejidal de Tinun
            </h3>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              De manera particular, la <span className="font-semibold">Junta Ejidal de Tinun </span>
              ha sido un actor clave en el desarrollo del proyecto, al facilitar un espacio para
              la implementación de actividades productivas, experimentales y de conservación genética.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Esta colaboración refleja nuestro modelo de trabajo: acuerdos formales, uso responsable
              del territorio y construcción conjunta de infraestructura agrícola y técnica,
              respetando la organización ejidal y el entorno comunitario.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
