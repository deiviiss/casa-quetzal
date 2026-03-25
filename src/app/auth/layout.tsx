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
    <div className='flex flex-col items-center justify-center min-h-screen bg-slate-950 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black p-4'>
      <div className="w-full max-w-md">
        {children}
      </div>
    </div>
  )
}
