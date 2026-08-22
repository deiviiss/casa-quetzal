'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { toast } from 'sonner'
import { slugify } from '@/lib/slugify'
import { RichTextEditor } from './RichTextEditor'
import { createBlogPost } from '@/actions/blog/create-blog-post'
import { updateBlogPost } from '@/actions/blog/update-blog-post'
import type { BlogPostFormValues } from '@/lib/blog-post.schema'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, Sparkles, Image as ImageIcon, Upload, Loader2 } from 'lucide-react'
import Link from 'next/link'

interface BlogPostFormProps {
  initialData?: {
    id: string
    title: string
    slug: string
    description: string
    content: string
    imageUrl?: string | null
    imageAlt?: string | null
    metaTitle?: string | null
    metaDescription?: string | null
  }
}

export function BlogPostForm({ initialData }: BlogPostFormProps) {
  const router = useRouter()
  const isEditing = Boolean(initialData?.id)

  const [formData, setFormData] = useState<BlogPostFormValues>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    content: initialData?.content || '',
    imageUrl: initialData?.imageUrl || '',
    imageAlt: initialData?.imageAlt || '',
    metaTitle: initialData?.metaTitle || '',
    metaDescription: initialData?.metaDescription || ''
  })

  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(isEditing)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImage, setIsUploadingImage] = useState(false)

  // Auto-generate slug when title changes unless user edited slug manually
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: isSlugManuallyEdited ? prev.slug : slugify(newTitle)
    }))
  }

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSlugManuallyEdited(true)
    setFormData(prev => ({
      ...prev,
      slug: slugify(e.target.value)
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      toast.error('Formato de imagen no soportado. Usa JPG, PNG o WEBP.')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('La imagen no debe superar los 10 MB.')
      return
    }

    setIsUploadingImage(true)
    try {
      const data = new FormData()
      data.append('image', file)

      const response = await fetch('/api/upload-avatar', {
        method: 'POST',
        body: data
      })

      const result = await response.json()
      if (result.ok && result.url) {
        setFormData(prev => ({
          ...prev,
          imageUrl: result.url
        }))
        toast.success('Imagen subida correctamente')
      } else {
        toast.error(result.message || 'Error al subir la imagen')
      }
    } catch (error) {
      console.error('Upload error:', error)
      toast.error('Ocurrió un error al subir la imagen')
    } finally {
      setIsUploadingImage(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error('El título es requerido')
      return
    }
    if (!formData.slug.trim()) {
      toast.error('El slug es requerido')
      return
    }
    if (!formData.description.trim()) {
      toast.error('La descripción es requerida')
      return
    }
    if (!formData.content.trim() || formData.content === '<p></p>') {
      toast.error('El contenido del artículo no puede estar vacío')
      return
    }
    if (formData.imageUrl?.trim() && !formData.imageAlt?.trim()) {
      toast.error('El texto alternativo (ALT) es obligatorio si especificas una imagen principal')
      return
    }
    if (formData.metaDescription && formData.metaDescription.length > 160) {
      toast.error('La meta descripción no debe exceder los 160 caracteres')
      return
    }

    setIsSubmitting(true)
    try {
      const actionResult = isEditing && initialData?.id
        ? await updateBlogPost(initialData.id, formData)
        : await createBlogPost(formData)

      if (actionResult.ok) {
        toast.success(actionResult.message)
        router.push('/platform/admin/blog')
        router.refresh()
      } else {
        toast.error(actionResult.message || 'Error al guardar el artículo')
      }
    } catch (error) {
      console.error('Submit error:', error)
      toast.error('Ocurrió un error inesperado al procesar la solicitud')
    } finally {
      setIsSubmitting(false)
    }
  }

  const metaDescLength = formData.metaDescription?.length || 0

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <Link
            href="/platform/admin/blog"
            className="inline-flex items-center text-xs text-slate-400 hover:text-slate-200 transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-1" /> Volver al listado
          </Link>
          <h1 className="text-2xl font-bold text-slate-100">
            {isEditing ? 'Editar Artículo' : 'Crear Nuevo Artículo'}
          </h1>
          <p className="text-xs text-slate-400">
            Completa los detalles para publicar el artículo en el Blog de CQCS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/platform/admin/blog')}
            disabled={isSubmitting}
            className="border-slate-700 text-slate-300 hover:bg-slate-800"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4" /> {isEditing ? 'Guardar Cambios' : 'Publicar Artículo'}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content Card */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-emerald-400" /> Información Principal
          </CardTitle>
          <CardDescription className="text-slate-400">
            Título, URL semántica y resumen del artículo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-slate-200 font-medium">
              Título del Artículo <span className="text-emerald-400">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={handleTitleChange}
              placeholder="Ej: Cómo proteger tu negocio con códigos QR"
              required
              className="bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500"
            />
          </div>

          {/* Slug */}
          <div className="space-y-2">
            <Label htmlFor="slug" className="text-slate-200 font-medium">
              Slug (URL) <span className="text-emerald-400">*</span>
            </Label>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono bg-slate-950 px-3 py-2.5 rounded-md border border-slate-800 hidden sm:inline-block">
                /blog/
              </span>
              <Input
                id="slug"
                value={formData.slug}
                onChange={handleSlugChange}
                placeholder="como-proteger-tu-negocio-con-codigos-qr"
                required
                className="bg-slate-950 border-slate-800 text-slate-100 font-mono text-sm focus:border-emerald-500"
              />
            </div>
            <p className="text-xs text-slate-500">
              Generado automáticamente a partir del título. Se puede ajustar manualmente.
            </p>
          </div>

          {/* Short Description */}
          <div className="space-y-2">
            <Label htmlFor="description" className="text-slate-200 font-medium">
              Descripción Corta / Resumen <span className="text-emerald-400">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Escribe una breve introducción o resumen del contenido del artículo para la tarjeta del blog..."
              rows={3}
              required
              className="bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500"
            />
          </div>
        </CardContent>
      </Card>

      {/* Featured Image Card */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100 flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-emerald-400" /> Imagen Principal
          </CardTitle>
          <CardDescription className="text-slate-400">
            Imagen destacada que aparecerá en la tarjeta y en la cabecera del artículo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="imageUrl" className="text-slate-200 font-medium">
                  URL de la Imagen
                </Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ''}
                  onChange={e => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://res.cloudinary.com/.../imagen.jpg"
                  className="bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500"
                />
              </div>

              {/* Local File Upload Button */}
              <div className="space-y-2">
                <Label className="text-slate-400 text-xs">O subir archivo de imagen:</Label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-medium border border-slate-700 transition-colors">
                    {isUploadingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin text-emerald-400" /> Subiendo...
                      </>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 text-emerald-400" /> Seleccionar Imagen
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={isUploadingImage}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Alt Text */}
              <div className="space-y-2">
                <Label htmlFor="imageAlt" className="text-slate-200 font-medium">
                  Texto Alternativo (ALT){' '}
                  {formData.imageUrl?.trim() && <span className="text-emerald-400">*</span>}
                </Label>
                <Input
                  id="imageAlt"
                  value={formData.imageAlt || ''}
                  onChange={e => setFormData(prev => ({ ...prev, imageAlt: e.target.value }))}
                  placeholder="Descripción accesible de la imagen..."
                  className="bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500"
                />
                <p className="text-xs text-slate-500">
                  Obligatorio si existe una imagen principal para garantizar accesibilidad y SEO.
                </p>
              </div>
            </div>

            {/* Image Preview */}
            <div className="flex flex-col justify-center items-center border border-dashed border-slate-800 rounded-lg p-4 bg-slate-950/50 min-h-[160px]">
              {formData.imageUrl?.trim() ? (
                <div className="relative w-full h-48 rounded-md overflow-hidden bg-slate-900">
                  <Image
                    src={formData.imageUrl}
                    alt={formData.imageAlt || 'Vista previa de la imagen'}
                    fill
                    className="object-cover"
                    unoptimized={formData.imageUrl.startsWith('data:')}
                  />
                </div>
              ) : (
                <div className="text-center text-slate-600 space-y-2">
                  <ImageIcon className="h-10 w-10 mx-auto stroke-1" />
                  <p className="text-xs">Sin imagen seleccionada</p>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Editor Card */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100">Cuerpo del Artículo</CardTitle>
          <CardDescription className="text-slate-400">
            Utiliza el editor visual para redactar y dar formato al artículo.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RichTextEditor
            content={formData.content}
            onChange={html => setFormData(prev => ({ ...prev, content: html }))}
          />
        </CardContent>
      </Card>

      {/* SEO Card */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg text-slate-100">SEO y Redes Sociales (Opcional)</CardTitle>
          <CardDescription className="text-slate-400">
            Personaliza el título y la descripción para los motores de búsqueda (fallback automático al título y descripción principales).
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="metaTitle" className="text-slate-200 font-medium">
              Meta Title
            </Label>
            <Input
              id="metaTitle"
              value={formData.metaTitle || ''}
              onChange={e => setFormData(prev => ({ ...prev, metaTitle: e.target.value }))}
              placeholder={formData.title || 'Título específico para Google'}
              className="bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="metaDescription" className="text-slate-200 font-medium">
                Meta Description
              </Label>
              <span
                className={`text-xs font-mono ${
                  metaDescLength > 160 ? 'text-rose-400 font-bold' : 'text-slate-400'
                }`}
              >
                {metaDescLength} / 160 caracteres
              </span>
            </div>
            <Textarea
              id="metaDescription"
              value={formData.metaDescription || ''}
              onChange={e => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
              placeholder={formData.description || 'Resumen optimizado para motores de búsqueda...'}
              rows={2}
              maxLength={160}
              className={`bg-slate-950 border-slate-800 text-slate-100 focus:border-emerald-500 ${
                metaDescLength > 160 ? 'border-rose-500 focus:border-rose-500' : ''
              }`}
            />
            {metaDescLength > 160 && (
              <p className="text-xs text-rose-400">
                La meta descripción ha excedido el límite máximo de 160 caracteres.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
