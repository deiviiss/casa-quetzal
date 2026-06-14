import Image from "next/image";

export default function DispensaryLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] flex items-center justify-center bg-[#FDFDFD] relative overflow-hidden">
      <div className="relative w-full h-full min-h-[50vh] flex flex-col items-center justify-center">
        <Image
          src="/imgs/loading-brand.gif"
          alt="Cargando..."
          width={500}
          height={500}
          className="w-[500px] h-[500px] object-contain relative z-10 rounded-sm"
        />

        {/* Loading dots */}
        <div className="flex gap-2 mt-1">
          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
        </div>

        {/* Overlay opcional si quieres oscurecer un poco */}
        {/* <div className="absolute inset-0 bg-white/5" /> */}
      </div>
    </div>
  )
}
