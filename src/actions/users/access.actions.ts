'use server'

import prisma from '@/lib/prisma'
import { validateUserAdmin } from '../auth/validate-user-admin'
import { revalidatePath } from 'next/cache'

export async function grantMembershipAccess(userId: string) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'Unauthorized' }
    }

    // 1. Find the Membership product
    const membershipProduct = await prisma.product.findFirst({
      where: { type: 'membership' }
    })

    if (!membershipProduct) {
      return { ok: false, message: 'Membership product not found in database. Please contact support.' }
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
      return { ok: false, message: 'User already has Membership access' }
    }

    // 3. Create purchase
    await prisma.purchase.create({
      data: {
        userId,
        productId: membershipProduct.id
      }
    })

    revalidatePath(`/platform/admin/users/${userId}`)
    return { ok: true, message: 'Membership access granted' }
  } catch (error) {
    console.error('Error granting access:', error)
    return { ok: false, message: 'Error granting access' }
  }
}

export async function revokeMembershipAccess(userId: string) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'Unauthorized' }
    }

    const membershipProduct = await prisma.product.findFirst({
      where: { type: 'membership' }
    })

    if (!membershipProduct) {
      return { ok: false, message: 'Membership product not found' }
    }

    await prisma.purchase.deleteMany({
      where: {
        userId,
        productId: membershipProduct.id
      }
    })

    revalidatePath(`/platform/admin/users/${userId}`)
    return { ok: true, message: 'Membership access removed' }
  } catch (error) {
    console.error('Error revoking access:', error)
    return { ok: false, message: 'Error removing access' }
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
