'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoInformationOutline } from 'react-icons/io5'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { login } from '@/actions/auth/login'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { titleFont, textFont } from '@/config/fonts'
import { noticeFailure, noticeSuccess } from '@/components/toast-notifications/ToastNotifications'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BackButton } from '@/components/ui/back-button'

const loginSchema = z.object({
  email: z.string({
    required_error: 'El correo electrónico es requerido',
    message: 'Correo electrónico inválido'
  }).email({
    message: 'Correo electrónico inválido'
  }),
  password: z.string({
    required_error: 'La contraseña es requerida',
    message: 'Contraseña inválida'
  }).min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  })
})

export const LoginForm = () => {
  const searchParams = useSearchParams()

  const redirectTo = searchParams.get('redirectTo') || '/platform/dispensary'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
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
      <form onSubmit={form.handleSubmit(onSubmit)} className='w-full mb-10'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-xl mx-auto"
        >
          <div className="flex justify-start mb-6">
            <BackButton href="/" label="Inicio" variant="ghost" className='mt-5' />
          </div>

          <div className="space-y-8">
            <div className="flex flex-col items-center space-y-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Image
                  src="/imgs/quetzal.png"
                  alt="Casa Quetzal"
                  width={140}
                  height={140}
                  className="drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                  priority
                />
              </motion.div>
              <h1 className={`${titleFont.className} text-4xl text-center text-white text-pretty tracking-tight`}>
                Bienvenido
              </h1>
              <p className="text-center text-slate-500 text-sm">
                Ingresa tus credenciales para acceder a la plataforma
              </p>
            </div>

            <div className='grid gap-6'>
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
                        style={{ colorScheme: 'dark' }}
                        className="h-12 bg-[#161616] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50"
                        autoComplete="email"
                        spellCheck={false}
                      />
                    </FormControl>
                    <FormMessage className="text-red-400/80" />
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
                      <div className="relative">
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder='••••••••'
                          {...field}
                          value={field.value}
                          style={{ colorScheme: 'dark' }}
                          className="h-12 bg-[#161616] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50 pr-12"
                          autoComplete="current-password"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage className="text-red-400/80" />
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
            </div>

            <div className='flex flex-col gap-4'>
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-secondary hover:bg-secondary/80 text-white font-semibold h-12 rounded-lg transition-colors active:scale-[0.98]'
              >
                {isSubmitting ? 'Iniciando sesión…' : 'Iniciar sesión'}
              </Button>

              <div className="relative w-full py-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/5" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-slate-600">O</span>
                </div>
              </div>

              <Button
                asChild
                variant='destructive'
                className='w-full text-slate-400 hover:text-white hover:bg-red-50/5 h-12 transition-colors'
              >
                <Link
                  href={`/auth/new-account?redirectTo=${redirectTo}`}
                  className={textFont.className}
                >
                  Crear una cuenta nueva
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </Form>
  )
}
