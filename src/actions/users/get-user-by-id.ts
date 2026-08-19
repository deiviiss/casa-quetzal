'use server'

import { type User } from '@/interfaces/user.interface'
import prisma from '@/lib/prisma'
import { getProtectedSignedUrl } from '@/lib/cloudinary.server'

interface Response {
  ok: boolean
  message: string
  user?: User
}

export const getUserById = async (id: string): Promise<Response> => {
  try {
    const user = await prisma.user.findFirst({
      where: { id },
      include: {
        membership: {
          include: {
            product: true
          }
        }
      }
    })

    if (!user) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    const resolvedUser = { ...user }

    // If user has an authenticated avatar publicId, generate a stable signed delivery URL (cacheable)
    if (resolvedUser.imagePublicId) {
      try {
        resolvedUser.image = getProtectedSignedUrl(resolvedUser.imagePublicId)
      } catch (err) {
        console.error('[Get User By ID] Error generating protected avatar url:', err)
      }
    }

    return {
      ok: true,
      message: 'Usuario encontrado',
      user: resolvedUser as unknown as User
    }
  } catch (error) {
    console.error('Error fetching user', error)
    return {
      ok: false,
      message: 'Error al obtener el usuario, por favor contacta a soporte'
    }
  }
}
