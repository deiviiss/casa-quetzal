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

export interface ProductType {
  id: number
  name: string
}

export interface DispensaryProductImage {
  id: number
  url: string
  alt: string
}

export interface DispensaryTechnicalData {
  phenotype?: string
  botanicalFeatures?: string[]
  cultivation?: {
    recommendedMethod?: string
    lightResponse?: string
    vegetativeBehavior?: string
    resinProduction?: string
  }
  terpenes?: string[]
  effects?: string[]
  conservation?: string[]
  technicalObservations?: string
  userProfile?: string[]
  materials?: string[]
  warnings?: string[]
  adaptability?: string
}

export interface DispensaryProductVariant {
  id: string
  name: string
  price: number
  quantity: number
  stock: number
  sku: string
  type: "weight" | "quantity" | "presentation"
  isAvailable: boolean
}

export interface DispensaryProduct {
  id: string
  name: string
  price: number
  slug: string
  type?: ProductType
  shortDescription?: string
  fullDescription?: string
  geneticType?: string | null
  cultivationLine?: string
  dominance?: string
  origin?: string
  organolepticProfile?: string
  aroma?: string
  flavor?: string
  thcEstimated?: string | null
  classification?: string
  developmentStatus?: string
  technicalData?: DispensaryTechnicalData
  images?: DispensaryProductImage[]
  variants?: DispensaryProductVariant[]
  groupedOptions?: Record<string, DispensaryProductVariant[]>
}
