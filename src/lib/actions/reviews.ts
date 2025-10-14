'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

/**
 * Crea una reseña para una reserva completada
 */
export async function createReview(
  bookingId: string,
  rating: number,
  comment: string,
  photos: string[]
) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Validar rating
  if (rating < 1 || rating > 5) {
    return { error: 'La calificación debe estar entre 1 y 5' }
  }

  // Verificar que la reserva está completada y pertenece al usuario
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .select('*, quotes!inner(*, jobs!inner(user_id), pro_id)')
    .eq('id', bookingId)
    .single()

  if (bookingError || !booking) {
    return { error: 'Reserva no encontrada' }
  }

  const clientUserId = (booking.quotes as any).jobs.user_id
  if (clientUserId !== user.id) {
    return { error: 'No tienes permiso' }
  }

  if (!booking.completed_at) {
    return { error: 'La reserva no está completada' }
  }

  // Crear la reseña
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      booking_id: bookingId,
      rating,
      comment,
      photos,
    })
    .select()
    .single()

  if (reviewError) {
    return { error: 'Error al crear la reseña' }
  }

  // Actualizar el rating del profesional
  const proId = (booking.quotes as any).pro_id
  await updateProRating(proId)

  revalidatePath('/dashboard/bookings')
  revalidatePath(`/pros/${proId}`)
  
  return { data: review }
}

/**
 * Profesional responde a una reseña
 */
export async function respondToReview(reviewId: string, response: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'No autenticado' }
  }

  // Verificar que el usuario es el profesional de la reseña
  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .select('*, bookings!inner(*, quotes!inner(*, pros!inner(user_id)))')
    .eq('id', reviewId)
    .single()

  if (reviewError || !review) {
    return { error: 'Reseña no encontrada' }
  }

  const proUserId = (review.bookings as any).quotes.pros.user_id
  if (proUserId !== user.id) {
    return { error: 'No tienes permiso' }
  }

  // Actualizar la reseña
  const { error: updateError } = await supabase
    .from('reviews')
    .update({
      response,
      responded_at: new Date().toISOString(),
    })
    .eq('id', reviewId)

  if (updateError) {
    return { error: 'Error al responder la reseña' }
  }

  revalidatePath('/dashboard/pro/reviews')
  
  return { success: true }
}

/**
 * Actualiza el rating promedio de un profesional
 */
async function updateProRating(proId: string) {
  const supabase = await createClient()

  // Obtener todas las reseñas del profesional
  const { data: reviews } = await supabase
    .from('reviews')
    .select('rating, bookings!inner(*, quotes!inner(pro_id))')
    .eq('bookings.quotes.pro_id', proId)

  if (!reviews || reviews.length === 0) return

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
  const avgRating = totalRating / reviews.length

  // Actualizar el profesional
  await supabase
    .from('pros')
    .update({
      rating: Math.round(avgRating * 100) / 100,
      review_count: reviews.length,
    })
    .eq('id', proId)
}

/**
 * Obtiene las reseñas de un profesional
 */
export async function getProReviews(proId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      bookings!inner(
        *,
        quotes!inner(
          pro_id,
          jobs!inner(
            service_id,
            services(name)
          )
        )
      )
    `)
    .eq('bookings.quotes.pro_id', proId)
    .order('created_at', { ascending: false })

  if (error) {
    return { error: 'Error al obtener las reseñas' }
  }

  return { data }
}

