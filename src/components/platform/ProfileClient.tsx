'use client'

import { useRef, useState } from "react"
import Image from "next/image"
import { ButtonLogout } from '@/components/auth/ButtonLogout'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader, Settings, Upload, User as UserIcon, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { type User } from "@/interfaces/user.interface"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { noticeFailure, noticeSuccess } from "@/components//toast-notifications/ToastNotifications"
import { updateUser } from "@/actions/users/update-user"
import { updateUserPassword } from "@/actions/users/update-user-password"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { updateUserImage } from "@/actions/users/update-user-image"
import { deleteUserImage } from "@/actions/users/delete-user-image"

const userSchema = z.object({
  name: z.string().min(3, { message: 'El nombre es obligatorio' }).max(255, { message: 'El nombre debe tener menos de 255 caracteres' }),
  email: z.string().email({
    message: 'La dirección de correo electrónico no es válida'
  }),
  phoneNumber: z
    .string()
    .min(10, {
      message: 'El número de teléfono debe tener 10 caracteres sin el código de país'
    })
    .max(10, {
      message: 'El número de teléfono debe tener 10 caracteres sin el código de país'
    })
})

const passwordSchema = z.object({
  currentPassword: z
    .string()
    .min(6, { message: 'La contraseña actual es obligatoria' }),
  newPassword: z
    .string()
    .min(6, { message: 'La nueva contraseña debe tener al menos 6 caracteres' })
    .max(10, { message: 'La nueva contraseña debe tener menos de 10 caracteres' }),
  confirmPassword: z
    .string()
    .min(6, { message: 'La confirmación de la contraseña debe tener al menos 6 caracteres' })
    .max(10, { message: 'La confirmación de la contraseña debe tener menos de 10 caracteres' }),
})

interface profileProps {
  user: User
}

export const ProfileClient = ({ user }: profileProps) => {
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>(user.image || 'imgs/avatar.png')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const defaultValuesUserInfo = {
    name: user.name || '',
    email: user.email || '',
    phoneNumber: user.phoneNumber || ''
  }

  const defaultValuesUserPassword = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  const formPassword = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: defaultValuesUserPassword
  })

  const formUserInfo = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: defaultValuesUserInfo
  })

  const onSubmitUserInfo = async (values: z.infer<typeof userSchema>) => {
    setIsSubmitting(true)

    const data = {
      id: user.id,
      name: values.name,
      email: values.email,
      phoneNumber: values.phoneNumber
    }

    const { ok, message } = await updateUser(data)

    if (!ok) {
      setError(message)
      setIsSubmitting(false)
      return
    }

    setError('')
    noticeSuccess(message)
    setIsSubmitting(false)
  }

  const onSubmitPassword = async (values: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true)

    if (values.newPassword !== values.confirmPassword) {
      noticeFailure("La nueva contraseña y su confirmación no coinciden")
      setIsSubmitting(false);
      return
    }

    const data = {
      id: user.id,
      currentPassword: values.currentPassword,
      newPassword: values.newPassword
    }

    const { ok, message } = await updateUserPassword(data)

    if (!ok) {
      noticeFailure(message)
      setIsSubmitting(false)
      return
    }

    setIsSubmitting(false)
    setError('')
    noticeSuccess("Contraseña actualizada con éxito")
    formPassword.reset()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAvatarUpload = async () => {
    setIsSubmitting(true)

    const image = fileInputRef.current?.files?.[0];

    if (!image) {
      noticeFailure("No se ha seleccionado ningún archivo");
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const { ok: okDeleteImage } = await deleteUserImage(user.image || '')

      if (!okDeleteImage) {
        noticeFailure("Error al eliminar la imagen anterior, por favor contacte a soporte")
        return
      }

      // Upload the image to 
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.ok) {
        noticeFailure(data.message || "Error al subir");
        return;
      }

      const { ok, message } = await updateUserImage(data.url)

      if (!ok) {
        noticeFailure(message || "Error al actualizar la imagen")
        return
      }

      noticeSuccess("Imagen de perfil actualizada con éxito");
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      noticeFailure("Error al subir la imagen");
    } finally {
      setIsSubmitting(false)
      setAvatarModalOpen(false);
    }
  };

  const clearAvatarPreview = () => {
    setAvatarPreview('/imgs/avatar.png')
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  }

  const navItems = [
    { icon: <UserIcon className="h-4 w-4" />, label: "Información Personal", value: "personal" },
    { icon: <Settings className="h-4 w-4" />, label: "Ajustes", value: "settings" },
  ]

  return (
    <motion.div
      className="max-w-4xl w-full mx-auto px-2"
      initial="initial"
      animate="animate"
      variants={{
        animate: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div variants={fadeInUp} className="flex items-center gap-4 justify-between mb-8 pt-8">
        <div>
          <h1 className="text-3xl font-bold text-primary">Mi Perfil</h1>
          <p className="text-muted-foreground">Gestiona los ajustes de tu cuenta</p>
        </div>
        <ButtonLogout />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar navigation */}
        <motion.div variants={fadeInUp} className="space-y-4">
          {/* User info card */}
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 bg-secondary-foreground dark:bg-secondary-foreground/75">
                <AvatarImage
                  src={user.image || "/imgs/avatar.png"}
                  alt="Profile"
                  className="object-cover"
                />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">{user.name}</h2>
              <p className="text-sm text-muted-foreground">{user.email}</p>

              <Button
                variant="outline"
                size="sm"
                className="mt-4 w-full"
                onClick={() => setAvatarModalOpen(true)}
              >
                Cambiar Avatar
              </Button>
            </CardContent>
          </Card>

          {/* sidebar navigation */}
          <Card className="relative">
            <CardContent className="p-4">
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <Button
                    key={item.value}
                    variant={activeTab === item.value ? "default" : "ghost"}
                    className="w-full justify-start gap-2"
                    onClick={() => setActiveTab(item.value)}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>

          {/* Decorative image */}
          <motion.div
            variants={fadeInUp}
            className="absolute -bottom-[470px] right-6 md:-bottom-12 md:right-1 lg:-bottom-16 lg:right-14 z-20 opacity-80 hover:opacity-100 transition-opacity pointer-events-none over"
          >
            <Image
              src="/imgs/profile_emoji.svg"
              alt=""
              width={120}
              height={120}
              className="object-contain drop-shadow-2xl"
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>

        {/* Main content Tabs */}
        <motion.div variants={fadeInUp}>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full flex-col">
            <div className="overflow-x-auto scrollbar-hide hidden md:block">
              <TabsList className="flex w-max gap-2">
                {navItems.map((item) => (
                  <TabsTrigger key={item.value} value={item.value}>
                    {item.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="personal">
              <Card className="relative z-10">
                <CardHeader>
                  <CardTitle>Información Personal</CardTitle>
                  <CardDescription>Actualiza tus datos personales e información de contacto</CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...formUserInfo}>
                    <form onSubmit={formUserInfo.handleSubmit(onSubmitUserInfo)} className="space-y-4">
                      <div className="grid gap-4">
                        <FormField
                          control={formUserInfo.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="name">Nombre Completo</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={true}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formUserInfo.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="email">Email</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={formUserInfo.control}
                          name="phoneNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel htmlFor="phoneNumber">Número de Teléfono</FormLabel>
                              <FormControl>
                                <Input
                                  disabled={isSubmitting}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      </div>
                      <div className="text-sm text-red-600">
                        {error && (
                          <div className="flex mb-2">
                            <p>{error}</p>
                          </div>
                        )}
                      </div>
                      <Button className="mt-4" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Guardando…" : "Guardar cambios"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>Ajustes de Cuenta</CardTitle>
                  <CardDescription>Gestiona las preferencias y seguridad de tu cuenta</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <h3 className="font-semibold mb-2">Contraseña</h3>
                      <Form {...formPassword}>
                        <form onSubmit={formPassword.handleSubmit(onSubmitPassword)} className="space-y-4">
                          <div className="grid gap-2">
                            <FormField
                              control={formPassword.control}
                              name="currentPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="currentPassword">Contraseña Actual</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={isSubmitting}
                                      type="password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={formPassword.control}
                              name="newPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="newPassword">Nueva Contraseña</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={isSubmitting}
                                      type="password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                            <FormField
                              control={formPassword.control}
                              name="confirmPassword"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel htmlFor="confirmPassword">Confirmar Nueva Contraseña</FormLabel>
                                  <FormControl>
                                    <Input
                                      disabled={isSubmitting}
                                      type="password"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <div className="text-sm text-red-600">
                            {error && (
                              <div className="flex mb-2">
                                <p>{error}</p>
                              </div>
                            )}
                          </div>

                          <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Actualizando…" : "Actualizar Contraseña"}
                          </Button>
                        </form>
                      </Form>
                    </div>

                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => noticeFailure("Eliminar no está permitido")}
                  >
                    Eliminar Cuenta
                  </Button>
                  <Button
                    onClick={() => noticeSuccess("Ajustes guardados con éxito")}
                  >
                    Guardar Ajustes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* TODO: create component */}
      {/* Avatar Change Modal */}
      <Dialog open={avatarModalOpen} onOpenChange={setAvatarModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Cambiar Imagen de Perfil</DialogTitle>
            <DialogDescription>
              Sube una nueva foto de perfil. La imagen debe ser cuadrada y de al menos 200x200 píxeles.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-32 w-32 bg-secondary-foreground dark:bg-secondary-foreground/75">
                <AvatarImage
                  src={avatarPreview || "/imgs/avatar.png"}
                  alt="Preview"
                  className="object-cover"
                />
                <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>

              {avatarPreview ? (
                <div className="flex gap-2">
                  <Button
                    variant="outline" size="sm"
                    onClick={clearAvatarPreview}
                    disabled={isSubmitting}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Limpiar
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isSubmitting}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Cambiar
                  </Button>
                </div>
              ) : (
                <Button
                  disabled={isSubmitting}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir Imagen
                </Button>
              )}

              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="hidden" />
            </div>
          </div>

          <DialogFooter className="flex flex-col gap-3 sm:flex-row">
            <Button
              variant="outline"
              disabled={isSubmitting}
              onClick={() => setAvatarModalOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleAvatarUpload}
              disabled={!avatarPreview || isSubmitting}
            >
              {isSubmitting ? <>
                Guardando
                <Loader className="animate-spin h-4 w-4 mr-2" />
              </> : "Guardar Cambios"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}
