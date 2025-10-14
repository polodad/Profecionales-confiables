import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Garantías y Política de Disputas | Profesionales Confiables',
  description: 'Garantías de servicio y proceso de resolución de disputas',
}

export default function GarantiasPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Garantías y Política de Disputas</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Garantía de Calidad</h2>
              <p>
                Todos los servicios realizados a través de Profesionales Confiables incluyen una
                <strong> garantía de 30 días</strong> por defectos en la mano de obra.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">¿Qué Cubre la Garantía?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Defectos en la instalación o reparación realizadas</li>
                <li>Problemas derivados directamente de la mano de obra</li>
                <li>Fallas en el funcionamiento debido a errores del profesional</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">¿Qué NO Cubre la Garantía?</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Desgaste normal por uso</li>
                <li>Daños causados por mal uso o negligencia del cliente</li>
                <li>Modificaciones o reparaciones realizadas por terceros</li>
                <li>Defectos en materiales proporcionados por el cliente</li>
                <li>Daños por desastres naturales o accidentes</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Cómo Reclamar la Garantía</h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Contacte al profesional directamente dentro de los 30 días</li>
                <li>Si no hay respuesta en 48 horas, abra un ticket de soporte</li>
                <li>Proporcione fotos y descripción detallada del problema</li>
                <li>El profesional debe corregir el problema sin costo adicional</li>
              </ol>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Sistema de Escrow (Pago Protegido)</h2>
              <p>
                Para proteger tanto a clientes como profesionales, implementamos un sistema de
                escrow:
              </p>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 my-6">
                <h4 className="font-semibold mb-2">Cómo Funciona</h4>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Anticipo (20%):</strong> Se paga al confirmar la reserva para asegurar
                    el compromiso
                  </li>
                  <li>
                    <strong>Retención (80%):</strong> El saldo se retiene en escrow hasta que el
                    cliente apruebe el trabajo
                  </li>
                  <li>
                    <strong>Liberación:</strong> Una vez aprobado, el pago se libera al profesional
                    en 24-48 horas
                  </li>
                </ol>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Protección para el Cliente</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>El profesional no recibe el pago hasta que usted apruebe el trabajo</li>
                <li>Tiene hasta 7 días para inspeccionar y aprobar el trabajo</li>
                <li>Puede solicitar correcciones antes de liberar el pago</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Protección para el Profesional</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>El anticipo confirma el compromiso serio del cliente</li>
                <li>El saldo está garantizado una vez completado el trabajo correctamente</li>
                <li>
                  Si el cliente no responde en 7 días, el pago se libera automáticamente
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Proceso de Resolución de Disputas</h2>
              
              <h3 className="text-xl font-semibold mt-6 mb-3">Paso 1: Comunicación Directa</h3>
              <p>
                Primero, intente resolver el problema comunicándose directamente con el profesional
                o cliente a través de la plataforma.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-3">Paso 2: Abrir una Disputa</h3>
              <p>
                Si no se puede resolver directamente, puede abrir una disputa formal dentro de las
                <strong> 48 horas</strong> posteriores a la finalización del trabajo.
              </p>
              <p className="mt-2">
                Información requerida:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Descripción detallada del problema</li>
                <li>Fotos del trabajo realizado</li>
                <li>Evidencia de comunicación previa</li>
                <li>Cotización o acuerdos por escrito</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Paso 3: Mediación</h3>
              <p>
                Nuestro equipo de mediación revisará:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Evidencia fotográfica del antes y después</li>
                <li>Términos acordados originalmente</li>
                <li>Estándares de la industria para ese tipo de trabajo</li>
                <li>Historial de ambas partes en la plataforma</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Paso 4: Resolución</h3>
              <p>
                El equipo de mediación tomará una de las siguientes acciones en
                <strong> 5-7 días hábiles</strong>:
              </p>

              <div className="bg-gray-50 p-4 rounded-lg my-4">
                <h4 className="font-semibold mb-2">Posibles Resoluciones:</h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>A favor del cliente:</strong> Reembolso parcial o total del pago
                    retenido
                  </li>
                  <li>
                    <strong>A favor del profesional:</strong> Liberación completa del pago
                  </li>
                  <li>
                    <strong>Solución intermedia:</strong> Pago parcial + corrección del trabajo
                  </li>
                  <li>
                    <strong>Nuevo profesional:</strong> Asignación de otro profesional para
                    corregir
                  </li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-3">Paso 5: Decisión Final</h3>
              <p>
                Las decisiones del equipo de mediación son <strong>finales y vinculantes</strong>.
                Ambas partes aceptan esto al usar la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Situaciones Especiales</h2>

              <h3 className="text-xl font-semibold mt-6 mb-3">
                Trabajo Incompleto o No Iniciado
              </h3>
              <p>
                Si el profesional no se presenta o abandona el trabajo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reembolso completo del anticipo</li>
                <li>Se asigna otro profesional disponible</li>
                <li>El profesional incumplidor recibe una marca negativa</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Daños a la Propiedad</h3>
              <p>
                Si el profesional causa daños durante el trabajo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Reporte inmediato con fotos dentro de 24 horas</li>
                <li>Evaluación del daño por nuestro equipo</li>
                <li>Deducción del costo de reparación del pago del profesional</li>
                <li>En casos graves, derivación a seguro o autoridades</li>
              </ul>

              <h3 className="text-xl font-semibold mt-6 mb-3">Cambios en el Alcance</h3>
              <p>
                Si se requieren trabajos adicionales no incluidos en la cotización original:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>El profesional debe proporcionar una cotización adicional</li>
                <li>El cliente debe aprobar explícitamente antes de proceder</li>
                <li>Los cambios deben documentarse en la plataforma</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Prevención de Fraude</h2>
              <p>
                Para mantener la integridad de la plataforma:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Prohibido:</strong> Realizar pagos fuera de la plataforma
                </li>
                <li>
                  <strong>Verificación:</strong> Todos los profesionales pasan por verificación
                  de identidad
                </li>
                <li>
                  <strong>Monitoreo:</strong> Revisamos patrones sospechosos de actividad
                </li>
                <li>
                  <strong>Consecuencias:</strong> Suspensión permanente por fraude comprobado
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">Contacto para Disputas</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
                <p className="font-medium">
                  Email: disputas@profesionalesconfiables.com
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Tiempo de respuesta: 24-48 horas hábiles
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

