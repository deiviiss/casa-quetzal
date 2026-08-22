import Link from 'next/link'
import { redirect } from 'next/navigation'
import { validateUserAdmin } from '@/actions/auth/validate-user-admin'
import { getBlogPosts } from '@/actions/blog/get-blog-posts'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Plus, Edit, ExternalLink, Calendar, User, Newspaper } from 'lucide-react'

export const revalidate = 0 // Dynamic admin page

export default async function AdminBlogPage() {
  const isAdmin = await validateUserAdmin()
  if (!isAdmin) {
    redirect('/no-access')
  }

  const { posts } = await getBlogPosts()

  return (
    <div className="container px-4 md:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary flex items-center gap-2">
            <Newspaper className="h-7 w-7 text-emerald-500" />
            Gestión del Blog
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Administra los artículos publicados en el blog oficial de Casa Quetzal.
          </p>
        </div>

        <Button asChild className="bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-2">
          <Link href="/platform/admin/blog/new">
            <Plus className="h-4 w-4" /> Crear Nuevo Artículo
          </Link>
        </Button>
      </div>

      {/* Posts Table / List */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Artículos Publicados ({posts?.length || 0})</CardTitle>
          <CardDescription>
            Lista de todas las entradas del blog disponibles en la plataforma.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {posts && posts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-border text-muted-foreground uppercase text-xs">
                  <tr>
                    <th className="py-3 px-4">Título</th>
                    <th className="py-3 px-4">Slug (URL)</th>
                    <th className="py-3 px-4">Fecha</th>
                    <th className="py-3 px-4">Autor</th>
                    <th className="py-3 px-4 text-right">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {posts.map(post => (
                    <tr key={post.id} className="hover:bg-muted/50 transition-colors">
                      <td className="py-4 px-4 font-medium text-foreground max-w-xs truncate">
                        {post.title}
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-muted-foreground max-w-xs truncate">
                        /blog/{post.slug}
                      </td>
                      <td className="py-4 px-4 text-xs text-muted-foreground whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5 text-emerald-500" />
                          {new Date(post.publishedAt).toLocaleDateString('es-MX')}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-xs text-muted-foreground whitespace-nowrap">
                        <span className="inline-flex items-center gap-1">
                          <User className="h-3.5 w-3.5 text-emerald-500" />
                          {post.author?.name || 'Casa Quetzal'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right whitespace-nowrap space-x-2">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="h-8 text-xs border-border"
                        >
                          <Link href={`/platform/admin/blog/${post.id}/edit`}>
                            <Edit className="h-3.5 w-3.5 mr-1" /> Editar
                          </Link>
                        </Button>

                        <Button
                          asChild
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-emerald-500 hover:text-emerald-400"
                        >
                          <Link href={`/blog/${post.slug}`} target="_blank">
                            <ExternalLink className="h-3.5 w-3.5 mr-1" /> Ver público
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground space-y-3">
              <Newspaper className="h-10 w-10 mx-auto text-muted-foreground/50" />
              <p>No se encontraron artículos en el blog.</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/platform/admin/blog/new">Crear el primer artículo</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
