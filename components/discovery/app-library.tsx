'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, ArrowUpRight, BriefcaseBusiness, Check, ChevronDown, Code2, LayoutGrid, List, Music2, Palette, SearchX, ShieldCheck, Sparkles, X } from 'lucide-react'
import { AppIcon } from '@/components/discovery/app-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from '@/components/ui/empty'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { categoryLabels, software, type Category, type Software } from '@/lib/software'
import { GlassSurface } from '@/components/ui/glass-surface'
import { cn } from '@/lib/utils'

const categories = [
  { id: 'all', icon: LayoutGrid },
  { id: 'productivity', icon: BriefcaseBusiness },
  { id: 'design', icon: Palette },
  { id: 'ai', icon: Sparkles },
  { id: 'development', icon: Code2 },
  { id: 'entertainment', icon: Music2 },
  { id: 'utilities', icon: ShieldCheck },
] as const

function SoftwareTile({ app, index, onOpen, motionEnabled }: { app: Software; index: number; onOpen: (app: Software) => void; motionEnabled: boolean }) {
  return (
    <motion.article
      className="software-item"
      initial={motionEnabled ? { opacity: 0, y: 20, scale: 0.9 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: Math.min(index * 0.045, 0.35), type: 'spring', stiffness: 300, damping: 23 }}
    >
      <motion.button
        type="button"
        className="software-tile"
        onClick={() => onOpen(app)}
        aria-label={`查看 ${app.name} 详情`}
        whileHover={motionEnabled ? { y: -7, transition: { type: 'spring', stiffness: 400, damping: 20 } } : undefined}
        whileTap={motionEnabled ? { scale: 0.88, y: 2 } : undefined}
      >
        <span className="tile-icon-wrap"><AppIcon icon={app.icon} large />{app.featured && <span className="tile-featured" aria-label="编辑精选" />}</span>
        <span className="tile-copy"><h3>{app.name === 'Visual Studio Code' ? 'VS Code' : app.name}</h3><span className="tile-category">{categoryLabels[app.category]}</span><span className="tile-description">{app.description}</span></span>
      </motion.button>
      <div className="tile-extra"><Badge variant="secondary">{app.pricing}</Badge><a href={app.url} target="_blank" rel="noopener noreferrer" className="app-external-link" aria-label={`访问 ${app.name} 官网（新窗口）`}><ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
    </motion.article>
  )
}

export function AppLibrary({ category, query, onCategoryChange, onClear, onOpen, motionEnabled }: {
  category: Category
  query: string
  onCategoryChange: (category: Category) => void
  onClear: () => void
  onOpen: (app: Software) => void
  motionEnabled: boolean
}) {
  const [view, setView] = useState('grid')
  const [sort, setSort] = useState('featured')
  const [showAll, setShowAll] = useState(false)
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase().replace(/工具$/u, '')
    const results = software.filter((app) => {
      const categoryMatch = category === 'all' || app.category === category
      const searchable = [app.name, app.description, app.detail, categoryLabels[app.category], ...app.tags].join(' ').toLocaleLowerCase()
      return categoryMatch && (!normalized || searchable.includes(normalized))
    })
    return sort === 'name' ? [...results].sort((a, b) => a.name.localeCompare(b.name)) : results
  }, [category, query, sort])
  const visibleApps = showAll || category !== 'all' || query ? filtered : filtered.slice(0, 8)
  const hasFilter = category !== 'all' || Boolean(query)

  return (
    <motion.section id="library" className="library-section" aria-labelledby="library-title" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }}>
      <div className="section-heading library-heading">
        <div className="library-title-group"><h2 id="library-title">你的应用主场</h2><span className="library-count" aria-live="polite">{filtered.length} 款好工具，随心探索</span></div>
        <div className="library-actions">
          <label className="sort-control"><span className="sr-only">软件排序方式</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">精选排序</option><option value="name">名称排序</option></select><ChevronDown className="size-3.5" aria-hidden="true" /></label>
          <ToggleGroup value={[view]} onValueChange={(values) => { if (values[0]) setView(values[0]) }} className="glass view-toggle" aria-label="显示方式">
            <ToggleGroupItem value="grid" aria-label="网格视图"><LayoutGrid /></ToggleGroupItem>
            <ToggleGroupItem value="list" aria-label="列表视图"><List /></ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      <div className="category-scroll">
        <GlassSurface className="category-glass-surface" width="max-content" height={48} borderRadius={24} displace={0.7} distortionScale={-32} redOffset={0} greenOffset={0} blueOffset={0} brightness={58} opacity={0.9} backgroundOpacity={0} saturation={1}>
          <ToggleGroup value={[category]} onValueChange={(values) => { if (values[0]) { onCategoryChange(values[0] as Category); setShowAll(false) } }} className="category-toggle" aria-label="软件分类">
            {categories.map(({ id, icon: Icon }) => (
              <ToggleGroupItem key={id} value={id}>
                {id === category && <motion.span className="category-indicator" layoutId="category-indicator" transition={{ type: 'spring', stiffness: 360, damping: 26 }} />}
                <Icon data-icon="inline-start" /><span>{categoryLabels[id]}</span>
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </GlassSurface>
      </div>
      {hasFilter && <div className="filter-summary"><span>{query ? `“${query}” 的搜索结果` : categoryLabels[category]}</span><Button variant="ghost" onClick={onClear}>清除筛选<X data-icon="inline-end" /></Button></div>}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={`${category}-${query}-${sort}-${view}`} initial={motionEnabled ? { opacity: 0, y: 8, filter: 'blur(4px)' } : false} animate={{ opacity: 1, y: 0, filter: 'blur(0px)', transitionEnd: { filter: 'none' } }} exit={{ opacity: 0, y: -6, filter: motionEnabled ? 'blur(4px)' : 'blur(0px)' }} transition={{ duration: motionEnabled ? 0.16 : 0 }}>
          {visibleApps.length ? (
            <div className={cn('software-grid', view === 'list' && 'software-list')}>
              {visibleApps.map((app, index) => <SoftwareTile key={app.id} app={app} index={index} onOpen={onOpen} motionEnabled={motionEnabled} />)}
            </div>
          ) : (
            <Empty className="glass search-empty"><EmptyHeader><EmptyMedia variant="icon"><SearchX /></EmptyMedia><EmptyTitle>还没有找到这款好工具</EmptyTitle><EmptyDescription>换个关键词，或者看看其他分类，也许会有新的发现。</EmptyDescription></EmptyHeader><EmptyContent><Button variant="outline" onClick={onClear}>重新发现全部应用</Button></EmptyContent></Empty>
          )}
        </motion.div>
      </AnimatePresence>
      <div className="library-bottom">
        {!showAll && !hasFilter && filtered.length > 8 ? <Button variant="ghost" className="load-more-button" onClick={() => setShowAll(true)}>展开全部 {filtered.length} 款应用<ArrowDown data-icon="inline-end" /></Button> : visibleApps.length > 0 ? <span className="all-loaded"><Check className="size-4" aria-hidden="true" />好工具不在多，适合就好</span> : null}
      </div>
    </motion.section>
  )
}
