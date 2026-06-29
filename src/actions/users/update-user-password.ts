'use server'

import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { getUserSessionServer } from '../auth/getUserSessionServer'
import { getUserById } from './get-user-by-id'

const passwordSchema = z.object({
  id: z
    .string()
    .uuid(),
  currentPassword: z
    .string()
    .min(6, { message: 'La contraseña actual es requerida' }),
  newPassword: z
    .string()
    .min(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
    .max(10, { message: 'La nueva contraseña debe tener menos de 10 caracteres' })
})


interface IData {
  id: string
  currentPassword: string
  newPassword: string
}

export const updateUserPassword = async (data: IData) => {
  const passwordUserParsed = passwordSchema.safeParse(data)

  if (!passwordUserParsed.success) {
    return {
      ok: false,
      message: 'Error al actualizar usuario'
    }
  }

  const { currentPassword, newPassword, id } = passwordUserParsed.data


  try {
    const userSession = await getUserSessionServer()

    if (!userSession) {
      return {
        ok: false,
        message: 'Sesión no encontrada'
      }
    }

    const { user } = await getUserById(userSession.id)

    if (!user) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    const isPasswordValid = await bcrypt.compare(currentPassword, user.password)

    if (!isPasswordValid) {
      return {
        ok: false,
        message: 'La contraseña actual es incorrecta'
      }
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10)

    const dataUserUpdated = {
      password: hashedNewPassword
    }

    const userUpdated = await prisma.user.update({
      where: { id },
      data: dataUserUpdated
    })

    if (!userUpdated) {
      return {
        ok: false,
        message: 'Usuario no actualizado'
      }
    }

    revalidatePath('/platform/profile')

    return {
      ok: true,
      message: 'Actualizado exitosamente'
    }
  } catch (error) {
    console.error('Error updating user', error)
    return {
      ok: false,
      message: 'Error al actualizar el usuario, por favor contacta a soporte'
    }
  }
}
