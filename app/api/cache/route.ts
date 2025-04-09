import { NextResponse } from 'next/server'

// Simple in-memory storage
let cachedData = {
  data1: null,
  data2: null
}

export async function GET() {
  try {
    return NextResponse.json(cachedData)
  } catch (error) {
    console.error('Error fetching data:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { data1, data2 } = await req.json()
    
    // Update cache
    cachedData = {
      data1,
      data2
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving data:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
