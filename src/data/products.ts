import type { DispensaryProduct as Product } from "@/interfaces/product.interface"

export const products: Product[] = [
  {
    id: 1,
    name: "Hunapú",
    slug: "hunapu",
    type: {
      id: 1,
      name: "Genética"
    },
    shortDescription: "Híbrida premium indoor con fenotipo Fox Tail.",
    fullDescription: "Hunapú representa una línea premium enfocada en expresión aromática y vigor vegetativo.",
    geneticType: "Híbrida Premium Indoor",
    cultivationLine: "Interior controlado",
    dominance: "Sativa",
    origin: "Selección artesanal CQCS",
    organolepticProfile: "Afrutado, dulce, tropical y herbal",
    aroma: "Afrutado, herbal y cítrico",
    flavor: "Notas tropicales dulces con retrogusto vegetal-resinoso",
    thcEstimated: null,
    classification: "Premium",
    developmentStatus: "En estabilización",
    technicalData: {
      phenotype: "Fox Tail",
      botanicalFeatures: [
        "Planta alta y vigorosa",
        "Alta producción de tricomas",
        "Biomasa floral aireada"
      ],
      cultivation: {
        recommendedMethod: "Indoor",
        lightResponse: "Alta adaptación a LED",
        vegetativeBehavior: "Crecimiento vertical pronunciado",
        resinProduction: "Alta"
      },
      terpenes: ["mirceno", "limoneno", "ocimeno"],
      effects: ["estimulante", "creativo"],
      conservation: [
        "Mantener en ambiente fresco y seco",
        "Evitar luz UV",
        "Envase hermético"
      ],
      technicalObservations: "La morfología Fox Tail genera inflorescencias elongadas con estética exótica."
    },
    images: [
      {
        id: 1,
        url: "/imgs/products/hunapu-1.png",
        alt: "Hunapú principal"
      }
    ],
    variants: [
      {
        id: 1,
        name: "3.5g",
        price: 350,
        stock: 12,
        sku: "HUN-35"
      },
      {
        id: 2,
        name: "7g",
        price: 650,
        stock: 5,
        sku: "HUN-7"
      }
    ]
  },
  {
    id: 2,
    name: "Xbalanqué",
    slug: "xbalanque",
    type: {
      id: 1,
      name: "Genética"
    },
    shortDescription: "Genética outdoor de perfil índica compacto.",
    geneticType: "Híbrida en estabilización",
    cultivationLine: "Exterior / Outdoor",
    dominance: "Índica",
    organolepticProfile: "Maderoso, terroso y herbal profundo",
    aroma: "Madera húmeda y resina herbal",
    flavor: "Amaderado y especiado",
    classification: "Outdoor Tropical",
    technicalData: {
      botanicalFeatures: [
        "Estructura compacta",
        "Entrenudos cortos",
        "Alta densidad foliar"
      ],
      terpenes: ["mirceno", "cariofileno", "humuleno"],
      effects: ["relajación corporal", "somnolencia"],
      adaptability: "Alta tolerancia tropical",
      conservation: [
        "Mantener en ambiente seco",
        "Evitar humedad"
      ]
    },
    images: [
      {
        id: 1,
        url: "/imgs/products/xbalanque-1.png",
        alt: "Xblaque principal"
      }
    ],
    variants: []
  },
  {
    id: 3,
    name: "Yun Kash",
    slug: "yun-kash",
    type: {
      id: 2,
      name: "Pre-Rolado"
    },
    shortDescription: "Pre-rolados funcionales de baja potencia.",
    geneticType: null,
    thcEstimated: "<5%",
    classification: "Línea funcional",
    organolepticProfile: "Herbal, terroso y ligeramente dulce",
    aroma: "Herbal y dulce",
    technicalData: {
      userProfile: [
        "Consumidores funcionales",
        "Principiantes",
        "Baja tolerancia"
      ],
      effects: ["relajación moderada", "efecto ligero"],
      materials: [
        "Flores no premium",
        "Conservación parcial de tricomas"
      ],
      warnings: [
        "Producto exclusivo para adultos",
        "No conducir",
        "Mantener fuera del alcance de menores"
      ]
    },
    images: [
      {
        id: 1,
        url: "/imgs/products/yun-kash-1.png",
        alt: "Yun Kash principal"
      }
    ],
    variants: [
      {
        id: 8,
        name: "1 pieza",
        price: 80,
        stock: 25,
        sku: "YK-1"
      },
      {
        id: 9,
        name: "Pack x3",
        price: 220,
        stock: 10,
        sku: "YK-3"
      }
    ]
  }
]
