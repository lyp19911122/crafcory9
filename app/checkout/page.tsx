'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

// PayPal 沙箱模式客户端 ID - 你需要替换为自己的
const PAYPAL_CLIENT_ID = 'test'

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const [customer, setCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'US',
  })
  const [step, setStep] = useState<'info' | 'pay'>('info')
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  if (items.length === 0 && !paid) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-6">🛒</span>
        <h1 className="text-3xl font-display font-semibold mb-3">购物车是空的</h1>
        <p className="text-macaron-brown/50 mb-8">先把商品加进购物车吧</p>
        <Link href="/products" className="btn-primary inline-block">
          去逛逛 →
        </Link>
      </div>
    )
  }

  if (paid) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-6">🎉</span>
        <h1 className="text-3xl font-display font-semibold mb-3">下单成功！</h1>
        <p className="text-macaron-brown/50 mb-2">感谢你的购买，我们会尽快安排发货。</p>
        <p className="text-macaron-brown/40 text-sm mb-8">
          订单确认邮件将发送到你的邮箱。
        </p>
        <Link href="/" className="btn-primary inline-block">
          返回首页
        </Link>
      </div>
    )
  }

  const handleInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customer.name || !customer.email || !customer.address) {
      setError('请填写必填信息')
      return
    }
    setError('')
    setStep('pay')
  }

  const updateField = (field: string, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-display font-semibold mb-8">📋 结算</h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Customer Info / Payment */}
        <div className="lg:col-span-3">
          {step === 'info' ? (
            <form onSubmit={handleInfoSubmit} className="bg-white rounded-2xl p-6 shadow-sm space-y-4">
              <h2 className="font-display font-semibold text-lg mb-4">收货信息</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm text-macaron-brown/60 mb-1">姓名 *</label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => updateField('name', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                    placeholder="收件人姓名"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-macaron-brown/60 mb-1">邮箱 *</label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-macaron-brown/60 mb-1">电话</label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                    placeholder="+86 138..."
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-macaron-brown/60 mb-1">地址 *</label>
                  <input
                    type="text"
                    value={customer.address}
                    onChange={(e) => updateField('address', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                    placeholder="街道地址"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm text-macaron-brown/60 mb-1">城市</label>
                  <input
                    type="text"
                    value={customer.city}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                    placeholder="City"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-macaron-brown/60 mb-1">州/省</label>
                    <input
                      type="text"
                      value={customer.state}
                      onChange={(e) => updateField('state', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                      placeholder="State"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-macaron-brown/60 mb-1">邮编</label>
                    <input
                      type="text"
                      value={customer.zip}
                      onChange={(e) => updateField('zip', e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
                      placeholder="ZIP"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-macaron-brown/60 mb-1">国家</label>
                  <select
                    value={customer.country}
                    onChange={(e) => updateField('country', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all bg-white"
                  >
                    <option value="US">美国 🇺🇸</option>
                    <option value="CN">中国 🇨🇳</option>
                    <option value="GB">英国 🇬🇧</option>
                    <option value="CA">加拿大 🇨🇦</option>
                    <option value="AU">澳大利亚 🇦🇺</option>
                    <option value="DE">德国 🇩🇪</option>
                    <option value="FR">法国 🇫🇷</option>
                    <option value="JP">日本 🇯🇵</option>
                    <option value="KR">韩国 🇰🇷</option>
                    <option value="SG">新加坡 🇸🇬</option>
                  </select>
                </div>
              </div>

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <button type="submit" className="btn-primary w-full mt-2">
                前往支付 →
              </button>
            </form>
          ) : (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="font-display font-semibold text-lg mb-4">💳 选择支付方式</h2>
              <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD' }}>
                <PayPalButtons
                  style={{ layout: 'vertical', shape: 'pill' }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      intent: 'CAPTURE',
                      purchase_units: [{
                        amount: {
                          currency_code: 'USD',
                          value: totalPrice.toFixed(2),
                        },
                        description: `Crafcory9 订单 - ${items.length} 件商品`,
                      }],
                    })
                  }}
                  onApprove={async (data, actions) => {
                    const details = await actions.order!.capture()
                    clearCart()
                    setPaid(true)
                  }}
                  onError={(err) => {
                    setError('支付失败，请重试')
                  }}
                />
              </PayPalScriptProvider>
              {error && (
                <p className="text-red-400 text-sm mt-4">{error}</p>
              )}
              <button
                onClick={() => setStep('info')}
                className="btn-ghost text-sm mt-4 block"
              >
                ← 返回修改地址
              </button>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="font-display font-semibold text-lg mb-4">📝 订单摘要</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.product.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-macaron-cream flex-shrink-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-macaron-brown truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-macaron-brown/40">x{item.quantity}</p>
                    <p className="text-sm font-semibold text-macaron-pink">
                      ¥{(item.product.price * item.quantity).toFixed(2)} USD
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-macaron-pink/10 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-display font-semibold">总计</span>
                <span className="font-display font-bold text-xl text-macaron-pink">
                  ¥{totalPrice.toFixed(2)} USD
                </span>
              </div>
              <p className="text-xs text-macaron-brown/40 mt-1 text-right">免运费</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
