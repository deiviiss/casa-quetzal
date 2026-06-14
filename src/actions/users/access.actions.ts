'use server'

import prisma from '@/lib/prisma'
import { validateUserAdmin } from '../auth/validate-user-admin'
import { revalidatePath } from 'next/cache'

export async function grantMembershipAccess(userId: string) {
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

    // 2. Check if user already has it
    const existingPurchase = await prisma.purchase.findUnique({
      where: {
        userId_productId: {
          userId,
          productId: membershipProduct.id
        }
      }
    })

    if (existingPurchase) {
      return { ok: false, message: 'El usuario ya tiene acceso de membresía' }
    }

    // 3. Create purchase
    await prisma.purchase.create({
      data: {
        userId,
        productId: membershipProduct.id
      }
    })

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

    await prisma.purchase.deleteMany({
      where: {
        userId,
        productId: membershipProduct.id
      }
    })

    revalidatePath(`/platform/admin/users/${userId}`)
    return { ok: true, message: 'Acceso de membresía revocado' }
  } catch (error) {
    console.error('Error revoking access:', error)
    return { ok: false, message: 'Error al revocar acceso' }
  }
}

export async function checkUserMembershipAccess(userId: string) {
  try {
    const purchase = await prisma.purchase.findFirst({
      where: {
        userId,
        product: {
          type: 'membership'
        }
      }
    })
    return !!purchase
  } catch {
    return false
  }
}
