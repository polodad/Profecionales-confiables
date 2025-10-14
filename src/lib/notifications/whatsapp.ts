/**
 * Servicio de integración con WhatsApp Cloud API
 */

export interface WhatsAppMessage {
  to: string
  template: string
  components?: any[]
}

/**
 * Envía un mensaje de WhatsApp usando templates
 */
export async function sendWhatsAppMessage(
  phoneNumber: string,
  templateName: string,
  parameters: Record<string, string>
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_NUMBER_ID}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phoneNumber,
          type: 'template',
          template: {
            name: templateName,
            language: {
              code: 'es_MX',
            },
            components: [
              {
                type: 'body',
                parameters: Object.values(parameters).map((value) => ({
                  type: 'text',
                  text: value,
                })),
              },
            ],
          },
        }),
      }
    )

    if (!response.ok) {
      const error = await response.json()
      console.error('WhatsApp API error:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    return false
  }
}

/**
 * Templates de mensajes predefinidos
 */
export const WhatsAppTemplates = {
  NEW_JOB: 'nuevo_trabajo',
  QUOTE_RECEIVED: 'cotizacion_recibida',
  QUOTE_ACCEPTED: 'cotizacion_aceptada',
  PAYMENT_CONFIRMED: 'pago_confirmado',
  JOB_STARTED: 'trabajo_iniciado',
  JOB_COMPLETED: 'trabajo_completado',
  REVIEW_REQUEST: 'solicitud_resena',
}

/**
 * Notifica un nuevo trabajo a los profesionales
 */
export async function notifyNewJob(
  proPhone: string,
  jobId: string,
  serviceName: string,
  city: string
): Promise<boolean> {
  return sendWhatsAppMessage(proPhone, WhatsAppTemplates.NEW_JOB, {
    job_id: jobId,
    service: serviceName,
    city: city,
  })
}

/**
 * Notifica al cliente que recibió una cotización
 */
export async function notifyQuoteReceived(
  clientPhone: string,
  proName: string,
  amount: string
): Promise<boolean> {
  return sendWhatsAppMessage(clientPhone, WhatsAppTemplates.QUOTE_RECEIVED, {
    pro_name: proName,
    amount: amount,
  })
}

/**
 * Notifica al profesional que su cotización fue aceptada
 */
export async function notifyQuoteAccepted(
  proPhone: string,
  clientName: string,
  scheduledDate: string
): Promise<boolean> {
  return sendWhatsAppMessage(proPhone, WhatsAppTemplates.QUOTE_ACCEPTED, {
    client_name: clientName,
    scheduled_date: scheduledDate,
  })
}

/**
 * Notifica confirmación de pago
 */
export async function notifyPaymentConfirmed(
  phone: string,
  amount: string,
  bookingId: string
): Promise<boolean> {
  return sendWhatsAppMessage(phone, WhatsAppTemplates.PAYMENT_CONFIRMED, {
    amount: amount,
    booking_id: bookingId,
  })
}

