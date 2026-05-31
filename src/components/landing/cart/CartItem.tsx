import { motion } from 'framer-motion';
import Image from 'next/image';
import { X } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/store';
import { cn, getProductTotal } from '@/lib/utils';

interface CartItemProps {
  item: {
    product: {
      id: string;
      name: string;
      image?: string;
      price: number;
      options?: { id: string; name: string; type: string; price?: number }[];
    };
    quantity: number;
    cartItemId: string; // keep compatibility if needed
  };
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCartStore();

  const handleDecrease = () => {
    updateQuantity(item.product.id, Math.max(1, item.quantity - 1));
  };
  const handleIncrease = () => {
    updateQuantity(item.product.id, item.quantity + 1);
  };
  const handleRemove = () => {
    removeFromCart(item.product.id);
    toast.error(`${item.product.name} eliminado del carrito`);
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 border-b pb-4"
    >
      {/* Image */}
      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
        <Image
          src={item.product.image || '/placeholder.svg?height=64&width=64'}
          alt={item.product.name}
          fill
          className="object-cover"
        />
      </div>

      {/* Details */}
      <div className="flex-1">
        <h3 className="font-medium text-sm">{item.product.name}</h3>
        {/* Size option if exists */}
        {item.product.options?.find(o => o.type === 'size') && (
          <div className="flex items-center mt-1">
            <span className="mr-2 text-sm font-medium">
              {item.product.options.find(o => o.type === 'size')?.name}
            </span>
            <button
              onClick={handleDecrease}
              className="text-muted-foreground hover:text-primary w-5 h-5 flex items-center justify-center"
            >
              -
            </button>
            <span className="mx-2">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="text-muted-foreground hover:text-primary w-5 h-5 flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
        {/* Simple quantity control when no size */}
        {!item.product.options?.some(o => o.type === 'size') && (
          <div className="flex items-center mt-1">
            <button
              onClick={handleDecrease}
              className="text-muted-foreground hover:text-primary w-6 h-6 flex items-center justify-center"
            >
              -
            </button>
            <span className="mx-2 w-6 text-center text-sm">{item.quantity}</span>
            <button
              onClick={handleIncrease}
              className="text-muted-foreground hover:text-primary w-6 h-6 flex items-center justify-center"
            >
              +
            </button>
          </div>
        )}
        {/* Render other options list */}
        <div className="flex flex-col mt-1">
          {item.product.options?.map(option => (
            option.type !== 'size' && (
              <div key={option.id} className="flex gap-2 items-center text-xs">
                <span>{option.name}</span>
              </div>
            )
          ))}
        </div>
      </div>

      {/* Price & delete */}
      <div className="flex flex-col items-end">
        <span className="font-medium text-sm">
          {getProductTotal(item.product) === 0
            ? 'Pendiente'
            : `$${(getProductTotal(item.product) * item.quantity).toFixed(2)}`}
        </span>
        <button onClick={handleRemove} className="text-destructive/70 hover:text-destructive mt-1">
          <X className="h-4 w-4" />
        </button>
      </div>
    </motion.li>
  );
}
