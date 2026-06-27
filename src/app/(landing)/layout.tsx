import { TopMenu } from "@/components/landing/TopMenu"
import { Footer } from "@/components/landing/Footer"
import FloatingWhatsAppButton from "@/components/landing/FloatingWhatsAppButton"
import AgeVerificationModal from "@/components/landing/AgeVerificationModal"
import { getUserSessionServer } from "@/actions/auth/getUserSessionServer"

export default async function LandingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUserSessionServer()

  return (
    <>
      <TopMenu user={user} />
      <main className="flex-1 bg-background">
        {children}
        <Footer />
        <FloatingWhatsAppButton />
        <AgeVerificationModal />
      </main>
    </>
  )
}
