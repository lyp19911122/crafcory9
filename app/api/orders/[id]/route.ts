import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getOrderById, updateOrderStatus } from '@/lib/store'

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!verifySession()) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }

  const { id } = await params
  const existing = getOrderById(id)
  if (!existing) {
    return NextResponse.json({ error: '订单不存在' }, { status: 404 })
  }

  try {
    const body = await request.json()
    const validStatuses = ['pending', 'paid', 'shipped', 'delivered'] as const
    type OrderStatus = typeof validStatuses[number]
    
    if (body.status && !validStatuses.includes(body.status as OrderStatus)) {
      return NextResponse.json(
        { error: '无效的订单状态' },
        { status: 400 }
      )
    }

    const updated = updateOrderStatus(id, body.status)
    return NextResponse.json(updated)
  } catch {
    return NextResponse.json({ error: '请求格式错误' }, { status: 400 })
  }
}
