import UserDetail from "@/components/platform/admin/users/UserDetail"
import { notFound } from "next/navigation"
import prisma from "@/lib/prisma"

export default async function AdminUserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      isActive: true,
      role: true,
      ineUrl: true,
      inePublicId: true,
      ineStatus: true,
      ineUploadedAt: true,
      membership: {
        include: {
          product: true
        }
      }
    }
  })

  if (!user) {
    notFound()
  }

  return (
    <div className="container px-4 md:px-8 py-8 md:py-12 mx-auto">
      <UserDetail user={user} />
    </div>
  )
}
