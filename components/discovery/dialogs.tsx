'use client'

import { useEffect, useRef } from 'react'
import { ArrowUpRight, Check, ExternalLink, Keyboard, ShieldCheck, Sparkles } from 'lucide-react'
import { AppIcon } from '@/components/discovery/app-icon'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { categoryLabels, type Software } from '@/lib/software'
import { cn } from '@/lib/utils'

export function SoftwareDialog({ app, onClose }: { app: Software | null; onClose: () => void }) {
  const previousApp = useRef<Software | null>(app)

  useEffect(() => {
    if (app) previousApp.current = app
  }, [app])

  const displayedApp = app ?? previousApp.current

  return (
    <Dialog open={Boolean(app)} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="glass-modal software-dialog">
        {displayedApp && <>
          <DialogHeader>
            <div className="detail-heading"><AppIcon icon={displayedApp.icon} large /><div className="detail-title-group"><DialogTitle>{displayedApp.name}</DialogTitle><DialogDescription>{categoryLabels[displayedApp.category]} · {displayedApp.pricing}</DialogDescription></div></div>
          </DialogHeader>
          <p className="detail-description">{displayedApp.detail}</p>
          <div className="detail-tags">{displayedApp.tags.map((tag) => <Badge key={tag} variant="secondary">{tag}</Badge>)}</div>
          <Separator />
          <div className="detail-platforms"><h3>支持平台</h3><div>{displayedApp.platforms.map((platform) => <span key={platform}><Check className="size-3.5" aria-hidden="true" />{platform}</span>)}</div></div>
          <a href={displayedApp.url} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ size: 'lg' }), 'visit-website')}>前往官方网站<ArrowUpRight data-icon="inline-end" /></a>
          <p className="detail-footnote"><ShieldCheck className="size-3.5" aria-hidden="true" />仅导航至官网，价格与可用性请以官方为准。</p>
        </>}
      </DialogContent>
    </Dialog>
  )
}

export function InfoDialog({ kind, onClose }: { kind: 'about' | 'help' | null; onClose: () => void }) {
  const isAbout = kind === 'about'
  return (
    <Dialog open={Boolean(kind)} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent className="glass-modal info-dialog">
        <span className="info-mark">{isAbout ? <span className="brand-mark info-brand-mark" aria-hidden="true"><span className="brand-mark-piece" /><span className="brand-mark-piece" /><span className="brand-mark-piece" /></span> : <Keyboard className="size-8" aria-hidden="true" />}</span>
        <DialogHeader><DialogTitle>{isAbout ? '拾光，好工具与好时光。' : '发现好工具，其实很简单。'}</DialogTitle><DialogDescription>{isAbout ? '少一点寻找，多一点热爱。' : '几个小提示，让使用更顺手。'}</DialogDescription></DialogHeader>
        {isAbout ? <div className="info-copy"><p>拾光是一份用心整理的软件清单。我们相信，好的工具不需要复杂，却能为日常带来真实的改变。</p><p>视觉设计参考 iOS 26 的 Liquid Glass 语言，以通透的材质、自然的层次与克制的动态，让探索本身也成为一种享受。</p><p>拾光是独立的导航页面，与 Apple 及收录软件的品牌无隶属或背书关系。所有品牌标识归各自所有者所有。</p></div> : <div className="help-items"><p><Keyboard className="size-5" /><span>按 <kbd className="font-sans">⌘ / Ctrl + K</kbd> 快速搜索，按 Esc 清空搜索。</span></p><p><Sparkles className="size-5" /><span>点击分类或精选集，找到适合当下的工具。</span></p><p><ExternalLink className="size-5" /><span>点击应用图标查看详情，通过底部导航切换页面；列表视图也可直达官网。</span></p></div>}
      </DialogContent>
    </Dialog>
  )
}
