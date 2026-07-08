import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'

export const metadata: Metadata = {
  title: 'Crafcory9 · 手工毛线制品',
  description: '每一针都是时间的痕迹。Crafcory9 手工编织围巾、帽子、玩偶和毛衣——用心编织，温暖你的每一天。',
  keywords: ['手工编织', '毛线', '钩针', '围巾', '毛衣', '玩偶', '跨境电商', 'handmade', 'knitting'],
  openGraph: {
    title: 'Crafcory9 · 手工毛线制品',
    description: '每一针都是时间的痕迹。用心编织，温暖你的每一天。',
    siteName: 'Crafcory9',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
