import { Product } from "@/types/product.interface"

interface ProductStructuredDataProps {
  products: Product[]
}

export default function ProductStructuredData({ products }: ProductStructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: product.name,
        description: product.shortDescription,
        image: product.image,
        offers: {
          "@type": "Offer",
          price: product.price,
          priceCurrency: "MXN",
        },
      },
    })),
  }

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
}

