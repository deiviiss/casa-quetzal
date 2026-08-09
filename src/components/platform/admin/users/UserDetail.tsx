'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Pencil,
  User as UserIcon,
  Mail,
  Phone,
  FileText,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Loader2,
  Eye
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog'
import { noticeSuccess, noticeFailure } from '@/components/toast-notifications/ToastNotifications'
import { useRouter } from 'next/navigation'
import { grantMembershipAccess, revokeMembershipAccess } from '@/actions/users/access.actions'
import { updateUserIneStatus } from '@/actions/users/update-user-ine-status'
import UserMemberForm from './UserMemberForm'

import { Membership } from '@/interfaces/membership.interface'
import { IneStatus } from '@/interfaces/user.interface'
import { formatDateShort } from '@/lib/membership-helpers'
import { MembershipCard } from '@/components/platform/membership/MembershipCard'

interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  isActive: boolean
  role: string
  ineUrl?: string | null
  inePublicId?: string | null
  ineStatus?: IneStatus | null
  ineUploadedAt?: Date | string | null
  membership?: Membership | null
}

interface UserDetailProps {
  user: User
}

export default function UserDetail({ user }: UserDetailProps) {
  const router = useRouter()
  const [isUserMemberFormOpen, setIsUserMemberFormOpen] = useState(false)
  const [isIneViewerOpen, setIsIneViewerOpen] = useState(false)
  const [isSubmittingAccess, setIsSubmittingAccess] = useState(false)
  const [isUpdatingIne, setIsUpdatingIne] = useState(false)

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

  const handleUpdateIneStatus = async (status: IneStatus) => {
    setIsUpdatingIne(true)
    const result = await updateUserIneStatus(user.id, status)
    if (result.ok) {
      noticeSuccess(result.message)
      router.refresh()
    } else {
      noticeFailure(result.message)
    }
    setIsUpdatingIne(false)
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
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Subscription Management */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="md:col-span-1">
          <MembershipCard
            membership={user.membership}
            variant="admin"
            onGrantAccess={handleGrantAccess}
            onRevokeAccess={handleRevokeAccess}
            isSubmittingAccess={isSubmittingAccess}
          />
        </motion.div>

        {/* INE Verification Card */}
        <motion.div variants={fadeInUp} initial="initial" animate="animate" className="md:col-span-1">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base font-semibold">
                <FileText className="h-5 w-5 text-emerald-500" />
                Identificación Oficial (INE)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5 flex-1 flex flex-col justify-between">
              <div className="space-y-4">
                {/* Status Badge */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">Estado de INE:</span>
                  {user.ineStatus === 'VERIFIED' && (
                    <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
                      <CheckCircle2 className="h-3.5 w-3.5" /> Verificada
                    </Badge>
                  )}
                  {user.ineStatus === 'PENDING' && (
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
                      <Clock className="h-3.5 w-3.5" /> Pendiente
                    </Badge>
                  )}
                  {user.ineStatus === 'REJECTED' && (
                    <Badge variant="destructive" className="gap-1">
                      <XCircle className="h-3.5 w-3.5" /> Rechazada
                    </Badge>
                  )}
                  {!user.ineStatus && (
                    <Badge variant="outline" className="text-muted-foreground gap-1">
                      <ShieldAlert className="h-3.5 w-3.5" /> Sin Documento
                    </Badge>
                  )}
                </div>

                {/* Upload Date & Document Link */}
                {user.ineUrl ? (
                  <div className="p-3 bg-muted/40 rounded-lg border space-y-2 text-xs">
                    {user.ineUploadedAt && (
                      <p className="text-muted-foreground">
                        Fecha de carga: <span className="font-medium text-foreground">{formatDateShort(user.ineUploadedAt)}</span>
                      </p>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsIneViewerOpen(true)}
                      className="w-full justify-center gap-2 text-xs"
                    >
                      <Eye className="h-3.5 w-3.5" /> Ver Documento INE
                    </Button>
                  </div>
                ) : (
                  <div className="p-3 bg-muted/20 rounded-lg border border-dashed text-center text-xs text-muted-foreground">
                    El usuario aún no ha subido su identificación oficial.
                  </div>
                )}
              </div>

              {/* Admin Action Buttons */}
              <div className="space-y-2 pt-2 border-t">
                <p className="text-[11px] font-medium text-muted-foreground uppercase">Acciones de Administrador</p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    disabled={isUpdatingIne || !user.ineUrl || user.ineStatus === 'VERIFIED'}
                    onClick={() => handleUpdateIneStatus('VERIFIED')}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs gap-1"
                  >
                    {isUpdatingIne ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <CheckCircle2 className="h-3.5 w-3.5" />
                    )}
                    Aprobar INE
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    disabled={isUpdatingIne || !user.ineUrl || user.ineStatus === 'REJECTED'}
                    onClick={() => handleUpdateIneStatus('REJECTED')}
                    className="flex-1 text-xs gap-1"
                  >
                    {isUpdatingIne ? (
                      <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    ) : (
                      <XCircle className="h-3.5 w-3.5" />
                    )}
                    Rechazar
                  </Button>
                </div>
              </div>
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

      {/* INE Document Viewer Modal */}
      {user.ineUrl && (
        <Dialog open={isIneViewerOpen} onOpenChange={setIsIneViewerOpen}>
          <DialogContent className="max-w-3xl bg-card rounded-lg p-6 max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-emerald-500" />
                Identificación Oficial (INE) - {user.name}
              </DialogTitle>
              <DialogDescription className="text-xs text-muted-foreground">
                Revisión e inspección de la identificación cargada por el usuario.
              </DialogDescription>
            </DialogHeader>

            <div className="my-4 flex items-center justify-center bg-muted/20 border rounded-lg p-2 min-h-[300px]">
              {user.ineUrl.toLowerCase().includes('.pdf') || user.ineUrl.toLowerCase().includes('pdf') ? (
                <iframe
                  src={user.ineUrl}
                  className="w-full h-[65vh] rounded-md border"
                  title="Visor INE PDF"
                />
              ) : (
                <img
                  src={user.ineUrl}
                  alt={`INE de ${user.name}`}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-md shadow-sm"
                />
              )}
            </div>

            <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-between items-center border-t pt-4">
              <div className="text-xs text-muted-foreground">
                Estado actual: <span className="font-semibold text-foreground">{user.ineStatus || 'Sin estado'}</span>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setIsIneViewerOpen(false)}
                >
                  Cerrar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  disabled={isUpdatingIne || user.ineStatus === 'REJECTED'}
                  onClick={async () => {
                    await handleUpdateIneStatus('REJECTED')
                    setIsIneViewerOpen(false)
                  }}
                  className="gap-1 text-xs"
                >
                  <XCircle className="h-3.5 w-3.5" /> Rechazar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  disabled={isUpdatingIne || user.ineStatus === 'VERIFIED'}
                  onClick={async () => {
                    await handleUpdateIneStatus('VERIFIED')
                    setIsIneViewerOpen(false)
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1 text-xs"
                >
                  <CheckCircle2 className="h-3.5 w-3.5" /> Aprobar INE
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

