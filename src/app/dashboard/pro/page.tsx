import { createClient } from '@/lib/supabase/server'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import Link from 'next/link'

export default async function ProDashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  // Obtener perfil del profesional
  const { data: pro } = await supabase
    .from('pros')
    .select('*')
    .eq('user_id', user.id)
    .single()

  if (!pro) return null

  // Obtener trabajos disponibles que coincidan con sus trades y ciudades
  const { data: availableJobs } = await supabase
    .from('jobs')
    .select(`
      *,
      cities(name),
      services(name, trade),
      users(full_name)
    `)
    .eq('status', 'pending_quotes')
    .in('city_id', pro.city_ids)
    .order('created_at', { ascending: false })
    .limit(10)

  // Filtrar por trades del profesional
  const matchingJobs = availableJobs?.filter((job) =>
    pro.trades.includes((job.services as any).trade)
  )

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">{pro.rating.toFixed(1)}</p>
              <p className="text-sm text-gray-600">Calificación</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">{pro.review_count}</p>
              <p className="text-sm text-gray-600">Reseñas</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                {pro.completion_rate.toFixed(0)}%
              </p>
              <p className="text-sm text-gray-600">Tasa de Completitud</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">
                {matchingJobs?.length || 0}
              </p>
              <p className="text-sm text-gray-600">Trabajos Disponibles</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KYC Warning */}
      {pro.kyc_status !== 'approved' && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <span className="text-2xl">⚠️</span>
              <div>
                <h3 className="font-semibold text-yellow-900">
                  Verificación Pendiente
                </h3>
                <p className="text-sm text-yellow-800 mt-1">
                  {pro.kyc_status === 'pending'
                    ? 'Tu cuenta está en proceso de verificación. No podrás enviar cotizaciones hasta ser aprobado.'
                    : 'Tu solicitud fue rechazada. Contacta soporte para más información.'}
                </p>
                {pro.kyc_notes && (
                  <p className="text-sm text-yellow-800 mt-2 italic">
                    Nota: {pro.kyc_notes}
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Jobs */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Trabajos Disponibles</h2>

        {!matchingJobs || matchingJobs.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-gray-500">
                No hay trabajos disponibles en este momento
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Te notificaremos cuando haya nuevos trabajos en tu área
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {matchingJobs.map((job) => (
              <Card key={job.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {(job.services as any).name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {(job.cities as any).name} • {job.zone}
                      </p>
                    </div>
                    {job.urgency && (
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded-full">
                        {job.urgency === '2-6h'
                          ? 'Urgente 2-6h'
                          : job.urgency === 'mismo_dia'
                          ? 'Mismo día'
                          : '24-48h'}
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-3">{job.scope_text}</p>

                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>
                      Cliente: {(job.users as any).full_name}
                    </span>
                    <span>•</span>
                    <span>
                      {formatDateTime(job.created_at)}
                    </span>
                    {job.preferred_date && (
                      <>
                        <span>•</span>
                        <span>
                          Fecha preferida: {formatDateTime(job.preferred_date)}
                        </span>
                      </>
                    )}
                  </div>

                  {job.photos && job.photos.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm text-gray-600 mb-2">
                        {job.photos.length} foto(s) adjunta(s)
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/pro/trabajos/${job.id}`} className="ml-auto">
                    <Button disabled={pro.kyc_status !== 'approved'}>
                      Ver Detalles y Cotizar
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

