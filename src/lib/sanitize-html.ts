import sanitizeHtmlLib from 'sanitize-html'

/**
 * Sanitizes an HTML string using sanitize-html (pure Node.js / RSC compatible, zero JSDOM dependencies).
 * Prevents XSS attacks while preserving standard content tags.
 */
export function sanitizeHtml(dirtyHtml: string): string {
  if (!dirtyHtml) return ''

  return sanitizeHtmlLib(dirtyHtml, {
    allowedTags: [
      'p',
      'h2',
      'h3',
      'strong',
      'em',
      'u',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
      'code',
      'br',
      'hr'
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel', 'title']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    disallowedTagsMode: 'discard'
  })
}
