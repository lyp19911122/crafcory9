'use client'

import { useParams } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'
import { getProductById } from '@/lib/products'
import { useCart } from '@/context/CartContext'

export default function ProductDetailPage() {
  const params = useParams()
  const product = getProductById(params.id as string)
  const { addItem } = useCart()
  const [selectedImage, setSelectedImage] = useState(0)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <span className="text-5xl block mb-4">😅</span>
        <h1 className="text-2xl font-display font-semibold mb-2">商品没找到</h1>
        <p className="text-macaron-brown/50 mb-6">可能已经被卖掉了，或者链接不对</p>
        <Link href="/products" className="btn-primary inline-block">
          回去逛逛
        </Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-macaron-brown/40 mb-8">
        <Link href="/" className="hover:text-macaron-pink transition-colors">首页</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-macaron-pink transition-colors">商品</Link>
        <span className="mx-2">/</span>
        <span className="text-macaron-brown/70">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        {/* Images */}
        <div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-macaron-cream mb-4">
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === idx
                      ? 'border-macaron-pink shadow-md shadow-macaron-pink/20'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm text-macaron-pink font-medium mb-2">
            {product.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-macaron-brown mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-semibold text-macaron-pink mb-6">
            ¥{product.price.toFixed(2)} USD
          </p>

          <div className="space-y-3 text-sm text-macaron-brown/70 mb-8">
            <div className="flex items-center gap-2">
              <span className="font-medium text-macaron-brown">材质：</span>
              {product.material}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-macaron-brown">尺寸：</span>
              {product.dimensions}
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-macaron-brown">库存：</span>
              {product.inStock ? (
                <span className="text-green-600 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full inline-block" />
                  有货
                </span>
              ) : (
                <span className="text-red-400">暂时缺货</span>
              )}
            </div>
          </div>

          <p className="text-macaron-brown/60 leading-relaxed mb-8 border-t border-macaron-pink/10 pt-6">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            {product.inStock ? (
              <button
                onClick={handleAddToCart}
                className={`btn-primary text-lg flex-1 transition-all ${
                  added ? 'bg-green-500 hover:bg-green-500 shadow-lg shadow-green-500/30' : ''
                }`}
              >
                {added ? '✅ 已加入购物车！' : '🛒 加入购物车'}
              </button>
            ) : (
              <button disabled className="btn-primary text-lg flex-1 opacity-50 cursor-not-allowed">
                暂时缺货
              </button>
            )}
            <Link href="/cart" className="btn-secondary text-lg text-center">
              查看购物车
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-8 pt-6 border-t border-macaron-pink/10">
            <div className="flex flex-wrap gap-6 text-sm text-macaron-brown/50">
              <span className="flex items-center gap-1">🔒 安全支付</span>
              <span className="flex items-center gap-1">🚚 全球邮寄</span>
              <span className="flex items-center gap-1">💯 手工品质</span>
              <span className="flex items-center gap-1">🔄 7天退换</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
