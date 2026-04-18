import Link from 'next/link';
import { DispensaryProduct } from '@/interfaces/product.interface';

interface Props {
  product: DispensaryProduct;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <Link
      href={`/platform/dispensary/${product.id}`}
      className="block group"
    >
      <div className="border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 bg-card group-hover:border-primary/50">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-semibold group-hover:text-primary transition-colors text-white">
            {product.name}
          </h2>
          <span className="bg-primary/10 text-primary text-xs font-semibold px-2 py-1 rounded">
            {product.type}
          </span>
        </div>

        <div className="mb-4">
          <span className="text-sm text-muted-foreground">THC: </span>
          <span className="text-sm font-medium">{product.thc}</span>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        <div className="mt-6 text-sm font-semibold text-primary uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
          Ver Detalles →
        </div>
      </div>
    </Link>
  );
};
