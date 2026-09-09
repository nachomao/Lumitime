'use client'

import { useDeferredValue, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Compass } from 'lucide-react'
import { Header, type Section } from '@/components/discovery/header'
import { Hero } from '@/components/discovery/hero'
import { Collections } from '@/components/discovery/collections'
import { AppLibrary } from '@/components/discovery/app-library'
import { InfoDialog, SettingsDialog, SoftwareDialog } from '@/components/discovery/dialogs'
import { Button } from '@/components/ui/button'
import { type Category, type Software } from '@/lib/software'
import { cn } from '@/lib/utils'

export function Discovery() {
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [category, setCategory] = useState<Category>('all')
  const [section, setSection] = useState<Section>('discover')
  const [dark, setDark] = useState(true)
  const [animations, setAnimations] = useState(true)
  const [scenery, setScenery] = useState(true)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [info, setInfo] = useState<'about' | 'help' | null>(null)
  const [selectedApp, setSelectedApp] = useState<Software | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const systemReduceMotion = useReducedMotion()
  const motionEnabled = animations && !systemReduceMotion

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    return () => document.documentElement.classList.remove('dark')
  }, [dark])

  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'full' : 'reduced'
  }, [motionEnabled])

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (event.isComposing || event.keyCode === 229 || settingsOpen || selectedApp || info) return
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'instant' })
        inputRef.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [motionEnabled, settingsOpen, selectedApp, info])

  function navigate(nextSection: Section) {
    setSection(nextSection)
    if (nextSection === 'discover') {
      setQuery('')
      setCategory('all')
      window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'instant' })
    } else {
      document.getElementById(nextSection)?.scrollIntoView({ behavior: motionEnabled ? 'smooth' : 'instant', block: 'start' })
    }
  }

  function selectCollection(nextCategory: Category) {
    setQuery('')
    setCategory(nextCategory)
    navigate('library')
  }

  function quickSearch(term: string) {
    setQuery(term)
    setCategory('all')
    navigate('library')
  }

  return (
    <MotionConfig reducedMotion={motionEnabled ? 'never' : 'always'} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
      <div id="discover" className={cn('discovery-page', !scenery && 'without-scenery')}>
        <a className="skip-link" href="#library">跳转到软件库</a>
        <div className="wallpaper" aria-hidden="true">
          <Image className="wallpaper-image" src="/images/lumitime-glass-wallpaper.png" alt="" fill priority sizes="100vw" />
          <div className="wallpaper-wash" />
        </div>
        <div className={cn('dialog-backdrop-effect', (selectedApp || settingsOpen || info) && 'is-visible')} aria-hidden="true" />
        <div className={cn('page-container', selectedApp && 'app-is-open')}>
          <Header section={section} onNavigate={navigate} dark={dark} onToggleTheme={() => setDark((value) => !value)} onSettings={() => setSettingsOpen(true)} query={query} onQueryChange={setQuery} onSearch={() => navigate('library')} inputRef={inputRef} />
          <main>
            <Hero />
            <Collections onSelect={selectCollection} motionEnabled={motionEnabled} />
            <AppLibrary category={category} query={deferredQuery} onCategoryChange={setCategory} onClear={() => { setQuery(''); setCategory('all') }} onOpen={setSelectedApp} motionEnabled={motionEnabled} />
          </main>
          <motion.footer className="page-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <div className="footer-brand"><Compass className="size-4" aria-hidden="true" /><span>拾光</span><span className="footer-divider">·</span><span>用好工具，留住好时光。</span></div>
            <div className="footer-links"><Button variant="ghost" onClick={() => setInfo('about')}>关于拾光</Button><Button variant="ghost" onClick={() => setInfo('help')}>使用说明</Button></div>
          </motion.footer>
        </div>
        <SoftwareDialog app={selectedApp} onClose={() => setSelectedApp(null)} />
        <SettingsDialog open={settingsOpen} onOpenChange={setSettingsOpen} dark={dark} onDarkChange={setDark} animations={animations} onAnimationsChange={setAnimations} scenery={scenery} onSceneryChange={setScenery} />
        <InfoDialog kind={info} onClose={() => setInfo(null)} />
      </div>
    </MotionConfig>
  )
}
