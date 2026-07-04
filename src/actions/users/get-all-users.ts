'use server'

import prisma from '@/lib/prisma'
import { User } from '@/interfaces/user.interface'

export const getAllUsers = async (query?: string) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'user', // We only want to manage parents/users, not other admins (though could be changed)
        ...(query ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { email: { contains: query, mode: 'insensitive' } },
            { phoneNumber: { contains: query } }
          ]
        } : {})
      },
      include: {
        _count: {
          select: {
            purchase: {
              where: {
                product: {
                  type: 'membership'
                }
              }
            }
          }
        }
      },
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      users: users.map(user => {
        const { _count, ...rest } = user
        return {
          ...rest,
          membershipActive: _count.purchase > 0
        }
      })
    }
  } catch (error) {
    console.error('Error fetching all users:', error)
    return {
      ok: false,
      message: 'Error al obtener los usuarios'
    }
  }
}
