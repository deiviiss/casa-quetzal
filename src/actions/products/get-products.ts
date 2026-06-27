'use server'

import { Product, DbProduct } from "@/interfaces/product.interface"
import prisma from '@/lib/prisma'

const products: Product[] = [
  {
    id: '1',
    name: "Pre-Rolados",
    image: "/imgs/categoria-pre-rolados.png",
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
    image: "/imgs/categoria-crema-cbd.png",
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
    image: "/imgs/categoria-aceite-cbd.png",
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
    name: "Velas y Souvenirs de cáñamo",
    image: "/imgs/categoria-vela-decorativa.png",
    shortDescription: "Lleva contigo un pedazo de nuestra cultura del cáñamo. Productos ecológicos hechos con fibra de cáñamo.",
    longDescription: "Nuestras velas y souvenirs están elaborados con materiales ecológicos derivados del cáñamo, fusionando tradición y sostenibilidad en cada pieza. Aromas relajantes y un diseño artesanal los convierten en el complemento perfecto para cualquier espacio.",
    benefits: [
      "Ambientación con aromas relajantes.",
      "Materiales ecológicos y biodegradables.",
      "Diseño artesanal y exclusivo."
    ],
    usage: [
      "Encender en un espacio cerrado para un ambiente relajante.",
      "Usar como decoración sostenible en el hogar."
    ],
    ingredients: [
      "Cera de cáñamo.",
      "Esencias naturales.",
      "Fibra de cáñamo reciclada."
    ],
    origin: "Elaborado con fibra de cáñamo reciclada en talleres sustentables en México.",
    price: 0,
    isAvailable: true,
    isExclusive: false
  },
  {
    id: '4',
    name: "Biofertilizante Orgánico",
    image: "/imgs/categoria-biofertilizantes.png",
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
