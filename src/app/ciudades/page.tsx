import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default async function CitiesPage() {
  const supabase = await createClient()

  const { data: cities } = await supabase
    .from('cities')
    .select('*')
    .eq('is_active', true)
    .order('name')

  // Agrupar ciudades por estado (primera palabra del nombre)
  const citiesByState = cities?.reduce((acc: Record<string, typeof cities>, city) => {
    // Extraer el estado basado en el nombre de la ciudad
    let state = 'Otros'
    
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

    state = cityStateMap[city.name] || 'Otros'

    if (!acc[state]) {
      acc[state] = []
    }
    acc[state].push(city)
    return acc
  }, {}) || {}

  const stateNames = Object.keys(citiesByState).sort()

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ciudades Disponibles
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-beige-50">
              Encuentra profesionales confiables en {cities?.length || 0} ciudades de México
            </p>
          </div>
        </div>
      </section>

      {/* Cities Grid by State */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {stateNames.map((state) => (
              <div key={state} className="mb-12">
                <h2 className="text-2xl font-bold text-primary-600 mb-6 border-b-2 border-orange-500 pb-2">
                  {state} ({citiesByState[state].length} ciudades)
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {citiesByState[state].map((city) => (
                    <Link
                      key={city.id}
                      href={`/${city.slug}`}
                      className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow border-t-4 border-orange-500 hover:border-orange-600 group"
                    >
                      <h3 className="text-lg font-semibold text-primary-600 group-hover:text-orange-600 transition-colors mb-2">
                        {city.name}
                      </h3>
                      <p className="text-sm text-primary-600">
                        {(city.zones as string[]).length} zonas disponibles
                      </p>
                      <div className="mt-2">
                        <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full">
                          Ver servicios
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-beige-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4 text-primary-600">
            ¿No encuentras tu ciudad?
          </h2>
          <p className="text-xl mb-8 text-primary-600">
            Estamos expandiendo nuestros servicios. Contáctanos para solicitar servicios en tu área.
          </p>
          <Link href="/cotizar">
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Solicitar Servicios
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
