'use server'

import prisma from '@/lib/prisma'

export async function getBlogPostBySlug(slug: string) {
  try {
    if (!slug) {
      return { ok: false, message: 'Slug no proporcionado', post: null }
    }

    const post = await prisma.blogPost.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    if (!post) {
      return { ok: false, message: 'Artículo no encontrado', post: null }
    }

    return {
      ok: true,
      post
    }
  } catch (error) {
    console.error(`Error fetching blog post by slug (${slug}):`, error)
    return {
      ok: false,
      message: 'Error al obtener la publicación del blog',
      post: null
    }
  }
}
