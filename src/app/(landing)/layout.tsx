import { TopMenu } from "@/components/landing/TopMenu"
import { Footer } from "@/components/landing/Footer"
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton"

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <>
      <TopMenu />
      <main className="flex-1 bg-background">
        {children}
        <Footer />
        <FloatingWhatsAppButton />
      </main>
    </>
  )
}
