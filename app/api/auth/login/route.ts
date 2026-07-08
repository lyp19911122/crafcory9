import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, setSessionCookie, addSession } from '@/lib/auth'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123'

    // Hash the input and compare
    const inputHash = crypto.createHash('sha256').update(password).digest('hex')
    const storedHash = crypto.createHash('sha256').update(adminPassword).digest('hex')

    if (inputHash !== storedHash) {
      return NextResponse.json(
        { error: '密码错误' },
        { status: 401 }
      )
    }

    const token = createSessionToken()
    addSession(token)
    setSessionCookie(token)

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: '请求格式错误' },
      { status: 400 }
    )
  }
}
