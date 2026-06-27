import { type Metadata } from 'next'
import { redirect } from 'next/navigation'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import { getUserById } from '@/actions/users/get-user-by-id'
import { ProfileClient } from '@/components/platform/ProfileClient'
import { getMembershipProduct } from '@/actions/products/get-products'

export const metadata: Metadata = {
  title: "Perfil - Casa Quetzal",
  description: "Gestiona tu perfil y suscripción en Casa Quetzal.",
}

const ProfilePage = async () => {
  const userSession = await getUserSessionServer()

  if (!userSession) {
    redirect('/')
  }

  const { user } = await getUserById(String(userSession.id))

  if (!user) {
    redirect('/')
  }

  const { product: membershipProduct } = await getMembershipProduct()

  return (
    <ProfileClient user={user} membershipProduct={membershipProduct || null} />
  )
}

export default ProfilePage
