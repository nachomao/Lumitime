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
          <svg className="brand-signature-svg" viewBox="0 0 72 30" focusable="false">
            <defs>
              <mask id="brand-signature-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="72" height="30">
                <path
                  className="brand-signature-mask-stroke"
                  transform="scale(.7 1)"
                  d="M2 24 C4 18 5 9 7 5 C8 12 10 19 12 23 C13 16 14 8 16 5 C15 11 14 20 17 22 C20 24 24 19 23 16 C22 13 18 14 18 18 C18 21 22 22 25 17 C24 20 25 22 27 22 C30 23 33 20 33 17 C33 14 29 13 27 15 C25 17 26 21 30 22 C34 23 36 19 37 15 C38 11 39 7 40 5 C40 10 39 18 38 22 C40 17 42 14 45 14 C47 14 45 20 46 22 C48 24 50 21 51 18 C52 14 55 13 57 15 C59 18 57 22 54 22 C51 22 50 18 52 16 C55 13 58 17 61 20 C62 14 63 8 65 5 C66 12 68 19 70 23 C71 16 72 8 74 5 C73 11 72 20 75 22 C78 24 82 20 81 17 C80 14 76 15 76 18 C77 21 81 20 83 17 C84 13 85 8 87 5 C87 11 85 19 85 22 C86 18 89 14 91 14 C90 16 87 18 85 18 C88 18 89 22 92 22 C94 22 97 20 97 17 C97 14 94 14 92 17 C91 20 93 23 97 22 C100 21 101 18 101 17"
                />
              </mask>
            </defs>
            <foreignObject x="0" y="0" width="72" height="30" mask="url(#brand-signature-reveal)">
              <span className="brand-signature-text">NachoNeko</span>
            </foreignObject>
          </svg>
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
