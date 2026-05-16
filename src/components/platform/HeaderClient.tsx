"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { motion } from "framer-motion"
import { ToogleDarkMode } from '../dark-mode/toogle-dark-mode/toogle-dark-mode'
import { usePathname } from 'next/navigation'
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Shield } from "lucide-react"

interface HeaderClientProps {
  hasMembership: boolean
  isAdmin: boolean
}

export default function HeaderClient({ hasMembership, isAdmin }: HeaderClientProps) {
  const path = usePathname()
  const isProfilePage = path.includes('/platform/profile')
  const isAdminPage = path.includes('/platform/admin')

  return (
    <motion.header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex flex-col items-center justify-between p-3 gap-2">
        <div className="flex items-center justify-between w-full max-w-5xl">
          <Link href={'/'} className="flex items-center space-x-2 object-contain overflow-hidden">
            <Image src="/logo.webp" alt="logo" width={291} height={366} className='w-14' />
          </Link>

          <nav className="hidden md:flex gap-6">
            {hasMembership && (
              <Link href="/platform/dispensary">
                <motion.span
                  className="text-sm font-medium text-muted-foreground hover:text-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mi Membresía
                </motion.span>
              </Link>
            )}
            {isAdmin && (
              <Button
                asChild
                variant={isAdminPage ? "default" : "outline"}
                size="sm"
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
          </div>
        </div>
        <nav className="flex md:hidden gap-6">
          {hasMembership && (
            <Link href="/platform/dispensary">
              <motion.span
                className="text-sm font-medium text-muted-foreground hover:text-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Mi Membresía
              </motion.span>
            </Link>
          )}
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
                Admin
              </motion.span>
            </Link>
          )}
        </nav>
      </div>
    </motion.header>
  )
}
