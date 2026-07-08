import Link from 'next/link'

export default function PetDraftHome() {
  return (
    <div className="min-h-screen bg-[#FDF6F0]">
      <header className="bg-white border-b border-[#E8D5C4]/20">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center">
          <Link href="/" className="text-sm text-[#8B8B8B] hover:text-[#5C4033] mr-6">← Crafcory9</Link>
          <span className="font-serif text-lg font-semibold text-[#5C4033]">Pet<span className="text-[#D4A5A5]">Draft</span></span>
        </div>
      </header>

      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <span className="text-6xl block mb-6">🐕</span>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#5C4033] mb-4">宠物服装智能制版</h1>
        <p className="text-lg text-[#8B8B8B] max-w-lg mx-auto mb-10">
          输入尺寸，即时生成专业纸样。<br />
          Enter measurements, generate professional pet patterns instantly.
        </p>
        <Link href="/petdraft/petwear/vest" className="inline-block bg-[#5C4033] text-white px-8 py-3 rounded-xl font-medium hover:bg-[#5C4033]/90 transition-all">
          开始制版 → 宠物背心
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: '1', title: '📏 测量', desc: '用软尺测量宠物尺寸', sub: 'Neck, Chest, Back...' },
            { step: '2', title: '✂️ 生成', desc: '算法自动计算并绘制纸样', sub: 'Auto-generated pattern' },
            { step: '3', title: '🧵 缝制', desc: '打印纸样，裁剪缝制', sub: 'Print, cut, and sew!' },
          ].map((s) => (
            <div key={s.step} className="bg-white rounded-2xl p-6 text-center border border-[#E8D5C4]/30">
              <div className="text-3xl mb-2">{s.title}</div>
              <p className="text-sm text-[#5C4033]">{s.desc}</p>
              <p className="text-xs text-[#8B8B8B]/60 mt-1">{s.sub}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
