import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function ProfesionalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Únete a Profesionales Confiables
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Consigue más clientes y gestiona tus trabajos de manera eficiente
            </p>
            <Link href="/auth/signup?type=professional">
              <Button size="lg" variant="secondary">
                Registrarse Ahora
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Beneficios de ser parte de nuestra plataforma
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                👥
              </div>
              <h3 className="text-xl font-semibold mb-2">Más Clientes</h3>
              <p className="text-gray-600">
                Accede a miles de clientes potenciales que buscan tus servicios
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                💰
              </div>
              <h3 className="text-xl font-semibold mb-2">Pagos Seguros</h3>
              <p className="text-gray-600">
                Sistema de pago escrow que protege tu trabajo y garantiza el cobro
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                📱
              </div>
              <h3 className="text-xl font-semibold mb-2">Gestión Fácil</h3>
              <p className="text-gray-600">
                Administra tus trabajos, horarios y pagos desde un solo lugar
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                ⭐
              </div>
              <h3 className="text-xl font-semibold mb-2">Construye tu Reputación</h3>
              <p className="text-gray-600">
                Sistema de reseñas y calificaciones que te ayudan a destacar
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                🛡️
              </div>
              <h3 className="text-xl font-semibold mb-2">Garantía Respaldada</h3>
              <p className="text-gray-600">
                Ofrecemos garantía en todos los trabajos, generando confianza
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                📊
              </div>
              <h3 className="text-xl font-semibold mb-2">Reportes y Analytics</h3>
              <p className="text-gray-600">
                Visualiza tus ganancias, trabajos completados y más
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Regístrate</h3>
                  <p className="text-gray-600">
                    Completa tu perfil con tus especialidades, experiencia y zona de trabajo
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Verificación</h3>
                  <p className="text-gray-600">
                    Verificamos tu identidad y credenciales para garantizar la calidad
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Recibe Solicitudes</h3>
                  <p className="text-gray-600">
                    Los clientes te contactan directamente para sus proyectos
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Trabaja y Cobra</h3>
                  <p className="text-gray-600">
                    Completa el trabajo y recibe tu pago de forma segura y rápida
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Requisitos
          </h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Ser mayor de 18 años</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Experiencia comprobable en tu área</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Identificación oficial vigente</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Herramientas y equipo propios</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary-600 font-bold">✓</span>
                <span>Disponibilidad para trabajar en tu zona</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            ¿Listo para crecer tu negocio?
          </h2>
          <p className="text-xl mb-8 text-primary-100">
            Únete a cientos de profesionales que ya confían en nosotros
          </p>
          <Link href="/auth/signup?type=professional">
            <Button size="lg" variant="secondary">
              Crear mi Cuenta
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

