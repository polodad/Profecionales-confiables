import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceSearch } from '@/components/ui/ServiceSearch'
import { ToolsBackground } from '@/components/ui/ToolsBackground'
import { SERVICES_CATALOG, SERVICE_CATEGORIES, getServicesByCategory } from '@/lib/services-catalog'

export default async function HomePage() {
  const supabase = await createClient()

  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('name')

  // Obtener servicios agrupados por categoría
  const servicesByCategory = getServicesByCategory()
  const categoryKeys = Object.keys(servicesByCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section con Buscador */}
      <section className="relative text-white py-20 overflow-hidden">
        <ToolsBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Profesionales Confiables para tu Proyecto
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Cotizaciones instantáneas, profesionales verificados y pago seguro
            </p>
            
            {/* Buscador de servicios */}
            <div className="mb-8">
              <ServiceSearch services={SERVICES_CATALOG} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cotizar">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Cotizar Servicio
                </Button>
              </Link>
              <Link href="/profesionales">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-primary-600">
                  Registrarse como Profesional
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categorías de Servicios */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Servicios Profesionales Disponibles
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Encuentra el profesional que necesitas, organizado por categoría
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categoryKeys.slice(0, 8).map((categoryName) => {
              const services = servicesByCategory[categoryName]
              const categoryKey = Object.keys(SERVICE_CATEGORIES).find(
                key => SERVICE_CATEGORIES[key as keyof typeof SERVICE_CATEGORIES].name === categoryName
              ) as keyof typeof SERVICE_CATEGORIES | undefined
              const categoryInfo = categoryKey ? SERVICE_CATEGORIES[categoryKey] : null
              
              return (
                <div
                  key={categoryName}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-primary-500"
                >
                  <div className="text-4xl mb-3">{categoryInfo?.icon || '📋'}</div>
                  <h3 className="text-lg font-bold mb-2 text-gray-800">
                    {categoryName}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {categoryInfo?.description || ''}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {services.slice(0, 3).map((service) => (
                      <li key={service.id} className="text-sm text-gray-700 flex items-start">
                        <span className="text-primary-600 mr-2">•</span>
                        <span>{service.name}</span>
                      </li>
                    ))}
                    {services.length > 3 && (
                      <li className="text-sm text-gray-500 italic">
                        y más...
                      </li>
                    )}
                  </ul>
                  <Link href="/servicios" className="block">
                    <Button variant="outline" className="w-full text-sm">
                      Ver servicios
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/servicios">
              <Button size="lg">Ver Catálogo Completo de Servicios</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Cities Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Ciudades Disponibles
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {cities?.map((city) => (
              <Link
                key={city.id}
                href={`/${city.slug}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center"
              >
                <h3 className="text-xl font-semibold">{city.name}</h3>
                <p className="text-gray-600 mt-2">
                  {(city.zones as string[]).length} zonas disponibles
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Profesionales Verificados
              </h3>
              <p className="text-gray-600">
                Todos nuestros profesionales pasan por un proceso de verificación riguroso
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                $
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Precios Transparentes
              </h3>
              <p className="text-gray-600">
                Cotizaciones instantáneas sin sorpresas ni cobros ocultos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Pago Seguro
              </h3>
              <p className="text-gray-600">
                Sistema de escrow que protege tu dinero hasta que el trabajo esté completo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para comenzar?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Obtén una cotización instantánea en menos de 2 minutos
          </p>
          <Link href="/cotizar">
            <Button size="lg" variant="secondary">
              Cotizar Ahora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

