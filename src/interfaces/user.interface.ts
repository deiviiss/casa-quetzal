import { Purchase } from "./purchase.interface";
import { Membership } from "./membership.interface";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;

  emailVerified: boolean;
  phoneNumber: string;
  phoneNumberVerified: boolean;

  image?: string | null;

  role: Role;
  isActive: boolean;

  address?: UserAddress | null;

  createdAt: Date;
  updatedAt?: Date | null;

  purchase: Purchase[];
  membership?: Membership | null;
}

export const ROLE_VALUES = ['admin', 'user'] as const

export type Role = (typeof ROLE_VALUES)[number]

export interface UserAddress {
  id: string;

  firstName: string;
  lastName: string;
  address: string;
  address2?: string | null;

  postalCode: string;
  phone: string;
  city: string;

  countryId: string;
  country: Country;

  userId: string;
}

export interface Country {
  id: string;
  name: string;

  userAddress: UserAddress[];
}