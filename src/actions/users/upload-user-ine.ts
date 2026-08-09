'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp'
]

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024 // 5 MB

export interface UploadIneResponse {
  ok: boolean
  message: string
  ineUrl?: string
  inePublicId?: string
}

export async function uploadUserIne(formData: FormData): Promise<UploadIneResponse> {
  try {
    // 1. Verify authenticated session in server
    const session = await auth()
    if (!session?.user?.id) {
      return {
        ok: false,
        message: 'Debes iniciar sesión para realizar esta acción'
      }
    }

    const userId = session.user.id

    // 2. Extract file from FormData
    const file = formData.get('ine') as File | null

    if (!file || typeof file === 'string') {
      return {
        ok: false,
        message: 'No se ha seleccionado ningún archivo de identificación (INE)'
      }
    }

    // 3. Server-side validations (MIME type and File size)
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      return {
        ok: false,
        message: 'Formato de archivo no válido. Solo se permiten PDF, JPG, PNG o WEBP.'
      }
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return {
        ok: false,
        message: 'El archivo excede el tamaño máximo permitido de 5 MB.'
      }
    }

    // 4. Retrieve current user to obtain previous public_id
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { inePublicId: true }
    })

    const oldPublicId = currentUser?.inePublicId

    // 5. Convert file to Base64 buffer for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64Data}`

    // 6. Upload new INE document to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: 'cqcs/user-ine',
      resource_type: 'auto'
    })

    if (!uploadResult || !uploadResult.secure_url) {
      return {
        ok: false,
        message: 'Error al subir el archivo a Cloudinary. Por favor reintente.'
      }
    }

    // 7. Update User in Prisma (set status to PENDING)
    await prisma.user.update({
      where: { id: userId },
      data: {
        ineUrl: uploadResult.secure_url,
        inePublicId: uploadResult.public_id,
        ineStatus: 'PENDING',
        ineUploadedAt: new Date()
      }
    })

    // 8. Safely remove previous Cloudinary resource non-blockingly
    if (oldPublicId) {
      try {
        await cloudinary.uploader.destroy(oldPublicId, { resource_type: 'auto' })
      } catch (destroyError) {
        console.error('[Upload INE] Could not delete previous Cloudinary asset:', destroyError)
      }
    }

    return {
      ok: true,
      message: 'Identificación oficial (INE) cargada exitosamente',
      ineUrl: uploadResult.secure_url,
      inePublicId: uploadResult.public_id
    }
  } catch (error) {
    console.error('[Upload INE Error]:', error)
    return {
      ok: false,
      message: 'Ocurrió un error inesperado al procesar tu identificación. Contacta a soporte.'
    }
  }
}
