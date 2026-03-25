'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoInformationOutline } from 'react-icons/io5'
import { z } from 'zod'
import { login } from '@/actions/auth/login'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { titleFont, textFont } from '@/config/fonts'
import { noticeFailure, noticeSuccess } from '@/components/toast-notifications/ToastNotifications'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BackButton } from '@/components/ui/back-button'

const loginSchema = z.object({
  email: z.string({
    required_error: 'Email is required',
    message: 'Invalid email address'
  }).email({
    message: 'Invalid email address'
  }),
  password: z.string({
    required_error: 'Password is required',
    message: 'Invalid password'
  }).min(6, {
    message: 'Password must be at least 6 characters long'
  })
})

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo') || '/platform/profile'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const defaultValuesForm = {
    email: '',
    password: ''
  }

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: defaultValuesForm,
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    setIsSubmitting(true)

    const { email, password } = values

    const { ok, message } = await login(email, password)

    if (!ok) {
      noticeFailure(message)
      setError(message)
      setIsSubmitting(false)
      return
    }

    noticeSuccess(message)
    setIsSubmitting(false)
    // router.push(redirectTo)
    window.location.replace(redirectTo)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md mx-auto space-y-4"
        >
          <div className="flex justify-start">
            <BackButton href="/" label="Inicio" variant="ghost" />
          </div>
          <Card className="bg-slate-900/40 backdrop-blur-xl border-white/10 shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent pointer-events-none" />

            <CardHeader className="relative z-10 pt-8">
              <div className="flex items-center justify-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Image
                    src="/imgs/quetzal.png"
                    alt="Casa Quetzal"
                    width={140}
                    height={140}
                    className="drop-shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                    priority
                  />
                </motion.div>
              </div>
              <CardTitle className={`${titleFont.className} text-3xl text-center text-white tracking-tight`}>
                Bienvenido
              </CardTitle>
              <CardDescription className="text-center text-slate-400 mt-2">
                Ingresa tus credenciales para acceder a la plataforma
              </CardDescription>
            </CardHeader>

            <CardContent className='grid gap-6 relative z-10'>
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='ejemplo@casaquetzal.com'
                        {...field}
                        value={field.value}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all"
                        autoComplete="email"
                        spellCheck={false}
                      />
                    </FormControl>
                    <FormMessage className="text-emerald-400/80" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Contraseña</FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='••••••••'
                        {...field}
                        value={field.value}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus-visible:ring-emerald-500/50 focus-visible:border-emerald-500/50 transition-all"
                        autoComplete="current-password"
                      />
                    </FormControl>
                    <FormMessage className="text-emerald-400/80" />
                  </FormItem>
                )}
              />

              <div
                className='min-h-[20px]'
                aria-live='polite'
                aria-atomic='true'
              >
                {
                  error && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className='flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-2 rounded-md border border-red-400/20'
                    >
                      <IoInformationOutline className='h-4 w-4' />
                      <p>Credenciales inválidas</p>
                    </motion.div>
                  )
                }
              </div>
            </CardContent>

            <CardFooter className='flex flex-col gap-4 relative z-10 pb-8'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-6 rounded-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] active:scale-[0.98]'
              >
                {isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
              </Button>

              <div className="relative w-full py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-slate-500">O</span>
                </div>
              </div>

              <Button
                asChild
                variant='ghost'
                className='w-full text-slate-300 hover:text-white hover:bg-white/5 py-6'
              >
                <Link
                  href={`/auth/new-account?redirectTo=${redirectTo}`}
                  className={textFont.className}
                >
                  Crear una cuenta nueva
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </form>
    </Form>
  )
}
