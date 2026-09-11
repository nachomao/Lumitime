'use client'

import { useDeferredValue, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { MotionConfig, motion, useReducedMotion } from 'motion/react'
import { Compass } from 'lucide-react'
import { Header } from '@/components/discovery/header'
import { Collections } from '@/components/discovery/collections'
import { AppLibrary } from '@/components/discovery/app-library'
import { InfoDialog, SoftwareDialog } from '@/components/discovery/dialogs'
import { Button } from '@/components/ui/button'
import { type Category, type Software } from '@/lib/software'
import { cn } from '@/lib/utils'

export function Discovery() {
  // Search, filters, and dialogs each have their own small piece of state.
  const [query, setQuery] = useState('')
  const deferredQuery = useDeferredValue(query)
  const [category, setCategory] = useState<Category>('all')
  const [info, setInfo] = useState<'about' | 'help' | null>(null)
  const [selectedApp, setSelectedApp] = useState<Software | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const systemReduceMotion = useReducedMotion()
  const motionEnabled = !systemReduceMotion
  const dialogOpen = Boolean(selectedApp || info)

  // Keep CSS transitions in step with the user's motion preference.
  useEffect(() => {
    document.documentElement.dataset.motion = motionEnabled ? 'full' : 'reduced'
  }, [motionEnabled])

  useEffect(() => {
    // The shortcut only brings the search field into focus; AppLibrary handles filtering.
    const handleShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        if (event.isComposing || event.keyCode === 229 || selectedApp || info) return
        event.preventDefault()
        window.scrollTo({ top: 0, behavior: motionEnabled ? 'smooth' : 'instant' })
        inputRef.current?.focus({ preventScroll: true })
      }
    }
    document.addEventListener('keydown', handleShortcut)
    return () => document.removeEventListener('keydown', handleShortcut)
  }, [motionEnabled, selectedApp, info])

  function navigate(nextSection: 'discover' | 'library') {
    // Keep section navigation and filter resets in one predictable place.
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

  return (
    <MotionConfig reducedMotion={motionEnabled ? 'never' : 'always'} transition={{ type: 'spring', stiffness: 300, damping: 28 }}>
      <div id="discover" className="discovery-page">
        <a className="skip-link" href="#library">跳转到软件库</a>
        <div className="wallpaper" aria-hidden="true">
          <Image className="wallpaper-image" src="/images/picui-wallpaper.jpg" alt="" fill priority sizes="100vw" />
        </div>
        {/* Soften the page behind dialogs while keeping the surrounding context visible. */}
        <div className={cn('dialog-backdrop-effect', dialogOpen && 'is-visible')} aria-hidden="true" />
        <div className={cn('page-container', dialogOpen && 'dialog-is-open')}>
          <Header onHome={() => navigate('discover')} query={query} onQueryChange={setQuery} onSearch={() => navigate('library')} inputRef={inputRef} />
          <main>
            <Collections onSelect={selectCollection} motionEnabled={motionEnabled} />
            <AppLibrary category={category} query={deferredQuery} onCategoryChange={setCategory} onClear={() => { setQuery(''); setCategory('all') }} onOpen={setSelectedApp} motionEnabled={motionEnabled} />
          </main>
          <motion.footer className="page-footer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            <div className="footer-brand"><Compass className="size-4" aria-hidden="true" /><span>拾光</span><span className="footer-divider">·</span><span>用好工具，留住好时光。</span></div>
            <div className="footer-links"><Button variant="ghost" onClick={() => setInfo('about')}>关于拾光</Button><Button variant="ghost" onClick={() => window.open('https://maojiu.cc', '_blank')}>喵喵的小窝</Button><Button variant="ghost" onClick={() => setInfo('help')}>使用说明</Button></div>
          </motion.footer>
        </div>
        <SoftwareDialog app={selectedApp} onClose={() => setSelectedApp(null)} />
        <InfoDialog kind={info} onClose={() => setInfo(null)} />
      </div>
    </MotionConfig>
  )
}
