'use client'

import { Eye, UserX, UserCheck } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { toggleUserStatus } from '@/actions/users/toggle-user-status'
import { noticeSuccess, noticeFailure } from '@/components/toast-notifications/ToastNotifications'
import { useRouter } from 'next/navigation'

interface User {
  id: string
  name: string
  email: string
  phoneNumber: string
  isActive: boolean
}

interface UserListProps {
  users: User[]
}

export default function UserList({ users }: UserListProps) {
  const router = useRouter()

  const handleToggleStatus = async (id: string, currentStatus: boolean) => {
    const { ok, message } = await toggleUserStatus({ id, status: currentStatus })
    if (ok) {
      noticeSuccess(message)
      router.refresh()
    } else {
      noticeFailure(message)
    }
  }

  return (
    <Card className="overflow-hidden">
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
                <Badge variant={user.isActive ? "default" : "destructive"}>
                  {user.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="font-semibold block">Teléfono</span>
                  {user.phoneNumber}
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
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground italic">
                  No se encontraron usuarios.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-foreground">{user.name}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-6 py-4 text-muted-foreground">{user.phoneNumber}</td>
                  <td className="px-6 py-4 text-center">
                    <Badge variant={user.isActive ? "default" : "destructive"} className="uppercase text-[10px]">
                      {user.isActive ? "Activo" : "Inactivo"}
                    </Badge>
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
