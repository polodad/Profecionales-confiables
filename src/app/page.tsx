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

  // Mapeo de ciudades a estados
  const cityStateMap: Record<string, string> = {
    'Aguascalientes': 'Aguascalientes',
    'Mexicali': 'Baja California',
    'Tijuana': 'Baja California',
    'Ensenada': 'Baja California',
    'Tecate': 'Baja California',
    'Rosarito': 'Baja California',
    'La Paz': 'Baja California Sur',
    'Cabo San Lucas': 'Baja California Sur',
    'San José del Cabo': 'Baja California Sur',
    'Ciudad Constitución': 'Baja California Sur',
    'San Francisco de Campeche': 'Campeche',
    'Ciudad del Carmen': 'Campeche',
    'Champotón': 'Campeche',
    'Saltillo': 'Coahuila',
    'Torreón': 'Coahuila',
    'Monclova': 'Coahuila',
    'Piedras Negras': 'Coahuila',
    'Acuña': 'Coahuila',
    'Colima': 'Colima',
    'Manzanillo': 'Colima',
    'Tecomán': 'Colima',
    'Tuxtla Gutiérrez': 'Chiapas',
    'San Cristóbal de las Casas': 'Chiapas',
    'Tapachula': 'Chiapas',
    'Comitán': 'Chiapas',
    'Chihuahua': 'Chihuahua',
    'Ciudad Juárez': 'Chihuahua',
    'Delicias': 'Chihuahua',
    'Cuauhtémoc': 'Chihuahua',
    'Parral': 'Chihuahua',
    'Ciudad de México': 'Ciudad de México',
    'Victoria de Durango': 'Durango',
    'Gómez Palacio': 'Durango',
    'Guanajuato': 'Guanajuato',
    'León': 'Guanajuato',
    'Irapuato': 'Guanajuato',
    'Celaya': 'Guanajuato',
    'Salamanca': 'Guanajuato',
    'Chilpancingo de los Bravo': 'Guerrero',
    'Acapulco': 'Guerrero',
    'Iguala': 'Guerrero',
    'Zihuatanejo': 'Guerrero',
    'Pachuca de Soto': 'Hidalgo',
    'Tulancingo': 'Hidalgo',
    'Tizayuca': 'Hidalgo',
    'Tula de Allende': 'Hidalgo',
    'Guadalajara': 'Jalisco',
    'Tepatitlán': 'Jalisco',
    'Puerto Vallarta': 'Jalisco',
    'Toluca de Lerdo': 'Estado de México',
    'Ecatepec': 'Estado de México',
    'Naucalpan': 'Estado de México',
    'Tlalnepantla': 'Estado de México',
    'Nezahualcóyotl': 'Estado de México',
    'Morelia': 'Michoacán',
    'Uruapan': 'Michoacán',
    'Zamora': 'Michoacán',
    'Lázaro Cárdenas': 'Michoacán',
    'Pátzcuaro': 'Michoacán',
    'Cuernavaca': 'Morelos',
    'Cuautla': 'Morelos',
    'Temixco': 'Morelos',
    'Tepic': 'Nayarit',
    'Bahía de Banderas': 'Nayarit',
    'Santiago Ixcuintla': 'Nayarit',
    'Monterrey': 'Nuevo León',
    'Oaxaca de Juárez': 'Oaxaca',
    'Salina Cruz': 'Oaxaca',
    'Juchitán': 'Oaxaca',
    'Tuxtepec': 'Oaxaca',
    'Puebla de Zaragoza': 'Puebla',
    'Tehuacán': 'Puebla',
    'San Martín Texmelucan': 'Puebla',
    'Atlixco': 'Puebla',
    'Santiago de Querétaro': 'Querétaro',
    'San Juan del Río': 'Querétaro',
    'Chetumal': 'Quintana Roo',
    'Cancún': 'Quintana Roo',
    'Playa del Carmen': 'Quintana Roo',
    'Tulum': 'Quintana Roo',
    'Cozumel': 'Quintana Roo',
    'San Luis Potosí': 'San Luis Potosí',
    'Ciudad Valles': 'San Luis Potosí',
    'Matehuala': 'San Luis Potosí',
    'Rioverde': 'San Luis Potosí',
    'Culiacán Rosales': 'Sinaloa',
    'Mazatlán': 'Sinaloa',
    'Los Mochis': 'Sinaloa',
    'Guasave': 'Sinaloa',
    'Hermosillo': 'Sonora',
    'Ciudad Obregón': 'Sonora',
    'Nogales': 'Sonora',
    'San Luis Río Colorado': 'Sonora',
    'Navojoa': 'Sonora',
    'Villahermosa': 'Tabasco',
    'Cárdenas': 'Tabasco',
    'Comalcalco': 'Tabasco',
    'Macuspana': 'Tabasco',
    'Ciudad Victoria': 'Tamaulipas',
    'Reynosa': 'Tamaulipas',
    'Tampico': 'Tamaulipas',
    'Matamoros': 'Tamaulipas',
    'Nuevo Laredo': 'Tamaulipas',
    'Tlaxcala de Xicohténcatl': 'Tlaxcala',
    'Apizaco': 'Tlaxcala',
    'Huamantla': 'Tlaxcala',
    'Xalapa-Enríquez': 'Veracruz',
    'Veracruz': 'Veracruz',
    'Coatzacoalcos': 'Veracruz',
    'Orizaba': 'Veracruz',
    'Poza Rica': 'Veracruz',
    'Mérida': 'Yucatán',
    'Valladolid': 'Yucatán',
    'Tizimín': 'Yucatán',
    'Progreso': 'Yucatán',
    'Zacatecas': 'Zacatecas',
    'Fresnillo': 'Zacatecas',
    'Jerez': 'Zacatecas',
  }

  // Agrupar ciudades por estado
  const statesData = cities?.reduce((acc: Record<string, { name: string; cities: any[]; totalZones: number }>, city) => {
    const stateName = cityStateMap[city.name] || 'Otros'
    
    if (!acc[stateName]) {
      acc[stateName] = {
        name: stateName,
        cities: [],
        totalZones: 0
      }
    }
    
    acc[stateName].cities.push(city)
    acc[stateName].totalZones += (city.zones as string[]).length
    
    return acc
  }, {}) || {}

  // Convertir a array y ordenar, tomar solo los primeros 6 estados
  const states = Object.values(statesData)
    .sort((a, b) => a.name.localeCompare(b.name))
    .slice(0, 6)

  // Obtener servicios agrupados por categoría
  const servicesByCategory = getServicesByCategory()
  const categoryKeys = Object.keys(servicesByCategory)

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section con Buscador */}
      <section className="relative text-white py-20 overflow-hidden bg-gradient-to-br from-primary-600 to-primary-800">
        <ToolsBackground />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Profesionales Confiables para tu Proyecto
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-beige-50">
              Cotizaciones instantáneas, profesionales verificados y pago seguro
            </p>
            
            {/* Buscador de servicios */}
            <div className="mb-8">
              <ServiceSearch services={SERVICES_CATALOG} />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cotizar">
                <Button size="lg" className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white border-0">
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
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4 text-primary-600">
            Servicios Profesionales Disponibles
          </h2>
          <p className="text-center text-primary-600 mb-12 max-w-2xl mx-auto">
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
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-orange-500"
                >
                  <div className="text-4xl mb-3">{categoryInfo?.icon || '📋'}</div>
                  <h3 className="text-lg font-bold mb-2 text-primary-600">
                    {categoryName}
                  </h3>
                  <p className="text-sm text-primary-600 mb-4">
                    {categoryInfo?.description || ''}
                  </p>
                  <ul className="space-y-2 mb-4">
                    {services.slice(0, 3).map((service) => (
                      <li key={service.id} className="text-sm text-primary-600 flex items-start">
                        <span className="text-orange-500 mr-2">•</span>
                        <span>{service.name}</span>
                      </li>
                    ))}
                    {services.length > 3 && (
                      <li className="text-sm text-primary-600 italic">
                        y más...
                      </li>
                    )}
                  </ul>
                  <Link href="/servicios" className="block">
                    <Button variant="outline" className="w-full text-sm border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white">
                      Ver servicios
                    </Button>
                  </Link>
                </div>
              )
            })}
          </div>

          <div className="text-center">
            <Link href="/servicios">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">Ver Catálogo Completo de Servicios</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* States Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-600">
            Estados Disponibles
          </h2>
          
          {/* Mostrar solo los primeros 6 estados inicialmente */}
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            {states.map((state) => (
              <Link
                key={state.name}
                href={`/estados/${state.name.toLowerCase().replace(/\s+/g, '-').replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u')}`}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center border-t-4 border-orange-500"
              >
                <h3 className="text-xl font-semibold text-primary-600">{state.name}</h3>
                <p className="text-primary-600 mt-2">
                  {state.cities.length} ciudades disponibles
                </p>
              </Link>
            ))}
          </div>

          {/* Botón para mostrar todas las ciudades */}
          {cities && cities.length > 0 && (
            <div className="text-center">
              <Link href="/ciudades">
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-colors shadow-md hover:shadow-lg">
                  Ver todas las ciudades ({cities.length} ciudades disponibles)
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </Link>
            </div>
          )}

          {/* Mostrar contador de ciudades */}
          <div className="text-center mt-8">
            <p className="text-primary-600 text-lg">
              <strong>{cities?.length || 0} ciudades</strong> disponibles en toda la República Mexicana
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary-600">
            ¿Por qué elegirnos?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                ✓
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                Profesionales Verificados
              </h3>
              <p className="text-primary-600">
                Todos nuestros profesionales pasan por un proceso de verificación riguroso
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                $
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                Precios Transparentes
              </h3>
              <p className="text-primary-600">
                Cotizaciones instantáneas sin sorpresas ni cobros ocultos
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                🔒
              </div>
              <h3 className="text-xl font-semibold mb-2 text-primary-600">
                Pago Seguro
              </h3>
              <p className="text-primary-600">
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
          <p className="text-xl mb-8 text-beige-50">
            Obtén una cotización instantánea en menos de 2 minutos
          </p>
          <Link href="/cotizar">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white border-0">
              Cotizar Ahora
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

