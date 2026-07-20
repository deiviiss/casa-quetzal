'use server'

import prisma from '@/lib/prisma'
import { validateUserAdmin } from '../auth/validate-user-admin'
import { revalidatePath } from 'next/cache'

import { userHasMembership } from '../auth/access'

export async function grantMembershipAccess(userId: string, expiresAt?: Date) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'No autorizado' }
    }

    // 1. Find the Membership product
    const membershipProduct = await prisma.product.findFirst({
      where: { type: 'membership' }
    })

    if (!membershipProduct) {
      return { ok: false, message: 'Producto de membresía no encontrado en la base de datos. Por favor, contacta a soporte.' }
    }

    // 2. Check if user already has an active membership
    const existingMembership = await prisma.membership.findUnique({
      where: { userId }
    })

    if (existingMembership && existingMembership.status === 'ACTIVE' && new Date(existingMembership.expiresAt) > new Date()) {
      return { ok: false, message: 'El usuario ya tiene acceso de membresía activo' }
    }

    // 3. Calculate expiration date if not provided (defaulting to 1 year)
    let calculatedExpiresAt = expiresAt
    if (!calculatedExpiresAt) {
      calculatedExpiresAt = new Date()
      calculatedExpiresAt.setFullYear(calculatedExpiresAt.getFullYear() + 1)
    }

    // 4. Upsert membership
    await prisma.membership.upsert({
      where: { userId },
      update: {
        productId: membershipProduct.id,
        status: 'ACTIVE',
        startsAt: new Date(),
        expiresAt: calculatedExpiresAt
      },
      create: {
        userId,
        productId: membershipProduct.id,
        status: 'ACTIVE',
        startsAt: new Date(),
        expiresAt: calculatedExpiresAt
      }
    })

    // 5. Create purchase (only for historical logs, check if it exists first to avoid @@unique constraint violations)
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: membershipProduct.id
        }
      }
    })

    if (!existingPurchase) {
      await prisma.purchase.create({
        data: {
          userId,
          productId: membershipProduct.id
        }
      })
    }

    revalidatePath(`/platform/admin/users/${userId}`)
    return { ok: true, message: 'Acceso de membresía otorgado' }
  } catch (error) {
    console.error('Error granting access:', error)
    return { ok: false, message: 'Error al otorgar acceso' }
  }
}

export async function revokeMembershipAccess(userId: string) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'No autorizado' }
    }

    const membershipProduct = await prisma.product.findFirst({
      where: { type: 'membership' }
    })

    if (!membershipProduct) {
      return { ok: false, message: 'Producto de membresía no encontrado' }
    }

    // Update status to CANCELLED and set expiration to now
    const existingMembership = await prisma.membership.findUnique({
      where: { userId }
    })

    if (existingMembership) {
      await prisma.membership.update({
        where: { userId },
        data: {
          status: 'CANCELLED',
          expiresAt: new Date()
        }
      })
    }

    revalidatePath(`/platform/admin/users/${userId}`)
    return { ok: true, message: 'Acceso de membresía revocado' }
  } catch (error) {
    console.error('Error revoking access:', error)
    return { ok: false, message: 'Error al revocar acceso' }
  }
}

export async function checkUserMembershipAccess(userId: string) {
  return userHasMembership(userId)
}
