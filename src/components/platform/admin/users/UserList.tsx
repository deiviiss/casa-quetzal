'use client'

import { useState, useEffect, useTransition } from 'react'
import { Eye, UserX, UserCheck, Search, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { toggleUserStatus } from '@/actions/users/toggle-user-status'
import { noticeSuccess, noticeFailure } from '@/components/toast-notifications/ToastNotifications'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

import { Membership } from '@/interfaces/membership.interface'
import { IneStatus } from '@/interfaces/user.interface'
import { getMembershipSummary, isMembershipActive } from '@/lib/membership-helpers'

interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  isActive: boolean
  ineStatus?: IneStatus | null
  membership?: Membership | null
}

interface UserListProps {
  users: User[]
}

const toneClasses: Record<string, string> = {
  success: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 border-none',
  warning: 'bg-amber-100 text-amber-800 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400 border-none',
  danger: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-950/30 dark:text-red-400 border-none',
  neutral: 'bg-slate-100 text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 border-none',
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
  </svg>
)

export default function UserList({ users }: UserListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const initialSearch = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(initialSearch)

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchTerm) {
        params.set('q', searchTerm)
      } else {
        params.delete('q')
      }

      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false })
      })
    }, 400)

    return () => clearTimeout(timer)
  }, [searchTerm, pathname, router, searchParams])

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const { ok, message } = await toggleUserStatus({ id, status: currentStatus })
    if (ok) {
      noticeSuccess(message)
      router.refresh()
    } else {
      noticeFailure(message)
    }
  }

  const activeMemberships = users.filter(user => isMembershipActive(user.membership)).length
  const inactiveMemberships = users.length - activeMemberships

  return (
    <Card className="overflow-hidden">
      <div className="p-4 border-b bg-muted/20 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {isPending ? (
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            ) : (
              <Search className="h-4 w-4 text-muted-foreground" />
            )}
          </div>
          <Input
            type="text"
            placeholder="Buscar por nombre, correo o teléfono..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Activas: <span className="font-semibold text-foreground">{activeMemberships}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-destructive"></span>
            Inactivas: <span className="font-semibold text-foreground">{inactiveMemberships}</span>
          </div>
        </div>
      </div>
      {/* Mobile view with cards */}
      <div className="md:hidden divide-y">
        {users.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground italic">No se encontraron usuarios.</div>
        ) : (
          users.map((user) => (
            <div key={user.id} className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-foreground">{user.name}</h3>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <Badge variant={user.isActive ? "default" : "destructive"}>
                    {user.isActive ? "Activo" : "Inactivo"}
                  </Badge>
                  {(() => {
                    const summary = getMembershipSummary(user.membership)
                    return (
                      <div className="flex flex-col items-end">
                        <Badge className={`uppercase text-[10px] ${toneClasses[summary.tone]}`}>
                          {summary.label}
                        </Badge>
                        {summary.detail && (
                          <span className="text-[10px] text-muted-foreground mt-0.5 font-medium">
                            {summary.detail}
                          </span>
                        )}
                      </div>
                    )
                  })()}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold block">Teléfono</span>
                  {user.phoneNumber ? (
                    <Link
                      href={`https://wa.me/${user.phoneNumber.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-primary hover:text-secondary transition-colors"
                    >
                      <WhatsAppIcon className="h-3.5 w-3.5" />
                      {user.phoneNumber}
                    </Link>
                  ) : null}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/platform/admin/users/${user.id}`}>
                    <Eye className="h-4 w-4 mr-2" /> Ver
                  </Link>
                </Button>
                <Button
                  onClick={() => handleToggleStatus(user.id, user.isActive)}
                  variant={user.isActive ? "outline" : "default"}
                  size="sm"
                  className="flex-1"
                >
                  {user.isActive ? (
                    <><UserX className="h-4 w-4 mr-2" /> Desactivar</>
                  ) : (
                    <><UserCheck className="h-4 w-4 mr-2" /> Activar</>
                  )}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Desktop view with table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
            <tr>
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Correo</th>
              <th className="px-6 py-4 font-medium">Teléfono</th>
              <th className="px-6 py-4 font-medium text-center">Estado</th>
              <th className="px-6 py-4 font-medium text-center">Membresía</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground italic">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {user.phoneNumber ? (
                      <Link
                        href={`https://wa.me/${user.phoneNumber.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-primary hover:text-secondary transition-colors"
                      >
                        <WhatsAppIcon className="h-3.5 w-3.5" />
                        {user.phoneNumber}
                      </Link>
                    ) : null}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={user.isActive ? "default" : "destructive"} className="uppercase text-[10px]">
                      {user.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {(() => {
                      const summary = getMembershipSummary(user.membership)
                      return (
                        <div className="flex flex-col items-center justify-center gap-1">
                          <Badge className={`uppercase text-[10px] ${toneClasses[summary.tone]}`}>
                            {summary.label}
                          </Badge>
                          {summary.detail && (
                            <span className="text-[10px] text-muted-foreground font-medium">
                              {summary.detail}
                            </span>
                          )}
                          {user.ineStatus === 'VERIFIED' && (
                            <Badge className="bg-emerald-600/10 text-emerald-600 dark:text-emerald-400 text-[9px] border-emerald-500/20 px-1.5 py-0">
                              INE Verificada
                            </Badge>
                          )}
                          {user.ineStatus === 'PENDING' && (
                            <Badge className="bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[9px] border-amber-500/20 px-1.5 py-0">
                              INE Pendiente
                            </Badge>
                          )}
                        </div>
                      )
                    })()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <Button asChild variant="ghost" size="sm" className="h-8 p-2" title="Ver Detalle">
                        <Link href={`/platform/admin/users/${user.id}`}>
                          <Eye className="h-4 w-4 text-blue-600" />
                          <span className="sr-only">Ver</span>
                        </Link>
                      </Button>
                      <Button
                        onClick={() => handleToggleStatus(user.id, user.isActive)}
                        variant="ghost"
                        size="sm"
                        className="h-8 p-2"
                        title={user.isActive ? "Desactivar" : "Activar"}
                      >
                        {user.isActive ? (
                          <UserX className="h-4 w-4 text-destructive" />
                        ) : (
                          <UserCheck className="h-4 w-4 text-green-600" />
                        )}
                        <span className="sr-only">{user.isActive ? "Desactivar" : "Activar"}</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  )
}
