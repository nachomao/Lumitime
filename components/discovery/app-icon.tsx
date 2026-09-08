import Image from 'next/image'
import { cn } from '@/lib/utils'

export function AppIcon({ icon, className, large = false }: { icon: string; className?: string; large?: boolean }) {
  return (
    <span className={cn('app-icon', large && 'app-icon-large', className)} data-brand={icon} aria-hidden="true">
      <Image src={`/icons/${icon}.svg`} alt="" width={large ? 48 : 32} height={large ? 48 : 32} draggable={false} />
    </span>
  )
}
