/**
 * CartItem — Representación de una línea de compra dentro del carrito.
 *
 * Cada propiedad modela lo que el usuario seleccionó, no el producto en sí.
 * La distinción clave: si el catálogo desapareciera mañana, CartItem debe
 * seguir describiendo correctamente la compra realizada.
 */
export interface CartItem {
  /**
   * Identificador único de la línea en el carrito.
   * Regla de generación: `${productId}-${variant.id}` (con variante)
   *                    o `${productId}-base`             (sin variante)
   * Dos ítems con el mismo cartItemId se fusionan sumando quantity.
   */
  cartItemId: string;

  /** ID de base de datos del producto origen. */
  productId: string;

  /** Nombre del producto tal como se mostrará en carrito y en WhatsApp. */
  name: string;

  /**
   * Nombre de la variante seleccionada por el usuario (ej. "14g", "Indoor").
   * null cuando el producto no tiene variantes.
   */
  variantName: string | null;

  /**
   * Tipo de la variante seleccionada por el usuario.
   * Valores posibles (heredados de DispensaryProductVariant.type):
   *   'weight'       → variante medida en gramaje
   *   'quantity'     → variante medida en unidades (precio puede ser 0 = Pendiente)
   *   'presentation' → variante de presentación (frasco, bolsa, etc.)
   *
   * Pertenece a CartItem porque describe *cómo compró* el usuario, no
   * *cómo está categorizado* el producto. Es análogo a variantName:
   * ambas propiedades vienen del catálogo pero quedan fijadas en la compra
   * al momento de la selección.
   *
   * null cuando el producto no tiene variantes (productos públicos).
   */
  variantType: 'weight' | 'quantity' | 'presentation' | null;

  /** Precio unitario final al momento de agregar al carrito (product.price + variant.price). */
  price: number;

  /** Cantidad de unidades de esta línea en el carrito. */
  quantity: number;

  /**
   * URL de la imagen principal del producto.
   * "" cuando el producto no tiene imagen (el Sidebar renderiza un ícono por defecto).
   */
  imageUrl: string;

  /**
   * Tipo de producto (ej. "membership").
   */
  type?: string;
}

