'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import type { IneStatus } from '@/interfaces/user.interface'

export interface UserIneStatusResponse {
  isAuthenticated: boolean
  hasIne: boolean
  ineStatus?: IneStatus | null
  ineUrl?: string | null
  userId?: string
  name?: string
}

export async function checkUserIneStatus(): Promise<UserIneStatusResponse> {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return {
        isAuthenticated: false,
        hasIne: false
      }
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        id: true,
        name: true,
        ineUrl: true,
        inePublicId: true,
        ineStatus: true
      }
    })

    if (!user) {
      return {
        isAuthenticated: false,
        hasIne: false
      }
    }

    const hasIne = Boolean(user.inePublicId)

    return {
      isAuthenticated: true,
      hasIne,
      ineStatus: user.ineStatus,
      ineUrl: user.ineUrl,
      userId: user.id,
      name: user.name
    }
  } catch (error) {
    console.error('[Check User INE Error]:', error)
    return {
      isAuthenticated: false,
      hasIne: false
    }
  }
}
