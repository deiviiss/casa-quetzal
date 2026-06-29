import { redirect } from 'next/navigation'
import HeaderServer from '@/components/platform/HeaderServer'
import { getUserSessionServer } from '@/actions/auth/getUserSessionServer'
import { PlatformFooter } from '@/components/platform/PlatformFooter'


export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const userSession = await getUserSessionServer()

  if (!userSession) {
    redirect('/auth/login')
  }

  return (
    <div className='mx-auto w-full'>
      <HeaderServer />
      <div className='pb-10'>
        {children}
      </div>

      <PlatformFooter />
    </div>
  )
}
