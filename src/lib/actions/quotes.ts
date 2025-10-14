'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateQuote, validateInputs } from '@/lib/pricing/calculator'
import { revalidatePath } from 'next/cache'
import type { QuoteInputs } from '@/types'

/**
 * Genera una cotización instantánea sin guardarla
 */
export async function generateQuote(
  serviceId: string,
  cityId: string,
  inputs: QuoteInputs,
  urgency?: string
) {
  const supabase = await createClient()

  // Obtener servicio
  const { data: service, error: serviceError } = await supabase
    .from('services')
    .select('*')
    .eq('id', serviceId)
    .single()

  if (serviceError || !service) {
    return { error: 'Servicio no encontrado' }
  }

  // Validar inputs
  const validation = validateInputs(service, inputs)
  if (!validation.valid) {
    return { error: validation.errors.join(', ') }
  }

  // Obtener multiplicador de precio por ciudad
  const { data: cityPrice } = await supabase
    .from('city_prices')
    .select('overrides_json')
    .eq('city_id', cityId)
    .eq('service_id', serviceId)
    .single()

  const priceMultiplier = cityPrice?.overrides_json
    ? (cityPrice.overrides_json as any).price_multiplier || 1.0
    : 1.0

  // Calcular cotización
  const breakdown = calculateQuote(service, inputs, urgency, priceMultiplier)

  return { data: breakdown }
}

/**
 * Crea un trabajo con cotización automática
 */
export async function createJobWithQuote(formData: {
  cityId: string
  serviceId: string
  scopeText: string
  inputs: QuoteInputs
  address: string
  zone: string
  urgency?: string
  preferredDate?: string
}) {
  const supabase = await createClient()

  // Verificar autenticación
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Generar cotización
  const quoteResult = await generateQuote(
    formData.serviceId,
    formData.cityId,
    formData.inputs,
    formData.urgency
  )

  if (quoteResult.error) {
    return { error: quoteResult.error }
  }

  // Crear trabajo
  const { data: job, error: jobError } = await supabase
    .from('jobs')
    .insert({
      user_id: user.id,
      city_id: formData.cityId,
      service_id: formData.serviceId,
      scope_text: formData.scopeText,
      inputs_json: formData.inputs,
      address: formData.address,
      zone: formData.zone,
      urgency: formData.urgency,
      preferred_date: formData.preferredDate,
      status: 'pending_quotes',
    })
    .select()
    .single()

  if (jobError) {
    return { error: 'Error al crear el trabajo' }
  }

  revalidatePath('/dashboard/jobs')
  
  return {
    data: {
      job,
      quote: quoteResult.data,
    },
  }
}

/**
 * Un profesional crea una cotización para un trabajo
 */
export async function createProQuote(
  jobId: string,
  amount: number,
  breakdown: any,
  notes?: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Verificar que el usuario es un profesional aprobado
  const { data: pro, error: proError } = await supabase
    .from('pros')
    .select('id')
    .eq('user_id', user.id)
    .eq('kyc_status', 'approved')
    .single()

  if (proError || !pro) {
    return { error: 'No eres un profesional aprobado' }
  }

  // Crear cotización
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 3) // Expira en 3 días

  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .insert({
      job_id: jobId,
      pro_id: pro.id,
      amount,
      breakdown_json: breakdown,
      notes,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (quoteError) {
    return { error: 'Error al crear la cotización' }
  }

  // Actualizar estado del trabajo
  await supabase
    .from('jobs')
    .update({ status: 'quoted' })
    .eq('id', jobId)

  revalidatePath(`/dashboard/jobs/${jobId}`)
  
  return { data: quote }
}

/**
 * Acepta una cotización
 */
export async function acceptQuote(quoteId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Verificar que la cotización pertenece a un trabajo del usuario
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('*, jobs!inner(*)')
    .eq('id', quoteId)
    .single()

  if (quoteError || !quote) {
    return { error: 'Cotización no encontrada' }
  }

  if ((quote.jobs as any).user_id !== user.id) {
    return { error: 'No tienes permiso para aceptar esta cotización' }
  }

  // Actualizar cotización
  const { error: updateError } = await supabase
    .from('quotes')
    .update({ accepted_at: new Date().toISOString() })
    .eq('id', quoteId)

  if (updateError) {
    return { error: 'Error al aceptar la cotización' }
  }

  // Actualizar estado del trabajo
  await supabase
    .from('jobs')
    .update({ status: 'booked' })
    .eq('id', quote.job_id)

  revalidatePath('/dashboard/jobs')
  
  return { success: true }
}

/**
 * Rechaza una cotización
 */
export async function rejectQuote(quoteId: string, reason: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  const { error } = await supabase
    .from('quotes')
    .update({
      rejected_at: new Date().toISOString(),
      rejection_reason: reason,
    })
    .eq('id', quoteId)

  if (error) {
    return { error: 'Error al rechazar la cotización' }
  }

  revalidatePath('/dashboard/jobs')
  
  return { success: true }
}

