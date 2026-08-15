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
  imagePublicId?: string | null;

  role: Role;
  isActive: boolean;

  ineUrl?: string | null;
  inePublicId?: string | null;
  ineStatus?: IneStatus | null;
  ineUploadedAt?: Date | string | null;

  address?: UserAddress | null;

  createdAt: Date;
  updatedAt?: Date | null;

  membership?: Membership | null;
}

export type IneStatus = 'PENDING' | 'VERIFIED' | 'REJECTED';

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