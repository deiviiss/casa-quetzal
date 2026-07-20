import { DbProduct } from "./product.interface";

export type MembershipStatus = 'ACTIVE' | 'EXPIRED' | 'CANCELLED' | 'SUSPENDED';

export interface Membership {
  id: string;
  userId: string;
  productId: string;
  product?: DbProduct;
  status: MembershipStatus;
  startsAt: Date | string;
  expiresAt: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}
