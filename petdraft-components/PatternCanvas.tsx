'use client'

import { useEffect, useRef } from 'react'
import { PatternPiece } from '@/lib/pet-types'

interface PatternCanvasProps {
  pieces: PatternPiece[]
  seamAllowance: number
}

export default function PatternCanvas({ pieces, seamAllowance }: PatternCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || pieces.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size based on container
    const container = containerRef.current
    if (container) {
      canvas.width = container.clientWidth
      canvas.height = Math.max(container.clientHeight, 500)
    }

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Background
    ctx.fillStyle = '#FDF6F0'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#E8D5C4'
    ctx.lineWidth = 0.5
    for (let x = 0; x < canvas.width; x += 40) {
      ctx.beginPath()
      ctx.moveTo(x, 0)
      ctx.lineTo(x, canvas.height)
      ctx.stroke()
    }
    for (let y = 0; y < canvas.height; y += 40) {
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(canvas.width, y)
      ctx.stroke()
    }

    // Draw each piece
    const pieceColors = ['#8FB8DE', '#D4A5A5', '#B5D4A8']
    const pieceColorsFill = ['rgba(143, 184, 222, 0.15)', 'rgba(212, 165, 165, 0.15)', 'rgba(181, 212, 168, 0.15)']

    pieces.forEach((piece, idx) => {
      const pts = piece.points
      if (pts.length < 2) return

      const color = pieceColors[idx % pieceColors.length]
      const fillColor = pieceColorsFill[idx % pieceColorsFill.length]

      // Draw filled shape
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) {
        ctx.lineTo(pts[i].x, pts[i].y)
      }
      ctx.closePath()
      ctx.fillStyle = fillColor
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw seam allowance (dashed line inside)
      ctx.setLineDash([4, 4])
      ctx.strokeStyle = color + '80'
      ctx.lineWidth = 1
      // Approximate inner path
      const innerPts = pts.map((p) => ({
        x: p.x + (0 < p.x ? -seamAllowance * 3 : seamAllowance * 3),
        y: p.y + seamAllowance * 3,
      }))
      ctx.beginPath()
      ctx.moveTo(innerPts[0].x, innerPts[0].y)
      for (let i = 1; i < innerPts.length; i++) {
        ctx.lineTo(innerPts[i].x, innerPts[i].y)
      }
      ctx.closePath()
      ctx.stroke()
      ctx.setLineDash([])

      // Label
      const centerX = pts.reduce((s, p) => s + p.x, 0) / pts.length
      const centerY = pts.reduce((s, p) => s + p.y, 0) / pts.length

      ctx.fillStyle = '#5C4033'
      ctx.font = 'bold 13px Inter, system-ui, sans-serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(piece.nameCn, centerX, centerY - 8)
      ctx.font = '11px Inter, system-ui, sans-serif'
      ctx.fillStyle = '#8B8B8B'
      ctx.fillText(piece.label, centerX, centerY + 12)

      // Grainline arrow
      const arrowX = pts.reduce((s, p) => s + p.x, 0) / pts.length - 30
      const topY = Math.min(...pts.map((p) => p.y)) + 20
      const bottomY = Math.max(...pts.map((p) => p.y)) - 20

      ctx.strokeStyle = '#5C4033'
      ctx.lineWidth = 1.5
      ctx.beginPath()
      ctx.moveTo(arrowX, topY)
      ctx.lineTo(arrowX, bottomY)
      ctx.stroke()

      // Arrowhead top
      ctx.beginPath()
      ctx.moveTo(arrowX, topY)
      ctx.lineTo(arrowX - 5, topY + 8)
      ctx.lineTo(arrowX + 5, topY + 8)
      ctx.closePath()
      ctx.fillStyle = '#5C4033'
      ctx.fill()

      // Arrowhead bottom
      ctx.beginPath()
      ctx.moveTo(arrowX, bottomY)
      ctx.lineTo(arrowX - 5, bottomY - 8)
      ctx.lineTo(arrowX + 5, bottomY - 8)
      ctx.closePath()
      ctx.fill()
    })

    // Title
    ctx.fillStyle = '#5C4033'
    ctx.font = 'bold 14px Playfair Display, Georgia, serif'
    ctx.textAlign = 'left'
    ctx.textBaseline = 'top'
    ctx.fillText('Pet Vest Pattern / 宠物背心纸样', 16, 12)
    ctx.font = '11px Inter, system-ui, sans-serif'
    ctx.fillStyle = '#8B8B8B'
    ctx.fillText(`Seam allowance: ${seamAllowance}cm | 缝份: ${seamAllowance}cm`, 16, 32)

  }, [pieces, seamAllowance])

  return (
    <div ref={containerRef} className="w-full rounded-2xl overflow-hidden border border-draft-sand shadow-sm" style={{ height: '520px' }}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
