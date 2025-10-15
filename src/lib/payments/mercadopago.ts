/**
 * Servicio de integración con Mercado Pago
 */

export interface PaymentPreference {
  title: string
  description: string
  amount: number
  metadata: Record<string, any>
  successUrl: string
  failureUrl: string
  pendingUrl: string
}

export interface PaymentResponse {
  id: string
  init_point: string
  sandbox_init_point: string
}

/**
 * Crea una preferencia de pago en Mercado Pago
 */
export async function createPaymentPreference(
  preference: PaymentPreference
): Promise<PaymentResponse> {
  const response = await fetch('https://api.mercadopago.com/checkout/preferences', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      items: [
        {
          title: preference.title,
          description: preference.description,
          quantity: 1,
          currency_id: 'MXN',
          unit_price: preference.amount,
        },
      ],
      payment_methods: {
        excluded_payment_types: [],
        installments: 1,
      },
      back_urls: {
        success: preference.successUrl,
        failure: preference.failureUrl,
        pending: preference.pendingUrl,
      },
      auto_return: 'approved',
      metadata: preference.metadata,
      notification_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/webhooks/mercadopago`,
    }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Mercado Pago error: ${error.message}`)
  }

  return response.json()
}

/**
 * Obtiene información de un pago
 */
export async function getPayment(paymentId: string) {
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${paymentId}`, {
    headers: {
      Authorization: `Bearer ${process.env.MP_ACCESS_TOKEN}`,
    },
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Mercado Pago error: ${error.message}`)
  }

  return response.json()
}

/**
 * Verifica la firma de un webhook
 */
export function verifyWebhookSignature(
  signature: string,
  data: string,
  secret: string
): boolean {
  // Use dynamic import for crypto in Node.js environment
  const crypto = globalThis.require?.('crypto') as any
  if (!crypto) return false
  const hash = crypto.createHmac('sha256', secret).update(data).digest('hex')
  return hash === signature
}

/**
 * Procesa una notificación de webhook de Mercado Pago
 */
export async function processWebhookNotification(notification: any) {
  if (notification.type !== 'payment') {
    return null
  }

  const payment = await getPayment(notification.data.id)

  return {
    paymentId: payment.id,
    status: payment.status,
    statusDetail: payment.status_detail,
    amount: payment.transaction_amount,
    metadata: payment.metadata,
  }
}

