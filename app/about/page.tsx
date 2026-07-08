import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <span className="text-6xl block mb-6">🧶</span>
        <h1 className="text-4xl font-display font-bold mb-4">关于 Crafcory9</h1>
        <p className="text-lg text-macaron-brown/60 max-w-2xl mx-auto">
          每一针都是时间的痕迹。用心编织，用爱传递。
        </p>
      </div>

      {/* Story */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm mb-8">
        <h2 className="font-display text-2xl font-semibold mb-6">💝 我们的故事</h2>
        <div className="space-y-4 text-macaron-brown/70 leading-relaxed">
          <p>
            Crafcory9 诞生于上海的一间小工作室。创始人 L 从小跟着外婆学钩针，
            长大后发现这种温暖的手艺正在被快节奏的生活遗忘。
          </p>
          <p>
            2024 年，她决心把这份手工的温度带到更远的地方。
            每一件作品从选线、染色到编织、定型，都需要数小时甚至数天的时间。
            但正是这份慢工出细活的坚持，让每一件 Crafcory9 的作品都有了独一无二的灵魂。
          </p>
          <p>
            我们相信，收到包裹打开的那一刻——无论你在纽约、东京还是巴黎——
            都能隔着千山万水，感受到这份手心的温暖。
          </p>
        </div>
      </section>

      {/* Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[
          {
            emoji: '🧵',
            title: '纯手工制作',
            desc: '每一件作品都是手工完成，从起针到收线，全程手工。',
          },
          {
            emoji: '🌱',
            title: '精选材料',
            desc: '只选用优质天然线材——美利奴羊毛、羊绒、有机棉。',
          },
          {
            emoji: '🌍',
            title: '全球邮寄',
            desc: '无论你在哪里，我们都把这份温暖送到你手上。',
          },
        ].map((value) => (
          <div key={value.title} className="bg-white rounded-2xl p-6 shadow-sm text-center">
            <span className="text-4xl block mb-4">{value.emoji}</span>
            <h3 className="font-display font-semibold text-lg mb-2">{value.title}</h3>
            <p className="text-sm text-macaron-brown/60">{value.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact */}
      <section className="bg-white rounded-3xl p-8 md:p-12 shadow-sm text-center">
        <h2 className="font-display text-2xl font-semibold mb-4">📬 联系我们</h2>
        <p className="text-macaron-brown/60 mb-6">
          有任何问题？想要定制？或者只是想聊聊天——我们都欢迎。
        </p>
        <div className="space-y-2 text-sm text-macaron-brown/70">
          <p>📧 hello@crafcory9.com</p>
          <p>📱 +86 138-0000-0000</p>
          <p>📍 上海 · 中国</p>
        </div>
        <Link href="/products" className="btn-primary inline-block mt-8">
          浏览商品 🧶
        </Link>
      </section>
    </div>
  )
}
