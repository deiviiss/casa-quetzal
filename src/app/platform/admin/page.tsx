"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Leaf, Users, Package, ArrowRight } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const quickStats = [
  {
    title: "Dispensario",
    description: "Gestiona tu dispensario",
    icon: Leaf,
    href: "/platform/admin/dispensary",
    color: "bg-blue-500",
  },
  {
    title: "Usuarios",
    description: "Gestiona los usuarios",
    icon: Users,
    href: "/platform/admin/users",
    color: "bg-orange-500",
  },
  {
    title: "Productos",
    description: "Gestión de inventario y suscripciones",
    icon: Package,
    href: "#",
    color: "bg-green-500",
    isPlaceholder: true,
  },
]

export default function AdminDashboard() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  return (
    <div className="container px-4 md:px-8 py-8 md:py-12">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">Panel de Administración</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenido al panel de gestión del dispensario. Usa las tarjetas de abajo o la barra lateral para navegar.
        </p>
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {quickStats.map((stat) => (
          <motion.div key={stat.title} variants={fadeInUp}>
            <Card className="hover:shadow-md transition-shadow h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <div className={`${stat.color} p-2 rounded-lg`}>
                  <stat.icon className="h-4 w-4 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-xs mb-4">
                  {stat.description}
                </CardDescription>
                <Link
                  href={stat.isPlaceholder ? "#" : stat.href}
                  className={`inline-flex items-center text-xs font-semibold ${stat.isPlaceholder ? 'text-muted-foreground cursor-not-allowed' : 'text-primary hover:underline'}`}
                  onClick={(e) => stat.isPlaceholder && e.preventDefault()}
                >
                  Ir a gestión <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="grid gap-6 md:grid-cols-2 mt-4"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Actividades Recientes</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg m-4 mt-0">
            Los registros de actividad aparecerán aquí
          </CardContent>
        </Card>
        <Card className="border-dashed">
          <CardHeader>
            <CardTitle className="text-lg">Estado del Sistema</CardTitle>
          </CardHeader>
          <CardContent className="h-48 flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg m-4 mt-0">
            Las métricas del sistema aparecerán aquí
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
