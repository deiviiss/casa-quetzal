import { v2 as cloudinary, type UploadApiResponse } from 'cloudinary'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export interface UploadProtectedOptions {
  folder: string
  publicId?: string
  resourceType?: 'image' | 'raw' | 'auto' | 'video'
  transformation?: object[]
}

export interface GetProtectedUrlOptions {
  resourceType?: 'image' | 'raw' | 'video'
  format?: string
  expiresInSeconds?: number
  attachment?: boolean
}

/**
 * Upload a resource to Cloudinary with delivery type 'authenticated'
 */
export async function uploadProtectedResource(
  fileDataUri: string,
  options: UploadProtectedOptions
): Promise<UploadApiResponse> {
  return cloudinary.uploader.upload(fileDataUri, {
    folder: options.folder,
    ...(options.publicId ? { public_id: options.publicId } : {}),
    type: 'authenticated',
    resource_type: options.resourceType || 'auto',
    ...(options.transformation ? { transformation: options.transformation } : {})
  })
}

/**
 * Generate a time-limited signed URL using private_download_url (default: 15 min, inline display)
 * Used for sensitive documents such as INE.
 */
export function getProtectedDownloadUrl(
  publicId: string,
  options: GetProtectedUrlOptions = {}
): string {
  const expiresInSeconds = options.expiresInSeconds ?? 15 * 60 // 15 minutes default
  const expiresAt = Math.floor(Date.now() / 1000) + expiresInSeconds
  const attachment = options.attachment ?? false
  const resourceType = options.resourceType ?? 'image'

  // Determine format from publicId or option
  let format = options.format
  if (!format) {
    if (publicId.toLowerCase().includes('.pdf') || publicId.toLowerCase().endsWith('pdf')) {
      format = 'pdf'
    } else if (publicId.toLowerCase().endsWith('.png')) {
      format = 'png'
    } else if (publicId.toLowerCase().endsWith('.webp')) {
      format = 'webp'
    } else {
      format = 'jpg'
    }
  }

  // Strip extension from publicId if present
  const cleanPublicId = publicId.replace(/\.[^/.]+$/, '')

  return cloudinary.utils.private_download_url(cleanPublicId, format, {
    type: 'authenticated',
    resource_type: resourceType,
    expires_at: expiresAt,
    attachment: attachment
  })
}

/**
 * Backward compatibility alias for getProtectedDownloadUrl
 */
export const getProtectedResourceUrl = getProtectedDownloadUrl

/**
 * Generate a stable signed delivery URL using cloudinary.url (CDN-cacheable, no expiration)
 * Used for protected frequent resources such as User Avatars.
 */
export function getProtectedSignedUrl(
  publicId: string,
  options: { transformation?: object[] } = {}
): string {
  const cleanPublicId = publicId.replace(/\.[^/.]+$/, '')

  return cloudinary.url(cleanPublicId, {
    resource_type: 'image',
    type: 'authenticated',
    sign_url: true,
    secure: true,
    ...(options.transformation ? { transformation: options.transformation } : {})
  })
}

/**
 * Safely delete a resource from Cloudinary (supports authenticated and upload delivery types)
 */
export async function deleteCloudinaryResource(
  publicId: string,
  options: {
    resourceType?: 'image' | 'raw' | 'video'
    type?: 'authenticated' | 'upload'
  } = {}
) {
  const resourceType = options.resourceType || 'image'
  const type = options.type || 'authenticated'

  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      type: type
    })

    // If not found in authenticated, try upload (legacy asset fallback)
    if (result && result.result !== 'ok' && type === 'authenticated') {
      return await cloudinary.uploader.destroy(publicId, {
        resource_type: resourceType,
        type: 'upload'
      })
    }

    return result
  } catch (error) {
    console.error(`[Delete Cloudinary Resource Error] ${publicId}:`, error)
    return null
  }
}
