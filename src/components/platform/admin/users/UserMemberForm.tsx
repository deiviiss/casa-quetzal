'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { updateUser } from '@/actions/users/update-user'
import { noticeSuccess, noticeFailure } from '@/components/toast-notifications/ToastNotifications'
import { Loader2 } from 'lucide-react'

const userMemberSchema = z.object({
  name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  email: z.string().email('La dirección de correo electrónico no es válida'),
  phoneNumber: z.string().length(10, 'El número de teléfono debe tener 10 dígitos'),
})

type UserMemberFormValues = z.infer<typeof userMemberSchema>

interface UserMemberFormProps {
  isOpen: boolean
  onClose: () => void
  user: {
    id: string
    name: string
    email: string
    phoneNumber: string
  }
}

export default function UserMemberForm({ isOpen, onClose, user }: UserMemberFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<UserMemberFormValues>({
    resolver: zodResolver(userMemberSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  })

  const onSubmit = async (values: UserMemberFormValues) => {
    setIsSubmitting(true)
    const result = await updateUser({
      id: user.id,
      ...values,
    })

    if (result.ok) {
      noticeSuccess('Información de usuario actualizada con éxito')
      onClose()
    } else {
      noticeFailure(result.message || 'Error al actualizar la información del usuario')
    }
    setIsSubmitting(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Información del Usuario</DialogTitle>
          <DialogDescription>
            Actualiza los detalles de contacto de esta cuenta de usuario.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el nombre del usuario" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Ingresa el correo electrónico" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de Teléfono</FormLabel>
                  <FormControl>
                    <Input placeholder="Ingresa el número de teléfono de 10 dígitos" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4 gap-2">
              <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Guardar Cambios
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
