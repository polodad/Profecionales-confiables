import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { processWebhookNotification, verifyWebhookSignature } from '@/lib/payments/mercadopago'
import { updatePaymentStatus } from '@/lib/actions/bookings'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get('x-signature') || ''

    // Verify webhook signature
    const isValid = verifyWebhookSignature(
      signature,
      body,
      process.env.MP_WEBHOOK_SECRET!
    )

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const notification = JSON.parse(body)

    // Process payment notification
    const payment = await processWebhookNotification(notification)

    if (!payment) {
      return NextResponse.json({ ok: true })
    }

    // Update booking payment status
    const bookingId = payment.metadata.booking_id

    if (bookingId) {
      await updatePaymentStatus(
        bookingId,
        payment.paymentId,
        payment.metadata.payment_method || 'card',
        payment.status === 'approved' ? 'paid' : 'failed'
      )

      // Log audit trail
      const supabase = await createClient()
      await supabase.from('audit_logs').insert({
        action: 'payment_webhook_received',
        resource_type: 'booking',
        resource_id: bookingId,
        details: {
          payment_id: payment.paymentId,
          status: payment.status,
          amount: payment.amount,
        },
      })
    }

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

