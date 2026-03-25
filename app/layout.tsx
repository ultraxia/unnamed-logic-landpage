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
  title: '原点智能｜教培机构的 AI 运营系统',
  description: '覆盖招生、教学、财务全流程的教培 AI 运营系统。商机跟进、财务审批、AI 批改、续费预警一体化，让机构运营从经验驱动变成数据驱动。',
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
      <body className={`${inter.variable} ${notoSansSC.variable} font-sans antialiased overflow-x-hidden`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
