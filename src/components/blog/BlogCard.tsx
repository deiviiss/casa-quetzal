import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Calendar, User, ArrowRight } from 'lucide-react'

interface BlogCardProps {
  post: {
    id: string
    title: string
    slug: string
    description: string
    imageUrl?: string | null
    imageAlt?: string | null
    publishedAt: Date | string
    author: {
      name: string
      image?: string | null
    }
  }
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <Card className="bg-slate-900/80 border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/20 group flex flex-col overflow-hidden h-full rounded-xl">
      {/* Article Featured Image */}
      <Link href={`/blog/${post.slug}`} className="block relative w-full aspect-[16/9] overflow-hidden bg-slate-950">
        {post.imageUrl ? (
          <Image
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-950 text-slate-700">
            <span className="text-sm font-semibold tracking-wider uppercase text-slate-600">Notas de la casa</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <CardContent className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata Bar */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-emerald-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5 text-emerald-400" />
              {post.author?.name || 'Casa Quetzal'}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-2 leading-snug">
            <Link href={`/blog/${post.slug}`}>
              {post.title}
            </Link>
          </h2>

          {/* Description */}
          <p className="text-sm text-slate-400 line-clamp-3 leading-relaxed">
            {post.description}
          </p>
        </div>

        {/* Read More Link */}
        <div className="pt-2 border-t border-slate-800/80">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-xs font-semibold text-emerald-400 hover:text-emerald-300 transition-colors group/link"
          >
            Leer artículo completo
            <ArrowRight className="ml-1.5 h-3.5 w-3.5 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
