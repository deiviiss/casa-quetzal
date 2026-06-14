'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import prisma from '@/lib/prisma'
import { getUserSessionServer } from '../auth/getUserSessionServer'
import { getUserById } from './get-user-by-id'

const imageSchema = z.string().url("Invalid image URL");

export const updateUserImage = async (imageUrl: string) => {
  const imageParsed = imageSchema.safeParse(imageUrl);

  if (!imageParsed.success) {
    return { ok: false, message: "URL de imagen inválida" };
  }

  if (!imageParsed.success) {
    return {
      ok: false,
      message: 'Error al validar la imagen'
    }
  }

  const image = imageParsed.data

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

    const userImageUpdated = await prisma.user.update({
      where: { id: user.id },
      data: {
        image
      }
    })

    if (!userImageUpdated) {
      return {
        ok: false,
        message: 'Imagen de usuario no actualizada'
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
