import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname === '/animais') {
    return NextResponse.redirect(new URL(`/animais/1`, req.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image).*)']
}
