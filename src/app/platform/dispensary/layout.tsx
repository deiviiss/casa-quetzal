import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton"

export default function DispensaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">
          {children}
          <FloatingWhatsAppButton />
        </main>
      </div>
    </>
  )
}
