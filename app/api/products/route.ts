import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getProducts, addProduct } from '@/lib/store'
import { products as initialProducts } from '@/lib/products'
import { Product } from '@/lib/types'

// Init store on first access
function ensureProducts() {
  // Get products from store - if empty, they come from the hardcoded data
  const stored = getProducts()
  return stored.length > 0 ? stored : initialProducts
}

export async function GET() {
  const products = ensureProducts()
  return NextResponse.json(products)
}

export async function POST(request: NextRequest) {
  if (!verifySession()) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        { error: '请填写商品名称、价格和分类' },
        { status: 400 }
      )
    }

    const newProduct: Product = {
      id: body.id || `prod-${Date.now()}`,
      name: body.name,
      price: parseFloat(body.price),
      description: body.description || '',
      images: body.images || ['https://picsum.photos/seed/new/600/800'],
      category: body.category,
      material: body.material || '',
      dimensions: body.dimensions || '',
      inStock: body.inStock !== false,
      featured: body.featured || false,
    }

    addProduct(newProduct)
    return NextResponse.json(newProduct, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: '请求格式错误' },
      { status: 400 }
    )
  }
}
