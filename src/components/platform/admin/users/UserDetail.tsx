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
import UserMemberForm from './UserMemberForm'

import { Membership } from '@/interfaces/membership.interface'
import { MembershipCard } from '@/components/platform/membership/MembershipCard'

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

export default function UserDetail({ user }: UserDetailProps) {
  const router = useRouter()
  const [isUserMemberFormOpen, setIsUserMemberFormOpen] = useState(false)
  const [isSubmittingAccess, setIsSubmittingAccess] = useState(false)

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
