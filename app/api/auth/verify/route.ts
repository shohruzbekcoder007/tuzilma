import { BASE_URL } from '@/app/utils/API_URLS'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {

  const auth_token = request.cookies.get('auth_token')?.value || request.headers.get('authorization')?.split(' ')[1]

  console.log(auth_token, "<---auth_token")

  if (!auth_token || !auth_token.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  try {
    const response = await fetch(`${BASE_URL}/api/token/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: auth_token }),
    })

    const data = await response.json()

    // console.log(data, "<-shu verify")

    if (data.code === 'token_not_valid') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    } else {
      return NextResponse.json(
        { success: true },
        { status: 200 }
      )
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}