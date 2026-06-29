"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Shield, ShoppingCart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ToogleDarkMode } from "@/components/dark-mode/toogle-dark-mode/toogle-dark-mode"
import { useUiStore } from "@/store"
import { useNewCartStore } from "@/store/new-cart-store"
import { cn } from "@/lib/utils"

interface HeaderClientProps {
  isAdmin: boolean
}

export default function HeaderClient({ isAdmin }: HeaderClientProps) {
  const path = usePathname()
  const isProfilePage = path.includes('/platform/profile')
  const isAdminPage = path.includes('/platform/admin')

  const { openSideCart } = useUiStore()
  const totalItems = useNewCartStore((state) => state.getTotalItems())

  return (
    <motion.header
      className="sticky top-0 z-40 w-full mx-auto border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex flex-col items-center justify-between p-3 pb-1 gap-2">
        <div className="flex items-center justify-between w-full max-w-5xl">
          <Link href={'/'} className="flex items-center space-x-2 object-contain overflow-hidden">
            <Image src="/imgs/quetzal.svg" alt="logo" width={291} height={366} className='w-7' />
            <span>Inicio</span>
          </Link>

          {/* Membership link and Admin button for desktop */}
          <nav className="hidden md:flex gap-6">
            {isAdmin && (
              <Button
                asChild
                variant={isAdminPage ? "default" : "outline"}
                className="gap-2"
              >
                <Link href="/platform/admin">
                  <Shield className="h-4 w-4" />
                  <motion.span
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Panel Admin
                  </motion.span>
                </Link>
              </Button>
            )}
          </nav>

          <div className='flex items-center gap-3'>
            < ToogleDarkMode />
            <Button
              asChild
              variant={isAdminPage ? "outline" : "default"}
            >
              <Link href={isProfilePage ? "/platform/dispensary" : "/platform/profile"} >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isProfilePage ? "Dispensario" : "Perfil"}
                </motion.span>
              </Link>
            </Button>

            {/* Cart button */}
            <Button variant="outline" onClick={openSideCart} className="flex items-center relative">
              <ShoppingCart className="h-5 w-5 mr-1" />
              <span className="hidden sm:inline">Carrito</span>
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-primary text-card px-1.5 py-0.5 text-xs rounded-full">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </div>
        </div>
        <nav className="flex md:hidden gap-6">
          {isAdmin && (
            <Link href="/platform/admin" className="flex items-center gap-1">
              <Shield className="h-4 w-4 text-primary" />
              <motion.span
                className={cn(
                  "text-sm font-medium hover:text-primary transition-colors",
                  isAdminPage ? "text-primary" : "text-muted-foreground"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Panel Admin
              </motion.span>
            </Link>
          )}
        </nav>
      </div>
    </motion.header>
  )
}
