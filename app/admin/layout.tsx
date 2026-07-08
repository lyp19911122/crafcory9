'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const navItems = [
  { href: '/admin', label: '📊 仪表盘', icon: '📊' },
  { href: '/admin/products', label: '📦 商品管理', icon: '📦' },
  { href: '/admin/orders', label: '📋 订单管理', icon: '📋' },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') {
      setAuthenticated(true)
      return
    }

    fetch('/api/auth/check')
      .then((res) => res.json())
      .then((data) => {
        if (!data.authenticated) {
          router.push('/admin/login')
        } else {
          setAuthenticated(true)
        }
      })
      .catch(() => {
        router.push('/admin/login')
      })
  }, [pathname, router])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (authenticated === null) {
    return (
      <div className="min-h-screen bg-macaron-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-4xl mb-4">🧶</div>
          <p className="text-macaron-brown/50">验证中...</p>
        </div>
      </div>
    )
  }

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin/login')
  }

  return (
    <div className="min-h-screen bg-macaron-cream flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-macaron-pink/10 flex flex-col">
        <div className="p-6 border-b border-macaron-pink/10">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-2xl">🧶</span>
            <span className="font-display text-lg font-semibold">
              Crafcory<span className="text-macaron-pink">9</span>
              <span className="text-xs text-macaron-brown/40 block">管理后台</span>
            </span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-macaron-pink/10 text-macaron-pink'
                    : 'text-macaron-brown/60 hover:bg-macaron-pink/5 hover:text-macaron-brown'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-macaron-pink/10">
          <Link
            href="/"
            className="flex items-center gap-2 px-4 py-2 text-sm text-macaron-brown/40 hover:text-macaron-brown transition-colors"
          >
            ← 返回前台
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-50 rounded-xl transition-colors"
          >
            退出登录
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-6xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
