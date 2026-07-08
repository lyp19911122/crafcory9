'use client'

import { useEffect, useState } from 'react'

interface Order {
  id: string
  items: { product: { name: string; price: number }; quantity: number }[]
  total: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  createdAt: string
  customer: {
    name: string
    email: string
    phone?: string
    address: string
    city: string
    state?: string
    zip?: string
    country: string
  }
}

const statusMap: Record<string, { label: string; color: string }> = {
  pending: { label: '待付款', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: '已付款', color: 'bg-blue-100 text-blue-700' },
  shipped: { label: '已发货', color: 'bg-purple-100 text-purple-700' },
  delivered: { label: '已送达', color: 'bg-green-100 text-green-700' },
}

const statusFlow = ['pending', 'paid', 'shipped', 'delivered']

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      const res = await fetch('/api/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(Array.isArray(data) ? data : [])
      }
    } catch {
      // ignore
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(id: string, status: string) {
    const res = await fetch(`/api/orders/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    if (res.ok) {
      setMessage('✅ 订单状态已更新')
      loadOrders()
    } else {
      setMessage('❌ 更新失败')
    }
    setTimeout(() => setMessage(''), 2000)
  }

  if (loading) {
    return <div className="text-center py-20"><div className="animate-spin text-4xl">🧶</div></div>
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold mb-2">📋 订单管理</h1>
      <p className="text-macaron-brown/50 mb-8">共 {orders.length} 个订单</p>

      {message && (
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm text-sm">{message}</div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <span className="text-5xl block mb-4">📭</span>
          <p className="text-macaron-brown/50">还没有订单</p>
          <p className="text-sm text-macaron-brown/30 mt-1">订单会在客户结算后自动生成</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => {
            const statusInfo = statusMap[order.status] || statusMap.pending
            const nextStatusIdx = statusFlow.indexOf(order.status) + 1
            const nextStatus = statusFlow[nextStatusIdx]

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-macaron-cream/50 transition-colors"
                  onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-sm font-semibold text-macaron-brown">{order.id}</span>
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${statusInfo.color}`}>
                      {statusInfo.label}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-macaron-brown/60">
                      {new Date(order.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                    <span className="font-semibold text-macaron-pink">
                      ${order.total.toFixed(2)}
                    </span>
                    <span className="text-macaron-brown/30">{expandedId === order.id ? '▲' : '▼'}</span>
                  </div>
                </div>

                {expandedId === order.id && (
                  <div className="border-t border-macaron-pink/10 p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Customer info */}
                      <div>
                        <h4 className="text-xs font-semibold text-macaron-brown/40 uppercase tracking-wide mb-3">
                          收货信息
                        </h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">姓名：</span>{order.customer.name}</p>
                          <p><span className="font-medium">邮箱：</span>{order.customer.email}</p>
                          {order.customer.phone && (
                            <p><span className="font-medium">电话：</span>{order.customer.phone}</p>
                          )}
                          <p><span className="font-medium">地址：</span>{order.customer.address}</p>
                          <p>{[order.customer.city, order.customer.state, order.customer.zip].filter(Boolean).join(', ')}</p>
                          <p>{order.customer.country}</p>
                        </div>
                      </div>

                      {/* Order items */}
                      <div>
                        <h4 className="text-xs font-semibold text-macaron-brown/40 uppercase tracking-wide mb-3">
                          商品明细
                        </h4>
                        <div className="space-y-2">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-sm">
                              <span>{item.product.name} × {item.quantity}</span>
                              <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t border-macaron-pink/10 pt-2 flex justify-between font-semibold">
                            <span>合计</span>
                            <span className="text-macaron-pink">${order.total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Status actions */}
                    {nextStatus && (
                      <div className="mt-4 pt-4 border-t border-macaron-pink/10">
                        <button
                          onClick={() => updateStatus(order.id, nextStatus)}
                          className="btn-primary text-sm"
                        >
                          标记为「{statusMap[nextStatus].label}」
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
