import prisma from '@/lib/prisma'

export type ProductType = 'membership'

/**
 * Verifica si un usuario tiene acceso a un tipo de producto específico
 * @param userId - ID del usuario
 * @param productType - Tipo de producto ('membership')
 * @returns boolean - true si tiene acceso, false si no
 */
export const userHasProduct = async (userId: string, productType: ProductType): Promise<boolean> => {
  try {
    // Buscar si el usuario tiene una membresía activa del tipo de producto especificado
    const membership = await prisma.membership.findFirst({
      where: {
        userId,
        product: {
          type: productType,
          isActive: true
        }
      }
    })

    return !!membership
  } catch (error) {
    console.error('Error checking access:', error)
    return false
  }
}

export async function userHasMembership(userId: string): Promise<boolean> {
  try {
    const membership = await prisma.membership.findUnique({
      where: { userId },
      include: {
        product: true
      }
    })

    if (!membership) return false

    return (
      membership.status === 'ACTIVE' &&
      membership.product.isActive &&
      new Date(membership.expiresAt) > new Date()
    )
  } catch (error) {
    console.error('Error checking membership access:', error)
    return false
  }
}

export async function userCanAccessDispensary(userId: string): Promise<boolean> {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        membership: {
          include: {
            product: true
          }
        }
      }
    })

    if (!user) return false

    // Preserve existing admin bypass rule
    if (user.role === 'admin') return true

    const hasActiveMembership =
      user.membership &&
      user.membership.status === 'ACTIVE' &&
      user.membership.product.isActive &&
      new Date(user.membership.expiresAt) > new Date()

    const isIneVerified = user.ineStatus === 'VERIFIED'

    return Boolean(hasActiveMembership && isIneVerified)
  } catch (error) {
    console.error('Error checking dispensary access:', error)
    return false
  }
}
