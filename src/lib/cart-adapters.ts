import { Product, DispensaryProduct, DispensaryProductVariant } from "@/interfaces/product.interface";
import { CartItem } from "@/interfaces/cart.interface";

/**
 * Convierte un DispensaryProduct y su variante seleccionada en un CartItem plano.
 */
export function mapDispensaryToCartItem(product: DispensaryProduct, variant: DispensaryProductVariant): CartItem {
  if (!product.id) {
    throw new Error(`[Cart Adapter] DispensaryProduct '${product.name}' must have an ID to be added to cart.`);
  }
  
  // getProductTotal() sumaba product.price + (variant.price * variant.quantity)
  // Como quantity a nivel variante de catálogo suele ser 1, y la cantidad la maneja el cart store después, 
  // la base matemática exacta es:
  const finalUnitPrice = (product.price || 0) + (variant.price || 0);

  return {
    cartItemId: `${product.id}-${variant.id}`,
    productId: product.id,
    name: product.name,
    variantName: variant.name,
    variantType: variant.type,
    price: finalUnitPrice,
    quantity: 1, // Cantidad inicial por defecto
    imageUrl: product.images && product.images.length > 0 ? product.images[0].url : "",
  };
}

/**
 * Convierte un Product (zona pública) en un CartItem plano.
 */
export function mapProductToCartItem(product: Product): CartItem {
  if (!product.id) {
    throw new Error(`[Cart Adapter] Product '${product.name}' must have an ID to be added to cart.`);
  }

  return {
    cartItemId: `${product.id}-base`,
    productId: product.id,
    name: product.name,
    variantName: null,
    variantType: null,
    price: product.price || 0,
    quantity: 1, // Cantidad inicial por defecto
    imageUrl: product.image || "",
  };
}
