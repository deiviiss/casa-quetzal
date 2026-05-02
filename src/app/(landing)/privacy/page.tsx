import HeroSection from "@/components/landing/HeroSection"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Política de Privacidad - Casa Quetzal Cannabis Seeds",
  description: "Consulta nuestra política de privacidad y protección de datos personales.",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <HeroSection
        title="Política de Privacidad"
        subtitle="Protección de datos y transparencia en nuestra plataforma"
        desktopImage="/imgs/desktop5.png"
        mobileImage="/imgs/mobile5.png"
        imageAlt="Privacidad Casa Quetzal"
      />

      <section className="relative py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-xl border border-slate-200/50">
            <h2 className="text-3xl font-bold mb-8 text-slate-800 border-b border-slate-100 pb-4 uppercase tracking-tight">
              Política de Privacidad y Protección de Datos Personales
            </h2>

            <div className="space-y-8 text-slate-700 leading-relaxed text-sm md:text-base">
              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">1. Identidad y Responsable del Tratamiento</h3>
                <p>
                  Casa Quetzal Cannabis Seeds®, Sociedad de Acciones Simplificada de Capital Variable, en su carácter de responsable del tratamiento de datos personales, con fundamento en la <strong>Ley Federal de Protección de Datos Personales en Posesión de los Particulares</strong> (LFPDPPP), establece la presente política conforme a su modelo de negocio, integrando relaciones con consumidores, productores, distribuidores y socios estratégicos.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">2. Datos Personales Recabados</h3>
                <p className="mb-4">CQCS podrá recabar y tratar las siguientes categorías de datos:</p>
                <ul className="grid md:grid-cols-2 gap-4 list-none">
                  <li className="bg-slate-50 p-3 rounded-lg border border-slate-100"><strong>Identificación:</strong> nombre, domicilio, CURP, identificación oficial.</li>
                  <li className="bg-slate-50 p-3 rounded-lg border border-slate-100"><strong>Contacto:</strong> correo electrónico, número telefónico.</li>
                  <li className="bg-slate-50 p-3 rounded-lg border border-slate-100"><strong>Fiscales:</strong> RFC, régimen fiscal, datos de facturación.</li>
                  <li className="bg-slate-50 p-3 rounded-lg border border-slate-100"><strong>Comerciales:</strong> historial de compras, preferencias.</li>
                  <li className="bg-slate-50 p-3 rounded-lg border border-slate-100"><strong>Técnicos:</strong> IP, geolocalización, comportamiento digital.</li>
                  <li className="bg-slate-50 p-3 rounded-lg border border-slate-100"><strong>Trazabilidad:</strong> origen de semillas, procesos de cultivo.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">3. Finalidades del Tratamiento</h3>
                <div className="space-y-4">
                  <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                    <h4 className="font-bold text-emerald-800 mb-2">Finalidades Primarias:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                      <li>Gestión, administración y validación de membresías.</li>
                      <li>Comercialización y distribución de productos.</li>
                      <li>Cumplimiento de obligaciones contractuales, fiscales y regulatorias.</li>
                      <li>Implementación de sistemas de trazabilidad y control de cadena de suministro.</li>
                      <li>Verificación de identidad y prevención de riesgos legales.</li>
                    </ul>
                  </div>
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-800 mb-2">Finalidades Secundarias:</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                      <li>Envío de promociones y contenido comercial.</li>
                      <li>Análisis de mercado y mejora de experiencia.</li>
                      <li>Desarrollo de nuevos productos.</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">4. Transferencia de Datos</h3>
                <p>CQCS podrá transferir datos personales sin consentimiento adicional a:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-600">
                  <li>Autoridades competentes en cumplimiento legal.</li>
                  <li>Socios comerciales, productores y distribuidores para fines operativos.</li>
                  <li>Proveedores tecnológicos (blockchain, trazabilidad).</li>
                  <li>Instituciones financieras para gestión de pagos.</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">5. Uso de Tecnologías de Rastreo</h3>
                <p>
                  El sitio web podrá utilizar cookies y web beacons para recabar datos técnicos y mejorar la experiencia del usuario, sin identificar de manera directa al titular salvo consentimiento expreso.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">6. Derechos ARCO</h3>
                <p>
                  El titular podrá ejercer sus derechos de <strong>Acceso, Rectificación, Cancelación y Oposición</strong> mediante solicitud dirigida al área responsable, incluyendo identificación oficial y descripción clara del derecho a ejercer.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">7. Medidas de Seguridad</h3>
                <p>Implementamos protocolos de acceso restringido, sistemas de trazabilidad digital, encriptación de datos sensibles y auditorías internas.</p>
              </div>

              <div>
                <h3 className="text-xl font-bold text-slate-800 mb-3">8. Conservación de Datos</h3>
                <p>Los datos serán conservados únicamente por el tiempo necesario para cumplir con las finalidades descritas y disposiciones legales aplicables.</p>
              </div>

              <div className="pt-8 border-t border-slate-100 text-center">
                <h3 className="text-xl font-bold text-slate-800 mb-3">9. Modificaciones y Jurisdicción</h3>
                <p className="text-sm text-slate-500">
                  Nos reservamos el derecho de modificar esta política. Se rige por la legislación de los Estados Unidos Mexicanos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
