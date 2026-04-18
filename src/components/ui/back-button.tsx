'use client'

import { useRouter } from 'next/navigation'
import { ChevronLeft } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface BackButtonProps {
  className?: string
  variant?: 'outline' | 'ghost' | 'default' | 'link' | 'secondary'
  label?: string
  href?: string
}

/**
 * Reusable Back Button for navigation.
 * Uses router.back() by default, or pushes to a specific href if provided.
 */
export const BackButton = ({ 
  className, 
  variant = 'ghost', 
  label = 'Volver', 
  href 
}: BackButtonProps) => {
  const router = useRouter()

  const handleBack = () => {
    if (href) {
      router.push(href)
    } else {
      router.back()
    }
  }

  return (
    <Button
      variant={variant}
      className={cn(
        "gap-1 px-2 text-slate-400 hover:text-white transition-all hover:bg-white/5 active:scale-95", 
        className
      )}
      onClick={handleBack}
      aria-label={label}
    >
      <ChevronLeft className="h-4 w-4" />
      <span className="text-sm font-medium">{label}</span>
    </Button>
  )
}
