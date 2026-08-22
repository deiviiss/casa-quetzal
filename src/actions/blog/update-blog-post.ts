'use server'

import prisma from '@/lib/prisma'
import { validateUserAdmin } from '../auth/validate-user-admin'
import { sanitizeHtml } from '@/lib/sanitize-html'
import { slugify } from '@/lib/slugify'
import { revalidatePath } from 'next/cache'
import { blogPostSchema, type BlogPostFormValues } from '@/lib/blog-post.schema'

export async function updateBlogPost(id: string, data: BlogPostFormValues) {
  try {
    const isAdmin = await validateUserAdmin()
    if (!isAdmin) {
      return { ok: false, message: 'No tienes autorización para realizar esta acción' }
    }

    if (!id) {
      return { ok: false, message: 'ID del artículo no proporcionado' }
    }

    const parseResult = blogPostSchema.safeParse(data)
    if (!parseResult.success) {
      const errorMsg = parseResult.error.issues.map(issue => issue.message).join(', ')
      return { ok: false, message: errorMsg }
    }

    const validatedData = parseResult.data

    const cleanSlug = slugify(validatedData.slug)
    if (!cleanSlug) {
      return { ok: false, message: 'El slug no es válido' }
    }

    // Check if slug is taken by another post
    const existingPostWithSlug = await prisma.blogPost.findUnique({
      where: { slug: cleanSlug }
    })

    if (existingPostWithSlug && existingPostWithSlug.id !== id) {
      return { ok: false, message: `El slug "${cleanSlug}" ya está siendo utilizado por otro artículo.` }
    }

    const targetPost = await prisma.blogPost.findUnique({
      where: { id }
    })

    if (!targetPost) {
      return { ok: false, message: 'El artículo no existe' }
    }

    // Sanitize HTML content
    const safeContent = sanitizeHtml(validatedData.content)

    // Update database record
    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: validatedData.title.trim(),
        slug: cleanSlug,
        description: validatedData.description.trim(),
        content: safeContent,
        imageUrl: validatedData.imageUrl?.trim() || null,
        imageAlt: validatedData.imageAlt?.trim() || null,
        metaTitle: validatedData.metaTitle?.trim() || null,
        metaDescription: validatedData.metaDescription?.trim() || null
      }
    })

    revalidatePath('/blog')
    revalidatePath(`/blog/${cleanSlug}`)
    if (targetPost.slug !== cleanSlug) {
      revalidatePath(`/blog/${targetPost.slug}`)
    }
    revalidatePath('/platform/admin/blog')

    return {
      ok: true,
      message: 'Artículo actualizado exitosamente',
      post: updatedPost
    }
  } catch (error) {
    console.error(`Error updating blog post (${id}):`, error)
    return { ok: false, message: 'Error al actualizar el artículo del blog' }
  }
}
