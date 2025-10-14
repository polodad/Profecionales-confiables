import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Profesionales Confiables',
  description: 'Política de privacidad y protección de datos',
}

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Política de Privacidad</h1>
          
          <div className="prose prose-lg max-w-none space-y-6">
            <p className="text-gray-600">
              Última actualización: {new Date().toLocaleDateString('es-MX')}
            </p>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">1. Información que Recopilamos</h2>
              <p>
                Recopilamos diferentes tipos de información:
              </p>
              <h3 className="text-xl font-semibold mt-4 mb-2">Información Personal</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Dirección de servicio</li>
                <li>Información de pago (procesada por Mercado Pago)</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Para Profesionales</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Identificación oficial (INE/IFE)</li>
                <li>Comprobante de domicilio</li>
                <li>Certificaciones y credenciales profesionales</li>
                <li>Historial de trabajos y calificaciones</li>
              </ul>

              <h3 className="text-xl font-semibold mt-4 mb-2">Información de Uso</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Dirección IP</li>
                <li>Tipo de navegador y dispositivo</li>
                <li>Páginas visitadas y acciones realizadas</li>
                <li>Fecha y hora de acceso</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">2. Cómo Usamos su Información</h2>
              <p>
                Utilizamos la información recopilada para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Procesar y gestionar reservas de servicios</li>
                <li>Verificar la identidad de profesionales</li>
                <li>Procesar pagos de forma segura</li>
                <li>Enviar notificaciones sobre sus reservas (WhatsApp, email)</li>
                <li>Mejorar nuestros servicios y experiencia de usuario</li>
                <li>Prevenir fraude y mantener la seguridad</li>
                <li>Cumplir con obligaciones legales</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">3. Compartir Información</h2>
              <p>
                Compartimos información limitada con:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Profesionales:</strong> Compartimos su nombre, teléfono y dirección de
                  servicio con el profesional asignado
                </li>
                <li>
                  <strong>Procesadores de Pago:</strong> Mercado Pago procesa sus pagos según sus
                  propias políticas
                </li>
                <li>
                  <strong>Proveedores de Servicios:</strong> WhatsApp Cloud API para notificaciones
                </li>
                <li>
                  <strong>Autoridades:</strong> Cuando sea requerido por ley
                </li>
              </ul>
              <p className="mt-4">
                <strong>No vendemos</strong> su información personal a terceros.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">4. Seguridad de Datos</h2>
              <p>
                Implementamos medidas de seguridad incluyendo:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Encriptación SSL/TLS para transmisión de datos</li>
                <li>Almacenamiento seguro en Supabase con cifrado en reposo</li>
                <li>Políticas de Row Level Security (RLS) en base de datos</li>
                <li>Auditorías de seguridad regulares</li>
                <li>Autenticación de dos factores disponible</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">5. Retención de Datos</h2>
              <p>
                Retenemos su información mientras:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Su cuenta esté activa</li>
                <li>Sea necesario para proporcionar servicios</li>
                <li>Sea requerido por ley (mínimo 5 años para registros financieros)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">6. Sus Derechos</h2>
              <p>
                De acuerdo con la Ley Federal de Protección de Datos Personales, usted tiene
                derecho a:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Acceder a sus datos personales</li>
                <li>Rectificar datos inexactos o incompletos</li>
                <li>Cancelar su cuenta y datos asociados</li>
                <li>Oponerse al procesamiento de sus datos</li>
                <li>Revocar su consentimiento</li>
                <li>Solicitar portabilidad de datos</li>
              </ul>
              <p className="mt-4">
                Para ejercer estos derechos, contacte: privacidad@profesionalesconfiables.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">7. Cookies y Tecnologías Similares</h2>
              <p>
                Utilizamos cookies para:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Mantener su sesión activa</li>
                <li>Recordar sus preferencias</li>
                <li>Analizar el tráfico del sitio</li>
              </ul>
              <p className="mt-4">
                Puede desactivar las cookies en su navegador, aunque esto puede afectar la
                funcionalidad del sitio.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">8. Menores de Edad</h2>
              <p>
                Nuestros servicios no están dirigidos a menores de 18 años. No recopilamos
                intencionalmente información de menores.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">9. Cambios a esta Política</h2>
              <p>
                Podemos actualizar esta política periódicamente. Los cambios significativos serán
                notificados por correo electrónico o mediante aviso destacado en la plataforma.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mt-8 mb-4">10. Contacto</h2>
              <p>
                Para preguntas sobre privacidad:
              </p>
              <p className="font-medium">
                Email: privacidad@profesionalesconfiables.com<br />
                Responsable de Datos: [Nombre del Responsable]
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

