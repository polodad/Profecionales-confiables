import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Button } from '@/components/ui/Button'
import { formatCurrency } from '@/lib/utils'

interface Props {
  params: {
    ciudad: string
    servicio: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const supabase = await createClient()

  const { data: city } = await supabase
    .from('cities')
    .select('name, slug')
    .eq('slug', params.ciudad)
    .single()

  const { data: service } = await supabase
    .from('services')
    .select('name, slug, description')
    .eq('slug', params.servicio)
    .single()

  if (!city || !service) {
    return {
      title: 'Página no encontrada',
    }
  }

  const title = `${service.name} en ${city.name} | Profesionales Confiables`
  const description = `Contrata ${service.name.toLowerCase()} en ${city.name}. Cotización instantánea, profesionales verificados y pago seguro. ${service.description}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      locale: 'es_MX',
    },
  }
}

export async function generateStaticParams() {
  const supabase = await createClient()

  const { data: cities } = await supabase
    .from('cities')
    .select('slug')
    .eq('is_active', true)

  const { data: services } = await supabase
    .from('services')
    .select('slug')
    .eq('is_active', true)

  const params: Props['params'][] = []

  cities?.forEach((city) => {
    services?.forEach((service) => {
      params.push({
        ciudad: city.slug,
        servicio: service.slug,
      })
    })
  })

  return params
}

export default async function CityServicePage({ params }: Props) {
  const supabase = await createClient()

  const { data: city } = await supabase
    .from('cities')
    .select('*')
    .eq('slug', params.ciudad)
    .single()

  const { data: service } = await supabase
    .from('services')
    .select('*')
    .eq('slug', params.servicio)
    .single()

  if (!city || !service) {
    notFound()
  }

  const { data: cityPrice } = await supabase
    .from('city_prices')
    .select('overrides_json')
    .eq('city_id', city.id)
    .eq('service_id', service.id)
    .single()

  const priceMultiplier = cityPrice?.overrides_json
    ? (cityPrice.overrides_json as any).price_multiplier || 1.0
    : 1.0

  const adjustedPrice = service.base_price * priceMultiplier

  // Obtener profesionales disponibles en esta ciudad para este servicio
  const { data: pros, count: prosCount } = await supabase
    .from('pros')
    .select('id, rating, review_count', { count: 'exact' })
    .eq('kyc_status', 'approved')
    .eq('is_available', true)
    .contains('trades', [service.trade])
    .contains('city_ids', [city.id])
    .limit(3)

  // Obtener reseñas recientes
  const { data: reviews } = await supabase
    .from('reviews')
    .select(`
      *,
      bookings!inner(
        *,
        quotes!inner(
          *,
          pros!inner(
            *,
            users(full_name)
          ),
          jobs!inner(
            service_id,
            city_id
          )
        )
      )
    `)
    .eq('bookings.quotes.jobs.service_id', service.id)
    .eq('bookings.quotes.jobs.city_id', city.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {service.name} en {city.name}
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              {service.description}
            </p>
            <div className="flex flex-wrap gap-4 items-center">
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                <span className="text-sm opacity-90">Desde</span>
                <p className="text-2xl font-bold">{formatCurrency(adjustedPrice)}</p>
                <span className="text-sm opacity-90">por {service.unit}</span>
              </div>
              <div className="bg-white/20 backdrop-blur px-4 py-2 rounded-lg">
                <p className="text-2xl font-bold">{prosCount || 0}</p>
                <span className="text-sm opacity-90">Profesionales disponibles</span>
              </div>
              <Link href={`/cotizar?ciudad=${city.slug}&servicio=${service.slug}`}>
                <Button size="lg" variant="secondary">
                  Cotizar Ahora
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-lg mb-2">Cotización Instantánea</h3>
              <p className="text-gray-600">Conoce el precio estimado en segundos</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">✓</div>
              <h3 className="font-semibold text-lg mb-2">Profesionales Verificados</h3>
              <p className="text-gray-600">Todos pasan por verificación de identidad</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Pago Protegido</h3>
              <p className="text-gray-600">Tu dinero está seguro hasta finalizar</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Cómo Funciona
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold mb-2">Cotiza</h3>
              <p className="text-sm text-gray-600">
                Describe tu necesidad y obtén un precio estimado
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold mb-2">Reserva</h3>
              <p className="text-sm text-gray-600">
                Elige fecha y paga el anticipo del 20%
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold mb-2">Recibe el servicio</h3>
              <p className="text-sm text-gray-600">
                El profesional realiza el trabajo en la fecha acordada
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold mb-2">Libera el pago</h3>
              <p className="text-sm text-gray-600">
                Aprueba el trabajo y el pago se libera al profesional
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      {reviews && reviews.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Lo que dicen nuestros clientes
            </h2>
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {reviews.slice(0, 3).map((review) => (
                <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
                  <div className="flex items-center mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(review.created_at).toLocaleDateString('es-MX')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Obtén tu cotización de {service.name.toLowerCase()} en {city.name}
          </p>
          <Link href={`/cotizar?ciudad=${city.slug}&servicio=${service.slug}`}>
            <Button size="lg" variant="secondary">
              Cotizar Ahora - Gratis
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: `${service.name} en ${city.name}`,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: 'Profesionales Confiables',
            },
            areaServed: {
              '@type': 'City',
              name: city.name,
            },
            offers: {
              '@type': 'Offer',
              priceSpecification: {
                '@type': 'PriceSpecification',
                price: adjustedPrice,
                priceCurrency: 'MXN',
              },
            },
          }),
        }}
      />

      <Footer />
    </div>
  )
}

