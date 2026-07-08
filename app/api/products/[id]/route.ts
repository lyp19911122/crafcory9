import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { updateProduct, deleteProduct } from '@/lib/store'
import { products as initialProducts } from '@/lib/products'
import { getProducts } from '@/lib/store'

function getProductById(id: string) {
  const stored = getProducts()
  const allProducts = stored.length > 0 ? stored : initialProducts
  return allProducts.find((p) => p.id === id)
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const product = getProductById(id)
  if (!product) {
    return NextResponse.json({ error: '商品不存在' }, { status: 404 })
  }
  return NextResponse.json(product)
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifySession()) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const { id } = await params
  const existing = getProductById(id)
  if (!existing) {
    return NextResponse.json({ error: '商品不存在' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const updated = updateProduct(id, {
      ...body,
      price: body.price !== undefined ? parseFloat(body.price) : undefined,
      inStock: body.inStock !== undefined ? Boolean(body.inStock) : undefined,
      featured: body.featured !== undefined ? Boolean(body.featured) : undefined,
    })
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifySession()) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const { id } = await params
  const deleted = deleteProduct(id)
  if (!deleted) {
    return NextResponse.json({ error: '商品不存在' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
