import Link from 'next/link'

export default function PatternHeader() {
  return (
    <header className="bg-white border-b border-draft-sand/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl">📐</span>
          <span className="font-serif text-lg font-semibold text-draft-brown">
            Pet<span className="text-draft-pink">Draft</span>
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-draft-gray hover:text-draft-brown transition-colors">
            首页 / Home
          </Link>
          <Link href="/petwear/vest" className="text-draft-pink font-medium">
            背心 / Vest
          </Link>
        </nav>
      </div>
    </header>
  )
}
