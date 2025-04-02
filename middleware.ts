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
  // if (isAuthenticated && isLoginPage) {
  //   return NextResponse.redirect(new URL('/', request.url))
  // }

  // If the user is authenticated and trying to access a protected route
  try {
    const token = request.cookies.get('auth_token')?.value
    // console.log(token, "<-token")
    if (!token) {
      // throw new Error('No auth token found')
      const url = new URL('/login', request.url)
      url.searchParams.set('from', request.nextUrl.pathname)
      return NextResponse.redirect(url)
    }

    const response = await fetch('http://172.16.3.189:8000/api/token/verify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token }),
    })

    // console.log(response, "<-response")

    const data = await response.json()

    // console.log(data, "<-data")

    if (data.code === 'token_not_valid') {
      const response = NextResponse.redirect(new URL('/login', request.url))
      response.cookies.delete('auth_token')
      return response
    }

    return NextResponse.next()
  } catch (error) {
    console.error('Token verification error:', error)
    const response = NextResponse.redirect(new URL('/login', request.url))
    response.cookies.delete('auth_token')
    return response
  }

  // return NextResponse.next()
}

// Add your protected routes here
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|login|api/auth).*)',
  ],
}
