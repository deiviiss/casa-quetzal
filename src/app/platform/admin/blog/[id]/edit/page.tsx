import { redirect } from 'next/navigation'
import { validateUserAdmin } from '@/actions/auth/validate-user-admin'
import { getBlogPostById } from '@/actions/blog/get-blog-post-by-id'
import { BlogPostForm } from '@/components/blog/BlogPostForm'

interface EditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditBlogPostPage({ params }: EditPageProps) {
  const isAdmin = await validateUserAdmin()
  if (!isAdmin) {
    redirect('/no-access')
  }

  const { id } = await params
  const { post } = await getBlogPostById(id)

  if (!post) {
    redirect('/platform/admin/blog')
  }

  return (
    <div className="container px-4 md:px-8 py-8">
      <BlogPostForm initialData={post} />
    </div>
  )
}
