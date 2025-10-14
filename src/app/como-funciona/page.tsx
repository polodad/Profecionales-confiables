import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              ¿Cómo Funciona?
            </h1>
            <p className="text-xl text-primary-100">
              Contratar profesionales nunca fue tan fácil y seguro
            </p>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Solicita tu Cotización</h3>
                  <p className="text-gray-600 mb-4">
                    Describe tu proyecto y obtén una cotización instantánea. Nuestro sistema calcula 
                    el precio basado en el tipo de servicio, complejidad y ubicación.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Selecciona el servicio que necesitas</li>
                    <li>Proporciona detalles del trabajo</li>
                    <li>Recibe tu cotización al instante</li>
                  </ul>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Confirma y Paga</h3>
                  <p className="text-gray-600 mb-4">
                    Si estás de acuerdo con el precio, confirma tu reserva y realiza el pago de forma 
                    segura. Tu dinero estará protegido en nuestro sistema de escrow.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Pago 100% seguro con MercadoPago</li>
                    <li>Tu dinero se guarda en escrow</li>
                    <li>No se libera hasta que apruebes el trabajo</li>
                  </ul>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Asignamos un Profesional</h3>
                  <p className="text-gray-600 mb-4">
                    Seleccionamos al mejor profesional verificado disponible en tu zona. 
                    Te contactará para coordinar la fecha y hora del servicio.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Profesionales verificados y con experiencia</li>
                    <li>Calificaciones y reseñas de otros clientes</li>
                    <li>Coordinación directa vía WhatsApp</li>
                  </ul>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Se Realiza el Trabajo</h3>
                  <p className="text-gray-600 mb-4">
                    El profesional llega a tu domicilio en el horario acordado y realiza 
                    el trabajo con la calidad que esperas.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Trabajo profesional garantizado</li>
                    <li>Seguimiento en tiempo real</li>
                    <li>Soporte disponible si lo necesitas</li>
                  </ul>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex-shrink-0 w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3">Aprueba y Califica</h3>
                  <p className="text-gray-600 mb-4">
                    Una vez completado el trabajo, lo revisas y apruebas. El pago se libera 
                    al profesional y puedes dejar tu calificación.
                  </p>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    <li>Verifica que todo esté perfecto</li>
                    <li>Aprueba el trabajo desde tu dashboard</li>
                    <li>Deja tu reseña para ayudar a otros</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Nuestra Garantía
            </h2>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <p className="text-lg text-gray-600 mb-4">
                Todos los trabajos realizados a través de nuestra plataforma están respaldados 
                por nuestra <strong>Garantía de 30 días</strong>.
              </p>
              <p className="text-gray-600 mb-4">
                Si tienes algún problema con el trabajo realizado, te ayudaremos a resolverlo 
                sin costo adicional. Tu satisfacción es nuestra prioridad.
              </p>
              <Link href="/garantias">
                <Button variant="outline">
                  Conocer más sobre nuestra Garantía
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  ¿Cuánto tiempo tarda en llegar el profesional?
                </h3>
                <p className="text-gray-600">
                  Típicamente, podemos coordinar el servicio en 24-48 horas. Para casos urgentes, 
                  contamos con profesionales disponibles el mismo día.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  ¿Qué pasa si no estoy satisfecho con el trabajo?
                </h3>
                <p className="text-gray-600">
                  Si el trabajo no cumple con tus expectativas, no apruebes el pago. Contacta a 
                  nuestro equipo de soporte y buscaremos una solución, ya sea corregir el trabajo 
                  o hacer un reembolso completo.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  ¿Cómo verifican a los profesionales?
                </h3>
                <p className="text-gray-600">
                  Todos nuestros profesionales pasan por un proceso de verificación que incluye 
                  validación de identidad, experiencia comprobable y referencias. Además, 
                  monitoreamos constantemente sus calificaciones.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">
                  ¿Puedo cancelar una reserva?
                </h3>
                <p className="text-gray-600">
                  Sí, puedes cancelar con hasta 4 horas de anticipación sin penalización. 
                  Cancelaciones con menor tiempo pueden estar sujetas a un cargo por cancelación.
                </p>
              </div>
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
            Obtén tu cotización en menos de 2 minutos
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

