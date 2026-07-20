import { Membership, MembershipStatus } from "@/interfaces/membership.interface"

export type MembershipTone = 'success' | 'warning' | 'danger' | 'neutral'

export function isMembershipActive(membership: Membership | null | undefined): boolean {
  if (!membership) return false
  return membership.status === 'ACTIVE' && new Date(membership.expiresAt) > new Date()
}

export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return ''
  const d = new Date(date)
  if (isNaN(d.getTime())) return ''
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export interface MembershipSummary {
  label: string
  detail: string
  tone: MembershipTone
}

export function getMembershipSummary(membership: Membership | null | undefined): MembershipSummary {
  if (!membership) {
    return {
      label: 'Sin membresía',
      detail: '',
      tone: 'danger'
    }
  }

  const now = new Date()
  const exp = new Date(membership.expiresAt)
  const isActive = isMembershipActive(membership)

  if (membership.status === 'ACTIVE' && isActive) {
    const diffTime = exp.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    let detail = ''
    if (diffDays <= 0) {
      detail = 'Vence hoy'
    } else if (diffDays === 1) {
      detail = 'Vence mañana'
    } else {
      detail = `Vence en ${diffDays} días`
    }

    const tone: MembershipTone = diffDays < 7 ? 'warning' : 'success'

    return {
      label: 'Activa',
      detail,
      tone
    }
  }

  if (membership.status === 'CANCELLED') {
    return {
      label: 'Cancelada',
      detail: '',
      tone: 'neutral'
    }
  }

  if (membership.status === 'SUSPENDED') {
    return {
      label: 'Suspendida',
      detail: '',
      tone: 'warning'
    }
  }

  // Expired
  const diffTime = now.getTime() - exp.getTime()
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  let detail = ''
  if (diffDays <= 0) {
    detail = 'Venció hoy'
  } else if (diffDays === 1) {
    detail = 'Venció ayer'
  } else {
    detail = `Hace ${diffDays} días`
  }

  return {
    label: 'Vencida',
    detail,
    tone: 'danger'
  }
}

export interface MembershipDetails {
  status: MembershipStatus
  statusLabel: string
  tone: MembershipTone
  productName: string
  memberSince: Date
  startsAt: Date
  expiresAt: Date
  isExpired: boolean
  daysDifference: number
}

export function getMembershipDetails(membership: Membership | null | undefined): MembershipDetails | null {
  if (!membership) return null

  const now = new Date()
  const starts = new Date(membership.startsAt)
  const expires = new Date(membership.expiresAt)

  const isActive = isMembershipActive(membership)
  const isExpired = !isActive

  let statusLabel = 'INACTIVA'
  let tone: MembershipTone = 'danger'

  if (membership.status === 'ACTIVE' && isActive) {
    statusLabel = 'ACTIVA'
    const diffTime = expires.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    tone = diffDays < 7 ? 'warning' : 'success'
  } else if (membership.status === 'CANCELLED') {
    statusLabel = 'CANCELADA'
    tone = 'neutral'
  } else if (membership.status === 'SUSPENDED') {
    statusLabel = 'SUSPENDIDA'
    tone = 'warning'
  } else {
    statusLabel = 'VENCIDA'
  }

  let daysDifference = 0
  if (isActive) {
    const diffTime = expires.getTime() - now.getTime()
    daysDifference = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)))
  } else {
    const diffTime = now.getTime() - expires.getTime()
    daysDifference = Math.max(0, Math.floor(diffTime / (1000 * 60 * 60 * 24)))
  }

  return {
    status: membership.status,
    statusLabel,
    tone,
    productName: membership.product?.name || 'Membresía',
    memberSince: starts,
    startsAt: starts,
    expiresAt: expires,
    isExpired,
    daysDifference
  }
}
