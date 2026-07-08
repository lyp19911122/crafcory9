'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'
import { PetMeasurements, PatternPiece } from '@/lib/pet-types'
import { generateVestPattern, getDisplayPoints } from '@/lib/vest-math'
import MeasurementForm from '@/petdraft-components/MeasurementForm'
import PatternCanvas from '@/petdraft-components/PatternCanvas'
import PatternHeader from '@/app/petdraft/petwear/vest/header'

const defaultMeasurements: PetMeasurements = {
  neckGirth: 28,
  chestGirth: 40,
  backLength: 35,
  bellyLength: 20,
  legGirth: 14,
  gender: 'male',
}

export default function VestPatternPage() {
  const [measurements, setMeasurements] = useState<PetMeasurements>(defaultMeasurements)
  const [pattern, setPattern] = useState<ReturnType<typeof generateVestPattern> | null>(null)
  const [displayPieces, setDisplayPieces] = useState<PatternPiece[]>([])
  const [generated, setGenerated] = useState(false)
  const [printing, setPrinting] = useState(false)

  const handleGenerate = useCallback(() => {
    const result = generateVestPattern(measurements)
    setPattern(result)

    // Scale for display (600x500 canvas area)
    const scaled = getDisplayPoints(result.pieces, 800, 480)
    setDisplayPieces(scaled)
    setGenerated(true)
  }, [measurements])

  const handlePrint = useCallback(() => {
    if (!pattern) return
    setPrinting(true)
    // Open a new window with the pattern for printing
    const printWindow = window.open('', '_blank')
    if (!printWindow) {
      alert('请允许弹出窗口以打印纸样')
      setPrinting(false)
      return
    }

    // Generate SVG for high-quality print
    const svgWidth = 800
    const svgHeight = 600
    const scaleToPrint = 2.5 // Scale factor for printing

    let svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
      <rect width="${svgWidth}" height="${svgHeight}" fill="#FDF6F0"/>
      <g transform="scale(${scaleToPrint})">`

    const printPieces = getDisplayPoints(pattern.pieces, 300, 200)

    printPieces.forEach((piece, idx) => {
      const pts = piece.points
      if (pts.length < 2) return
      const colors = ['#8FB8DE', '#D4A5A5', '#B5D4A8']

      svgContent += `<path d="M${pts[0].x},${pts[0].y}`
      for (let i = 1; i < pts.length; i++) {
        svgContent += ` L${pts[i].x},${pts[i].y}`
      }
      svgContent += ` Z" fill="${colors[idx]}20" stroke="${colors[idx]}" stroke-width="1.5"/>`

      // Labels
      const cx = pts.reduce((s: number, p: {x: number; y: number}) => s + p.x, 0) / pts.length
      const cy = pts.reduce((s: number, p: {x: number; y: number}) => s + p.y, 0) / pts.length
      svgContent += `<text x="${cx}" y="${cy - 5}" text-anchor="middle" font-size="4" font-family="sans-serif" fill="#5C4033" font-weight="bold">${piece.nameCn}</text>`
      svgContent += `<text x="${cx}" y="${cy + 4}" text-anchor="middle" font-size="3.5" font-family="sans-serif" fill="#8B8B8B">${piece.label}</text>`
    })

    svgContent += `</g></svg>`

    const printDoc = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Pet Vest Pattern - PetDraft</title>
        <style>
          @page { margin: 1cm; size: A4; }
          body { margin: 0; padding: 20px; font-family: sans-serif; }
          .header { text-align: center; margin-bottom: 20px; }
          .header h1 { font-size: 18px; color: #5C4033; margin: 0 0 4px; }
          .header p { font-size: 12px; color: #8B8B8B; margin: 0; }
          .info { font-size: 11px; color: #8B8B8B; margin: 10px 0; }
          svg { max-width: 100%; height: auto; }
          @media print {
            .no-print { display: none; }
            svg { width: 100%; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>Pet Vest Pattern / 宠物背心纸样</h1>
          <p>Neck: ${measurements.neckGirth}cm | Chest: ${measurements.chestGirth}cm | Back: ${measurements.backLength}cm | Belly: ${measurements.bellyLength}cm | Leg: ${measurements.legGirth}cm</p>
        </div>
        ${svgContent}
        <div class="info">
          <p>缝份: ${pattern.seamAllowance}cm | 估算用布: ${pattern.fabricWidth}cm × ${pattern.fabricLength}cm</p>
          <p>注意: 打印时请关闭「适应页面」选项，选择「实际大小」以保持比例准确。</p>
        </div>
        <div class="no-print" style="text-align:center; margin-top:20px;">
          <button onclick="window.print()" style="padding:10px 30px;background:#5C4033;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer;">🖨️ 打印纸样 / Print Pattern</button>
        </div>
        <script>setTimeout(() => window.print(), 1000)</script>
      </body>
      </html>
    `

    printWindow.document.write(printDoc)
    printWindow.document.close()
    setPrinting(false)
  }, [pattern, measurements])

  return (
    <div className="min-h-screen">
      <PatternHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-draft-gray/50 mb-6">
          <Link href="/" className="hover:text-draft-pink transition-colors">PetDraft</Link>
          <span className="mx-2">/</span>
          <Link href="/petwear" className="hover:text-draft-pink transition-colors">Petwear</Link>
          <span className="mx-2">/</span>
          <span className="text-draft-brown">Vest 背心</span>
        </nav>

        <div className="text-center mb-8">
          <span className="text-5xl block mb-4">🦺</span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-draft-brown">
            宠物背心 / Pet Vest
          </h1>
          <p className="text-draft-gray mt-2 max-w-xl mx-auto">
            经典款宠物背心纸样。输入尺寸，即时生成。
            <br className="hidden md:block" />
            <span className="text-sm text-draft-gray/50">Classic pet vest pattern. Enter measurements, get your pattern instantly.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Measurements */}
          <div className="lg:col-span-2">
            <MeasurementForm
              measurements={measurements}
              onChange={setMeasurements}
              onGenerate={handleGenerate}
            />

            {/* Quick size reference */}
            <div className="mt-4 bg-white rounded-2xl p-4 shadow-sm border border-draft-sand/30">
              <h3 className="text-xs font-semibold text-draft-gray uppercase tracking-wide mb-3">
                参考尺寸 / Size Reference
              </h3>
              <div className="space-y-2 text-xs">
                {[
                  { size: 'XS', neck: '15-20', chest: '20-28', back: '15-20', breed: 'Chihuahua / 吉娃娃' },
                  { size: 'S', neck: '20-28', chest: '28-38', back: '20-30', breed: 'Pomeranian / 博美' },
                  { size: 'M', neck: '28-36', chest: '38-50', back: '30-40', breed: 'Corgi / 柯基' },
                  { size: 'L', neck: '36-44', chest: '50-62', back: '40-50', breed: 'Husky / 哈士奇' },
                  { size: 'XL', neck: '44-55', chest: '62-80', back: '50-65', breed: 'Golden Retriever / 金毛' },
                ].map((s) => (
                  <div key={s.size} className="flex justify-between items-center py-1 border-b border-draft-sand/10 last:border-0">
                    <span className="font-semibold text-draft-brown w-6">{s.size}</span>
                    <span className="text-draft-gray/60">N{s.neck} C{s.chest} B{s.back}</span>
                    <span className="text-draft-gray/40 w-20 text-right">{s.breed}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Pattern display */}
          <div className="lg:col-span-3">
            {!generated ? (
              <div className="bg-white/50 rounded-2xl border-2 border-dashed border-draft-sand/50 flex items-center justify-center" style={{ height: '520px' }}>
                <div className="text-center text-draft-gray/40">
                  <span className="text-6xl block mb-4">📐</span>
                  <p className="text-lg font-medium">输入尺寸，点击生成</p>
                  <p className="text-sm mt-1">Enter measurements and generate your pattern</p>
                </div>
              </div>
            ) : (
              <div>
                <PatternCanvas pieces={displayPieces} seamAllowance={pattern?.seamAllowance ?? 1} />

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 mt-4">
                  <button
                    onClick={handlePrint}
                    disabled={printing}
                    className="flex items-center gap-2 bg-draft-brown text-white px-6 py-3 rounded-xl font-medium hover:bg-draft-brown/90 transition-all active:scale-[0.98] disabled:opacity-50"
                  >
                    🖨️ {printing ? '处理中...' : '打印纸样 / Print'}
                  </button>
                  <span className="text-sm text-draft-gray/50 flex items-center">
                    缝份: {pattern?.seamAllowance}cm | 估算用布: {pattern?.fabricWidth} × {pattern?.fabricLength}cm
                  </span>
                </div>

                {/* Instructions */}
                <div className="mt-4 bg-draft-cream rounded-xl p-4 text-sm text-draft-gray/70">
                  <p className="font-medium text-draft-brown mb-2">📝 缝制说明 / Sewing Instructions</p>
                  <ol className="list-decimal list-inside space-y-1 text-xs">
                    <li>打印时请选择「实际大小」，不要缩放。</li>
                    <li>将纸样剪下，按标注的纱向线对齐布料。</li>
                    <li>背部布料对折裁剪（即将推出可选的背部中缝版型）。</li>
                    <li>先缝合左/右胸片到背部，再处理包边和腿洞。</li>
                    <li>可在边缘加贴边或包边条增加美观度。</li>
                  </ol>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-draft-sand/30 mt-16 py-8 text-center text-sm text-draft-gray/50">
        <p>PetDraft — 宠物服装智能制版工具</p>
      </footer>
    </div>
  )
}
