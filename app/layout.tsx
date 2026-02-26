import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Sans_SC } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  variable: '--font-noto-sans-sc',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: '未名逻辑 | AI 教培基础设施专家',
  description: '2 秒完成一份作文工业级批改，让名师经验规模化复制。面向教培机构的 AI 批改与学情数据中台。',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/logo.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F9FC',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
