import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.has('auth_token')
  const isLoginPage = request.nextUrl.pathname === '/login'

  // If the user is not authenticated and trying to access a protected route
  if (!isAuthenticated && !isLoginPage) {
    const url = new URL('/login', request.url)
    url.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(url)
  }

  // If the user is authenticated and trying to access the login page
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  // If the user is authenticated and trying to access a protected route
  // try {
  //   const user = await fetch('/api/auth/verify', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${request.cookies.get('auth_token')?.value}`
  //     }
  //   })

  //   const data = await user.json()

  //   if(data.success) {
  //     return NextResponse.next()
  //   }

  //   console.log(data, "<-user")

  //   // if(data.error && data.error === 'Unauthorized') {
  //   //   return NextResponse.redirect(new URL('/login', request.url))
  //   // }

  //   return NextResponse.next()
  // } catch (error) {
  //   console.error('Token verification error:', error)
  //   return NextResponse.redirect(new URL('/login', request.url))
  // }

  return NextResponse.next()
}

// Add your protected routes here
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
