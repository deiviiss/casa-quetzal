import Link from "next/link"
// import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-gray-600 mb-8">Lo sentimos, el producto que buscas no está disponible.</p>
        <button>
          <Link href="/productos">Ver todos los productos</Link>
        </button>
      </div>
    </div>
  )
}

