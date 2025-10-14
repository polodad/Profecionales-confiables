import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Get user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single()

  // Check if user is a professional
  if (profile?.user_type === 'professional') {
    redirect('/dashboard/pro')
  }

  // Get user's bookings
  const { data: bookings } = await supabase
    .from('bookings')
    .select(`
      *,
      service:services(name, slug),
      professional:professionals(
        user:users(full_name)
      )
    `)
    .eq('client_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            ¡Hola, {profile?.full_name || 'Usuario'}!
          </h1>
          <p className="text-gray-600">
            Bienvenido a tu panel de control
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link href="/cotizar">
            <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xl font-bold">
                  +
                </div>
                <div>
                  <h3 className="font-semibold">Nueva Cotización</h3>
                  <p className="text-sm text-gray-600">Solicitar un servicio</p>
                </div>
              </div>
            </Card>
          </Link>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold">
                {bookings?.filter(b => b.status === 'in_progress').length || 0}
              </div>
              <div>
                <h3 className="font-semibold">Trabajos Activos</h3>
                <p className="text-sm text-gray-600">En progreso</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl font-bold">
                {bookings?.filter(b => b.status === 'completed').length || 0}
              </div>
              <div>
                <h3 className="font-semibold">Completados</h3>
                <p className="text-sm text-gray-600">Total de servicios</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Recent Bookings */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Mis Servicios</h2>
            <Link href="/dashboard/mis-servicios">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>

          {bookings && bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking: any) => (
                <Card key={booking.id} className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">
                          {booking.service?.name}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">
                        Profesional: {booking.professional?.user?.full_name || 'Por asignar'}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Fecha: {booking.scheduled_date ? new Date(booking.scheduled_date).toLocaleDateString('es-MX', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        }) : 'Por confirmar'}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <p className="text-2xl font-bold text-primary-600">
                        {new Intl.NumberFormat('es-MX', {
                          style: 'currency',
                          currency: 'MXN',
                        }).format(booking.total_price)}
                      </p>
                      <Link href={`/dashboard/servicios/${booking.id}`}>
                        <Button size="sm" variant="outline">
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
              <p className="text-gray-600 mb-4">
                Aún no tienes servicios contratados
              </p>
              <Link href="/cotizar">
                <Button>
                  Solicitar mi Primer Servicio
                </Button>
              </Link>
            </Card>
          )}
        </div>

        {/* Help Section */}
        <Card className="p-8 bg-primary-50 border-primary-200">
          <h3 className="text-xl font-bold mb-2">¿Necesitas ayuda?</h3>
          <p className="text-gray-700 mb-4">
            Nuestro equipo de soporte está disponible para ayudarte con cualquier pregunta
          </p>
          <div className="flex gap-3">
            <Link href="/como-funciona">
              <Button variant="outline">
                Cómo Funciona
              </Button>
            </Link>
            <Link href="/garantias">
              <Button variant="outline">
                Garantías
              </Button>
            </Link>
          </div>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

