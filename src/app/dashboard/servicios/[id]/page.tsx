import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function ServicioDetallesPage({ params }: { params: { id: string } }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Get booking details
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(name, slug, description),
      professional:professionals(
        user:users(full_name, phone, email)
      ),
      city:cities(name)
    `)
    .eq('id', params.id)
    .eq('client_id', user.id)
    .single()

  if (error || !booking) {
    notFound()
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
      completed: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendiente de Confirmación',
      confirmed: 'Confirmado',
      in_progress: 'En Progreso',
      completed: 'Completado',
      cancelled: 'Cancelado',
    }
    return texts[status as keyof typeof texts] || status
  }

  const getPaymentStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      refunded: 'bg-gray-100 text-gray-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  const getPaymentStatusText = (status: string) => {
    const texts = {
      pending: 'Pendiente',
      paid: 'Pagado',
      refunded: 'Reembolsado',
    }
    return texts[status as keyof typeof texts] || status
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/dashboard/mis-servicios" className="text-primary-600 hover:text-primary-700 flex items-center gap-2">
            ← Volver a Mis Servicios
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header */}
            <Card className="p-6">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {booking.service?.name}
                  </h1>
                  <p className="text-gray-600">
                    Orden #{booking.id.slice(0, 8).toUpperCase()}
                  </p>
                </div>
                <span className={`px-4 py-2 rounded-lg border font-medium ${getStatusBadge(booking.status)}`}>
                  {getStatusText(booking.status)}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 mb-1">Fecha de Creación</p>
                  <p className="font-medium">
                    {new Date(booking.created_at).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Fecha Programada</p>
                  <p className="font-medium">
                    {booking.scheduled_date
                      ? new Date(booking.scheduled_date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : 'Por confirmar'}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Ciudad</p>
                  <p className="font-medium">{booking.city?.name}</p>
                </div>
                <div>
                  <p className="text-gray-600 mb-1">Dirección</p>
                  <p className="font-medium">{booking.address || 'No especificada'}</p>
                </div>
              </div>
            </Card>

            {/* Description */}
            {booking.notes && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-3">Detalles del Servicio</h2>
                <p className="text-gray-700">{booking.notes}</p>
              </Card>
            )}

            {/* Professional Info */}
            {booking.professional && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Profesional Asignado</h2>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-2xl font-bold">
                    {booking.professional.user?.full_name?.charAt(0) || 'P'}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">
                      {booking.professional.user?.full_name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Profesional Verificado
                    </p>
                    {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                      <div className="flex gap-3">
                        <a href={`tel:${booking.professional.user?.phone}`}>
                          <Button variant="outline" size="sm">
                            📞 Llamar
                          </Button>
                        </a>
                        <a
                          href={`https://wa.me/${booking.professional.user?.phone?.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button variant="outline" size="sm">
                            💬 WhatsApp
                          </Button>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Estado del Servicio</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    booking.status !== 'cancelled' ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">Servicio Solicitado</h4>
                    <p className="text-sm text-gray-600">
                      {new Date(booking.created_at).toLocaleDateString('es-MX')}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    ['confirmed', 'in_progress', 'completed'].includes(booking.status)
                      ? 'bg-green-500 text-white'
                      : booking.status === 'cancelled'
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-yellow-500 text-white'
                  }`}>
                    {['confirmed', 'in_progress', 'completed'].includes(booking.status) ? '✓' : '•'}
                  </div>
                  <div>
                    <h4 className="font-semibold">Profesional Asignado</h4>
                    <p className="text-sm text-gray-600">
                      {booking.professional ? 'Asignado' : 'Pendiente'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    ['in_progress', 'completed'].includes(booking.status)
                      ? 'bg-green-500 text-white'
                      : booking.status === 'cancelled'
                      ? 'bg-gray-300 text-gray-600'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {['in_progress', 'completed'].includes(booking.status) ? '✓' : '•'}
                  </div>
                  <div>
                    <h4 className="font-semibold">Trabajo en Progreso</h4>
                    <p className="text-sm text-gray-600">
                      {booking.status === 'in_progress' || booking.status === 'completed' ? 'Iniciado' : 'Pendiente'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    booking.status === 'completed'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    {booking.status === 'completed' ? '✓' : '•'}
                  </div>
                  <div>
                    <h4 className="font-semibold">Trabajo Completado</h4>
                    <p className="text-sm text-gray-600">
                      {booking.status === 'completed' ? 'Finalizado' : 'Pendiente'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Resumen de Pago</h2>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('es-MX', {
                      style: 'currency',
                      currency: 'MXN',
                    }).format(booking.total_price)}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-primary-600">
                      {new Intl.NumberFormat('es-MX', {
                        style: 'currency',
                        currency: 'MXN',
                      }).format(booking.total_price)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Estado de Pago</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPaymentStatusBadge(booking.payment_status)}`}>
                    {getPaymentStatusText(booking.payment_status)}
                  </span>
                </div>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Acciones</h2>
              <div className="space-y-3">
                {booking.status === 'completed' && (
                  <Button className="w-full">
                    Dejar Reseña
                  </Button>
                )}
                {booking.status === 'pending' && (
                  <Button variant="outline" className="w-full text-red-600 border-red-600 hover:bg-red-50">
                    Cancelar Servicio
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  Contactar Soporte
                </Button>
              </div>
            </Card>

            {/* Guarantee */}
            <Card className="p-6 bg-primary-50 border-primary-200">
              <h3 className="font-semibold mb-2">🛡️ Garantía de 30 días</h3>
              <p className="text-sm text-gray-700">
                Este servicio está respaldado por nuestra garantía. Si algo no está bien, te ayudaremos.
              </p>
              <Link href="/garantias" className="text-sm text-primary-600 hover:text-primary-700 mt-2 inline-block">
                Más información →
              </Link>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

