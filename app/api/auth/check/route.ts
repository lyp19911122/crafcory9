import { NextResponse } from 'next/server'
import { verifySession } from '@/lib/auth'

export async function GET() {
  const isAuthenticated = verifySession()
  return NextResponse.json({ authenticated: isAuthenticated })
}
