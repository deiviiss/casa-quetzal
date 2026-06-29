import Link from 'next/link'
import { auth } from '@/auth'
import { FaInstagram, FaTiktok, FaFacebookF, FaYoutube } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'

export const Footer = async () => {
  const session = await auth()
  return (
    <footer className="w-full bg-slate-900 text-gray-200 p-5 print:hidden">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <p className="text-sm text-gray-400">En Casa Quetzal Cannabis Seeds impulsamos el cáñamo en México con innovación genética, sustentabilidad y trazabilidad, apostando por un futuro sostenible y próspero.</p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.instagram.com/quetzalseeds420"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-500 hover:text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-sm"
              >
                <FaInstagram size={20} aria-hidden="true" />
              </a>
              <a
                href="https://www.tiktok.com/@quetzalseeds420"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-500 hover:text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-sm"
              >
                <FaTiktok size={20} aria-hidden="true" />
              </a>
              <a
                href="https://www.facebook.com/QuetzalSeeds420"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-gray-500 hover:text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-sm"
              >
                <FaFacebookF size={20} aria-hidden="true" />
              </a>
              <a
                href="https://youtube.com/@quetzalseeds420"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-gray-500 hover:text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-sm"
              >
                <FaYoutube size={20} aria-hidden="true" />
              </a>
              <a
                href="https://x.com/QuetzalSeeds420"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="text-gray-500 hover:text-white transition-all hover:scale-110 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-emerald-500 rounded-sm"
              >
                <FaXTwitter size={20} aria-hidden="true" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/"
                  className="text-gray-400 hover:text-white p-0"
                >Inicio</Link>
              </li>
              <li><Link href="/memberships"
                className="text-gray-400 hover:text-white p-0"
              >Membresías</Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-400 hover:text-white">Catálogo de productos</Link></li>
              <li>
                {
                  session?.user ? (
                    <Link href="/platform/profile" className="text-gray-400 hover:text-white">Mi Perfil</Link>
                  ) : (
                    <Link href="/auth/login" className="text-gray-400 hover:text-white">Iniciar sesión</Link>
                  )
                }
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-gray-400 hover:text-white">Términos y condiciones</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-white">Políticas de privacidad</Link></li>
              <li><Link href="/faqs" className="text-gray-400 hover:text-white">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-400 tracking-wider">
          <p className='font-light text-gray-400'>
            Casa Quetzal Cannabis Seeds® es una marca registrada conforme a las disposiciones aplicables en materia de propiedad industrial.
          </p>

          <p className='font-light text-gray-400'>
            El uso, reproducción o distribución no autorizada constituye una infracción susceptible de acciones legales.
            Proyecto piloto autorizado en el marco de Producción Primaria con Cannabis psicoactivo y no psicoactivo, en cumplimiento del Protocolo de Investigación registrado bajo el expediente EXP. 354/2022-VI-B.
          </p>
          <p className='font-light text-gray-400'>
            Las flores exhibidas provienen exclusivamente de productores formalmente vinculados al citado protocolo, en observancia de la normatividad vigente.
          </p>
        </div>
      </div>
    </footer>
  )
}
