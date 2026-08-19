'use server'

import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import { uploadProtectedResource, deleteCloudinaryResource } from '@/lib/cloudinary.server'

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

    // 4. Retrieve current user to obtain name and previous public_id
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true, inePublicId: true }
    })

    const oldPublicId = currentUser?.inePublicId

    // 5. Build sanitized custom publicId based on user name
    const rawName = currentUser?.name || session.user.name || 'usuario'
    const sanitizedName = rawName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '')
      .slice(0, 30)

    const customPublicId = `ine_${sanitizedName}_${userId.slice(0, 8)}`

    // 6. Convert file to Base64 buffer for Cloudinary upload
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Data = buffer.toString('base64')
    const dataUri = `data:${file.type};base64,${base64Data}`

    // 7. Upload new INE document to Cloudinary as authenticated resource
    const uploadResult = await uploadProtectedResource(dataUri, {
      folder: 'cqcs/user-ine',
      publicId: customPublicId,
      resourceType: 'auto'
    })

    if (!uploadResult || !uploadResult.public_id) {
      return {
        ok: false,
        message: 'Error al subir el archivo a Cloudinary. Por favor reintente.'
      }
    }

    // 7. Update User in Prisma (set status to PENDING and save inePublicId)
    await prisma.user.update({
      where: { id: userId },
      data: {
        inePublicId: uploadResult.public_id,
        ineStatus: 'PENDING',
        ineUploadedAt: new Date()
      }
    })

    // 8. Safely remove previous Cloudinary resource non-blockingly
    if (oldPublicId) {
      try {
        await deleteCloudinaryResource(oldPublicId, { resourceType: 'image', type: 'authenticated' })
      } catch (destroyError) {
        console.error('[Upload INE] Could not delete previous Cloudinary asset:', destroyError)
      }
    }

    return {
      ok: true,
      message: 'Identificación oficial (INE) cargada exitosamente',
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
