import { NextRequest, NextResponse } from 'next/server'
import { generateQuote } from '@/lib/actions/quotes'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cityId, serviceId, inputs, urgency } = body

    const result = await generateQuote(serviceId, cityId, inputs, urgency)

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Error al generar la cotización' },
      { status: 500 }
    )
  }
}

