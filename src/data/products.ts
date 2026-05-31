import type { DispensaryProduct as Product } from "@/interfaces/product.interface"

export const products: Product[] = [
  // Hunapu: 3.5g 
  {
    id: '1',
    name: "Hunapú",
    slug: "hunapu",
    price: 0,
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
        id: '1',
        name: "3.5g",
        price: 350,
        quantity: 1, // TODO: Que representa
        stock: 12, // TODO: Que representa
        sku: "HUN-35",
        type: "weight",
        isAvailable: true,
      },
      {
        id: '2',
        name: "7g",
        price: 650,
        quantity: 1, // TODO: Que representa
        stock: 5, // TODO: Que representa
        sku: "HUN-7",
        type: "weight",
        isAvailable: true,
      }
    ]
  },
  {
    id: '2',
    name: "Xbalanqué",
    slug: "xbalanque",
    price: 650,
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
    id: '3',
    name: "Yun Kash",
    slug: "yun-kash",
    price: 0,
    type: {
      id: 2,
      name: "Pre-Rolado"
    },
    shortDescription: "Pre-rolados funcionales de baja potencia.",
    fullDescription: "Pre-rolados funcionales de baja potencia.",
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
        id: '8',
        name: "1 pieza",
        price: 80,
        quantity: 1, // TODO: Que representa
        stock: 25, // TODO: Que representa
        sku: "YK-1",
        type: "quantity",
        isAvailable: true,
      },
      {
        id: '9',
        name: "Pack x3",
        price: 220,
        quantity: 1, // TODO: Que representa
        stock: 10, // TODO: Que representa
        sku: "YK-3",
        type: "quantity",
        isAvailable: true,
      }
    ]
  },
  {
    "id": '4',
    "name": "Chak la Reyna Roja",
    "slug": "chak-la-reyna-roja",
    price: 0,
    "type": {
      "id": 1,
      "name": "Genética"
    },

    "shortDescription": "Línea experimental con pigmentación rojiza y comportamiento psicoactivo dual.",

    "fullDescription": "Chak la Reyna Roja representa una línea experimental de alta variabilidad fenotípica enfocada en perfiles sensoriales intensos y exploración terpénica.",

    "geneticType": "Híbrida experimental",

    "cultivationLine": "Exterior / Interior",

    "developmentStatus": "Experimental — fenotipo en observación",

    "dominance": "Híbrida",

    "origin": "Productor asociado no verificado bajo Manual Quetzal",

    "classification": "Experimental",

    "organolepticProfile": "Cítrico, herbal y resinoso",

    "aroma": "Cítrico fresco con fondo herbal-resinoso",

    "flavor": "Notas ácidas y dulces con retrogusto vegetal",

    "thcEstimated": null,

    "technicalData": {
      "botanicalFeatures": [
        "Pecíolos intensamente naranjas a rojo profundo",
        "Alta pigmentación vascular observable",
        "Fenotipo no estabilizado",
        "Expresión variable entre individuos",
        "Adaptable a indoor y outdoor"
      ],

      "cultivation": {
        // "methods": [
        //   "Indoor",
        //   "Outdoor"
        // ],

        // "phytosanitaryResistance": [
        //   "Sin resistencia confirmada a Botrytis cinerea",
        //   "Sin resistencia confirmada a Oídio"
        // ],

        // "agronomicStatus": "Genética en evaluación temprana",

        // "climaticCompatibility": "En observación"
      },

      "effects": [
        "Inicio cerebral intenso",
        "Creatividad",
        "Relajación corporal profunda",
        "Somnolencia marcada",
        "Sensación de cuerpo pesado",
        "Alteración temporal de memoria inmediata"
      ],

      "terpenes": [
        "Terpenos cítricos",
        "Terpenos volátiles"
      ],

      "warnings": [
        "Genética experimental",
        "Perfil fitoquímico no estabilizado",
        "Requiere monitoreo fitosanitario constante",
        "Productor aún no auditado bajo estándares CQCS"
      ],

      "conservation": [
        "Mantener en ambiente seco y ventilado",
        "Evitar humedad elevada durante curado",
        "Almacenar protegido de luz UV"
      ],

      "technicalObservations": "Presenta comportamiento psicoactivo dual con fase inicial cerebral elevada seguida de sedación profunda. Actualmente continúa en observación técnica y evaluación agronómica."
    },

    "images": [
      {
        "id": 1,
        "url": "/imgs/products/chak-1.png",
        "alt": "Chak la Reyna Roja principal"
      }
    ],

    variants: [
      {
        id: '1',
        name: "3.5g",
        price: 350,
        quantity: 1, // TODO: Que representa
        stock: 12, // TODO: Que representa
        sku: "HUN-35",
        type: "weight",
        isAvailable: true,
      },
      {
        id: '2',
        name: "7g",
        price: 650,
        quantity: 1, // TODO: Que representa
        stock: 5, // TODO: Que representa
        sku: "HUN-7",
        type: "weight",
        isAvailable: true
      }
    ]
  }
]
