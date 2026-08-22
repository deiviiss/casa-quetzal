import { z } from 'zod'

export const blogPostSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  slug: z.string().min(3, 'El slug debe tener al menos 3 caracteres'),
  description: z.string().min(5, 'La descripción debe tener al menos 5 caracteres'),
  content: z.string().min(10, 'El contenido debe tener al menos 10 caracteres'),
  imageUrl: z.string().optional().nullable(),
  imageAlt: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().max(160, 'La meta descripción no puede exceder 160 caracteres').optional().nullable()
}).refine((data) => {
  if (data.imageUrl && data.imageUrl.trim() !== '' && (!data.imageAlt || data.imageAlt.trim() === '')) {
    return false
  }
  return true
}, {
  message: 'El texto alternativo es obligatorio si se incluye una imagen principal',
  path: ['imageAlt']
})

export type BlogPostFormValues = z.infer<typeof blogPostSchema>
