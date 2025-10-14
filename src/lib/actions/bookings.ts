'use server'

import { createClient } from '@/lib/supabase/server'
import { calculateDeposit } from '@/lib/pricing/calculator'
import { revalidatePath } from 'next/cache'

/**
 * Crea una reserva después de aceptar una cotización
 */
export async function createBooking(
  quoteId: string,
  scheduledAt: string
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Obtener la cotización
  const { data: quote, error: quoteError } = await supabase
    .from('quotes')
    .select('*, jobs!inner(*)')
    .eq('id', quoteId)
    .single()

  if (quoteError || !quote) {
    return { error: 'Cotización no encontrada' }
  }

  if ((quote.jobs as any).user_id !== user.id) {
    return { error: 'No tienes permiso' }
  }

  if (!quote.accepted_at) {
    return { error: 'La cotización no ha sido aceptada' }
  }

  // Calcular anticipo (20%)
  const escrowAmount = calculateDeposit(quote.amount)

  // Crear la reserva
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      quote_id: quoteId,
      scheduled_at: scheduledAt,
      escrow_amount: escrowAmount,
      total_amount: quote.amount,
      payment_status: 'pending',
      release_status: 'held',
    })
    .select()
    .single()

  if (bookingError) {
    return { error: 'Error al crear la reserva' }
  }

  revalidatePath('/dashboard/bookings')
  
  return { data: booking }
}

/**
 * Actualiza el estado de pago de una reserva
 */
export async function updatePaymentStatus(
  bookingId: string,
  paymentId: string,
  paymentMethod: string,
  status: 'paid' | 'failed'
) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('bookings')
    .update({
      payment_id: paymentId,
      payment_method: paymentMethod,
      payment_status: status,
    })
    .eq('id', bookingId)

  if (error) {
    return { error: 'Error al actualizar el pago' }
  }

  revalidatePath('/dashboard/bookings')
  
  return { success: true }
}

/**
 * Profesional marca el trabajo como iniciado
 */
export async function startJob(bookingId: string, beforePhotos: string[]) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Verificar que el usuario es el profesional asignado
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*, quotes!inner(*, pros!inner(user_id)), jobs!inner(*)')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return { error: 'Reserva no encontrada' }
  }

  const proUserId = (booking.quotes as any).pros.user_id
  if (proUserId !== user.id) {
    return { error: 'No tienes permiso' }
  }

  // Actualizar fotos antes
  const { error: updateError } = await supabase
    .from('bookings')
    .update({ before_photos: beforePhotos })
    .eq('id', bookingId)

  if (updateError) {
    return { error: 'Error al actualizar' }
  }

  // Actualizar estado del trabajo
  const jobId = (booking.quotes as any).job_id
  await supabase
    .from('jobs')
    .update({ status: 'in_progress' })
    .eq('id', jobId)

  revalidatePath('/dashboard/pro/bookings')
  
  return { success: true }
}

/**
 * Profesional completa el trabajo con checklist
 */
export async function completeJob(
  bookingId: string,
  afterPhotos: string[],
  checklist: Record<string, boolean>
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Verificar permisos
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*, quotes!inner(*, pros!inner(user_id), job_id)')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return { error: 'Reserva no encontrada' }
  }

  const proUserId = (booking.quotes as any).pros.user_id
  if (proUserId !== user.id) {
    return { error: 'No tienes permiso' }
  }

  // Actualizar reserva
  const { error: updateError } = await supabase
    .from('bookings')
    .update({
      after_photos: afterPhotos,
      checklist_json: checklist,
      completed_at: new Date().toISOString(),
    })
    .eq('id', bookingId)

  if (updateError) {
    return { error: 'Error al completar el trabajo' }
  }

  // Actualizar estado del trabajo
  const jobId = (booking.quotes as any).job_id
  await supabase
    .from('jobs')
    .update({ status: 'completed' })
    .eq('id', jobId)

  revalidatePath('/dashboard/pro/bookings')
  
  return { success: true }
}

/**
 * Cliente libera el pago después de aprobar el trabajo
 */
export async function releasePayment(bookingId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Verificar que el cliente es el dueño
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*, quotes!inner(*, jobs!inner(user_id))')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return { error: 'Reserva no encontrada' }
  }

  const clientUserId = (booking.quotes as any).jobs.user_id
  if (clientUserId !== user.id) {
    return { error: 'No tienes permiso' }
  }

  // Liberar el pago
  const { error: updateError } = await supabase
    .from('bookings')
    .update({ release_status: 'released' })
    .eq('id', bookingId)

  if (updateError) {
    return { error: 'Error al liberar el pago' }
  }

  revalidatePath('/dashboard/bookings')
  
  return { success: true }
}

/**
 * Cliente crea una disputa
 */
export async function createDispute(bookingId: string, reason: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  const { error } = await supabase
    .from('bookings')
    .update({ release_status: 'disputed' })
    .eq('id', bookingId)

  if (error) {
    return { error: 'Error al crear la disputa' }
  }

  // TODO: Crear registro de disputa en tabla separada
  // TODO: Notificar al equipo de soporte

  revalidatePath('/dashboard/bookings')
  
  return { success: true }
}

