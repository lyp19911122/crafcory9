import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'
import ProductCard from '@/components/ProductCard'

export default function Home() {
  const featured = getFeaturedProducts()

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-macaron-cream via-macaron-pink/10 to-macaron-lavender/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block text-6xl md:text-8xl mb-6 animate-bounce">🧶</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-macaron-brown mb-6 leading-tight">
              每一针
              <span className="text-macaron-pink">都是时间的痕迹</span>
            </h1>
            <p className="text-lg md:text-xl text-macaron-brown/60 mb-10 leading-relaxed max-w-xl mx-auto">
              手工编织的温度，机器永远无法复制。
              <br className="hidden md:block" />
              从围巾到玩偶，每一件都是独一无二的心意。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-primary text-lg">
                浏览全部商品
              </Link>
              <Link href="/about" className="btn-secondary text-lg">
                了解我们
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-macaron-pink/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-macaron-lavender/20 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/4 w-24 h-24 bg-macaron-yellow/20 rounded-full blur-3xl" />
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="section-title">✨ 精选推荐</h2>
        <p className="section-subtitle">这个月最受欢迎的手工制品</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-secondary">
            查看全部商品 →
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title">🧵 分类浏览</h2>
          <p className="section-subtitle">找到你想要的那一份温暖</p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: '围巾', emoji: '🧣', color: 'bg-macaron-pink/20 hover:bg-macaron-pink/30' },
              { name: '帽子', emoji: '🎀', color: 'bg-macaron-lavender/20 hover:bg-macaron-lavender/30' },
              { name: '玩偶', emoji: '🧸', color: 'bg-macaron-yellow/20 hover:bg-macaron-yellow/30' },
              { name: '毯子', emoji: '🛋️', color: 'bg-macaron-mint/20 hover:bg-macaron-mint/30' },
              { name: '毛衣', emoji: '👕', color: 'bg-macaron-peach/20 hover:bg-macaron-peach/30' },
              { name: '材料包', emoji: '📦', color: 'bg-macaron-blue/20 hover:bg-macaron-blue/30' },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/products?category=${cat.name}`}
                className={`${cat.color} rounded-2xl p-6 text-center transition-all duration-300 hover:scale-105`}
              >
                <span className="text-3xl block mb-2">{cat.emoji}</span>
                <span className="font-display font-semibold text-macaron-brown">{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="text-4xl mb-4 block">💝</span>
        <h2 className="section-title">关于 Crafcory9</h2>
        <p className="text-macaron-brown/60 leading-relaxed text-lg mt-6 max-w-2xl mx-auto">
          每一件作品从选线到成品，都需要数小时甚至数天的时间。
          我们相信手工的温度可以跨越国界——无论你在世界的哪个角落，
          收到包裹打开的那一刻，都能感受到这份用心。
        </p>
        <Link href="/about" className="btn-ghost inline-flex items-center gap-1 mt-6 font-medium">
          了解更多 →
        </Link>
      </section>
    </div>
  )
}
