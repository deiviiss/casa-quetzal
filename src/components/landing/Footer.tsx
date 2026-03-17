import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="w-full bg-slate-900 text-gray-300 pt-12 pb-5 print:hidden">
      <div className="container px-4 md:px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About Us Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
            <p className="text-sm text-gray-400">En Casa Quetzal Cannabis Seeds impulsamos el cáñamo en México con innovación genética, sustentabilidad y trazabilidad, apostando por un futuro sostenible y próspero.</p>
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
                <Link href="/products" className="text-gray-400 hover:text-white">Dispensario digital</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Ayuda</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white">Términos y condiciones</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white">Políticas de privacidad</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white">FAQs</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm text-gray-400 tracking-wider">
          <span>© {new Date().getFullYear()} </span>
          <span>
            Casa Quetzal Cannabis Seeds. Todos los derechos reservados.
          </span>
        </div>
      </div>
    </footer>
  )
}
