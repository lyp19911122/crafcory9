'use client'

import { PetMeasurements } from '@/lib/pet-types'

interface MeasurementFormProps {
  measurements: PetMeasurements
  onChange: (m: PetMeasurements) => void
  onGenerate: () => void
}

interface FieldDef {
  key: keyof PetMeasurements
  label: string
  labelCn: string
  min: number
  max: number
  step: number
  unit: string
  help: string
}

const fields: FieldDef[] = [
  { key: 'neckGirth', label: 'Neck Girth', labelCn: '颈围', min: 15, max: 60, step: 0.5, unit: 'cm', help: 'Measure around the base of the neck' },
  { key: 'chestGirth', label: 'Chest Girth', labelCn: '胸围', min: 20, max: 90, step: 0.5, unit: 'cm', help: 'Measure around the widest part, behind front legs' },
  { key: 'backLength', label: 'Back Length', labelCn: '背长', min: 15, max: 70, step: 0.5, unit: 'cm', help: 'From base of neck to base of tail' },
  { key: 'bellyLength', label: 'Belly Length', labelCn: '腹长', min: 8, max: 40, step: 0.5, unit: 'cm', help: 'From neck to last rib / belly' },
  { key: 'legGirth', label: 'Leg Girth', labelCn: '前腿围', min: 8, max: 35, step: 0.5, unit: 'cm', help: 'Around the front leg at its widest' },
]

export default function MeasurementForm({ measurements, onChange, onGenerate }: MeasurementFormProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-draft-sand/30">
      <h2 className="font-serif text-xl font-semibold text-draft-brown mb-2">
        输入尺寸 / Enter Measurements
      </h2>
      <p className="text-sm text-draft-gray mb-6">
        用软尺测量你的宠物，输入以下尺寸即可生成纸样。
      </p>

      <div className="space-y-5">
        {fields.map((field) => (
          <div key={field.key}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-draft-brown">
                {field.labelCn}
                <span className="text-draft-gray text-xs ml-1">({field.label})</span>
              </label>
              <span className="text-sm font-mono bg-draft-cream px-2 py-0.5 rounded text-draft-brown">
                {measurements[field.key]}{field.unit}
              </span>
            </div>
            <input
              type="range"
              min={field.min}
              max={field.max}
              step={field.step}
              value={measurements[field.key]}
              onChange={(e) => onChange({ ...measurements, [field.key]: parseFloat(e.target.value) })}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #D4A5A5 ${((measurements[field.key] - field.min) / (field.max - field.min)) * 100}%, #E8D5C4 ${((measurements[field.key] - field.min) / (field.max - field.min)) * 100}%)`,
                accentColor: '#D4A5A5',
              }}
            />
            <div className="flex justify-between text-xs text-draft-gray">
              <span>{field.min}{field.unit}</span>
              <span>{field.help}</span>
              <span>{field.max}{field.unit}</span>
            </div>
          </div>
        ))}

        {/* Gender */}
        <div>
          <label className="text-sm font-medium text-draft-brown block mb-2">
            性别 / Gender
          </label>
          <div className="flex gap-3">
            {[
              { value: 'female' as const, label: '女生', labelEn: 'Female' },
              { value: 'male' as const, label: '男生', labelEn: 'Male' },
            ].map((g) => (
              <button
                key={g.value}
                onClick={() => onChange({ ...measurements, gender: g.value })}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  measurements.gender === g.value
                    ? 'bg-draft-pink text-white shadow-sm'
                    : 'bg-draft-cream text-draft-brown hover:bg-draft-sand/30'
                }`}
              >
                {g.label} / {g.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onGenerate}
        className="w-full mt-6 bg-draft-brown text-white py-3 rounded-xl font-medium hover:bg-draft-brown/90 transition-all active:scale-[0.98] shadow-sm"
      >
        ✂️ 生成纸样 / Generate Pattern
      </button>
    </div>
  )
}
