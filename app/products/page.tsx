'use client'

import { useSearchParams } from 'next/navigation'
import { useState, useMemo } from 'react'
import { products, getAllCategories } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category')
  const categories = getAllCategories()

  const [activeCategory, setActiveCategory] = useState<string>(categoryParam || '全部')

  const filtered = useMemo(() => {
    if (activeCategory === '全部') return products
    return products.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="section-title">🧶 全部商品</h1>
      <p className="section-subtitle">每一件都是独一无二的手工温度</p>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {['全部', ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-macaron-pink text-white shadow-md shadow-macaron-pink/20'
                : 'bg-white text-macaron-brown/60 hover:bg-macaron-pink/10 border border-macaron-pink/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <span className="text-5xl block mb-4">🔍</span>
          <p className="text-macaron-brown/50 text-lg">这个分类下暂时没有商品</p>
        </div>
      )}
    </div>
  )
}
