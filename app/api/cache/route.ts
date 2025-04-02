import redis from '@/lib/redis'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const [data1String, data2String] = await Promise.all([
      redis.get('orgData1'),
      redis.get('orgData2')
    ])
    
    const data1 = data1String ? JSON.parse(data1String) : null
    const data2 = data2String ? JSON.parse(data2String) : null
    
    return NextResponse.json({ data1, data2 })
  } catch (error) {
    console.error('Error fetching from Redis:', error)
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const { data1, data2 } = await req.json()
    // const ONE_HOUR = 3600 // 1 hour in seconds
    const ONE_MINUTE = 60 // 1 minute in seconds


    await Promise.all([
      redis.set('orgData1', JSON.stringify(data1), 'EX', ONE_MINUTE),
      redis.set('orgData2', JSON.stringify(data2), 'EX', ONE_MINUTE)
    ])

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error saving to Redis:', error)
    return NextResponse.json({ error: 'Failed to save data' }, { status: 500 })
  }
}
