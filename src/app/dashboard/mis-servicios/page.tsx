import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function MisServiciosPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Get user's bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(name, slug),
      professional:professionals(
        user:users(full_name, phone)
      ),
      city:cities(name)
    `)
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_progress: 'bg-purple-100 text-purple-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts = {
      pending: 'Pendiente',
      confirmed: 'Confirmado',
      in_progress: 'En Progreso',
      completed: 'Completado',
      cancelled: 'Cancelado',
    }
    return texts[status as keyof typeof texts] || status
  }

  const filterBookings = (status?: string) => {
    if (!bookings) return []
    if (!status) return bookings
    return bookings.filter(b => b.status === status)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Mis Servicios</h1>
            <p className="text-gray-600">
              Gestiona todos tus servicios contratados
            </p>
          </div>
          <Link href="/cotizar">
            <Button>
              + Nuevo Servicio
            </Button>
          </Link>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <Card className="p-4 min-w-fit">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-600">
                {bookings?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Total</p>
            </div>
          </Card>
          <Card className="p-4 min-w-fit">
            <div className="text-center">
              <p className="text-2xl font-bold text-yellow-600">
                {filterBookings('pending').length}
              </p>
              <p className="text-sm text-gray-600">Pendientes</p>
            </div>
          </Card>
          <Card className="p-4 min-w-fit">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {filterBookings('in_progress').length}
              </p>
              <p className="text-sm text-gray-600">En Progreso</p>
            </div>
          </Card>
          <Card className="p-4 min-w-fit">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {filterBookings('completed').length}
              </p>
              <p className="text-sm text-gray-600">Completados</p>
            </div>
          </Card>
        </div>

        {/* Bookings List */}
        {bookings && bookings.length > 0 ? (
          <div className="space-y-4">
            {bookings.map((booking: any) => (
              <Card key={booking.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold">
                        {booking.service?.name}
                      </h3>
                      <span className={`text-xs px-3 py-1 rounded-full font-medium ${getStatusBadge(booking.status)}`}>
                        {getStatusText(booking.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Profesional:</span>{' '}
                        {booking.professional?.user?.full_name || 'Por asignar'}
                      </div>
                      <div>
                        <span className="font-medium">Ciudad:</span>{' '}
                        {booking.city?.name}
                      </div>
                      <div>
                        <span className="font-medium">Fecha:</span>{' '}
                        {booking.scheduled_date
                          ? new Date(booking.scheduled_date).toLocaleDateString('es-MX', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Por confirmar'}
                      </div>
                      <div>
                        <span className="font-medium">Creado:</span>{' '}
                        {new Date(booking.created_at).toLocaleDateString('es-MX')}
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notas:</span> {booking.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="text-3xl font-bold text-primary-600">
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                        }).format(booking.total_price)}
                      </p>
                    </div>
                    <Link href={`/dashboard/servicios/${booking.id}`}>
                      <Button>
                        Ver Detalles
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gray-100 text-gray-400 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                📋
              </div>
              <h3 className="text-xl font-semibold mb-2">
                No tienes servicios contratados
              </h3>
              <p className="text-gray-600 mb-6">
                Comienza solicitando tu primer servicio y encuentra profesionales verificados
              </p>
              <Link href="/cotizar">
                <Button size="lg">
                  Solicitar Servicio
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>

      <Footer />
    </div>
  )
}

