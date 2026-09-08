'use client'

import { type RefObject } from 'react'
import { motion } from 'motion/react'
import { ArrowRight, Command, Search, X } from 'lucide-react'
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group'
import { Button } from '@/components/ui/button'

export function Hero({ query, onQueryChange, onQuickSearch, inputRef, onSearch }: {
  query: string
  onQueryChange: (query: string) => void
  onQuickSearch: (query: string) => void
  inputRef: RefObject<HTMLInputElement | null>
  onSearch: () => void
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <motion.div className="hero-copy" initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ delay: 0.1, duration: 0.8 }}>
        <h1 id="hero-title" className="font-sans text-balance">好工具，<span>自有引力。</span></h1>
        <p className="text-pretty">把喜欢的工具，放进你的数字生活。</p>
      </motion.div>
      <motion.div className="search-area" initial={{ opacity: 0, y: 22, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.22 }}>
        <InputGroup className="glass search-field">
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
            placeholder="搜索应用，开启一些新可能"
            aria-label="搜索软件、工具"
            autoComplete="off"
            maxLength={100}
          />
          <InputGroupAddon align="inline-start"><Search /></InputGroupAddon>
          <InputGroupAddon align="inline-end">
            {query ? <>
              <InputGroupButton size="icon-sm" aria-label="清空搜索" onClick={() => { onQueryChange(''); inputRef.current?.focus() }}><X /></InputGroupButton>
              <InputGroupButton size="icon-sm" aria-label="查看搜索结果" onClick={onSearch}><ArrowRight /></InputGroupButton>
            </> : <kbd className="search-shortcut font-sans" aria-label="Command 或 Control 加 K"><Command aria-hidden="true" /> K</kbd>}
          </InputGroupAddon>
        </InputGroup>
        <div className="popular-searches">
          <span>灵感直达</span>
          {['Notion', 'AI 助手', '设计工具'].map((term) => <Button key={term} variant="ghost" className="keyword-button" onClick={() => onQuickSearch(term)}>{term}<ArrowRight data-icon="inline-end" /></Button>)}
        </div>
      </motion.div>
    </section>
  )
}
