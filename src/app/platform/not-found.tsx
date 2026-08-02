"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PlatformNotFound() {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-3 text-center animate-in fade-in zoom-in duration-500">
      <div className="relative w-full max-w-sm md:max-w-md aspect-square text-emerald-900">
        <Image
          src="/imgs/404.webp"
          alt="Error 404 - Página no encontrada"
          fill
          className="object-contain"
          priority
        />
      </div>

      <h2 className="text-2xl md:text-2xl font-bold tracking-tight mb-3 text-emerald-900">
        Página no encontrada.
      </h2>

      <p className="max-w-md mx-auto text-sm text-emerald-900">
        La página que buscas no existe o se ha producido otro error.
      </p>
      <p className="mb-8 max-w-md mx-auto text-sm text-emerald-900">
        Vuelve atrás. Probablemente el pato salio a fumar.</p>

      <Button
        onClick={() => router.back()}
        size="lg"
        className="gap-2 transition-all hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.5)]"
      >
        <ArrowLeft className="size-5" />
        <span>Volver atrás</span>
      </Button>
    </div>
  )
}
