/**
 * Pet Vest Pattern Drafting Math
 *
 * This implements a simplified but functional pet vest pattern.
 * The pattern consists of 3 pieces:
 *   1. Back piece (背部) - main back panel
 *   2. Left chest piece (左胸) - left chest/belly panel
 *   3. Right chest piece (右胸) - right chest/belly panel
 *
 * Key measurements used:
 *   N = neckGirth  (颈围)
 *   C = chestGirth (胸围)
 *   BL = backLength (背长)
 *   B = bellyLength (腹长)
 *   LG = legGirth  (腿围)
 *
 * Ease allowances (built-in):
 *   Neck: +2cm
 *   Chest: +4cm
 *   Belly: +2cm
 *   Leg: +3cm
 */

import { PetMeasurements, PatternPiece, PatternResult } from './pet-types'

const SEAM_ALLOWANCE = 1 // 1cm seam allowance
const EASE_NECK = 2
const EASE_CHEST = 4
const EASE_BELLY = 2
const EASE_LEG = 3

function toRad(deg: number): number {
  return (deg * Math.PI) / 180
}

/**
 * Calculate pattern points for a pet vest.
 *
 * The back piece is roughly a trapezoid:
 *   - Top edge = N/4 + ease (neck width)
 *   - Bottom edge = C/4 + ease (chest width)
 *   - Height = BL (back length)
 *   - With curved edges for a fitted look
 *
 * Chest pieces are mirror images:
 *   - Similar shape but shorter (B instead of BL)
 *   - With leg opening cutout
 */
export function generateVestPattern(measurements: PetMeasurements): PatternResult {
  const { neckGirth: N, chestGirth: C, backLength: BL, bellyLength: B, legGirth: LG, gender } = measurements

  // Calculated widths (per side, with ease)
  const neckWidth = N / 4 + EASE_NECK / 2
  const chestWidth = C / 4 + EASE_CHEST / 2
  const legOpeningRadius = (LG + EASE_LEG) / (2 * Math.PI)

  // --- BACK PIECE ---
  // The back piece is a trapezoid with curved sides
  // Origin at top-left of the piece
  const backPoints: { x: number; y: number }[] = []

  const backTopY = 0
  const backBottomY = BL
  const backTopWidth = neckWidth
  const backBottomWidth = chestWidth

  // The back is symmetric - we draw half and mirror
  // Start at top center
  // Top edge (neck) - slightly curved
  backPoints.push({ x: 0, y: backTopY }) // Top center

  // Right side of top edge
  const topCurveControl = backTopWidth * 0.3
  backPoints.push({ x: backTopWidth * 0.5, y: topCurveControl * 0.3 })
  backPoints.push({ x: backTopWidth, y: 0 })

  // Right side (armhole) - curved for front leg
  const armholeDepth = BL * 0.25 // armhole is at 1/4 down the back
  const armholeCurveX = backTopWidth + 1 + (backBottomWidth - backTopWidth) * 0.2
  backPoints.push({ x: backTopWidth + 1, y: armholeDepth * 0.5 })
  backPoints.push({ x: armholeCurveX, y: armholeDepth })

  // Bottom edge
  backPoints.push({ x: backBottomWidth, y: backBottomY * 0.7 })
  backPoints.push({ x: backBottomWidth, y: backBottomY })

  // Bottom curve
  backPoints.push({ x: backBottomWidth * 0.7, y: backBottomY + 1 })
  backPoints.push({ x: backBottomWidth * 0.3, y: backBottomY + 0.5 })

  // Back to center
  backPoints.push({ x: 0, y: backBottomY })

  // Mirror for left side
  const mirroredBack: { x: number; y: number }[] = []
  for (const p of backPoints) {
    // First pass: collect all points with mirrored x
    mirroredBack.push({ x: -p.x, y: p.y })
  }

  // Full back piece = right side + mirrored left (reversed)
  // We'll construct the full piece from the outline
  const fullBack: { x: number; y: number }[] = []

  // Top center
  fullBack.push({ x: 0, y: 0 })

  // Right half top
  for (let i = 1; i < backPoints.length; i++) {
    if (backPoints[i].x >= 0) {
      fullBack.push(backPoints[i])
    }
  }

  // Bottom center
  // Mirror for left side (in reverse)
  for (let i = backPoints.length - 1; i >= 1; i--) {
    if (backPoints[i].x > 0) {
      fullBack.push({ x: -backPoints[i].x, y: backPoints[i].y })
    }
  }

  // --- CHEST/BELLY PIECE (one side, can be mirrored) ---
  // The chest piece wraps around the belly
  const chestPoints: { x: number; y: number }[] = []

  const chestTopY = 0
  const chestBottomY = B
  const chestTopWidth = neckWidth * 0.6
  const chestBottomWidth = C / 4 + EASE_BELLY / 2

  // Neck edge (top)
  chestPoints.push({ x: chestTopWidth, y: chestTopY }) // outer top
  chestPoints.push({ x: chestTopWidth * 0.7, y: chestTopY + 0.5 })

  // Center front edge
  chestPoints.push({ x: 0, y: chestTopY + 0.3 })
  chestPoints.push({ x: 0, y: chestBottomY * 0.3 })

  // Belly curve - different for male/female
  const bellyCurveDepth = gender === 'female' ? 1.5 : 0.5
  chestPoints.push({ x: 0.5, y: chestBottomY * 0.6 })
  chestPoints.push({ x: 0, y: chestBottomY * 0.8 })
  chestPoints.push({ x: 0.5, y: chestBottomY })

  // Bottom edge
  chestPoints.push({ x: chestBottomWidth * 0.3, y: chestBottomY + 0.5 })
  chestPoints.push({ x: chestBottomWidth, y: chestBottomY })

  // Leg opening (side)
  const legCenterY = B * 0.35
  const legOpeningW = legOpeningRadius * 1.2
  const legOpeningH = legOpeningRadius * 0.9

  // We need to create the leg opening curve
  // For simplicity, approximate with a few points
  chestPoints.push({ x: chestBottomWidth - 0.5, y: chestBottomY * 0.7 })
  chestPoints.push({ x: chestBottomWidth, y: legCenterY + legOpeningH })
  chestPoints.push({ x: chestBottomWidth - legOpeningW, y: legCenterY })
  chestPoints.push({ x: chestBottomWidth, y: legCenterY - legOpeningH })
  chestPoints.push({ x: chestBottomWidth - 0.5, y: chestTopY + 2 })

  const pieces: PatternPiece[] = [
    {
      name: 'Back',
      nameCn: '背部',
      points: fullBack,
      label: '背部 × 1 (对折裁剪)',
      cutQuantity: 1,
      fold: true,
    },
    {
      name: 'Chest (Left)',
      nameCn: '左胸',
      points: chestPoints,
      label: '左胸片 × 1',
      cutQuantity: 1,
      fold: false,
    },
    {
      name: 'Chest (Right)',
      nameCn: '右胸',
      points: chestPoints.map((p) => ({ x: -p.x, y: p.y })),
      label: '右胸片 × 1',
      cutQuantity: 1,
      fold: false,
    },
  ]

  // Calculate approximate fabric needed
  const maxWidth = Math.max(
    ...pieces.flatMap((p: PatternPiece) => p.points.map((pt: {x: number;y: number}) => Math.abs(pt.x)))
  ) * 2 + SEAM_ALLOWANCE * 4
  const maxLength = Math.max(
    ...pieces.flatMap((p: PatternPiece) => p.points.map((pt: {x: number;y: number}) => pt.y))
  ) + SEAM_ALLOWANCE * 4

  return {
    pieces,
    scale: 1, // Will be adjusted for display
    fabricWidth: Math.ceil(maxWidth + 5),
    fabricLength: Math.ceil(maxLength * 2 + 5), // Double for folding
    seamAllowance: SEAM_ALLOWANCE,
  }
}

/**
 * Convert pattern points to a rendering-friendly format.
 * Scales and centers the pieces for display.
 */
export function getDisplayPoints(
  pieces: PatternPiece[],
  canvasWidth: number,
  canvasHeight: number
): PatternPiece[] {
  // Find bounds
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const piece of pieces) {
    for (const p of piece.points) {
      minX = Math.min(minX, p.x)
      maxX = Math.max(maxX, p.x)
      minY = Math.min(minY, p.y)
      maxY = Math.max(maxY, p.y)
    }
  }

  const patternWidth = maxX - minX
  const patternHeight = maxY - minY
  const padding = 40

  // Scale to fit canvas
  const scaleX = (canvasWidth - padding * 2) / patternWidth
  const scaleY = (canvasHeight - padding * 2) / patternHeight
  const scale = Math.min(scaleX, scaleY, 10) // cap at 10x

  const offsetX = (canvasWidth - patternWidth * scale) / 2 - minX * scale
  const offsetY = padding + 20

  return pieces.map((piece) => ({
    ...piece,
    points: piece.points.map((p: {x: number; y: number}) => ({
      x: p.x * scale + offsetX,
      y: p.y * scale + offsetY,
    })),
  }))
}
