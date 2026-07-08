'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/lib/types'

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Partial<Product>>({})
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({
    name: '', price: '', description: '', category: '',
    material: '', dimensions: '', inStock: true, featured: false,
  })
  const [message, setMessage] = useState('')

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleUpdate(id: string) {
    const res = await fetch(`/api/products/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editForm),
    })
    if (res.ok) {
      setEditingId(null)
      setEditForm({})
      setMessage('✅ 更新成功')
      loadProducts()
    } else {
      setMessage('❌ 更新失败')
    }
    setTimeout(() => setMessage(''), 2000)
  }

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这个商品吗？')) return
    const res = await fetch(`/api/products/${id}`, { method: 'DELETE' })
    if (res.ok) {
      setMessage('✅ 已删除')
      loadProducts()
    } else {
      setMessage('❌ 删除失败')
    }
    setTimeout(() => setMessage(''), 2000)
  }

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(addForm),
    })
    if (res.ok) {
      setShowAdd(false)
      setAddForm({ name: '', price: '', description: '', category: '', material: '', dimensions: '', inStock: true, featured: false })
      setMessage('✅ 添加成功')
      loadProducts()
    } else {
      setMessage('❌ 添加失败')
    }
    setTimeout(() => setMessage(''), 2000)
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setEditForm(product)
  }

  if (loading) {
    return <div className="text-center py-20"><div className="animate-spin text-4xl">🧶</div></div>
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-display font-bold">📦 商品管理</h1>
          <p className="text-macaron-brown/50 text-sm mt-1">共 {products.length} 件商品</p>
        </div>
        <button onClick={() => setShowAdd(!showAdd)} className="btn-primary text-sm">
          {showAdd ? '取消' : '+ 添加商品'}
        </button>
      </div>

      {message && (
        <div className="bg-white rounded-xl p-4 mb-4 shadow-sm text-sm">{message}</div>
      )}

      {/* Add product form */}
      {showAdd && (
        <form onSubmit={handleAdd} className="bg-white rounded-2xl p-6 shadow-sm mb-8 space-y-4">
          <h2 className="font-display font-semibold">新增商品</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-macaron-brown/60 mb-1">名称 *</label>
              <input value={addForm.name} onChange={e => setAddForm({...addForm, name: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink outline-none"
                required />
            </div>
            <div>
              <label className="block text-xs text-macaron-brown/60 mb-1">价格 (USD) *</label>
              <input type="number" step="0.01" value={addForm.price} onChange={e => setAddForm({...addForm, price: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink outline-none"
                required />
            </div>
            <div>
              <label className="block text-xs text-macaron-brown/60 mb-1">分类 *</label>
              <select value={addForm.category} onChange={e => setAddForm({...addForm, category: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink outline-none bg-white"
                required>
                <option value="">选择分类</option>
                <option value="围巾">围巾</option>
                <option value="帽子">帽子</option>
                <option value="玩偶">玩偶</option>
                <option value="毯子">毯子</option>
                <option value="毛衣">毛衣</option>
                <option value="材料包">材料包</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-macaron-brown/60 mb-1">材质</label>
              <input value={addForm.material} onChange={e => setAddForm({...addForm, material: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink outline-none" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-macaron-brown/60 mb-1">描述</label>
              <textarea value={addForm.description} onChange={e => setAddForm({...addForm, description: e.target.value})}
                className="w-full px-3 py-2 rounded-xl border border-macaron-pink/20 focus:border-macaron-pink outline-none h-20 resize-none" />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={addForm.inStock} onChange={e => setAddForm({...addForm, inStock: e.target.checked})} />
                有货
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={addForm.featured} onChange={e => setAddForm({...addForm, featured: e.target.checked})} />
                推荐
              </label>
            </div>
          </div>
          <button type="submit" className="btn-primary text-sm">添加商品</button>
        </form>
      )}

      {/* Products table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-macaron-pink/10 bg-macaron-cream/50">
                <th className="text-left px-4 py-3 font-medium text-macaron-brown/60">商品</th>
                <th className="text-left px-4 py-3 font-medium text-macaron-brown/60">分类</th>
                <th className="text-left px-4 py-3 font-medium text-macaron-brown/60">价格</th>
                <th className="text-center px-4 py-3 font-medium text-macaron-brown/60">库存</th>
                <th className="text-center px-4 py-3 font-medium text-macaron-brown/60">推荐</th>
                <th className="text-right px-4 py-3 font-medium text-macaron-brown/60">操作</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-macaron-pink/5 hover:bg-macaron-cream/30 transition-colors">
                  {editingId === product.id ? (
                    <>
                      <td className="px-4 py-3">
                        <input value={editForm.name || ''} onChange={e => setEditForm({...editForm, name: e.target.value})}
                          className="w-full px-2 py-1 rounded-lg border border-macaron-pink/20 text-sm" />
                      </td>
                      <td className="px-4 py-3">
                        <select value={editForm.category || ''} onChange={e => setEditForm({...editForm, category: e.target.value})}
                          className="px-2 py-1 rounded-lg border border-macaron-pink/20 text-sm bg-white">
                          <option>围巾</option><option>帽子</option><option>玩偶</option>
                          <option>毯子</option><option>毛衣</option><option>材料包</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <input type="number" step="0.01" value={editForm.price || ''} onChange={e => setEditForm({...editForm, price: parseFloat(e.target.value)})}
                          className="w-20 px-2 py-1 rounded-lg border border-macaron-pink/20 text-sm" />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={editForm.inStock ?? true} onChange={e => setEditForm({...editForm, inStock: e.target.checked})} />
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input type="checkbox" checked={editForm.featured ?? false} onChange={e => setEditForm({...editForm, featured: e.target.checked})} />
                      </td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => handleUpdate(product.id)} className="text-green-600 hover:text-green-700 text-xs font-medium">保存</button>
                        <button onClick={() => { setEditingId(null); setEditForm({}) }} className="text-macaron-brown/40 hover:text-macaron-brown text-xs">取消</button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl overflow-hidden bg-macaron-cream flex-shrink-0">
                            <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                          </div>
                          <span className="font-medium text-macaron-brown">{product.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-macaron-brown/60">{product.category}</td>
                      <td className="px-4 py-3 font-medium">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-center">
                        {product.inStock
                          ? <span className="text-green-600 text-xs bg-green-100 px-2 py-1 rounded-full">有货</span>
                          : <span className="text-red-400 text-xs bg-red-50 px-2 py-1 rounded-full">缺货</span>}
                      </td>
                      <td className="px-4 py-3 text-center">{product.featured ? '⭐' : '—'}</td>
                      <td className="px-4 py-3 text-right space-x-2">
                        <button onClick={() => startEdit(product)} className="text-macaron-pink hover:text-macaron-rose text-xs font-medium">编辑</button>
                        <button onClick={() => handleDelete(product.id)} className="text-red-400 hover:text-red-500 text-xs">删除</button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
