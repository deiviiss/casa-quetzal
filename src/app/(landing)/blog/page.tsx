import { Metadata } from 'next'
import { getBlogPosts } from '@/actions/blog/get-blog-posts'
import { BlogCard } from '@/components/blog/BlogCard'
import { BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog | Casa Quetzal Cannabis Seeds',
  description:
    'Explora nuestros artículos sobre innovación genética, cultivo sustentable, regulación y actualidad del cáñamo en México.'
}

export const revalidate = 60 // Revalidate page every 60 seconds

export default async function BlogPage() {
  const { posts } = await getBlogPosts()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pt-28 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-semibold tracking-wide uppercase">
            <BookOpen className="h-3.5 w-3.5" />
            Notas de la Casa
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
            Noticias, Guías e Innovación del Cáñamo
          </h1>
          <p className="text-lg text-slate-400">
            Descubre artículos especializados sobre desarrollo genético, trazabilidad, sustentabilidad e información relevante para el sector.
          </p>
        </div>

        {/* Posts Grid */}
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-3 max-w-xl mx-auto">
            <BookOpen className="h-12 w-12 text-slate-600 mx-auto" />
            <h2 className="text-xl font-bold text-slate-200">Aún no hay publicaciones</h2>
            <p className="text-slate-400 text-sm">
              Estamos preparando nuevo contenido especializado. Vuelve pronto para descubrir nuevos artículos.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
