import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-macaron-brown text-white/80 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧶</span>
              <span className="font-display text-xl font-semibold text-white">
                Crafcory<span className="text-macaron-pink">9</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              每一针都是时间的痕迹。<br />
              手工编织的温度，机器永远无法复制。
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4">快速链接</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-macaron-pink transition-colors">全部商品</Link></li>
              <li><Link href="/about" className="hover:text-macaron-pink transition-colors">关于我们</Link></li>
              <li><Link href="/cart" className="hover:text-macaron-pink transition-colors">购物车</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-white font-semibold mb-4">联系我</h4>
            <ul className="space-y-2 text-sm">
              <li>📧 hello@crafcory9.com</li>
              <li>📱 +86 138-0000-0000</li>
              <li>📍 上海 · 中国</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center text-sm text-white/40">
          <p>© {new Date().getFullYear()} Crafcory9. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
