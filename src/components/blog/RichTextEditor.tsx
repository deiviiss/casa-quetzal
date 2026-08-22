'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Link from '@tiptap/extension-link'
import {
  Bold,
  Italic,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Link as LinkIcon,
  Unlink,
  RemoveFormatting,
  Quote
} from 'lucide-react'
import { useEffect } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (html: string) => void
}

export function RichTextEditor({ content, onChange }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3]
        }
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-emerald-500 underline hover:text-emerald-400 font-medium'
        }
      })
    ],
    content: content || '',
    editorProps: {
      attributes: {
        class:
          'min-h-[220px] max-h-[500px] overflow-y-auto w-full rounded-b-md border border-slate-700 bg-slate-900/50 p-4 text-slate-100 focus:outline-none prose prose-invert max-w-none prose-p:my-2 prose-headings:font-bold prose-h2:text-xl prose-h2:text-emerald-400 prose-h2:my-3 prose-h3:text-lg prose-h3:text-emerald-300 prose-h3:my-2 prose-ul:list-disc prose-ol:list-decimal prose-li:my-1'
      }
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    }
  })

  // Synchronize internal content when external value changes drastically (e.g., loaded for edit)
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content || '')
    }
  }, [content, editor])

  if (!editor) {
    return (
      <div className="h-[220px] w-full rounded-md border border-slate-700 bg-slate-900/50 flex items-center justify-center text-slate-500 text-sm">
        Cargando editor de texto...
      </div>
    )
  }

  const setLink = () => {
    const previousUrl = editor.getAttributes('link').href
    const url = window.prompt('URL del enlace:', previousUrl)

    if (url === null) {
      return
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }

  return (
    <div className="w-full flex flex-col rounded-lg overflow-hidden border border-slate-700 bg-slate-950">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-800/90 border-b border-slate-700 text-slate-300">
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('bold') ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Negrita"
        >
          <Bold className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('italic') ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Cursiva"
        >
          <Italic className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('heading', { level: 2 }) ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Encabezado H2"
        >
          <Heading2 className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('heading', { level: 3 }) ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Encabezado H3"
        >
          <Heading3 className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('bulletList') ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Lista con viñetas"
        >
          <List className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('orderedList') ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Lista numerada"
        >
          <ListOrdered className="h-4 w-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('blockquote') ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Cita"
        >
          <Quote className="h-4 w-4" />
        </button>

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={setLink}
          className={`p-2 rounded hover:bg-slate-700 transition-colors ${
            editor.isActive('link') ? 'bg-slate-700 text-emerald-400' : ''
          }`}
          title="Insertar enlace"
        >
          <LinkIcon className="h-4 w-4" />
        </button>

        {editor.isActive('link') && (
          <button
            type="button"
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-2 rounded hover:bg-slate-700 text-rose-400 transition-colors"
            title="Quitar enlace"
          >
            <Unlink className="h-4 w-4" />
          </button>
        )}

        <div className="h-4 w-[1px] bg-slate-700 mx-1" />

        <button
          type="button"
          onClick={() => editor.chain().focus().unsetAllMarks().clearNodes().run()}
          className="p-2 rounded hover:bg-slate-700 transition-colors text-slate-400"
          title="Limpiar formato"
        >
          <RemoveFormatting className="h-4 w-4" />
        </button>
      </div>

      {/* Content Editor */}
      <EditorContent editor={editor} />
    </div>
  )
}
