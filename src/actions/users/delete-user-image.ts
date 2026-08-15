'use server'

import { deleteCloudinaryResource } from '@/lib/cloudinary.server'

export const deleteUserImage = async (imageOrPublicId?: string | null) => {
  if (!imageOrPublicId || imageOrPublicId.trim() === '') {
    return {
      ok: true,
      message: 'No hay imagen para eliminar'
    }
  }

  let publicId = imageOrPublicId.trim()

  // If a full URL is provided (legacy asset compatibility), extract publicId
  if (publicId.startsWith('http://') || publicId.startsWith('https://')) {
    try {
      const urlObj = new URL(publicId)
      const pathname = urlObj.pathname // e.g. /dhyds3mnm/image/upload/v123/cqcs/user-avatars/sample.jpg
      const parts = pathname.split('/')
      // Remove cloud_name, resource_type, delivery_type, and optional version
      const uploadIndex = parts.findIndex(p => p === 'upload' || p === 'authenticated')
      if (uploadIndex !== -1) {
        let remaining = parts.slice(uploadIndex + 1)
        if (remaining.length > 0 && remaining[0].startsWith('v') && !isNaN(Number(remaining[0].slice(1)))) {
          remaining = remaining.slice(1)
        }
        publicId = remaining.join('/').replace(/\.[^/.]+$/, '')
      } else {
        const partsFallback = publicId.split('/')
        const publicIdWithExt = partsFallback.slice(-2).join('/')
        publicId = publicIdWithExt.replace(/\.[^/.]+$/, '')
      }
    } catch {
      const parts = publicId.split('/')
      const publicIdWithExt = parts.slice(-2).join('/')
      publicId = publicIdWithExt.replace(/\.[^/.]+$/, '')
    }
  } else {
    // Strip extension if passed as publicId with extension
    publicId = publicId.replace(/\.[^/.]+$/, '')
  }

  try {
    const result = await deleteCloudinaryResource(publicId, {
      resourceType: 'image',
      type: 'authenticated'
    })

    if (result && result.result !== 'ok' && result.result !== 'not found') {
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
    console.error('Error deleting user image:', error)
    return {
      ok: false,
      message: 'Error al eliminar la imagen del usuario, por favor contacta a soporte'
    }
  }
}
