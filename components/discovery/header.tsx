'use client'

import { AnimatePresence, motion } from 'motion/react'
import { Compass, LayoutGrid, Layers3, Moon, SlidersHorizontal, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export type Section = 'discover' | 'library' | 'collections'

const navigation = [
  { id: 'discover' as const, label: '发现', icon: Compass },
  { id: 'library' as const, label: '软件库', icon: LayoutGrid },
  { id: 'collections' as const, label: '精选集', icon: Layers3 },
]

export function Header({ section, onNavigate, dark, onToggleTheme, onSettings }: {
  section: Section
  onNavigate: (section: Section) => void
  dark: boolean
  onToggleTheme: () => void
  onSettings: () => void
}) {
  return (
    <motion.header className="site-header" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
      <a href="#discover" className="brand" onClick={(event) => { event.preventDefault(); onNavigate('discover') }} aria-label="拾光首页">
        <span className="brand-mark"><Compass aria-hidden="true" strokeWidth={1.6} /></span>
        <span className="brand-name">拾光<span className="brand-dot">.</span></span>
        <span className="brand-tagline">好工具，好时光</span>
      </a>
      <nav className="glass main-navigation" aria-label="主导航">
        {navigation.map(({ id, label, icon: Icon }) => (
          <a key={id} href={`#${id}`} className={cn('navigation-link', section === id && 'is-active')} aria-current={section === id ? 'page' : undefined} onClick={(event) => { event.preventDefault(); onNavigate(id) }}>
            {section === id && <motion.span className="navigation-indicator" layoutId="navigation-indicator" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
            <Icon aria-hidden="true" className="navigation-icon" />
            <span>{label}</span>
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <div className="glass appearance-controls">
          <Button variant="ghost" size="icon-lg" className="round-control" aria-label={dark ? '切换浅色模式' : '切换深色模式'} onClick={onToggleTheme}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={dark ? 'moon' : 'sun'} initial={{ rotate: -60, opacity: 0, scale: 0.6 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 60, opacity: 0, scale: 0.6 }} transition={{ duration: 0.18 }}>
                {dark ? <Moon /> : <Sun />}
              </motion.span>
            </AnimatePresence>
          </Button>
          <Separator orientation="vertical" className="appearance-divider" />
          <Button variant="ghost" size="icon-lg" className="round-control" aria-label="个性化设置" onClick={onSettings}><SlidersHorizontal /></Button>
        </div>
      </div>
    </motion.header>
  )
}
