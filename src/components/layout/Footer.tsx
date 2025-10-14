import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">
              Profesionales Confiables
            </h3>
            <p className="text-sm">
              La plataforma más confiable para contratar servicios del hogar en México
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Para Clientes</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/cotizar" className="hover:text-white">
                  Cotizar Servicio
                </Link>
              </li>
              <li>
                <Link href="/servicios" className="hover:text-white">
                  Ver Servicios
                </Link>
              </li>
              <li>
                <Link href="/como-funciona" className="hover:text-white">
                  Cómo Funciona
                </Link>
              </li>
              <li>
                <Link href="/garantias" className="hover:text-white">
                  Garantías
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Para Profesionales</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profesionales" className="hover:text-white">
                  Registrarse
                </Link>
              </li>
              <li>
                <Link href="/profesionales/beneficios" className="hover:text-white">
                  Beneficios
                </Link>
              </li>
              <li>
                <Link href="/profesionales/requisitos" className="hover:text-white">
                  Requisitos
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/terminos" className="hover:text-white">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link href="/privacidad" className="hover:text-white">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link href="/disputas" className="hover:text-white">
                  Política de Disputas
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {new Date().getFullYear()} Profesionales Confiables. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

