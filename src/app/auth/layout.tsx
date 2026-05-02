import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()

  if (session?.user) {
    redirect('/')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-950 via-slate-950 to-black overflow-hidden'>
      <div className="w-full px-4">
        {children}
      </div>
    </div>
  )
}
