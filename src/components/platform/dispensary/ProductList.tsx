import { DispensaryProduct } from "@/interfaces/product.interface";
import { ProductCard } from "@/components/platform/dispensary/ProductCard";

interface Props {
  products: DispensaryProduct[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
