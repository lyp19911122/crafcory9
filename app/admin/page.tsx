'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Stats {
  totalProducts: number
  totalOrders: number
  pendingOrders: number
  revenue: number
  lowStock: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadData() {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch('/api/products'),
          fetch('/api/orders'),
        ])
        const products = await prodRes.json()
        const orders = orderRes.ok ? await orderRes.json() : []

        const pendingOrders = orders.filter((o: any) => o.status === 'pending').length
        const revenue = orders
          .filter((o: any) => o.status !== 'pending')
          .reduce((sum: number, o: any) => sum + (o.total || 0), 0)

        setStats({
          totalProducts: products.length,
          totalOrders: orders.length,
          pendingOrders,
          revenue,
          lowStock: products.filter((p: any) => !p.inStock).length,
        })
      } catch (err) {
        console.error('Failed to load stats', err)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin text-4xl mb-4">🧶</div>
        <p className="text-macaron-brown/50">加载中...</p>
      </div>
    )
  }

  const cards = [
    { label: '商品总数', value: stats?.totalProducts ?? 0, icon: '📦', color: 'bg-macaron-pink/10 text-macaron-pink' },
    { label: '总订单', value: stats?.totalOrders ?? 0, icon: '📋', color: 'bg-macaron-blue/10 text-macaron-blue' },
    { label: '待处理订单', value: stats?.pendingOrders ?? 0, icon: '⏳', color: 'bg-macaron-yellow/10 text-yellow-600' },
    { label: '总收入', value: `$${stats?.revenue.toFixed(2) ?? '0.00'}`, icon: '💰', color: 'bg-macaron-mint/10 text-green-600' },
    { label: '缺货商品', value: stats?.lowStock ?? 0, icon: '⚠️', color: 'bg-macaron-peach/10 text-orange-600' },
  ]

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-2">📊 仪表盘</h1>
      <p className="text-macaron-brown/50 mb-8">欢迎回到管理后台</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl">{card.icon}</span>
              <span className={`text-xs px-3 py-1 rounded-full ${card.color}`}>
                {card.label}
              </span>
            </div>
            <p className="text-3xl font-bold text-macaron-brown">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/admin/products" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <span className="text-3xl block mb-3">📦</span>
          <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-macaron-pink transition-colors">
            管理商品
          </h3>
          <p className="text-sm text-macaron-brown/50">添加、编辑或下架商品</p>
        </Link>
        <Link href="/admin/orders" className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow group">
          <span className="text-3xl block mb-3">📋</span>
          <h3 className="font-display font-semibold text-lg mb-1 group-hover:text-macaron-pink transition-colors">
            订单管理
          </h3>
          <p className="text-sm text-macaron-brown/50">查看和处理客户订单</p>
        </Link>
      </div>
    </div>
  )
}
