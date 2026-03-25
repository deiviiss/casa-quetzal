import { User } from './user.interface';
import { Product } from './product.interface';

export interface Purchase {
  id: string;

  userId: string;
  user: User;

  productId: string;
  product: Product;

  createdAt: Date;
}