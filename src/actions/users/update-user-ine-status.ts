'use server'

import prisma from '@/lib/prisma'
import { validateUserAdmin } from '../auth/validate-user-admin'
import { revalidatePath } from 'next/cache'
import type { IneStatus } from '@/interfaces/user.interface'

export async function updateUserIneStatus(userId: string, status: IneStatus) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'No autorizado' }
    }

    if (!userId || !status) {
      return { ok: false, message: 'Parámetros inválidos' }
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { ineUrl: true }
    })

    if (!targetUser || !targetUser.ineUrl) {
      return { ok: false, message: 'El usuario no cuenta con una identificación cargada para autorizar o rechazar.' }
    }

    await prisma.user.update({
      where: { id: userId },
      data: { ineStatus: status }
    })

    revalidatePath(`/platform/admin/users/${userId}`)
    revalidatePath('/platform/admin/users')

    return {
      ok: true,
      message: `Estado de INE actualizado a ${status === 'VERIFIED' ? 'Verificada' : status === 'REJECTED' ? 'Rechazada' : 'Pendiente'}`
    }
  } catch (error) {
    console.error('[Update User INE Status Error]:', error)
    return { ok: false, message: 'Error al actualizar estado de la INE' }
  }
}
