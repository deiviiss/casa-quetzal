import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Lock, ArrowLeft } from 'lucide-react'

export default function NoAccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background images — mobile & desktop */}
      <div className="absolute inset-0 w-full h-full">
        {/* mobile */}
        <Image
          src="/imgs/mobile7.webp"
          alt="Casa Quetzal"
          fill
          className="object-cover sm:hidden"
          quality={100}
          priority
        />

        {/* desktop */}
        <Image
          src="/imgs/desktop7.webp"
          alt="Casa Quetzal"
          fill
          className="object-cover hidden sm:block"
          quality={100}
          priority
        />

        {/* Overlay de opacidad */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
      </div>

      <Card className="relative z-10 w-full max-w-md backdrop-blur-sm bg-card/80 border-primary/10 shadow-2xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-red-500/10 p-5 rounded-full ring-8 ring-red-500/5">
              <Lock className="h-12 w-12 text-red-500 animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">
            Acceso Restringido
          </CardTitle>
          <CardDescription className="text-base mt-2">
            Aún no tienes acceso a esta página.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground text-center leading-relaxed">
            Para acceder a esta sección necesitas una membresía activa.
            Contacta a un administrador o visita tu perfil para más información.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <Button asChild className="w-full h-11 text-base shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]">
              <Link href="/platform/profile">
                Ir a mi Perfil
              </Link>
            </Button>
            <Button variant="ghost" asChild className="w-full h-11 text-base hover:bg-primary/5 transition-all">
              <Link href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Inicio
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}