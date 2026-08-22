# Arquitectura e Implementación: Módulo de Blog de Casa Quetzal (CQCS)

Este documento detalla los fundamentos técnicos, decisiones de diseño, modelo de datos, seguridad, optimización SEO y la arquitectura implementada para el módulo completo de **Blog ("Notas de la Casa")** en la plataforma **Casa Quetzal (CQCS)**.

---

## 1. Contexto y Objetivos

### Objetivos
- Proveer un módulo completo de publicación y lectura de artículos de blog.
- Mantener una arquitectura **simple, limpia, SEO-first y altamente mantenible**.
- Garantizar la compatibilidad total con **Next.js 15 App Router (Turbopack)**, **Prisma ORM**, **PostgreSQL** y **NextAuth.js v5**.
- Brindar un editor visual de texto enriquecido (WYSIWYG) para los administradores sin requerir que escriban código HTML manualmente.
- Garantizar la sanitización estricta del contenido HTML para evitar vulnerabilidades XSS.

---

## 2. Modelo de Datos (Prisma ORM)

Se utilizó el modelo `BlogPost` existente en el schema de Prisma (`prisma/schema.prisma`), respetando su estructura y relación con el modelo `User` sin requerir modificaciones ni migraciones adicionales.

### Definición del Modelo

```prisma
model BlogPost {
  id              String   @id @default(uuid())

  title           String
  slug            String   @unique
  description     String   @db.Text
  content         String   @db.Text

  imageUrl        String?
  imageAlt        String?

  metaTitle       String?
  metaDescription String?  @db.VarChar(160)

  publishedAt     DateTime @default(now())

  authorId        String
  author          User     @relation(fields: [authorId], references: [id])

  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt

  @@index([publishedAt])
  @@index([authorId])
  @@map("blog_posts")
}
```

### Reglas del Modelo
- **Publicación directa**: Al guardar un artículo, se considera inmediatamente publicado (`publishedAt`).
- **Unicidad de Slug**: Garantizada por `@unique` a nivel de base de datos y validada en Server Actions.
- **Relación con Autor**: Todo artículo almacena únicamente `authorId` enlazado al usuario con rol `admin` que lo creó.

---

## 3. Diagrama de Arquitectura de la Solución

```text
┌────────────────────────────────────────────────────────────────────────┐
│                               Base de Datos                            │
│                                PostgreSQL                              │
│                                    │                                   │
│                                    ▼                                   │
│                              blog_posts                                │
└────────────────────────────────────┬───────────────────────────────────┘
                                     │
                                     ▼
┌────────────────────────────────────┴───────────────────────────────────┐
│                             Server Actions                             │
│                  (src/actions/blog/ + validateUserAdmin)               │
│          ┌─────────────────────────┼─────────────────────────┐         │
│          ▼                         ▼                         ▼         │
│    getBlogPosts            getBlogPostBySlug          createBlogPost   │
│                                                       updateBlogPost   │
└──────────┬─────────────────────────┬─────────────────────────┬─────────┘
           │                         │                         │
           ▼                         ▼                         ▼
┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐
│     Página /blog     │  │  Página /blog/[slug] │  │ Panel Admin /blog    │
│ (Listado de Artículos)│  │ (Detalle del Artículo)│  │ (Formulario & List)  │
└──────────┬───────────┘  └──────────┬───────────┘  └──────────┬───────────┘
           │                         │                         │
           ▼                         ▼                         ▼
      BlogCard                  BlogArticle              BlogPostForm
                                     │                         │
                                     ▼                         ▼
                              SEO / Metadata             Tiptap Editor
                                JSON-LD                   sanitizeHtml
```

---

## 4. Estructura de Componentes y Funcionalidades

### 4.1 Utilidades e Infraestructura
1. **`src/lib/slugify.ts`**:
   Convierte cadenas de texto en slugs URL semánticos y limpios (conversión a minúsculas, eliminación de acentos/diacríticos `.normalize("NFD")` y reemplazo de espacios por guiones).
2. **`src/lib/sanitize-html.ts`**:
   Sanitiza cadenas HTML utilizando la librería `sanitize-html` (100% compatible con Node.js / React Server Components sin dependencias de DOM/JSDOM). Permite únicamente etiquetas de contenido seguro (`p`, `h2`, `h3`, `strong`, `em`, `u`, `ul`, `ol`, `li`, `a`, `blockquote`, `code`, `br`, `hr`) eliminando scripts, event handlers y esquemas peligrosos como `javascript:`.
3. **`src/lib/blog-post.schema.ts`**:
   Define el esquema Zod (`blogPostSchema`) separado de la capa `'use server'` para cumplir estrictamente con los requerimientos de compilación de Next.js Turbopack.

### 4.2 Server Actions (`src/actions/blog/`)
- **`getBlogPosts()`**: Retorna la lista de artículos ordenados por `publishedAt DESC` junto con la información del autor.
- **`getBlogPostBySlug(slug)`**: Obtiene un artículo específico por su slug.
- **`getBlogPostById(id)`**: Recupera los datos de un artículo para precargar el formulario de edición.
- **`createBlogPost(data)`**: Valida sesión de administrador via `validateUserAdmin()`, valida esquema Zod, sanitiza el HTML del cuerpo, verifica la unicidad del slug y guarda en Prisma.
- **`updateBlogPost(id, data)`**: Valida permisos, sanitiza el contenido, comprueba que el slug no esté en uso por otro artículo y actualiza los datos ejecutando `revalidatePath()`.

### 4.3 Editor Visual WYSIWYG (`src/components/blog/RichTextEditor.tsx`)
- Basado en **Tiptap** (`@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`).
- Permite aplicar negrita, cursiva, encabezados (`H2`, `H3`), listas desordenadas (`ul`), listas numeradas (`ol`), citas (`blockquote`) e insertar/quitar enlaces de manera visual.

### 4.4 Formulario Administrable (`src/components/blog/BlogPostForm.tsx`)
- Formulario unificado para creación y edición de entradas.
- Autogeneración de slug en tiempo real desde el título con capacidad de ajuste manual.
- Carga e integración de imagen destacada (con carga directa a Cloudinary mediante `/api/upload-avatar` o especificación de URL externa).
- Requisito de texto alternativo (`imageAlt`) si se asigna una imagen principal.
- Contador de caracteres para `metaDescription` limitado visualmente a 160 caracteres.

### 4.5 Componentes Públicos (`src/components/blog/`)
- **`BlogCard.tsx`**: Tarjeta adaptativa que presenta la imagen destacada (usando `next/image`), fecha de publicación, autor, título, descripción y enlace hacia `/blog/[slug]`.
- **`BlogArticle.tsx`**: Vista completa del artículo renderizada semánticamente con un único tag `<h1>`, fecha, autor e HTML sanitizado.
- **`BlogJsonLd.tsx`**: Genera el script `application/ld+json` con la entidad `BlogPosting` para SEO estructurado.

---

## 5. Estrategia SEO Técnico

Cada artículo publicado en `/blog/[slug]` cuenta con optimización para motores de búsqueda:

1. **Metadata Dinámica (`generateMetadata`)**:
   - `title`: `metaTitle || title`
   - `description`: `metaDescription || description`
   - `alternates.canonical`: `${siteUrl}/blog/${post.slug}`
2. **Open Graph & Twitter Cards**:
   - Generación automática de `og:title`, `og:description`, `og:url`, `og:image` y `og:type = 'article'`.
3. **JSON-LD Structured Data (`BlogPosting`)**:
   - Esquema Schema.org que vincula el título, descripción, imagen destacada, fecha de publicación, fecha de modificación y la persona u organización que figura como autor.
4. **HTML Semántico**:
   - Un único `<h1>` por página (el título principal del artículo).
   - Encabezados internos iniciando desde `<h2>` y `<h3>`.
   - Etiquetas semánticas `<article>`, `<header>`, `<main>` y `<footer>`.

---

## 6. Navegación y Rutas Creadas

| Ruta | Descripción | Acceso |
| :--- | :--- | :--- |
| `/blog` | Listado público de artículos ("Notas de la Casa") | Público |
| `/blog/[slug]` | Lectura de artículo completo con SEO y JSON-LD | Público |
| `/platform/admin/blog` | Listado de administración de artículos | Administrador (`role === 'admin'`) |
| `/platform/admin/blog/new` | Formulario de creación de artículo | Administrador (`role === 'admin'`) |
| `/platform/admin/blog/[id]/edit` | Formulario de edición de artículo | Administrador (`role === 'admin'`) |

---

## 7. Verificación y Calidad de Código

- **Comprobación de Tipos (TypeScript)**: Ejecutado `npx tsc --noEmit` obteniendo 0 errores.
- **Linter (ESLint)**: Ejecutado `npm run lint` obteniendo 0 errores.
- **Compatibilidad con Cloudinary**: Las imágenes destacadas utilizan el patrón de imágenes del proyecto con `next/image` y dominios remotos configurados en `next.config.ts`.
