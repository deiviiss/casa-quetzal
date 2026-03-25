'use server'

import prisma from '@/lib/prisma'
import { User } from '@/interfaces/user.interface'

export const getAllUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      where: {
        role: 'user' // We only want to manage parents/users, not other admins (though could be changed)
      },
      include: {
        purchase: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return {
      ok: true,
      users: users.map(user => ({
        ...user
      })) as unknown as User[]
    }
  } catch (error) {
    console.error('Error fetching all users:', error)
    return {
      ok: false,
      message: 'Error fetching users'
    }
  }
}
