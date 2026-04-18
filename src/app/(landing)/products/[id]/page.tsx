import { getProductById } from '@/actions/products/get-product-by-id'
import { getRelatedProducts } from '@/actions/products/get-related-products'
import ProductDetail from '@/components/landing/ProductDetail'
import RelatedProducts from '@/components/landing/RelatedProducts'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 604800 // 1 week

type Params = Promise<{ id: string }>

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const defaultImageUrl = '/images/logoWeb.png'
  const urlSite = process.env.URL_SITE
  const { id } = await params
  const { product } = await getProductById(id)

  if (!product) {
    return {
      title: 'Product not found',
      description: 'The requested product does not exist.'
    }
  }

  return {
    title: product.name,
    description: `${product.shortDescription}.`,
    keywords: `${product.name}`,
    authors: [{ name: 'Casa Quetzal Cannabis Seeds' }],
    openGraph: {
      title: product.name,
      description: `${product.shortDescription}`,
      url: urlSite,
      type: 'article',
      images: {
        url: defaultImageUrl,
        alt: product.name,
        width: 1200,
        height: 630
      },
      siteName: 'Casa Quetzal Cannabis Seeds'
    }
  }
}



export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params
  const { ok, product } = await getProductById(id)

  if (!ok || !product) {
    notFound()
  }

  const { relatedProducts } = await getRelatedProducts({ product })

  if (!relatedProducts) {
    return null
  }

  return (
    <div className="min-h-screen pt-20">

      <ProductDetail product={product} />
      <RelatedProducts relatedProducts={relatedProducts} />
    </div >
  )
}
