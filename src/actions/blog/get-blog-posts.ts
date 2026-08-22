'use server'

import prisma from '@/lib/prisma'

export async function getBlogPosts() {
  try {
    const posts = await prisma.blogPost.findMany({
      orderBy: {
        publishedAt: 'desc'
      },
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

    return {
      ok: true,
      posts
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    return {
      ok: false,
      message: 'Error al obtener las publicaciones del blog',
      posts: []
    }
  }
}
