"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Package,
  ChevronRight,
  Leaf,
  Newspaper
} from "lucide-react"

const sidebarItems = [
  {
    title: "Panel de Control",
    href: "/platform/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Dispensario",
    href: "/platform/admin/dispensary",
    icon: Leaf,
  },
  {
    title: "Usuarios",
    href: "/platform/admin/users",
    icon: Users,
  },
  {
    title: "Productos",
    href: "/platform/admin/products", // Placeholder
    icon: Package,
    isPlaceholder: true,
  },
  {
    title: "Blog",
    href: "/platform/admin/blog", // Placeholder
    icon: Newspaper,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  }

  return (
    <aside className="w-64 border-r bg-muted/40 hidden md:flex flex-col sticky top-16 h-[calc(100vh-4rem)]">
      <div className="p-6">
        <h2 className="text-lg font-semibold tracking-tight">Consola de Admin</h2>
        <p className="text-xs text-muted-foreground">Gestiona tu dispensario</p>
      </div>
      <motion.nav
        className="flex-1 px-4 space-y-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href

          return (
            <motion.div key={item.href} variants={itemVariants}>
              <Link
                href={item.isPlaceholder ? "#" : item.href}
                className={cn(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  item.isPlaceholder && "opacity-50 cursor-not-allowed"
                )}
                onClick={(e) => item.isPlaceholder && e.preventDefault()}
              >
                <item.icon className={cn(
                  "mr-3 h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110",
                  isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground"
                )} />
                <span className="flex-1">{item.title}</span>
                {isActive && (
                  <motion.div
                    layoutId="active-indicator"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </motion.div>
                )}
              </Link>
            </motion.div>
          )
        })}
      </motion.nav>
      <div className="p-4 border-t">
        <div className="bg-primary/5 rounded-lg p-3">
          <p className="text-[10px] uppercase font-bold text-primary tracking-wider">Casa Quetzal Cannabis Seeds</p>
          <p className="text-[10px] text-muted-foreground">Versión 1.0.0-admin</p>
        </div>
      </div>
    </aside>
  )
}
