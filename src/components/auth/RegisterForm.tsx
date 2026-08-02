'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoInformationOutline } from 'react-icons/io5'
import { Eye, EyeOff } from 'lucide-react'
import { z } from 'zod'
import { login } from '@/actions/auth/login'
import { registerUser } from '@/actions/auth/register'
import { noticeFailure, noticeSuccess } from '@/components/toast-notifications/ToastNotifications'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { titleFont, textFont } from '@/config/fonts'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BackButton } from '@/components/ui/back-button'

const registerSchema = z.object({
  name: z.string().min(3, { message: 'El nombre es requerido' }).max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z.string().email({
    message: 'El correo electrónico es inválido'
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'El número de teléfono debe tener 10 caracteres sin el código de país'
    })
    .max(10, {
      message: 'El número de teléfono debe tener 10 caracteres sin el código de país'
    }),
  password: z
    .string()
    .min(6, {
      message: 'La contraseña debe tener al menos 6 caracteres'
    })
})

export const RegisterForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')

  const defaultValuesForm = {
    name: '',
    email: '',
    phoneNumber: '',
    password: ''
  }

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValuesForm
  })

  const onSubmit = async (values: z.infer<typeof registerSchema>) => {
    setIsSubmitting(true)

    const data = {
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber,
      password: values.password
    }

    const { ok, message } = await registerUser(data)

    if (!ok) {
      noticeFailure(message)
      setError(message)
      setIsSubmitting(false)
      return
    }

    await login(data.email, data.password)
    const redirectTo = searchParams.get('redirectTo') || '/profile'

    noticeSuccess(message)
    setIsSubmitting(false)
    // window.location.replace(redirectTo)
    router.push(redirectTo)
  }

  return (
    <Form {...form} >
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
                  src="/imgs/quetzal.svg"
                  alt="Casa Quetzal"
                  width={140}
                  height={140}
                  className="drop-shadow-[0_0_15px_rgba(16,185,129,0.2)] w-20 h-20"
                  priority
                />
              </motion.div>
              <h1 className={`${titleFont.className} text-4xl text-center text-white text-pretty tracking-tight`}>
                Crear una cuenta
              </h1>
              <p className="text-center text-slate-500 text-sm">
                Ingresa tus datos para registrarte en la plataforma
              </p>
            </div>

            <div className='grid gap-6'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Nombre completo</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Tu nombre completo'
                        {...field}
                        style={{ colorScheme: 'dark' }}
                        className="h-12 bg-[#161616] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400/80" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-slate-300">Número de teléfono</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='10 dígitos'
                        {...field}
                        style={{ colorScheme: 'dark' }}
                        className="h-12 bg-[#161616] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50"
                      />
                    </FormControl>
                    <FormMessage className="text-red-400/80" />
                  </FormItem>
                )}
              />

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
                        style={{ colorScheme: 'dark' }}
                        className="h-12 bg-[#161616] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50"
                        autoComplete="email"
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
                          style={{ colorScheme: 'dark' }}
                          className="h-12 bg-[#161616] border-white/10 text-white placeholder:text-slate-600 focus-visible:ring-emerald-500/50 pr-12"
                          autoComplete="new-password"
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
                className='w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold h-12 rounded-lg transition-colors active:scale-[0.98]'
              >
                {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
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
                  href="/auth/login"
                  className={textFont.className}
                >
                  Iniciar sesión
                </Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </form>
    </Form >
  )
}
