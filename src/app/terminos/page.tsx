import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Profesionales Confiables',
  description: 'Términos y condiciones de uso de Profesionales Confiables',
}

export default function TerminosPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Términos y Condiciones</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600">
              Última actualización: {new Date().toLocaleDateString('es-MX')}
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Aceptación de Términos</h2>
              <p>
                Al acceder y utilizar Profesionales Confiables, usted acepta estar sujeto a estos
                Términos y Condiciones. Si no está de acuerdo con alguna parte de estos términos,
                no debe utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Descripción del Servicio</h2>
              <p>
                Profesionales Confiables es una plataforma que conecta a clientes con profesionales
                verificados en servicios del hogar incluyendo plomería, electricidad, albañilería,
                carpintería, yesería y pintura.
              </p>
              <p>
                Nuestra plataforma proporciona:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Cotizaciones instantáneas basadas en parámetros estándar</li>
                <li>Sistema de reserva y pago seguro con escrow</li>
                <li>Verificación básica de identidad de profesionales</li>
                <li>Sistema de reseñas y calificaciones</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Registro y Cuentas</h2>
              <p>
                Para utilizar ciertos servicios, debe crear una cuenta proporcionando información
                precisa y completa. Usted es responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener la confidencialidad de su cuenta y contraseña</li>
                <li>Todas las actividades que ocurran bajo su cuenta</li>
                <li>Notificarnos inmediatamente de cualquier uso no autorizado</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Pagos y Precios</h2>
              <p>
                <strong>Anticipo:</strong> Se requiere un anticipo del 20% del valor total estimado
                para confirmar la reserva.
              </p>
              <p>
                <strong>Saldo:</strong> El 80% restante se retiene en escrow y se libera al
                profesional una vez que el cliente aprueba la finalización del trabajo.
              </p>
              <p>
                <strong>Ajustes:</strong> El precio final puede variar del estimado inicial si el
                alcance del trabajo cambia significativamente.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Cancelaciones y Reembolsos</h2>
              <p>
                <strong>Cancelación por el Cliente:</strong> Cancelaciones con más de 24 horas de
                anticipación recibirán reembolso completo del anticipo menos una tarifa
                administrativa del 10%.
              </p>
              <p>
                <strong>Cancelación Tardía:</strong> Cancelaciones con menos de 24 horas de
                anticipación no son reembolsables.
              </p>
              <p>
                <strong>Cancelación por el Profesional:</strong> Si el profesional cancela,
                recibirá un reembolso completo o se le asignará otro profesional disponible.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Garantías y Responsabilidad</h2>
              <p>
                Los trabajos realizados incluyen una garantía de 30 días por defectos de mano de
                obra. Esta garantía no cubre:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Daños causados por uso inadecuado</li>
                <li>Desgaste normal</li>
                <li>Modificaciones realizadas por terceros</li>
              </ul>
              <p className="mt-4">
                Profesionales Confiables actúa como intermediario y no es responsable de la calidad
                del trabajo realizado, daños a la propiedad o lesiones personales.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Disputas</h2>
              <p>
                En caso de disputa sobre la calidad del trabajo o el pago:
              </p>
              <ol className="list-decimal pl-6 space-y-2">
                <li>El cliente debe notificar dentro de las 48 horas posteriores a la finalización</li>
                <li>Se abre un proceso de mediación con evidencia fotográfica</li>
                <li>Un equipo de soporte revisa el caso y toma una decisión en 5-7 días hábiles</li>
                <li>Las decisiones de mediación son finales y vinculantes</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Prohibiciones</h2>
              <p>
                Está prohibido:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Evadir la plataforma para realizar pagos directos</li>
                <li>Proporcionar información falsa o engañosa</li>
                <li>Acosar, amenazar o abusar de otros usuarios</li>
                <li>Usar la plataforma para actividades ilegales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Modificaciones</h2>
              <p>
                Nos reservamos el derecho de modificar estos términos en cualquier momento. Los
                cambios entrarán en vigor inmediatamente después de su publicación. El uso
                continuado de la plataforma constituye aceptación de los términos modificados.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Contacto</h2>
              <p>
                Para preguntas sobre estos términos, contáctenos en:
              </p>
              <p className="font-medium">
                legal@profesionalesconfiables.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

