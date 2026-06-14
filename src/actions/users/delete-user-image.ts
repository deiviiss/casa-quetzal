'use server'

import { z } from 'zod'
import { v2 as cloudinary } from "cloudinary";

const imageSchema = z.string().url("Invalid image URL");

cloudinary.config(process.env.CLOUDINARY_URL ?? "");

export const deleteUserImage = async (imageUrl: string) => {
  if (!imageUrl || imageUrl.trim() === "") {
    return {
      ok: true,
      message: "No hay imagen para eliminar"
    };
  }

  const imageParsed = imageSchema.safeParse(imageUrl);

  if (!imageParsed.success) {
    return {
      ok: false,
      message: 'Error al validar la imagen'
    }
  }

  const image = imageParsed.data

  const parts = image.split('/');
  const publicIdWithExtension = parts.slice(-3).join('/');
  const publicId = publicIdWithExtension.split('.').slice(0, -1).join('.')

  try {
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      return {
        ok: false,
        message: 'Error al eliminar la imagen'
      }
    }

    return {
      ok: true,
      message: 'Eliminada exitosamente'
    }
  } catch (error) {
    console.error('Error deleting user', error)
    return {
      ok: false,
      message: 'Error al eliminar la imagen del usuario, por favor contacta a soporte'
    }
  }
}
