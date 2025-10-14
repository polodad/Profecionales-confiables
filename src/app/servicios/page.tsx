import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ServiceSearch } from '@/components/ui/ServiceSearch'
import { SERVICES_CATALOG, SERVICE_CATEGORIES, getServicesByCategory } from '@/lib/services-catalog'

export default async function ServiciosPage() {
  // Obtener servicios agrupados por categoría
  const servicesByCategory = getServicesByCategory()

  // Lista de fallback para compatibilidad (ya no se usa)
  const fallbackServices = [
    // Servicios de instalación
    {
      id: '1',
      trade: 'plomeria',
      name: 'Plomería',
      slug: 'plomeria',
      description: 'Reparación de fugas, instalaciones hidráulicas y mantenimiento',
      category: 'Instalación',
    },
    {
      id: '2',
      trade: 'electricidad',
      name: 'Electricidad',
      slug: 'electricidad',
      description: 'Instalación y reparación de sistemas eléctricos',
      category: 'Instalación',
    },
    {
      id: '3',
      trade: 'instalacion-gas',
      name: 'Instalación de Gas',
      slug: 'instalacion-gas',
      description: 'Instalación y reparación de sistemas de gas',
      category: 'Instalación',
    },
    {
      id: '4',
      trade: 'aire-acondicionado',
      name: 'Aire Acondicionado',
      slug: 'aire-acondicionado',
      description: 'Instalación, mantenimiento y reparación de sistemas de climatización',
      category: 'Instalación',
    },
    {
      id: '5',
      trade: 'instalacion-cctv',
      name: 'Instalación de CCTV',
      slug: 'instalacion-cctv',
      description: 'Instalación y configuración de sistemas de videovigilancia',
      category: 'Instalación',
    },
    {
      id: '6',
      trade: 'paneles-solares',
      name: 'Paneles Solares',
      slug: 'paneles-solares',
      description: 'Instalación de sistemas de energía solar',
      category: 'Instalación',
    },
    {
      id: '7',
      trade: 'vidrieria',
      name: 'Vidriería',
      slug: 'vidrieria',
      description: 'Instalación y reparación de vidrios para ventanas, puertas y espejos',
      category: 'Instalación',
    },
    
    // Servicios de construcción
    {
      id: '8',
      trade: 'albanileria',
      name: 'Albañilería',
      slug: 'albanileria',
      description: 'Construcción y reparación de muros y estructuras',
      category: 'Construcción',
    },
    {
      id: '9',
      trade: 'azulejeria',
      name: 'Azulejería',
      slug: 'azulejeria',
      description: 'Instalación de azulejos en pisos y muros',
      category: 'Construcción',
    },
    {
      id: '10',
      trade: 'acabados',
      name: 'Acabados',
      slug: 'acabados',
      description: 'Pisos, loseta y recubrimientos',
      category: 'Construcción',
    },
    {
      id: '11',
      trade: 'techado',
      name: 'Techado e Impermeabilización',
      slug: 'techado',
      description: 'Instalación de techos e impermeabilización',
      category: 'Construcción',
    },
    {
      id: '12',
      trade: 'pintura',
      name: 'Pintura',
      slug: 'pintura',
      description: 'Pintura de interiores y exteriores',
      category: 'Construcción',
    },
    {
      id: '13',
      trade: 'yeseria',
      name: 'Yesería',
      slug: 'yeseria',
      description: 'Aplicación y acabados de yeso',
      category: 'Construcción',
    },
    
    // Servicios de herrería y metalurgia
    {
      id: '14',
      trade: 'herreria',
      name: 'Herrería',
      slug: 'herreria',
      description: 'Fabricación e instalación de rejas, portones y estructuras metálicas',
      category: 'Metalurgia',
    },
    {
      id: '15',
      trade: 'soldadura',
      name: 'Soldadura',
      slug: 'soldadura',
      description: 'Trabajos de soldadura y reparación de estructuras metálicas',
      category: 'Metalurgia',
    },
    
    // Servicios de carpintería y muebles
    {
      id: '16',
      trade: 'carpinteria',
      name: 'Carpintería',
      slug: 'carpinteria',
      description: 'Instalación y reparación de puertas, ventanas y muebles',
      category: 'Carpintería',
    },
    {
      id: '17',
      trade: 'tapiceria',
      name: 'Tapicería',
      slug: 'tapiceria',
      description: 'Tapizado y retapizado de muebles',
      category: 'Carpintería',
    },
    
    // Servicios de mantenimiento y limpieza
    {
      id: '18',
      trade: 'limpieza',
      name: 'Limpieza y Mantenimiento',
      slug: 'limpieza',
      description: 'Limpieza profunda y mantenimiento de inmuebles',
      category: 'Mantenimiento',
    },
    {
      id: '19',
      trade: 'jardineria',
      name: 'Jardinería',
      slug: 'jardineria',
      description: 'Poda, limpieza y mantenimiento de áreas verdes',
      category: 'Mantenimiento',
    },
    
    // Servicios especializados
    {
      id: '20',
      trade: 'cerrajeria',
      name: 'Cerrajería',
      slug: 'cerrajeria',
      description: 'Apertura de puertas, cambio e instalación de cerraduras',
      category: 'Seguridad',
    },
    {
      id: '21',
      trade: 'mecanica',
      name: 'Mecánica',
      slug: 'mecanica',
      description: 'Reparación y mantenimiento de vehículos',
      category: 'Automotriz',
    },
    {
      id: '22',
      trade: 'chofer',
      name: 'Chofer',
      slug: 'chofer',
      description: 'Servicio de conductor particular',
      category: 'Transporte',
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section con Buscador */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Catálogo Completo de Servicios
            </h1>
            <p className="text-xl text-primary-100 mb-8">
              Encuentra profesionales verificados en tu ciudad para todos estos servicios
            </p>
            
            {/* Buscador de servicios */}
            <div className="mb-4">
              <ServiceSearch services={SERVICES_CATALOG} />
            </div>
          </div>
        </div>
      </section>

      {/* Services por Categoría */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {Object.entries(servicesByCategory).map(([categoryName, services]) => {
            // Buscar la información de la categoría
            const categoryKey = Object.keys(SERVICE_CATEGORIES).find(
              key => SERVICE_CATEGORIES[key as keyof typeof SERVICE_CATEGORIES].name === categoryName
            ) as keyof typeof SERVICE_CATEGORIES | undefined
            const categoryInfo = categoryKey ? SERVICE_CATEGORIES[categoryKey] : null

            return (
              <div key={categoryName} className="mb-16">
                {/* Encabezado de categoría */}
                <div className="mb-8">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-5xl">{categoryInfo?.icon || '📋'}</span>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-800">
                        {categoryName}
                      </h2>
                      <p className="text-gray-600 mt-1">
                        {categoryInfo?.description || ''}
                      </p>
                    </div>
                  </div>
                  <div className="h-1 bg-gradient-to-r from-primary-500 to-transparent rounded"></div>
                </div>

                {/* Grid de servicios de esta categoría */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow border-l-4 border-primary-500"
                    >
                      <div className="mb-3">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                          {service.name}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm">
                          {service.description}
                        </p>
                      </div>
                      
                      {service.keywords && service.keywords.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {service.keywords.slice(0, 3).map((keyword, idx) => (
                            <span
                              key={idx}
                              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex gap-2 mt-4">
                        <Link href={`/profesionales?servicio=${service.slug}`} className="flex-1">
                          <Button className="w-full bg-primary-600 hover:bg-primary-700 text-sm">
                            Ver Pros
                          </Button>
                        </Link>
                        <Link href={`/cotizar?servicio=${service.slug}`} className="flex-1">
                          <Button variant="outline" className="w-full border-primary-600 text-primary-600 hover:bg-primary-50 text-sm">
                            Cotizar
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿No encuentras lo que buscas?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Contáctanos y te ayudaremos a encontrar el profesional adecuado
          </p>
          <Link href="/cotizar">
            <Button size="lg">
              Solicitar Cotización Personalizada
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}


