'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Pencil,
  User as UserIcon,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { noticeSuccess, noticeFailure } from '@/components/toast-notifications/ToastNotifications'
import { useRouter } from 'next/navigation'
import { grantMembershipAccess, revokeMembershipAccess } from '@/actions/users/access.actions'
import { XCircle } from 'lucide-react'
import UserMemberForm from './UserMemberForm'

import { Membership } from '@/interfaces/membership.interface'
import { getMembershipDetails, formatDateShort, isMembershipActive } from '@/lib/membership-helpers'

interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  isActive: boolean
  role: string
  membership?: Membership | null
}

interface UserDetailProps {
  user: User
}

const toneClasses: Record<string, string> = {
  success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-none',
  warning: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 border-none',
  danger: 'bg-red-100 text-red-800 dark:bg-red-950/30 dark:text-red-400 border-none',
  neutral: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-none',
}

const toneTextClasses: Record<string, string> = {
  success: 'text-green-600 dark:text-green-400',
  warning: 'text-amber-600 dark:text-amber-400',
  danger: 'text-red-600 dark:text-red-400',
  neutral: 'text-slate-600 dark:text-slate-400',
}

export default function UserDetail({ user }: UserDetailProps) {
  const router = useRouter()
  const [isUserMemberFormOpen, setIsUserMemberFormOpen] = useState(false)
  const [isSubmittingAccess, setIsSubmittingAccess] = useState(false)

  const details = getMembershipDetails(user.membership)
  const hasMembershipAccess = isMembershipActive(user.membership)

  const handleGrantAccess = async () => {
    setIsSubmittingAccess(true)
    const result = await grantMembershipAccess(user.id)
    if (result.ok) {
      noticeSuccess(result.message)
      router.refresh()
    } else {
      noticeFailure(result.message)
    }
    setIsSubmittingAccess(false)
  }

  const handleRevokeAccess = async () => {
    setIsSubmittingAccess(true)
    const result = await revokeMembershipAccess(user.id)
    if (result.ok) {
      noticeSuccess(result.message)
      router.refresh()
    } else {
      noticeFailure(result.message)
    }
    setIsSubmittingAccess(false)
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link href="/platform/admin/users">
            <ArrowLeft className="h-4 w-4 mr-2" /> Volver a usuarios
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* User Information */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="md:col-span-1">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2">
                <UserIcon className="h-5 w-5 text-primary" />
                Perfil de Usuario
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsUserMemberFormOpen(true)}
                className="h-8 w-8 p-0"
                title="Editar información de usuario"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center pb-6 border-b">
                <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UserIcon className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
                <Badge variant={user.isActive ? "default" : "destructive"} className="mt-2">
                  {user.isActive ? 'Miembro Activo' : 'Miembro Inactivo'}
                </Badge>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Correo</p>
                    <p className="text-sm">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Teléfono</p>
                    <p className="text-sm">{user.phoneNumber}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ShieldCheck className="h-4 w-4 text-muted-foreground mt-1" />
                  <div>
                    <p className="text-xs font-medium text-muted-foreground uppercase">Rol</p>
                    <p className="text-sm capitalize">{user.role}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription Management */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="md:col-span-1">
          <Card className="h-full bg-card border border-border/50 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-3 opacity-10">
              <ShieldCheck className="h-24 w-24 text-primary" />
            </div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Suscripción
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {details ? (
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-border/40">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Estado</span>
                    <Badge className={`text-xs font-bold uppercase ${toneClasses[details.tone]}`}>
                      {details.statusLabel}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Producto</span>
                    <span className="text-sm font-semibold text-foreground">{details.productName}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">Miembro desde</span>
                    <span className="text-sm text-foreground">{formatDateShort(details.memberSince)}</span>
                  </div>

                  <div className="py-2 border-t border-b border-border/30 bg-muted/10 px-3 rounded-lg my-2">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
                        {details.isExpired ? 'Último período' : 'Período vigente'}
                      </span>
                      <div className="flex items-center gap-2 text-xs font-medium text-foreground">
                        <span>{formatDateShort(details.startsAt)}</span>
                        <span className="text-muted-foreground">↓</span>
                        <span>{formatDateShort(details.expiresAt)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">
                      {details.isExpired ? 'Venció' : 'Vence'}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{formatDateShort(details.expiresAt)}</span>
                  </div>

                  <div className="flex justify-between items-center py-1">
                    <span className="text-xs text-muted-foreground">
                      {details.isExpired ? 'Venció hace' : 'Tiempo restante'}
                    </span>
                    <span className={`text-sm font-bold ${toneTextClasses[details.tone]}`}>
                      {details.isExpired ? (
                        details.daysDifference === 0 ? 'Venció hoy' : details.daysDifference === 1 ? 'Hace 1 día' : `Hace ${details.daysDifference} días`
                      ) : (
                        details.daysDifference === 0 ? 'Vence hoy' : details.daysDifference === 1 ? 'Vence mañana' : `${details.daysDifference} días`
                      )}
                    </span>
                  </div>

                  <div className="pt-4">
                    {hasMembershipAccess ? (
                      <Button
                        variant="destructive"
                        className="w-full text-xs font-semibold transition-colors"
                        onClick={handleRevokeAccess}
                        disabled={isSubmittingAccess}
                      >
                        Revocar Acceso a Membresía
                      </Button>
                    ) : (
                      <Button
                        className="w-full text-xs font-semibold bg-primary text-primary-foreground transition-colors"
                        onClick={handleGrantAccess}
                        disabled={isSubmittingAccess}
                      >
                        Asignar Acceso a Membresía
                      </Button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 py-8 text-center">
                  <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-full">
                    <XCircle className="h-8 w-8 text-slate-400" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-base text-foreground">Sin membresía activa</p>
                    <p className="text-xs text-muted-foreground max-w-[200px] mx-auto">
                      Asigna acceso para permitir al usuario ver el dispensario.
                    </p>
                  </div>
                  <Button
                    className="w-full text-xs font-semibold bg-primary hover:bg-primary/90 text-primary-foreground transition-colors mt-2"
                    onClick={handleGrantAccess}
                    disabled={isSubmittingAccess}
                  >
                    Asignar Acceso a Membresía
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <UserMemberForm
        isOpen={isUserMemberFormOpen}
        onClose={() => {
          setIsUserMemberFormOpen(false)
          router.refresh()
        }}
        user={{
          id: user.id,
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber
        }}
      />
    </div>
  )
}
