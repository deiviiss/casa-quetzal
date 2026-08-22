interface BlogJsonLdProps {
  post: {
    title: string
    description: string
    slug: string
    imageUrl?: string | null
    publishedAt: Date | string
    updatedAt: Date | string
    author: {
      name: string
    }
  }
  siteUrl: string
}

export function BlogJsonLd({ post, siteUrl }: BlogJsonLdProps) {
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    ...(post.imageUrl ? { image: [post.imageUrl] } : {}),
    datePublished: new Date(post.publishedAt).toISOString(),
    dateModified: new Date(post.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: post.author.name || 'Casa Quetzal'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Casa Quetzal Cannabis Seeds',
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.webp`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
