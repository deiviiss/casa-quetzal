'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { getProtectedResourceUrl } from '@/lib/cloudinary.server'

export interface GetUserIneUrlResponse {
  ok: boolean
  message: string
  url?: string
}

export async function getUserIneUrl(targetUserId: string): Promise<GetUserIneUrlResponse> {
  try {
    // 1. Verify authenticated session
    const session = await auth()
    if (!session?.user?.id) {
      return {
        ok: false,
        message: 'No autorizado. Debes iniciar sesión.'
      }
    }

    // 2. Verify admin role
    const userRole = session.user.role
    if (userRole !== 'admin') {
      return {
        ok: false,
        message: 'Acceso denegado. Se requieren permisos de administrador.'
      }
    }

    if (!targetUserId) {
      return {
        ok: false,
        message: 'ID de usuario inválido.'
      }
    }

    // 3. Fetch user INE reference from Prisma
    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      select: {
        inePublicId: true,
        ineUrl: true
      }
    })

    if (!targetUser || (!targetUser.inePublicId && !targetUser.ineUrl)) {
      return {
        ok: false,
        message: 'El usuario no tiene una identificación oficial registrada.'
      }
    }

    // 4. Generate signed time-limited URL for authenticated asset
    if (targetUser.inePublicId) {
      const signedUrl = getProtectedResourceUrl(targetUser.inePublicId, {
        resourceType: 'image',
        expiresInSeconds: 15 * 60, // 15 minutes
        attachment: false
      })

      return {
        ok: true,
        message: 'URL generada exitosamente.',
        url: signedUrl
      }
    }

    // 5. Fallback for legacy assets that only have ineUrl
    return {
      ok: true,
      message: 'URL obtenida (legado).',
      url: targetUser.ineUrl || undefined
    }
  } catch (error) {
    console.error('[Get User INE URL Error]:', error)
    return {
      ok: false,
      message: 'Ocurrió un error al generar el acceso seguro al documento.'
    }
  }
}
