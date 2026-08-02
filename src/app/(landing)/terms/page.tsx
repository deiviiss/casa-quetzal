import HeroSection from "@/components/landing/HeroSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Términos y Condiciones - Casa Quetzal Cannabis Seeds",
  description: "Consulta los términos y condiciones de membresía de Casa Quetzal Cannabis Seeds (CQCS).",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Términos y Condiciones"
        subtitle="Marco jurídico y operativo de nuestra comunidad"
        desktopImage="/imgs/desktop6.webp"
        mobileImage="/imgs/mobile6.webp"
        imageAlt="Términos y condiciones Casa Quetzal"
      />

      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/50">
            <h2 className="text-3xl font-bold mb-8 text-slate-800 border-b border-slate-100 pb-4 uppercase tracking-tight">
              Términos y Condiciones de Membresía
            </h2>

            <div className="space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">1. Naturaleza de la Membresía</h3>
                <p>
                  La membresía constituye un mecanismo de acceso restringido a productos, servicios, contenidos digitales y beneficios exclusivos ofrecidos por Casa Quetzal Cannabis Seeds® (en adelante, “CQCS”), bajo un esquema privado, voluntario y sujeto a cumplimiento normativo aplicable.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">2. Aceptación de Condiciones</h3>
                <p>
                  El registro y/o uso de la membresía implica la aceptación expresa, informada y vinculante de los presentes Términos y Condiciones, así como de las políticas internas, lineamientos operativos y disposiciones legales aplicables en materia administrativa, sanitaria y penal.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">3. Obligaciones del Miembro</h3>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-1">Información Veraz</p>
                    <p className="text-xs text-slate-600">Proporcionar información completa y verificable.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-1">Uso Lícito</p>
                    <p className="text-xs text-slate-600">Hacer uso legal de productos y contenidos.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-1">Integridad CQCS</p>
                    <p className="text-xs text-slate-600">Abstenerse de actos que afecten la reputación de la marca.</p>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <p className="font-semibold text-slate-800 mb-1">Trazabilidad</p>
                    <p className="text-xs text-slate-600">Cumplir con protocolos de control y uso responsable.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">4. Causales de Revocación</h3>
                <div className="bg-amber-50/50 p-6 rounded-2xl border border-amber-100 space-y-3">
                  <p className="font-bold text-amber-800 mb-2">Suspensión inmediata por:</p>
                  <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                    <li>Tráfico de drogas sintéticas.</li>
                    <li>Falsificación de información.</li>
                    <li>Actividades ilícitas relacionadas con el tráfico.</li>
                    <li>Conductas perjudiciales para la comunidad.</li>
                    <li>Omisión de información a autoridades.</li>
                    <li>Uso indebido de la marca Casa Quetzal®.</li>
                  </ul>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">5. Supervisión</h3>
                  <p className="text-sm">Mecanismos de verificación y auditoría para garantizar el cumplimiento y trazabilidad.</p>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">6. Responsabilidad</h3>
                  <p className="text-sm">El uso de los productos es bajo responsabilidad exclusiva del titular de la membresía.</p>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">7. Propiedad Intelectual</h3>
                <p>
                  Todos los signos distintivos y contenidos están protegidos. El uso no autorizado dará lugar a acciones legales.
                </p>
              </div>

              <div className="pt-8 border-t border-slate-100 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-3">8. Jurisdicción</h3>
                <p className="text-sm text-slate-500 italic">
                  Sometimiento a las leyes de los Estados Unidos Mexicanos y tribunales competentes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
