import { cn } from '@/lib/utils'

export function AppIcon({ icon, className, large = false }: { icon: string; className?: string; large?: boolean }) {
  // The wrapper owns the visual treatment; the SVG only supplies the brand artwork.
  return (
    <span className={cn('app-icon', large && 'app-icon-large', className)} data-brand={icon} aria-hidden="true">
      <img
        src={`/icons/${icon}.svg`}
        alt=""
        width={large ? 48 : 32}
        height={large ? 48 : 32}
        draggable={false}
      />
    </span>
  )
}
