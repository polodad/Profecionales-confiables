import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export default async function MisTrabajos() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const { data: pro } = await supabase
    .from('pros')
    .select('id')
    .eq('user_id', user.id)
    .single()

  if (!pro) return null

  // Obtener cotizaciones del profesional
  const { data: quotes } = await supabase
    .from('quotes')
    .select(`
      *,
      jobs!inner(
        *,
        cities(name),
        services(name),
        users(full_name)
      ),
      bookings(*)
    `)
    .eq('pro_id', pro.id)
    .order('created_at', { ascending: false })

  // Separar por estado
  const pending = quotes?.filter((q) => !q.accepted_at && !q.rejected_at) || []
  const accepted = quotes?.filter((q) => q.accepted_at) || []
  const rejected = quotes?.filter((q) => q.rejected_at) || []

  return (
    <div className="space-y-8">
      {/* Accepted/Active Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Trabajos Activos ({accepted.length})
        </h2>

        {accepted.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No tienes trabajos activos
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {accepted.map((quote) => {
              const job = quote.jobs as any
              const booking = (quote.bookings as any[])?.[0]

              return (
                <Card key={quote.id} className="border-green-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {job.services.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.cities.name} • {job.zone}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        ✓ Aceptada
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Cliente</p>
                        <p className="font-medium">{job.users.full_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Monto</p>
                        <p className="font-medium text-green-600">
                          {formatCurrency(quote.amount)}
                        </p>
                      </div>
                      {booking && (
                        <>
                          <div>
                            <p className="text-sm text-gray-600">Fecha programada</p>
                            <p className="font-medium">
                              {formatDateTime(booking.scheduled_at)}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Estado de pago</p>
                            <p
                              className={`font-medium ${
                                booking.payment_status === 'paid'
                                  ? 'text-green-600'
                                  : 'text-orange-600'
                              }`}
                            >
                              {booking.payment_status === 'paid'
                                ? 'Anticipo pagado'
                                : 'Pendiente de pago'}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/dashboard/pro/trabajos-activos/${booking?.id || quote.id}`}
                      className="ml-auto"
                    >
                      <Button>Gestionar Trabajo</Button>
                    </Link>
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Pending Quotes */}
      <div>
        <h2 className="text-2xl font-bold mb-4">
          Cotizaciones Pendientes ({pending.length})
        </h2>

        {pending.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-gray-500">
              No tienes cotizaciones pendientes
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {pending.map((quote) => {
              const job = quote.jobs as any
              const isExpired = new Date(quote.expires_at) < new Date()

              return (
                <Card key={quote.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {job.services.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.cities.name} • {job.zone}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          isExpired
                            ? 'bg-red-100 text-red-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {isExpired ? 'Expirada' : 'Pendiente'}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Tu cotización</p>
                        <p className="font-medium text-lg">
                          {formatCurrency(quote.amount)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Enviada</p>
                        <p className="font-medium">
                          {formatDateTime(quote.created_at)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Expira</p>
                        <p className="font-medium">
                          {formatDateTime(quote.expires_at)}
                        </p>
                      </div>
                    </div>
                    {quote.notes && (
                      <div className="mt-3">
                        <p className="text-sm text-gray-600">Notas</p>
                        <p className="text-sm">{quote.notes}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>

      {/* Rejected Quotes */}
      {rejected.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">
            Cotizaciones Rechazadas ({rejected.length})
          </h2>

          <div className="space-y-4">
            {rejected.map((quote) => {
              const job = quote.jobs as any

              return (
                <Card key={quote.id} className="opacity-60">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">
                          {job.services.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {job.cities.name}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
                        Rechazada
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600">
                      Monto: {formatCurrency(quote.amount)}
                    </p>
                    {quote.rejection_reason && (
                      <p className="text-sm text-gray-600 mt-2">
                        Razón: {quote.rejection_reason}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

