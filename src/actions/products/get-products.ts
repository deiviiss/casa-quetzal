'use server'

import { Product, DbProduct } from "@/interfaces/product.interface"
import prisma from '@/lib/prisma'

const products: Product[] = [
  {
    id: '1',
    name: "Pre-Rolados",
    image: "/imgs/categoria-pre-rolados.webp",
    shortDescription: "Disfruta la experiencia pura del cáñamo con nuestros pre-rolados premium. Flores curadas 2 años sin fertilizantes sintéticos.",
    longDescription: "Nuestros pre-rolados están elaborados con flores de cáñamo curadas por más de 2 años, garantizando una experiencia suave, aromática y de la más alta calidad. Sin fertilizantes sintéticos, preservamos la pureza del producto y promovemos la regeneración del suelo en su cultivo.",
    benefits: [
      "Relajación profunda y natural.",
      "Libre de fertilizantes sintéticos.",
      "Aroma y sabor premium.",
      "Cultivo sustentable y regenerativo."
    ],
    usage: [
      "Encender y disfrutar en un ambiente relajado.",
      "Ideal para sesiones de meditación o descanso nocturno."
    ],
    ingredients: ["Flores de cáñamo curadas (100% orgánicas)."],
    origin: "Cultivado en milpas regenerativas sin químicos sintéticos en México.",
    price: 299,
    isAvailable: true,
    isExclusive: true
  },
  {
    id: '2',
    name: "Crema de cañamo con CBD",
    image: "/imgs/categoria-crema-cbd.webp",
    shortDescription: "Infusionados con cáñamo cultivado en espacios regenerativos. Alivio natural y relajación.",
    longDescription: "Nuestra crema de cañamo con CBD está diseñada para proporcionar alivio y bienestar de manera natural. Cada producto está infusionado con extractos de cáñamo de alta calidad, cultivado en condiciones sustentables.",
    benefits: [
      "Alivio del estrés y la ansiedad.",
      "Hidratación y regeneración de la piel.",
      "Propiedades antiinflamatorias naturales."
    ],
    usage: [
      "Aplicar sobre la piel limpia en áreas de tensión o dolor.",
    ],
    ingredients: [
      "Extracto de CBD de cáñamo orgánico.",
      "Aceites esenciales naturales.",
    ],
    origin: "Producido con cáñamo cultivado en espacios regenerativos en México.",
    price: 239,
    isAvailable: true,
    isExclusive: false
  },
  {
    id: '5',
    name: "Aceite de CBD Premium",
    image: "/imgs/categoria-aceite-cbd.webp",
    shortDescription: "Aceite de CBD elaborado con cáñamo cultivado en interior. Bienestar diario y equilibrio natural.",
    longDescription: "Nuestro Aceite de CBD Premium es elaborado a partir de flores de cáñamo cultivadas en interior bajo condiciones controladas y seleccionadas por su perfil equilibrado de cannabinoides y terpenos. Inspirado en fenotipos de calidad media-alta como Fedora 19, ofrece una experiencia consistente, un perfil aromático suave y una formulación diseñada para integrarse fácilmente a tu rutina diaria de bienestar.",
    benefits: [
      "Apoyo al bienestar general.",
      "Contribuye al equilibrio del sistema endocannabinoide.",
      "Perfil aromático suave y agradable.",
      "Fácil integración en la rutina diaria."
    ],
    usage: [
      "Administrar la cantidad recomendada utilizando el gotero de precisión.",
      "Incorporar a la rutina diaria según las indicaciones del producto."
    ],
    ingredients: [
      "Extracto de cáñamo rico en CBD."
    ],
    origin: "Elaborado con flores de cáñamo cultivadas en interior bajo condiciones controladas.",
    price: 699,
    isAvailable: true,
    isExclusive: false
  },
  {
    id: '3',
    name: "Mechero de Cáñamo CQCS",
    shortDescription:
      "Mechero de cáñamo encerado, llama limpia y encendido natural para tu ritual.",

    longDescription:
      "El Mechero de Cáñamo CQCS es una alternativa práctica para quienes buscan un encendido más controlado. Consiste en un encendedor recargable envuelto con cuerda de cáñamo natural impregnada con cera de abeja. Una vez encendida la punta de la cuerda, permite transferir la llama de forma gradual sin exponer directamente la pieza a la llama del encendedor. Su diseño es compacto, reutilizable y fácil de transportar, ideal para el uso diario y para quienes valoran materiales de origen natural.",

    price: 59,
    image: "/imgs/product-hemp-wick-lighter.webp",
    benefits: [
      "Encendido gradual y preciso.",
      "Cuerda de cáñamo de origen vegetal.",
      "Cera de abeja natural como recubrimiento.",
      "Encendedor recargable y reutilizable.",
      "Fácil de transportar.",
      "Favorece un mejor control de la llama.",
      "Diseño artesanal y funcional."
    ],
    usage: [
      "Enciende la punta de la cuerda de cáñamo con el encendedor.",
      "Permite que la llama se estabilice durante unos segundos.",
      "Utiliza la llama de la cuerda para encender el material deseado.",
      "Apaga la cuerda soplando suavemente o sofocando la llama.",
      "Sustituye la cuerda cuando sea necesario."
    ],
    ingredients: [
      "Cuerda de fibra de cáñamo 100% natural.",
      "Cera de abeja natural.",
      "Encendedor recargable de butano.",
      "Soporte de fijación para la cuerda."
    ],
    origin:
      "Ensamblado artesanalmente en Campeche, México, utilizando cuerda de cáñamo natural y cera de abeja seleccionada.",

    isAvailable: true,
    isExclusive: false,
    type: "accessory"
  },
  {
    id: '4',
    name: "Biofertilizante Orgánico",
    image: "/imgs/categoria-biofertilizantes.webp",
    shortDescription: "Nutre tus cultivos de manera natural con nuestro biofertilizante de cáñamo, la receta de J. Restrepo.",
    longDescription: "Nuestro biofertilizante orgánico está elaborado con procesos anaeróbicos que maximizan los nutrientes esenciales para la regeneración del suelo. Ideal para agricultores que buscan una alternativa sostenible y natural.",
    benefits: [
      "Aporta nutrientes esenciales para el crecimiento de cultivos.",
      "Mejora la calidad del suelo de manera natural.",
      "Fórmula 100% orgánica y libre de químicos sintéticos."
    ],
    usage: [
      "Diluir en agua y aplicar directamente en la tierra.",
      "Usar como complemento en cultivos ecológicos."
    ],
    ingredients: [
      "Extracto de cáñamo fermentado.",
      "Microorganismos beneficiosos.",
      "Minerales naturales."
    ],
    origin: "Producido con residuos de cáñamo y procesos anaeróbicos en México.",
    price: 399,
    isAvailable: false,
    isExclusive: false
  },
  {
    id: '6',
    name: "Miel de Cannabis CQCS",
    shortDescription:
      "Miel multifloral infusionada con cannabis, menos del 5% de THC.",
    longDescription:
      "La Miel de Cannabis CQCS combina miel multifloral mexicana con una infusión cuidadosamente elaborada de cannabis, manteniendo un contenido inferior al 5% de THC. Su formulación busca preservar las características naturales de la miel mientras incorpora los compuestos vegetales del cannabis en un producto artesanal de alta calidad. Ideal para acompañar bebidas, alimentos o como parte de una rutina de bienestar, siempre siguiendo las recomendaciones de consumo responsable y la legislación aplicable.",
    price: 129,
    image: "/imgs/product-miel-cannabis.webp",
    benefits: [
      "Elaboración artesanal.",
      "Menos del 5% de THC.",
      "Miel multifloral 100% natural.",
      "Fácil de incorporar a bebidas y alimentos.",
      "Sabor suave con notas herbales.",
      "Ingredientes de origen natural.",
      "Presentación lista para consumir."
    ],
    usage: [
      "Consumir directamente o como endulzante.",
      "Agregar a café, té o infusiones tibias.",
      "Untar sobre pan, galletas o fruta.",
      "No calentar en exceso para conservar sus propiedades.",
      "Mantener fuera del alcance de menores de edad."
    ],
    ingredients: [
      "Miel multifloral mexicana.",
      "Extracto de cannabis (<5% THC).",
      "Terpenos naturales de cannabis."
    ],
    origin:
      "Elaborada artesanalmente en Campeche, México, con miel de productores locales y cannabis con trazabilidad documentada.",
    isAvailable: true,
    isExclusive: false,
    type: "Alimentos"
  },
  {
    id: "7",
    name: "Gomitas Pokers (CBD)",
    shortDescription: "Gomitas infusionadas con cannabinoides de origen vegetal para consumo responsable.",
    longDescription: "Las Gomitas de CBD CQCS son un alimento funcional elaborado con extracto de cannabis rico en cannabidiol (CBD), formulado para ofrecer una experiencia consistente mediante un proceso de dosificación estandarizado. Cada lote es elaborado bajo controles de calidad y trazabilidad, conservando el perfil natural de cannabinoides y terpenos presentes en el extracto. Debido a la naturaleza del extracto utilizado, el producto puede contener tetrahidrocannabinol (THC) en concentraciones suficientes para producir efectos psicoactivos en personas sensibles. Se recomienda un consumo responsable y conforme a la legislación aplicable.",
    price: 199,
    image: "/imgs/product-gomitas-cbd.webp",
    benefits: [
      "Dosificación uniforme por pieza.",
      "Elaboración con extracto de cannabis de espectro amplio.",
      "Perfil natural de cannabinoides y terpenos.",
      "Presentación práctica para transportar.",
      "Lotes con trazabilidad documentada.",
      "Sabor agradable y fácil consumo.",
      "Proceso de fabricación estandarizado."
    ],
    usage: [
      "Iniciar con una gomita o la porción recomendada.",
      "Esperar al menos 2 horas antes de consumir una dosis adicional.",
      "Consumir preferentemente después de alimentos.",
      "No conducir vehículos ni operar maquinaria tras su consumo.",
      "Mantener fuera del alcance de menores de edad y mascotas.",
      "Advertencia: este producto contiene THC y puede producir efectos psicoactivos."
    ],
    ingredients: [
      "Extracto de cannabis rico en CBD.",
      "Azúcar.",
      "Jarabe de glucosa.",
      "Pectina.",
      "Ácido cítrico.",
      "Saborizantes naturales.",
      "Colorantes de origen natural.",
      "Terpenos naturales de cannabis."
    ],
    origin: "Elaboradas artesanalmente en Campeche, México, utilizando extracto de cannabis con trazabilidad por lote y materias primas seleccionadas.",
    isAvailable: true,
    isExclusive: false,
    type: "Comestibles"
  }
];


export const getProducts = async () => {
  return {
    ok: true,
    products
  }
}

export const getMembershipProduct = async (): Promise<{ ok: boolean; product?: DbProduct; message?: string }> => {
  try {
    const dbProduct = await prisma.product.findFirst({
      where: {
        type: 'membership',
        isActive: true
      }
    })

    if (!dbProduct) {
      return {
        ok: false,
        message: 'Membership product not found or inactive'
      }
    }

    // Map Prisma model to the decoupled DbProduct interface
    const product: DbProduct = {
      id: dbProduct.id,
      name: dbProduct.name,
      type: dbProduct.type,
      price: dbProduct.price,
      isActive: dbProduct.isActive
    }

    return {
      ok: true,
      product
    }
  } catch (error) {
    console.error('Error fetching membership product:', error)
    return {
      ok: false,
      message: 'Error fetching membership product'
    }
  }
}
