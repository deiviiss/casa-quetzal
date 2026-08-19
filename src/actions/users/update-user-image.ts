'use server'

import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'
import { getUserSessionServer } from '../auth/getUserSessionServer'
import { getUserById } from './get-user-by-id'

export const updateUserImage = async (imageUrl: string, publicId?: string) => {
  if (!imageUrl || imageUrl.trim() === '') {
    return { ok: false, message: 'URL o identificador de imagen no proporcionado' }
  }

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
        ...(publicId ? { imagePublicId: publicId } : {})
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
    console.error('Error updating user image:', error)
    return {
      ok: false,
      message: 'Error al actualizar el usuario, por favor contacta a soporte'
    }
  }
}
