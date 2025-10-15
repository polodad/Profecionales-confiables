import { createClient } from '@/lib/supabase/server'
import { notFound, redirect } from 'next/navigation'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import { createProQuote } from '@/lib/actions/quotes'

interface Props {
  params: {
    id: string
  }
}

export default async function JobDetailPage({ params }: Props) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/signin')
  }

  // Obtener el trabajo con todas sus relaciones
  const { data: job } = await supabase
    .from('jobs')
    .select(`
      *,
      cities(name),
      services(name, trade, rules_json),
      users(full_name, phone),
      quotes(*)
    `)
    .eq('id', params.id)
    .single()

  if (!job) {
    notFound()
  }

  // Verificar si el profesional ya envió una cotización
  const { data: pro } = await supabase
    .from('pros')
    .select('id')
    .eq('user_id', user.id)
    .single()

  const existingQuote = (job.quotes as any[])?.find(
    (q) => q.pro_id === pro?.id
  )

  async function handleSubmitQuote(formData: FormData) {
    'use server'

    const amount = parseFloat(formData.get('amount') as string)
    const notes = formData.get('notes') as string

    const breakdown = {
      total: amount,
      description: notes,
    }

    const result = await createProQuote(params.id, amount, breakdown, notes)

    if (result.error) {
      // Handle error
      return
    }

    redirect('/dashboard/pro/mis-trabajos')
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Job Details */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold">{(job.services as any).name}</h1>
              <p className="text-gray-600 mt-1">
                {(job.cities as any).name} • {job.zone}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                job.status === 'pending_quotes'
                  ? 'bg-blue-100 text-blue-800'
                  : job.status === 'quoted'
                  ? 'bg-purple-100 text-purple-800'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {job.status}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Descripción del Trabajo</h3>
            <p className="text-gray-700">{job.scope_text}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">Cliente</h3>
              <p className="text-gray-700">{(job.users as any).full_name}</p>
              <p className="text-sm text-gray-600">{(job.users as any).phone}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Dirección</h3>
              <p className="text-gray-700">{job.address}</p>
            </div>
          </div>

          {job.preferred_date && (
            <div>
              <h3 className="font-semibold mb-2">Fecha Preferida</h3>
              <p className="text-gray-700">{formatDateTime(job.preferred_date)}</p>
            </div>
          )}

          {job.urgency && (
            <div>
              <h3 className="font-semibold mb-2">Urgencia</h3>
              <p className="text-gray-700">
                {job.urgency === '2-6h'
                  ? 'Urgente (2-6 horas)'
                  : job.urgency === 'mismo_dia'
                  ? 'Mismo día'
                  : job.urgency === '24-48h'
                  ? '24-48 horas'
                  : 'Flexible'}
              </p>
            </div>
          )}

          {job.inputs_json && (
            <div>
              <h3 className="font-semibold mb-2">Detalles Técnicos</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <pre className="text-sm">
                  {JSON.stringify(job.inputs_json, null, 2)}
                </pre>
              </div>
            </div>
          )}

          {job.photos && job.photos.length > 0 && (
            <div>
              <h3 className="font-semibold mb-2">
                Fotos ({job.photos.length})
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {job.photos.map((photo: string, index: number) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Foto ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quote Form */}
      {existingQuote ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="text-center">
              <span className="text-4xl mb-2 block">✓</span>
              <h3 className="font-semibold text-green-900">
                Ya enviaste una cotización
              </h3>
              <p className="text-green-800 mt-2">
                Monto: {formatCurrency(existingQuote.amount)}
              </p>
              <p className="text-sm text-green-700 mt-1">
                Enviada el {formatDateTime(existingQuote.created_at)}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Enviar Cotización</h2>
            <p className="text-sm text-gray-600">
              Proporciona tu mejor oferta para este trabajo
            </p>
          </CardHeader>
          <form action={handleSubmitQuote}>
            <CardContent className="space-y-4">
              <Input
                type="number"
                name="amount"
                label="Monto Total (MXN)"
                placeholder="5000"
                required
                min="0"
                step="0.01"
              />

              <div>
                <label className="block text-sm font-medium mb-1">
                  Notas y Detalles
                </label>
                <textarea
                  name="notes"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  rows={4}
                  placeholder="Describe qué incluye tu cotización, tiempo estimado, materiales, etc."
                />
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">
                  Consideraciones:
                </h4>
                <ul className="text-sm text-yellow-800 space-y-1 list-disc list-inside">
                  <li>El cliente pagará anticipo del 20%</li>
                  <li>El saldo se libera al completar el trabajo</li>
                  <li>Incluye garantía de 30 días</li>
                  <li>Las cotizaciones expiran en 3 días</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="ml-auto">
                Enviar Cotización
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  )
}

