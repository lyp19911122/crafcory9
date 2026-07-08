import { NextRequest, NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'
import { getOrders, addOrder, generateOrderId } from '@/lib/store'

export async function GET() {
  // Public: anyone can view their order? No - admin only for list
  if (!verifySession()) {
    return NextResponse.json({ error: '未授权' }, { status: 401 })
  }
  const orders = getOrders()
  return NextResponse.json(orders)
}

export async function POST(request: NextRequest) {
  // Public: create order without auth
  try {
    const body = await request.json()
    
    if (!body.items || !body.items.length || !body.customer) {
      return NextResponse.json(
        { error: '订单信息不完整' },
        { status: 400 }
      )
    }

    const order = {
      id: generateOrderId(),
      items: body.items,
      total: body.total,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      customer: body.customer,
    }

    addOrder(order)
    return NextResponse.json(order, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: '请求格式错误' },
      { status: 400 }
    )
  }
}
