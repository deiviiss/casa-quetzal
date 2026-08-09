'use client'

import { useRef, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ButtonLogout } from '@/components/auth/ButtonLogout'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Loader, Settings, Upload, User as UserIcon, X, FileText, CheckCircle2, Clock, ShieldAlert, AlertTriangle, XCircle } from "lucide-react"
import { MdCardMembership } from "react-icons/md"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Input } from "@/components/ui/input"
import { type User } from "@/interfaces/user.interface"
import { DbProduct } from "@/interfaces/product.interface"
import { mapDbProductToCartItem } from "@/lib/cart-adapters"
import { useNewCartStore } from "@/store/new-cart-store"
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
import { uploadUserIne } from "@/actions/users/upload-user-ine"
import { MembershipCard } from "@/components/platform/membership/MembershipCard"

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
  membershipProduct?: DbProduct | null
}

export const ProfileClient = ({ user, membershipProduct }: profileProps) => {
  const addToCart = useNewCartStore((state) => state.addToCart)

  const hasMembership = (user.membership ? (
    user.membership.status === 'ACTIVE' &&
    new Date(user.membership.expiresAt) > new Date()
  ) : false) || user.role === 'admin'

  const handleAddMembership = () => {
    if (!membershipProduct) {
      noticeFailure("No se pudo cargar el producto de membresía.")
      return
    }

    try {
      const cartItem = mapDbProductToCartItem(membershipProduct)
      addToCart(cartItem)
      noticeSuccess("Membresía agregada al carrito con éxito")
    } catch (error) {
      console.error("[Add Membership Error]", error)
      noticeFailure("Error al agregar la membresía al carrito")
    }
  }

  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [avatarPreview, setAvatarPreview] = useState<string>(user.image || 'imgs/avatar.png')
  const fileInputRef = useRef<HTMLInputElement>(null)

  // INE upload state in Profile
  const [selectedIneFile, setSelectedIneFile] = useState<File | null>(null)
  const [inePreviewUrl, setInePreviewUrl] = useState<string | null>(null)
  const [isUploadingIne, setIsUploadingIne] = useState(false)
  const ineFileInputRef = useRef<HTMLInputElement>(null)

  const handleProfileIneFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp']
    if (!ALLOWED_TYPES.includes(file.type)) {
      noticeFailure('Formato no permitido. Solo se aceptan archivos PDF, JPG, PNG o WEBP.')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      noticeFailure('El archivo excede el tamaño máximo permitido de 5 MB.')
      return
    }

    setSelectedIneFile(file)
    if (file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file)
      setInePreviewUrl(url)
    } else {
      setInePreviewUrl(null)
    }
  }

  const handleProfileIneUpload = async () => {
    if (!selectedIneFile) return

    setIsUploadingIne(true)
    const uploadFormData = new FormData()
    uploadFormData.append('ine', selectedIneFile)

    const { ok, message } = await uploadUserIne(uploadFormData)
    setIsUploadingIne(false)

    if (!ok) {
      noticeFailure(message || 'Error al subir la identificación.')
      return
    }

    noticeSuccess('Identificación subida con éxito. Revisa el estado de aprobación en tu perfil.')
    setSelectedIneFile(null)
    setInePreviewUrl(null)
    router.refresh()
  }

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
    setAvatarPreview('/imgs/avatar.webp')
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
    { icon: <MdCardMembership className="h-4 w-4" />, label: "Membresía", value: "membership" },
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

      {/* Banner de Adquisición de Membresía */}
      {!hasMembership && membershipProduct && (
        <motion.div
          variants={fadeInUp}
          className="mb-6 p-4 rounded-xl border border-emerald-500/20 bg-gradient-to-r from-emerald-500/10 via-emerald-600/5 to-transparent backdrop-blur-sm relative overflow-hidden shadow-md animate-in fade-in slide-in-from-top-4 duration-300"
        >
          {/* Subtle ambient glow */}
          <div className="absolute -right-8 -top-8 w-20 h-20 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                <MdCardMembership className="text-primary" /> Adquiere tu Membresía
              </h3>
              <p className="text-sm text-muted-foreground">
                Activa tu cuenta y accede al dispensario digital agregando la membresía a tu carrito.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Button
                onClick={handleAddMembership}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2 rounded-lg transition-all shadow-md shadow-emerald-600/20 hover:scale-[1.02] active:scale-[0.98]"
              >
                Adquirir membresía
              </Button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Sidebar navigation */}
        <motion.div variants={fadeInUp} className="space-y-4">
          {/* User info card */}
          <Card>
            <CardContent className="p-6 flex flex-col items-center">
              <Avatar className="h-24 w-24 mb-4 bg-secondary-foreground dark:bg-secondary-foreground/75">
                <AvatarImage
                  src={user.image || "/imgs/avatar.webp"}
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
          <Card className="">
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
        </motion.div>

        {/* Main content Tabs */}
        <motion.div variants={fadeInUp} className="relative">
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

              {/* INE Management Card */}
              <Card className="relative z-10 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-5 w-5 text-emerald-500" />
                    Identificación Oficial (INE)
                  </CardTitle>
                  <CardDescription>
                    Acreditación de mayoría de edad para realizar compras de productos en el dispensario.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Status Indicator */}
                  <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
                    <span className="text-xs font-medium text-muted-foreground">Estado de acreditación:</span>
                    {user.ineStatus === 'VERIFIED' && (
                      <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white gap-1">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Verificada
                      </Badge>
                    )}
                    {user.ineStatus === 'PENDING' && (
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white gap-1">
                        <Clock className="h-3.5 w-3.5" /> En Revisión
                      </Badge>
                    )}
                    {user.ineStatus === 'REJECTED' && (
                      <Badge variant="destructive" className="gap-1">
                        <XCircle className="h-3.5 w-3.5" /> Rechazada
                      </Badge>
                    )}
                    {!user.ineStatus && (
                      <Badge variant="outline" className="text-muted-foreground gap-1">
                        <ShieldAlert className="h-3.5 w-3.5" /> Sin Registro
                      </Badge>
                    )}
                  </div>

                  {/* Info alert when VERIFIED */}
                  {user.ineStatus === 'VERIFIED' && (
                    <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-emerald-700 dark:text-emerald-300 text-xs flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                      <span>Tu identificación oficial ha sido verificada y aprobada por la administración.</span>
                    </div>
                  )}

                  {/* Info alert when PENDING */}
                  {user.ineStatus === 'PENDING' && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span>Tu identificación oficial se encuentra en proceso de revisión por parte de la administración.</span>
                    </div>
                  )}

                  {/* Upload Form when REJECTED or null */}
                  {(!user.ineStatus || user.ineStatus === 'REJECTED') && (
                    <div className="space-y-3 pt-2">
                      {user.ineStatus === 'REJECTED' && (
                        <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-xs flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                          <span>Tu identificación anterior fue rechazada. Por favor sube una nueva identificación oficial válida.</span>
                        </div>
                      )}

                      <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 bg-background/50 hover:bg-background transition-colors">
                        {inePreviewUrl ? (
                          <div className="relative h-28 w-full max-w-[200px] rounded overflow-hidden mb-2">
                            <Image src={inePreviewUrl} alt="Vista previa INE" fill className="object-contain" />
                          </div>
                        ) : selectedIneFile ? (
                          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 mb-2">
                            <FileText className="h-5 w-5" />
                            <span className="truncate max-w-[200px]">{selectedIneFile.name}</span>
                          </div>
                        ) : null}

                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          disabled={isUploadingIne}
                          onClick={() => ineFileInputRef.current?.click()}
                          className="text-xs"
                        >
                          <Upload className="h-3.5 w-3.5 mr-1.5" />
                          {selectedIneFile ? 'Cambiar archivo' : 'Seleccionar INE (PDF, JPG, PNG, WEBP)'}
                        </Button>
                        <input
                          type="file"
                          ref={ineFileInputRef}
                          onChange={handleProfileIneFileSelect}
                          accept="application/pdf,image/jpeg,image/png,image/webp"
                          className="hidden"
                        />
                      </div>

                      <Button
                        type="button"
                        disabled={!selectedIneFile || isUploadingIne}
                        onClick={handleProfileIneUpload}
                        className="w-full text-xs"
                      >
                        {isUploadingIne ? (
                          <>
                            <Loader className="animate-spin h-4 w-4 mr-2" />
                            Subiendo identificación...
                          </>
                        ) : (
                          'Subir Identificación Oficial'
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="membership">
              <MembershipCard
                membership={user.membership}
                variant="user"
                membershipProduct={membershipProduct}
                onAddMembership={handleAddMembership}
              />
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
                  {/* <Button
                    variant="outline"
                    className="text-destructive hover:bg-destructive/10"
                    onClick={() => noticeFailure("Eliminar no está permitido")}
                  >
                    Eliminar Cuenta
                  </Button> */}
                  <Button
                    onClick={() => noticeSuccess("Ajustes guardados con éxito")}
                  >
                    Guardar Ajustes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          {/* Decorative image */}
          <motion.div
            variants={fadeInUp}
            className="absolute -bottom-24 -right-2 lg:bottom-16 lg:-right-16 z-20 opacity-80 hover:opacity-100 transition-opacity pointer-events-none over"
          >
            <Image
              src="/imgs/profile_emoji.webp"
              alt=""
              width={120}
              height={120}
              className="object-contain drop-shadow-2xl"
              aria-hidden="true"
            />
          </motion.div>
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
                  src={avatarPreview || "/imgs/avatar.webp"}
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
