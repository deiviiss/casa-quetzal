'use server'

import { type User } from '@/interfaces/user.interface'
import prisma from '@/lib/prisma'

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
        purchase: {
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

    return {
      ok: true,
      message: 'Usuario encontrado',
      user: user as unknown as User
    }
  } catch (error) {
    console.error('Error fetching user', error)
    return {
      ok: false,
      message: 'Error al obtener el usuario, por favor contacta a soporte'
    }
  }
}
