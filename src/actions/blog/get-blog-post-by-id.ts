'use server'

import prisma from '@/lib/prisma'

export async function getBlogPostById(id: string) {
  try {
    if (!id) {
      return { ok: false, message: 'ID no proporcionado', post: null }
    }

    const post = await prisma.blogPost.findUnique({
      where: { id },
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
    console.error(`Error fetching blog post by id (${id}):`, error)
    return {
      ok: false,
      message: 'Error al obtener el artículo',
      post: null
    }
  }
}
