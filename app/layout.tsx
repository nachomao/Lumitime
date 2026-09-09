import { Analytics } from '@vercel/analytics/next'
import { Caveat, Noto_Sans_SC } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const notoSansSC = Noto_Sans_SC({ subsets: ['latin'], variable: '--font-noto-sans-sc', display: 'swap' })
const caveat = Caveat({ subsets: ['latin'], variable: '--font-caveat', display: 'swap' })

export const metadata: Metadata = {
  title: '拾光 — 好工具，自有引力',
  description: '精心挑选值得使用的软件与工具。探索效率办公、设计创意、AI 助手与开发工具，让好工具为日常带来一点不同。',
  applicationName: '拾光',
  keywords: ['软件导航', '效率工具', 'AI 工具', '设计软件', '拾光'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#eaf2f7' },
    { media: '(prefers-color-scheme: dark)', color: '#071e3b' },
  ],
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className={`${notoSansSC.variable} ${caveat.variable} bg-background dark`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
