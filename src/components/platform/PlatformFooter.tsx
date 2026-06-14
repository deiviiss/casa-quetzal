import Image from 'next/image'

export function PlatformFooter() {
  return (
    <footer className="dark border-t border-border/30 bg-slate-900 p-5">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-secondary-foreground/70 sm:flex-row">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.webp"
              alt="Casa Quetzal"
              width={50}
              height={50}
            />
            <span>MOTA (Mejores Oportunidades de Trabajo Agricola)</span>
          </div>
          <p className="text-xs">
            Producto exclusivo para adultos mayores de 18 años
          </p>
        </div>
      </div>

      <div className="mt-0 pt-8 border-t border-gray-800 text-center text-xs text-gray-400 tracking-wider">
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
    </footer>
  )
}
