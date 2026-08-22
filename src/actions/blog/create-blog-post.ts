'use server'

import prisma from '@/lib/prisma'
import { auth } from '@/auth'
import { validateUserAdmin } from '../auth/validate-user-admin'
import { sanitizeHtml } from '@/lib/sanitize-html'
import { slugify } from '@/lib/slugify'
import { revalidatePath } from 'next/cache'
import { blogPostSchema, type BlogPostFormValues } from '@/lib/blog-post.schema'

export async function createBlogPost(data: BlogPostFormValues) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'No tienes autorización para realizar esta acción' }
    }

    const session = await auth()
    const authorId = session?.user?.id
    if (!authorId) {
      return { ok: false, message: 'Sesión no válida o autor no encontrado' }
    }

    const parseResult = blogPostSchema.safeParse(data)
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map(issue => issue.message).join(', ')
      return { ok: false, message: errorMsg }
    }

    const validatedData = parseResult.data

    const cleanSlug = slugify(validatedData.slug)
    if (!cleanSlug) {
      return { ok: false, message: 'El slug generado o introducido no es válido' }
    }

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug: cleanSlug }
    })

    if (existingPost) {
      return { ok: false, message: `El slug "${cleanSlug}" ya está en uso. Por favor ingresa uno diferente.` }
    }

    // Sanitize HTML content
    const safeContent = sanitizeHtml(validatedData.content)

    // Save to database
    const newPost = await prisma.blogPost.create({
      data: {
        title: validatedData.title.trim(),
        slug: cleanSlug,
        description: validatedData.description.trim(),
        content: safeContent,
        imageUrl: validatedData.imageUrl?.trim() || null,
        imageAlt: validatedData.imageAlt?.trim() || null,
        metaTitle: validatedData.metaTitle?.trim() || null,
        metaDescription: validatedData.metaDescription?.trim() || null,
        authorId: authorId,
        publishedAt: new Date()
      }
    })

    revalidatePath('/blog')
    revalidatePath('/platform/admin/blog')

    return {
      ok: true,
      message: 'Artículo del blog publicado exitosamente',
      post: newPost
    }
  } catch (error) {
    console.error('Error creating blog post:', error)
    return { ok: false, message: 'Error al crear el artículo del blog' }
  }
}
