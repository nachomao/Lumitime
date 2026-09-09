'use client'

import { type RefObject } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { Command, Compass, LayoutGrid, Layers3, Moon, Search, SlidersHorizontal, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { cn } from '@/lib/utils'

export type Section = 'discover' | 'library' | 'collections'

const navigation = [
  { id: 'discover' as const, label: '发现', icon: Compass },
  { id: 'library' as const, label: '软件库', icon: LayoutGrid },
  { id: 'collections' as const, label: '精选集', icon: Layers3 },
]

export function Header({ section, onNavigate, dark, onToggleTheme, onSettings, query, onQueryChange, onSearch, inputRef }: {
  section: Section
  onNavigate: (section: Section) => void
  dark: boolean
  onToggleTheme: () => void
  onSettings: () => void
  query: string
  onQueryChange: (query: string) => void
  onSearch: () => void
  inputRef: RefObject<HTMLInputElement | null>
}) {
  return (
    <motion.header className="site-header" initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}>
      <a href="#discover" className="brand" onClick={(event) => { event.preventDefault(); onNavigate('discover') }} aria-label="拾光 Lumitime 与 NachoNeko 首页">
        <span className="brand-mark" aria-hidden="true">
          <span className="brand-mark-piece" />
          <span className="brand-mark-piece" />
          <span className="brand-mark-piece" />
        </span>
        <span className="brand-lockup" aria-hidden="true">
          <span className="brand-name">拾光</span>
          <span className="brand-latin">Lumitime</span>
        </span>
        <span className="brand-divider" aria-hidden="true" />
        <span className="brand-signature" aria-hidden="true">
          <span className="brand-signature-line brand-signature-nacho">
            <span>N</span><span>A</span><span>C</span><span>H</span><span>O</span>
          </span>
          <span className="brand-signature-line brand-signature-neko">
            <span>N</span><span>E</span><span>K</span><span>O</span>
          </span>
        </span>
      </a>
      <div className="header-search">
        <InputGroup className="glass compact-search-field">
          <InputGroupInput
            id="software-search"
            ref={inputRef}
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.nativeEvent.isComposing || event.keyCode === 229) return
              if (event.key === 'Enter') { event.preventDefault(); onSearch() }
              if (event.key === 'Escape') { onQueryChange(''); inputRef.current?.blur() }
            }}
            placeholder="搜索应用"
            aria-label="搜索软件、工具"
            autoComplete="off"
            maxLength={100}
          />
          <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
          {!query && <span className="compact-search-placeholder" aria-hidden="true">搜索应用</span>}
          {query && (
            <InputGroupAddon align="inline-end">
              <InputGroupButton size="icon-sm" aria-label="清空搜索" onClick={() => { onQueryChange(''); inputRef.current?.focus() }}><X /></InputGroupButton>
            </InputGroupAddon>
          )}
        </InputGroup>
      </div>
    </motion.header>
  )
}
