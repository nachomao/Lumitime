'use client'

import { type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'
import { cn } from '@/lib/utils'

export function GlassWidget({ children, className, label, onClick, motionEnabled }: {
  children: ReactNode
  className?: string
  label: string
  onClick: () => void
  motionEnabled: boolean
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useSpring(x, { stiffness: 250, damping: 24 })
  const rotateY = useSpring(y, { stiffness: 250, damping: 24 })

  return (
    <motion.button
      type="button"
      className={cn('glass glass-widget', className)}
      aria-label={label}
      onClick={onClick}
      style={motionEnabled ? { rotateX, rotateY, transformPerspective: 1000 } : undefined}
      whileHover={motionEnabled ? { y: -5, scale: 1.012 } : undefined}
      whileTap={motionEnabled ? { scale: 0.965, y: 0 } : undefined}
      onPointerMove={(event) => {
        if (!motionEnabled || event.pointerType !== 'mouse') return
        // Map the pointer position to a tiny tilt, just enough to make the glass feel alive.
        const bounds = event.currentTarget.getBoundingClientRect()
        const horizontal = (event.clientX - bounds.left) / bounds.width
        const vertical = (event.clientY - bounds.top) / bounds.height
        x.set((0.5 - vertical) * 5)
        y.set((horizontal - 0.5) * 5)
        event.currentTarget.style.setProperty('--shine-x', `${horizontal * 100}%`)
        event.currentTarget.style.setProperty('--shine-y', `${vertical * 100}%`)
      }}
      onPointerLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.button>
  )
}
