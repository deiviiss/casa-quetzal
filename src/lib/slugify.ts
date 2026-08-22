/**
 * Converts a string into a clean, URL-friendly slug.
 * Example: "Cómo proteger tu negocio con códigos QR" => "como-proteger-tu-negocio-con-codigos-qr"
 */
export function slugify(text: string): string {
  if (!text) return ''

  return text
    .toString()
    .toLowerCase()
    .trim()
    .normalize('NFD') // Separate accents from letters
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^a-z0-9 -]/g, '') // Remove invalid chars
    .replace(/\s+/g, '-') // Collapse whitespace and replace by -
    .replace(/-+/g, '-') // Collapse dashes
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}
