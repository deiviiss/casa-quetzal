import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getBlogPostBySlug } from '@/actions/blog/get-blog-post-by-slug'
import { BlogArticle } from '@/components/blog/BlogArticle'
import { BlogJsonLd } from '@/components/blog/BlogJsonLd'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

const siteUrl = process.env.URL_SITE || process.env.NEXT_PUBLIC_APP_URL || 'https://casaquetzalcannabisseeds.com'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const { post } = await getBlogPostBySlug(slug)

  if (!post) {
    return {
      title: 'Artículo no encontrado | Casa Quetzal Blog'
    }
  }

  const title = post.metaTitle || post.title
  const description = post.metaDescription || post.description
  const articleUrl = `${siteUrl}/blog/${post.slug}`
  const imageUrl = post.imageUrl || `${siteUrl}/logo.webp`

  return {
    title: `${title} | Blog Casa Quetzal`,
    description: description,
    alternates: {
      canonical: articleUrl
    },
    openGraph: {
      title: title,
      description: description,
      url: articleUrl,
      type: 'article',
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: new Date(post.updatedAt).toISOString(),
      images: [
        {
          url: imageUrl,
          alt: post.imageAlt || title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl]
    }
  }
}

export const revalidate = 60 // Revalidate page every 60 seconds

export default async function BlogPostDetailPage({ params }: PageProps) {
  const { slug } = await params
  const { post } = await getBlogPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-24 pb-20">
      <BlogArticle post={post} />
      <BlogJsonLd post={post} siteUrl={siteUrl} />
    </div>
  )
}
