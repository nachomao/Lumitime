'use client'

import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn('brand-mark', className)} aria-hidden="true">
      <span className="brand-mark-piece" />
      <span className="brand-mark-piece" />
      <span className="brand-mark-piece" />
    </span>
  )
}
