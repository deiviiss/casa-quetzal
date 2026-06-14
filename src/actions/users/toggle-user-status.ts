'use server'

import { revalidatePath } from 'next/cache'
import { validateUserAdmin } from '@/actions/auth/validate-user-admin'
import prisma from '@/lib/prisma'

interface Props {
  id: string
  status: boolean
}

export const toggleUserStatus = async ({ id, status }: Props) => {
  try {
    const isAdmin = await validateUserAdmin()

    if (!isAdmin) {
      return {
        ok: false,
        message: 'Debes estar autenticado como administrador'
      }
    }

    const newStatus = !status

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        isActive: newStatus
      }
    })

    if (!updatedUser) {
      return {
        ok: false,
        message: 'Usuario no encontrado'
      }
    }

    revalidatePath('/admin/users')

    return {
      ok: true,
      message: updatedUser.isActive ? 'Usuario activado exitosamente' : 'Usuario desactivado exitosamente'
    }
  } catch (error) {
    console.error('Error changing user status:', error)
    return {
      ok: false,
      message: 'Error al cambiar el estado del usuario, por favor contacta a soporte'
    }
  }
}
