import { TopMenu } from "@/components/landing/TopMenu"
import { Footer } from "@/components/landing/Footer"
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton"
import AgeVerificationModal from "@/components/landing/AgeVerificationModal"
import { ToogleDarkMode } from "@/components/dark-mode/toogle-dark-mode/toogle-dark-mode"

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
        <AgeVerificationModal />
      </main>
    </>
  )
}
