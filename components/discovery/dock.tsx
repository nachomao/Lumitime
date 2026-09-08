'use client'

import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'motion/react'
import { LayoutGrid, Settings2 } from 'lucide-react'
import { AppIcon } from '@/components/discovery/app-icon'
import { software, type Software } from '@/lib/software'

const dockApps = ['notion', 'raycast', 'figma', 'chatgpt', 'spotify'].map((id) => software.find((app) => app.id === id)!)

function DockApp({ app, mouseX, onOpen, motionEnabled }: { app: Software; mouseX: MotionValue<number>; onOpen: (app: Software) => void; motionEnabled: boolean }) {
  const ref = useRef<HTMLButtonElement>(null)
  const distance = useTransform(mouseX, (value) => {
    const bounds = ref.current?.getBoundingClientRect()
    return bounds ? value - bounds.x - bounds.width / 2 : Infinity
  })
  const targetSize = useTransform(distance, [-130, 0, 130], [50, 73, 50])
  const size = useSpring(targetSize, { stiffness: 430, damping: 28, mass: 0.5 })

  return (
    <motion.button ref={ref} type="button" className="dock-app" style={{ width: motionEnabled ? size : 50, height: motionEnabled ? size : 50 }} onClick={() => onOpen(app)} whileTap={motionEnabled ? { scale: 0.8 } : undefined} aria-label={`快捷查看 ${app.name}`}>
      <AppIcon icon={app.icon} large />
      <span className="dock-tooltip" aria-hidden="true">{app.name}</span>
    </motion.button>
  )
}

export function Dock({ onOpen, onLibrary, onSettings, motionEnabled }: { onOpen: (app: Software) => void; onLibrary: () => void; onSettings: () => void; motionEnabled: boolean }) {
  const mouseX = useMotionValue(Infinity)
  return (
    <div className="dock-position">
      <motion.nav className="glass app-dock" aria-label="快捷启动" initial={{ opacity: 0, y: 80, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.6, type: 'spring', stiffness: 210, damping: 22 }} onPointerMove={(event) => { if (motionEnabled && event.pointerType === 'mouse') mouseX.set(event.clientX) }} onPointerLeave={() => mouseX.set(Infinity)}>
        <button type="button" className="dock-system dock-library" onClick={onLibrary} aria-label="浏览全部应用"><LayoutGrid aria-hidden="true" /><span className="dock-tooltip" aria-hidden="true">应用主场</span></button>
        <span className="dock-divider" aria-hidden="true" />
        <div className="dock-apps">{dockApps.map((app) => <DockApp key={app.id} app={app} mouseX={mouseX} onOpen={onOpen} motionEnabled={motionEnabled} />)}</div>
        <span className="dock-divider" aria-hidden="true" />
        <button type="button" className="dock-system" onClick={onSettings} aria-label="打开控制中心"><Settings2 aria-hidden="true" /><span className="dock-tooltip" aria-hidden="true">控制中心</span></button>
      </motion.nav>
      <span className="home-indicator" aria-hidden="true" />
    </div>
  )
}
