import Image from 'next/image'
import Link from 'next/link'
import { Calendar, User, ArrowLeft } from 'lucide-react'

interface BlogArticleProps {
  post: {
    id: string
    title: string
    slug: string
    description: string
    content: string
    imageUrl?: string | null
    imageAlt?: string | null
    publishedAt: Date | string
    author: {
      name: string
      image?: string | null
    }
  }
}

export function BlogArticle({ post }: BlogArticleProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 py-8 md:py-12 space-y-8">
      {/* Navigation link */}
      <div>
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-emerald-400 transition-colors group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Volver al Blog
        </Link>
      </div>

      {/* Header section */}
      <header className="space-y-6">
        {/* Single H1 on page */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-100 tracking-tight leading-tight">
          {post.title}
        </h1>

        {/* Metadata info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400 border-y border-slate-800 py-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-emerald-400" />
            <span>Por <strong className="text-slate-200 font-semibold">{post.author?.name || 'Casa Quetzal'}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-emerald-400" />
            <span>{formattedDate}</span>
          </div>
        </div>

        {/* Lead description */}
        <p className="text-lg md:text-xl text-slate-300 font-normal leading-relaxed italic border-l-4 border-emerald-500 pl-4 py-1">
          {post.description}
        </p>
      </header>

      {/* Featured Image */}
      {post.imageUrl && (
        <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950">
          <Image
            src={post.imageUrl}
            alt={post.imageAlt || post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 896px"
            className="object-cover"
          />
        </div>
      )}

      {/* Body Content */}
      <div
        className="prose prose-invert max-w-none 
          prose-p:text-slate-300 prose-p:leading-relaxed prose-p:my-5 prose-p:text-base md:prose-p:text-lg
          prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-100
          prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:text-emerald-400 prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl md:prose-h3:text-2xl prose-h3:text-emerald-300 prose-h3:mt-8 prose-h3:mb-3
          prose-ul:list-disc prose-ul:my-5 prose-ul:pl-6 prose-ul:space-y-2
          prose-ol:list-decimal prose-ol:my-5 prose-ol:pl-6 prose-ol:space-y-2
          prose-li:text-slate-300 prose-li:text-base md:prose-li:text-lg
          prose-a:text-emerald-400 prose-a:underline hover:prose-a:text-emerald-300 prose-a:font-medium
          prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-slate-900/60 prose-blockquote:p-4 prose-blockquote:rounded-r-lg prose-blockquote:italic
          prose-strong:text-slate-100 prose-strong:font-semibold"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Article footer */}
      <footer className="pt-8 border-t border-slate-800">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-sm font-medium transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Volver a todas las publicaciones
        </Link>
      </footer>
    </article>
  )
}
