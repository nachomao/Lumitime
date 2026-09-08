'use client'

import Image from 'next/image'
import { motion } from 'motion/react'
import { ArrowUpRight, ChevronRight, Palette, Sparkles, WandSparkles } from 'lucide-react'
import { AppIcon } from '@/components/discovery/app-icon'
import { GlassWidget } from '@/components/discovery/glass-widget'
import { collections, type Category } from '@/lib/software'

export function Collections({ onSelect, motionEnabled }: { onSelect: (category: Category) => void; motionEnabled: boolean }) {
  return (
    <motion.section id="collections" className="collections-section" aria-labelledby="collections-title" initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
      <div className="section-heading">
        <h2 id="collections-title">为你精选</h2>
        <span className="section-note">不止好用，也让日常心动</span>
      </div>
      <div className="collections-grid">
        <GlassWidget className="collection-card collection-daily" label="让日常，轻盈一点。探索效率办公工具" onClick={() => onSelect('productivity')} motionEnabled={motionEnabled}>
          <Image className="collection-scenery" src="/images/alpine-lake.png" alt="" fill sizes="(max-width: 700px) 90vw, 40vw" />
          <div className="collection-photo-shade" />
          <div className="collection-copy">
            <span className="collection-eyebrow"><Sparkles className="size-4" aria-hidden="true" />编辑精选</span>
            <h3 className="featured-widget-title">让日常，<br />轻盈一点。</h3>
            <span className="collection-explore">{collections[0].count} 款效率好物<span className="widget-arrow"><ArrowUpRight className="size-4" aria-hidden="true" /></span></span>
          </div>
          <div className="featured-app-art" aria-hidden="true">
            {['linear', 'notion', 'raycast'].map((icon, index) => (
              <motion.div key={icon} className={`featured-app featured-app-${index}`} animate={motionEnabled ? { y: [0, -7, 0] } : { y: 0 }} transition={{ duration: 6 + index, repeat: motionEnabled ? Infinity : 0, ease: 'easeInOut', delay: index * 0.8 }}><AppIcon icon={icon} large /></motion.div>
            ))}
          </div>
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
