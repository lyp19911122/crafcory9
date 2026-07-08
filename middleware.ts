import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Allow login page
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next()
    }

    // Check for session cookie on admin pages
    // (full verification happens in the page/API handlers)
    const sessionCookie = request.cookies.get('crafcory9_admin_session')
    if (!sessionCookie?.value) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
