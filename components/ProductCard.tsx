'use client'

import Link from 'next/link'
import { Product } from '@/lib/types'
import { useCart } from '@/context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <div className="card group">
      {/* Image */}
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-macaron-cream">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="bg-white text-macaron-brown px-4 py-1 rounded-full text-sm font-medium">
                暂时缺货
              </span>
            </div>
          )}
          {product.featured && (
            <span className="absolute top-3 left-3 bg-macaron-pink text-white text-xs px-3 py-1 rounded-full">
              🌟 推荐
            </span>
          )}
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-display text-lg font-semibold text-macaron-brown group-hover:text-macaron-pink transition-colors mb-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-macaron-brown/50 mb-1">{product.material}</p>
        <p className="text-lg font-semibold text-macaron-pink mb-3">
          ¥{product.price.toFixed(2)} USD
        </p>
        <button
          onClick={() => addItem(product)}
          disabled={!product.inStock}
          className="w-full btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {product.inStock ? '加入购物车 🛒' : '暂时缺货'}
        </button>
      </div>
    </div>
  )
}
