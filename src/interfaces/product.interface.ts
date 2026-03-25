export interface Product {
  id?: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  image: string;
  benefits: string[];
  usage: string[];
  ingredients: string[];
  origin: string;
  isAvailable: boolean;
  isExclusive: boolean;
}
