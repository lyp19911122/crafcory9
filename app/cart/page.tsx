'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-6">🛒</span>
        <h1 className="text-3xl font-display font-semibold mb-3">购物车是空的</h1>
        <p className="text-macaron-brown/50 mb-8">快去看看有什么喜欢的吧！</p>
        <Link href="/products" className="btn-primary inline-block">
          去逛逛 →
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-semibold">🛒 购物车</h1>
        <button
          onClick={clearCart}
          className="text-sm text-macaron-brown/40 hover:text-red-400 transition-colors"
        >
          清空购物车
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-8">
        {items.map((item) => (
          <div
            key={item.product.id}
            className="bg-white rounded-2xl p-4 flex gap-4 shadow-sm"
          >
            {/* Product image */}
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-macaron-cream flex-shrink-0">
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <Link
                href={`/products/${item.product.id}`}
                className="font-display font-semibold text-macaron-brown hover:text-macaron-pink transition-colors"
              >
                {item.product.name}
              </Link>
              <p className="text-sm text-macaron-brown/40 mt-1">{item.product.material}</p>
              <p className="text-macaron-pink font-semibold mt-1">
                ¥{item.product.price.toFixed(2)} USD
              </p>
            </div>

            {/* Quantity controls */}
            <div className="flex flex-col items-end justify-between">
              <button
                onClick={() => removeItem(item.product.id)}
                className="text-macaron-brown/30 hover:text-red-400 transition-colors"
                aria-label="Remove item"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <div className="flex items-center gap-3 bg-macaron-cream rounded-full px-3 py-1">
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                  className="text-macaron-brown/50 hover:text-macaron-brown w-6 h-6 flex items-center justify-center"
                >
                  −
                </button>
                <span className="font-medium text-sm w-6 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  className="text-macaron-brown/50 hover:text-macaron-brown w-6 h-6 flex items-center justify-center"
                >
                  +
                </button>
              </div>
              <p className="text-sm font-semibold text-macaron-brown mt-1">
                ¥{(item.product.price * item.quantity).toFixed(2)} USD
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-2">
          <span className="text-macaron-brown/60">小计</span>
          <span className="font-semibold">¥{totalPrice.toFixed(2)} USD</span>
        </div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-macaron-brown/60">运费</span>
          <span className="font-semibold text-green-600">免运费</span>
        </div>
        <div className="border-t border-macaron-pink/10 my-3 pt-3 flex justify-between items-center">
          <span className="text-lg font-display font-semibold">合计</span>
          <span className="text-xl font-display font-bold text-macaron-pink">
            ¥{totalPrice.toFixed(2)} USD
          </span>
        </div>
        <Link
          href="/checkout"
          className="btn-primary w-full text-center text-lg block mt-4"
        >
          去结算 → 
        </Link>
      </div>
    </div>
  )
}
