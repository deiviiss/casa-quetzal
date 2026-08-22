import { redirect } from 'next/navigation'
import { validateUserAdmin } from '@/actions/auth/validate-user-admin'
import { BlogPostForm } from '@/components/blog/BlogPostForm'

export default async function NewBlogPostPage() {
  const isAdmin = await validateUserAdmin()
  if (!isAdmin) {
    redirect('/no-access')
  }

  return (
    <div className="container px-4 md:px-8 py-8">
      <BlogPostForm />
    </div>
  )
}
