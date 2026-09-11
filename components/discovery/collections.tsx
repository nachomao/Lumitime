'use client'

import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, ChevronRight, Palette, Sparkles, WandSparkles } from 'lucide-react'
import { AppIcon } from '@/components/discovery/app-icon'
import { GlassWidget } from '@/components/discovery/glass-widget'
import { software, type Category } from '@/lib/software'

const PRODUCTIVITY_APP_COUNT = software.filter((app) => app.category === 'productivity').length
const FEATURED_ICON_LIBRARY = Array.from(new Set(software.map((app) => app.icon)))
const INITIAL_FEATURED_ICONS = ['linear', 'notion', 'raycast']
const WIPE_TRANSITION = { duration: 1.15, ease: [0.65, 0, 0.35, 1] as const }
const PARTICLES = [
  { origin: 4, x: -14, y: 8, delay: 0.12 },
  { origin: 8, x: -17, y: -12, delay: 0.02 },
  { origin: 13, x: 9, y: -8, delay: 0.28 },
  { origin: 18, x: -11, y: 9, delay: 0.2 },
  { origin: 23, x: 15, y: 13, delay: 0.36 },
  { origin: 28, x: 8, y: -15, delay: 0.1 },
  { origin: 34, x: -7, y: -10, delay: 0.24 },
  { origin: 39, x: -14, y: 16, delay: 0.32 },
  { origin: 44, x: 10, y: 8, delay: 0.06 },
  { origin: 49, x: 17, y: -9, delay: 0.16 },
  { origin: 55, x: -16, y: -14, delay: 0.3 },
  { origin: 60, x: 12, y: 14, delay: 0.38 },
  { origin: 66, x: 7, y: -7, delay: 0.14 },
  { origin: 71, x: -8, y: -18, delay: 0.26 },
  { origin: 76, x: -15, y: 10, delay: 0.4 },
  { origin: 81, x: 18, y: 7, delay: 0.08 },
  { origin: 86, x: -6, y: 15, delay: 0.22 },
  { origin: 90, x: 11, y: -12, delay: 0.3 },
  { origin: 94, x: 14, y: 10, delay: 0.18 },
  { origin: 98, x: -9, y: 13, delay: 0.42 },
]

function pickRandomIconGroup(previousIcons: string[]) {
  const candidates = FEATURED_ICON_LIBRARY.filter((icon) => !previousIcons.includes(icon))

  for (let index = candidates.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    const icon = candidates[index]
    candidates[index] = candidates[randomIndex]
    candidates[randomIndex] = icon
  }

  return candidates.slice(0, INITIAL_FEATURED_ICONS.length)
}

function RotatingFeaturedApps({ motionEnabled }: { motionEnabled: boolean }) {
  const [icons, setIcons] = useState<{
    current: string[]
    previous: string[] | null
    cycle: number
  }>({ current: INITIAL_FEATURED_ICONS, previous: null, cycle: 0 })

  useEffect(() => {
    FEATURED_ICON_LIBRARY.forEach((icon) => {
      const image = new window.Image()
      image.src = `/icons/${icon}.svg`
    })
  }, [])

  useEffect(() => {
    if (!motionEnabled) return

    const interval = window.setInterval(() => {
      setIcons(({ current, cycle }) => ({
        current: pickRandomIconGroup(current),
        previous: current,
        cycle: cycle + 1,
      }))
    }, 5000)

    return () => window.clearInterval(interval)
  }, [motionEnabled])

  return (
    <div className="featured-app-art" aria-hidden="true">
      {icons.current.map((icon, index) => (
        <motion.div
          key={`featured-slot-${index}`}
          className={`featured-app featured-app-${index}`}
          animate={motionEnabled ? { y: [0, -7, 0] } : { y: 0 }}
          transition={{ duration: 6 + index, repeat: motionEnabled ? Infinity : 0, ease: 'easeInOut', delay: index * 0.8 }}
        >
          <div className="featured-app-stage">
            {icons.previous && (
              <motion.span
                key={`outgoing-${icons.cycle}-${icons.previous[index]}`}
                className="featured-app-layer"
                initial={{ clipPath: 'inset(0% 0 0 0)' }}
                animate={{ clipPath: 'inset(100% 0 0 0)' }}
                transition={WIPE_TRANSITION}
              >
                <AppIcon icon={icons.previous[index]} large />
              </motion.span>
            )}
            <motion.span
              key={`incoming-${icons.cycle}-${icon}`}
              className="featured-app-layer"
              initial={icons.cycle === 0 ? false : { clipPath: 'inset(0 0 100% 0)' }}
              animate={{ clipPath: 'inset(0 0 0% 0)' }}
              transition={WIPE_TRANSITION}
            >
              <AppIcon icon={icon} large />
            </motion.span>
            {icons.previous && motionEnabled && (
              <motion.span
                key={`particles-${icons.cycle}`}
                className="featured-app-particles"
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={WIPE_TRANSITION}
              >
                {PARTICLES.map((particle, particleIndex) => (
                  <motion.span
                    key={particleIndex}
                    className="featured-app-particle"
                    style={{ left: `${particle.origin}%` }}
                    initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                    animate={{ x: particle.x, y: particle.y, opacity: [0, 0.9, 0], scale: [0.4, 1, 0.15] }}
                    transition={{ duration: 0.5, delay: particle.delay, ease: 'easeOut' }}
                  />
                ))}
              </motion.span>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export function Collections({ onSelect, motionEnabled }: { onSelect: (category: Category) => void; motionEnabled: boolean }) {
  return (
    <motion.section id="collections" className="collections-section" aria-labelledby="collections-title" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
      <div className="section-heading">
        <h2 id="collections-title">为你精选</h2>
        <span className="section-note">不止好用，也让日常心动</span>
      </div>
      <div className="collections-grid">
        <GlassWidget className="collection-card collection-daily" label="让日常，轻盈一点。探索效率办公工具" onClick={() => onSelect('productivity')} motionEnabled={motionEnabled}>
          <div className="collection-feature-surface" aria-hidden="true" />
          <div className="collection-copy">
            <span className="collection-eyebrow"><Sparkles className="size-4" aria-hidden="true" />编辑精选</span>
            <h3 className="featured-widget-title">让日常，<br />轻盈一点。</h3>
            <span className="collection-explore">{PRODUCTIVITY_APP_COUNT} 款效率好物<span className="widget-arrow"><ArrowUpRight className="size-4" aria-hidden="true" /></span></span>
          </div>
          <RotatingFeaturedApps motionEnabled={motionEnabled} />
        </GlassWidget>
        <GlassWidget className="collection-card collection-creative" label="灵感工具箱，探索设计创意工具" onClick={() => onSelect('design')} motionEnabled={motionEnabled}>
          <div className="compact-widget-heading"><span className="collection-eyebrow"><Palette className="size-4" aria-hidden="true" />灵感工具箱</span><ArrowUpRight className="size-4" aria-hidden="true" /></div>
          <div className="creative-apps" aria-hidden="true"><AppIcon icon="figma" large /><AppIcon icon="framer" large /><AppIcon icon="canva" large /></div>
          <div className="compact-widget-copy"><h3>让灵感，有处安放。</h3><span>为每一个好点子而准备 <ChevronRight className="size-3.5" aria-hidden="true" /></span></div>
        </GlassWidget>
        <GlassWidget className="collection-card collection-intelligence" label="AI 新可能，探索 AI 工具" onClick={() => onSelect('ai')} motionEnabled={motionEnabled}>
          <div className="compact-widget-heading"><span className="collection-eyebrow"><WandSparkles className="size-4" aria-hidden="true" />AI 新可能</span><ArrowUpRight className="size-4" aria-hidden="true" /></div>
          <div className="intelligence-apps" aria-hidden="true"><AppIcon icon="claude" large /><AppIcon icon="openai" large /><AppIcon icon="perplexity" large /></div>
          <div className="compact-widget-copy"><h3>不止于想象。</h3><span>遇见你的下一位灵感搭子 <ChevronRight className="size-3.5" aria-hidden="true" /></span></div>
        </GlassWidget>
      </div>
    </motion.section>
  )
}
