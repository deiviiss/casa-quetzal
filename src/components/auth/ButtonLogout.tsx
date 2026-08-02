'use client'

import { IoLogOutOutline } from 'react-icons/io5'
import { logout } from '@/actions/auth/logout'
import { Button } from '@/components/ui/button'
import { useNewCartStore } from '@/store/new-cart-store'
import { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface Props {
  name?: string
  className?: string
  icon?: React.JSX.Element
}

export const ButtonLogout = ({ className, icon, name }: Props) => {
  const { hasDispensaryItems, removeDispensaryItems } = useNewCartStore()
  const [isAlertOpen, setIsAlertOpen] = useState(false)

  const executeLogout = async () => {
    await logout()
    window.location.replace('/')
  }

  const handleLogoutClick = () => {
    if (hasDispensaryItems()) {
      setIsAlertOpen(true)
    } else {
      executeLogout()
    }
  }

  return (
    <>
      <Button
        variant={'outline'}
        onClick={handleLogoutClick}
        className={className}
      >
        {icon || <IoLogOutOutline />}
        <span className='hidden min-[500px]:block' >{name ? name : "Salir"}</span>
      </Button>

      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Cerrar sesión?</AlertDialogTitle>
            <AlertDialogDescription>
              Tienes productos del dispensario en tu carrito. Al cerrar sesión, estos productos serán eliminados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={async () => {
              removeDispensaryItems()
              await executeLogout()
            }}>
              Continuar y cerrar sesión
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
