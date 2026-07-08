'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })

      if (res.ok) {
        router.push('/admin')
        router.refresh()
      } else {
        const data = await res.json()
        setError(data.error || '登录失败')
      }
    } catch {
      setError('网络错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-macaron-cream via-macaron-pink/10 to-macaron-lavender/10 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <span className="text-4xl block mb-2">🔐</span>
          <h1 className="text-2xl font-display font-bold text-macaron-brown">
            管理后台
          </h1>
          <p className="text-sm text-macaron-brown/50 mt-1">
            Crafcory9 Admin
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-macaron-brown/60 mb-1">
              管理员密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink focus:ring-2 focus:ring-macaron-pink/20 outline-none transition-all"
              placeholder="输入密码"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading || !password}
            className="btn-primary w-full text-lg disabled:opacity-50"
          >
            {loading ? '登录中...' : '登录'}
          </button>
        </form>

        <p className="text-xs text-macaron-brown/30 text-center mt-6">
          默认密码: admin123 （建议部署后修改环境变量 ADMIN_PASSWORD）
        </p>
      </div>
    </div>
  )
}
