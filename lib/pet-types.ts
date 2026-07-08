export interface PetMeasurements {
  // 颈围 Neck girth (cm)
  neckGirth: number
  // 胸围 Chest girth (cm) - behind front legs
  chestGirth: number
  // 背长 Back length (cm) - base of neck to tail base
  backLength: number
  // 腹长 Belly length (cm) - neck to belly/last rib
  bellyLength: number
  // 前腿围 Front leg girth (cm)
  legGirth: number
  // 性别 (for belly curve)
  gender: 'male' | 'female'
}

export interface PatternPiece {
  name: string
  nameCn: string
  points: { x: number; y: number }[]
  label: string
  cutQuantity: number
  fold: boolean
}

export interface PatternResult {
  pieces: PatternPiece[]
  scale: number
  fabricWidth: number
  fabricLength: number
  seamAllowance: number
}

export interface DraftProduct {
  id: string
  name: string
  nameCn: string
  category: string
  categoryCn: string
  description: string
  descriptionCn: string
  path: string
  measurements: { key: string; label: string; labelCn: string; min: number; max: number; default: number }[]
}
